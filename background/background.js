
// =========== Global params ==================
let color = '#15095c';
let userid
let userInfo
let hostnamelist
let jsonObj
var tabToUrl = {};
let timeticker;

const GAMEHOST = "192.249.18.156"
// ============================================



// ======= Create Server fetch methods ========
function getInfo(jsonObj){
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
    console.log(jsondata)
  })
}

function changeInfo(jsonObj){
  fetch("http://192.249.18.156:443/infochange", {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonObj),
  }).then(res=>res.json()).then()
}
//==============================================



// ================= Create tab event listeners ===================
function onInstalledListener(){
  chrome.storage.sync.set({ color });
  chrome.identity.getProfileUserInfo(function(userinfo) { // userinfo update
    userid = userinfo.id
    jsonObj = {"userid": userid}
    getInfo(jsonObj)
  })
}


function onMessageListener(request, sender, sendResponse){
  // get current jsonObj
  chrome.identity.getProfileUserInfo(function(userinfo) { // userinfo update
    userid = userinfo.id
    jsonObj = {"userid": userid}
    getInfo(jsonObj)
  })

  if(request.isgame){ // 게임접속 메시지일 경우
    let index = hostnamelist.indexOf(request.hostname)
    if(userInfo.sites[index].isbroken == 2){
      // 이미 한 번 시도했었던 경우
      sendResponse({"userid":userid, blocked: "game blocked" , "theme":userInfo.skin.theme});
    }
    else{
      userInfo.sites[index].isbroken = 2          // tried!
      jsonObj = {"userid":userid, "data": userInfo}
      changeInfo(jsonObj) // 서버에 업데이트
      sendResponse({"userid":userid, blocked: "gaming" , "theme":userInfo.skin.theme});
    }
  }

  else{
    let index = hostnamelist.indexOf(request.hostname)

    if(index === -1)   // block 대상이 아닌 경우
      sendResponse({"userid":userid, blocked: "not blocked" , "theme":userInfo.skin.theme});
    else{
      timeticker = userInfo.sites[index].currenttime
      if(userInfo.sites[index].isbroken === 1){ // 게임 깬 경우
        sendResponse({"userid":userid, blocked: "not blocked" , "theme":userInfo.skin.theme});
      }
      else if(userInfo.sites[index].currenttime >= userInfo.sites[index].blocktime){
        // 사용시간 소진
        userInfo.sites[index].currenttime = userInfo.sites[index].blocktime;
        // jsonObj = {"userid":userid, "data": userInfo}
        // changeInfo(jsonObj) // 서버에 업데이트
        sendResponse({"userid":userid, blocked: "blocked" , "theme":userInfo.skin.theme});
      }
      else if(userInfo.sites[index].currenttime < userInfo.sites[index].blocktime){
        // 아직 사용해도 됨
        
        sendResponse({"userid":userid, blocked: "not yet" , "theme":userInfo.skin.theme});
        userInfo.sites[index].currenttime += 30000; // content에서 불리는 시간만큼 더해줌 (1분씩)
        jsonObj = {"userid":userid, "data": userInfo}
        changeInfo(jsonObj) // 서버에 업데이트
        // sendResponse({"userid":userid, blocked: "not yet" , "theme":userInfo.skin.theme});
      }
    }
  }
}

function onTabActivatedListener(activeInfo){
  chrome.identity.getProfileUserInfo(function(userinfo) { // userinfo update
    userid = userinfo.id
    jsonObj = {"userid": userid}
    getInfo(jsonObj)
  })
}

function onTabRemovedListener(tabId, removeInfo){
  jsonObj = {"userid": userid}
  getInfo(jsonObj)

  let tabhostname = tabToUrl[tabId].split('/')[2]
  
  let i = hostnamelist.indexOf(tabhostname)
  if(i !== -1){  // 만약 blocked hostname에 있으면
    userInfo.sites[index].currenttime = userInfo.sites[index].currenttime
    let jsonObjR = {"userid":userid, "data": userInfo}
    changeInfo(jsonObjR) // 지금까지 접속한 currenttime 서버에 반영
  }
  chrome.identity.getProfileUserInfo(function(userinfo) { // userinfo update
    userid = userinfo.id
    jsonObj = {"userid": userid}
    getInfo(jsonObj)
  })
}

function onTabUpdatedListener(tabId, changeInfo, tab) {
  chrome.identity.getProfileUserInfo(function(userinfo) { // userinfo update
    userid = userinfo.id
    jsonObj = {"userid": userid}
    getInfo(jsonObj)
  })
}

// ==================================================================


chrome.runtime.onInstalled.addListener(onInstalledListener);

chrome.runtime.onMessage.addListener(onMessageListener);

chrome.tabs.onActivated.addListener(onTabActivatedListener); 

chrome.tabs.onRemoved.addListener(onTabRemovedListener);

chrome.tabs.onUpdated.addListener(onTabUpdatedListener);