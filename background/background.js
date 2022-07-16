let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});


chrome.identity.getProfileUserInfo(function(userinfo) {
  // =================== get userid ===================
  let userid
  userid = userinfo.id

  // ================== get 
  let userInfo
  let siteList
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
    chrome.runtime.onMessage.addListener(
      (request, sender, sendResponse) => {
        
        isblocked = false;
        let index = hostnamelist.indexOf(request.hostname)
        if(index != -1 && siteList[index].currenttime < siteList[index].blocktime){
          sendResponse({ blocked: true });
        }
        else{
          sendResponse({ blocked: false });
        }
    });

  })

})


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


