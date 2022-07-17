let color = '#3aa757';

// TODO: oninstalled일 때 옵션페이지 띄우기
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});


function changeInfo(jsonObj){
  fetch("http://192.249.18.156:443/infochange", {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonObj),
  }).then(res=>res.json()).then(console.log())
}


chrome.identity.getProfileUserInfo(function(userinfo) {
  // =================== get userid ===================
  let userid
  userid = userinfo.id

  let userInfo
  let siteList
  let blockedTabs = [{'id': 323423423, 'siteidx': 3, 'currenttime':0}]

  let jsonObj = {"userid": userid}
  fetch("http://192.249.18.156:443/info",{
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonObj)
  }).then(response => {
      return response.json();
  })  
  .then(jsondata => {

    userInfo = jsondata
    siteList = jsondata.sites
    let hostnamelist = siteList.map(x => x.hostname)
    console.log(userInfo)

    // background.js
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
      let id = tabs[0].id;
      chrome.runtime.onMessage.addListener(
        (request, sender, sendResponse) => {
          console.log(id)

          isblocked = "not blocked";
          let index = hostnamelist.indexOf(request.hostname)
          
          
          console.log(blockedTabs)
          let idlist = blockedTabs.map(x=>x.id)
          
          console.log(idlist)
          
          let tabidx = idlist.indexOf(id)
          console.log(tabidx)

          if(index === -1){   
            // block 대상이 아닌 경우
            sendResponse({ blocked: "not blocked" });
          }
          else{
            console.log(siteList[index].currenttime)

            if(tabidx === -1 && siteList[index].currenttime >= siteList[index].blocktime){
              console.log("1")
              // block 대상인데 blockedtime에 도달했고 blockedTabList에 없는 경우
              sendResponse({ blocked: "blocked" });
            }
            else if(tabidx === -1 && siteList[index].currenttime < siteList[index].blocktime){    
              // block 대상인데 blockedtime에 도달하지 않았으며 blockedTabList에 추가가 안 된 경우
              blockedTabs.push({"id":id, "siteidx":index, "currenttime": userInfo.sites[index].currenttime})
              sendResponse({ blocked: "not yet" });
            }
            else if(blockedTabs[tabidx].currenttime < siteList[index].blocktime){ 
              // block 대상이고, blockedTabList에 있는데 blockedtime이 도달 안한경우
              blockedTabs[tabidx].currenttime += 60000; // content에서 불리는 시간만큼 더해줌 (1분씩)
              sendResponse({ blocked: "not yet" });
              console.log(blockedTabs[tabidx].currenttime)
            }
            else if(blockedTabs[tabidx].currenttime >= siteList[index].blocktime){
              // block 대상이고, blockedTabList에 있으며 blockedtime에 도달한 경우
              userInfo.sites[index].currenttime = siteList[index].blocktime;
              blockedTabs[tabidx].currenttime = 0

              jsonObj = {"userid":userid, "data": userInfo}
              changeInfo(jsonObj) // 서버에 업데이트
              blockedTabs.splice(tabidx, 1); // blockedTabs에서 제거
  
              sendResponse({ blocked: "blocked" });
            }
          }
        });
    });

    chrome.tabs.onRemoved.addListener(
      function(tabId, removeInfo){
        console.log(tabId)

        let idlist = blockedTabs.map(x=>x.id)

        let i = idlist.indexOf(tabId)
        if(i !== -1){  // 만약 blockedTabIds에 존재하면

          let index = blockedTabs[i].siteidx
          userInfo.sites[index].currenttime = blockedTabs[i].currenttime

          let jsonObj = {"userid":userid, "data": userInfo}
          changeInfo(jsonObj) // 지금까지 접속한 currenttime 서버에 반영
          console.log(userInfo.sites[index].currenttime)

          blockedTabs.splice(i, 1); // blockedTabIds에서 제거
        }
      }
    );

  })
})

// 백그라운드에서 탭의 변화를 감지해서 탭 요소가 바뀔 때마다( 삭제 혹은 생성 )
// 탭 리스트를 새로 불러와야 함.
// not yet 상태일때 해당 탭이 닫히면 세는 것을 그만하고 그때까지 센 값을 서버로 보내줘야 함.
// not yet 루프 안에서 매번 탭이 닫혔는지 검사해야 함. 탭이 닫혔으면 탭 리스트를 새로 불러올 것.

// 한 번 크롬을 켰다면 런타임이 유지됨 =>  런타임의 유지 기간은 어떤가??

// 옵션에서 저장하고 나가기를 누르면 런타임이 리셋됨. => 이 경우 이미 보고 있던 넷플릭스가 제한 시간이 안 되었는데, 탭도 닫지 않았는데,
// 중간에 다른 창에서 options의 저장을 눌러버리면 counter도 리셋될 수 있음.
// 한 런타임에서 옵션 탭이 켜지면 counter를 저장해 줘야 함.
// counter를 저장해 줘야 하는 때는 not yet인 조건일 때 뿐임.

// 그렇다면 탭의 변화 감지는 not yet에서만 하면 되는가 => 그렇다고 볼 수 있음.

// 내가 넷플릭스를 보고 있지 않고, 다른 탭을 보고 있더라도 카운터는 돌아가는가?? => yes. 돌아감.
// 다른 탭을 보게 되면 카운터를 저장해야 하는가? no. 그럴 필요 없을듯.
// 탭이 탭리스트에서 제거되는 순간 타임을 업데이트



// 서버는 매일 리셋됨.


// chrome.runtime.onMessage.addListener(
//   (request, sender, sendResponse) => {
//     console.log('[background] chrome.runtime.onMessage.addListener()');
//     console.log("[background] request:" + request.greeting);
//     // TODO
//     sendResponse({ farewell: 'contentgoodbye' });
// });

// // background.js
// chrome.runtime.onMessage.addListener(
//   (request, sender, sendResponse) => {
//     console.log('[background] chrome.runtime.onMessage.addListener()');
//     console.log("[background] request:" + request.greeting);
//     // TODO
//     sendResponse({ farewell: 'contentgoodbye' });
// });



// chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
//   (
//     async () => {
//       const hostname = await request.hostname
//       // sender.url
//       let userInfo
//       let siteList
//       let jsonObj = {"userid": userid}
//       // get blockedsite
//       fetch("http://192.249.18.156:443/info",{
//           method: 'POST',
//           headers: {
//               'Accept': 'application/json',
//               'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(jsonObj)
//       }).then(response => {
//           return response.json();
//       })  
//       .then(jsondata => {
//         userInfo = jsondata
//         siteList = jsondata.sites

//         // check if hostname is included to blocked sites
//         let hostnamelist = siteList.map(x => x.hostname)
//         let index = hostnamelist.indexOf(hostname)
//         if(index != -1){
//           let timer = siteList[index].currenttime
//           console.log(siteList[index].blocktime)
//           sendResponse({complete:"true"})
//         }
//       })
//     }
//   )();
// });


