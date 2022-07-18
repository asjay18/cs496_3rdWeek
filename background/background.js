let color = '#3aa757';

// TODO: oninstalled일 때 옵션페이지 띄우기
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});


chrome.identity.getProfileUserInfo(function(userinfo) {
  // =================== get userid ===================
  let userid
  userid = userinfo.id

  let userInfo
  let hostnamelist

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
    hostnamelist = userInfo.sites.map(x => x.hostname)
    console.log(userInfo)


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
    
    chrome.runtime.onMessage.addListener(
      (request, sender, sendResponse) => {
        if(request.isgame){ // 게임접속 메시지일 경우
          let index = hostnamelist.indexOf(request.hostname)
          userInfo.sites[index].isbroken = 2  // tried!
          jsonObj = {"userid":userid, "data": userInfo}
          changeInfo(jsonObj) // 서버에 업데이트
          sendResponse({'msg': "user tried game"});
        }
        else{               //아닐 경우
          isblocked = "not blocked";
          let index = hostnamelist.indexOf(request.hostname)
        
          if(index === -1){   
            // block 대상이 아닌 경우
            sendResponse({"userid":userid, blocked: "not blocked" });
          }
          else{
            if(userInfo.sites[index].isbroken === 1){ // 게임 깬 경우
              sendResponse({"userid":userid, blocked: "not blocked" });
            }
            if(userInfo.sites[index].currenttime >= userInfo.sites[index].blocktime){
              // 사용시간 소진
              userInfo.sites[index].currenttime = userInfo.sites[index].blocktime;
              jsonObj = {"userid":userid, "data": userInfo}
              changeInfo(jsonObj) // 서버에 업데이트
              sendResponse({"userid":userid, blocked: "blocked" });
            }
            else if(userInfo.sites[index].currenttime < userInfo.sites[index].blocktime){
              // 아직 사용해도 됨
              userInfo.sites[index].currenttime += 60000; // content에서 불리는 시간만큼 더해줌 (1분씩)
              console.log(userInfo.sites[index].currenttime)
              jsonObj = {"userid":userid, "data": userInfo}
              changeInfo(jsonObj) // 서버에 업데이트
              sendResponse({"userid":userid, blocked: "not yet" });
            }
          }
        }
      }
    )


    // for tabs
    var tabToUrl = {};

    chrome.tabs.onUpdated.addListener(    // tab이 업데이트되면 currenttime 기록해주기
      function(tabId, changeInfo, tab) {
        // Note: this event is fired twice:
        // Once with `changeInfo.status` = "loading" and another time with "complete"
        tabToUrl[tabId] = tab.url;

        let tabhostname = tabToUrl[tabId].split('/')[2]
        hostnamelist = userInfo.sites.map(x => x.hostname)

        let i = hostnamelist.indexOf(tabhostname)
        if(i !== -1){  // 만약 blocked hostname에 있으면

          let jsonObjR = {"userid":userid, "data": userInfo}
          changeInfo(jsonObjR) // 지금까지 접속한 currenttime 서버에 반영
          console.log(tabhostname)
          console.log(userInfo.sites[index].currenttime)
        }
      }
    );

    chrome.tabs.onRemoved.addListener(    // tab이 닫힐 때 currenttime 기록해주기
      function(tabId, removeInfo){
        console.log(tabToUrl[tabId])
        console.log(tabToUrl[tabId].split('/')[2])

        let tabhostname = tabToUrl[tabId].split('/')[2]
        console.log(tabhostname)
        hostnamelist = userInfo.sites.map(x => x.hostname)
        console.log(hostnamelist)
        let i = hostnamelist.indexOf(tabhostname)
        if(i !== -1){  // 만약 blocked hostname에 있으면

          let jsonObjR = {"userid":userid, "data": userInfo}
          changeInfo(jsonObjR) // 지금까지 접속한 currenttime 서버에 반영
          console.log("time saved")
          console.log(userInfo.sites[i].currenttime)
        }
      }
    );

  })
})


