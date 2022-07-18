
(function() { // don't leak
    var selectHour = document.getElementById('hh'), // get the select
        df = document.createDocumentFragment(); // create a document fragment to hold the options while we create them
    for (var i = 0; i <= 23; i++) { 
        var option = document.createElement('option'); // create the option element
        option.value = i; // set the value property
        option.appendChild(document.createTextNode(option.value.padStart(2,'0'))); // set the textContent in a safe way.
        df.appendChild(option); // append the option to the document fragment
    }
    selectHour.appendChild(df); // append the document fragment to the DOM. this is the better way rather than setting innerHTML a bunch of times (or even once with a long string)
  
    var selectMinute = document.getElementById('mm'), // get the select
        df = document.createDocumentFragment(); // create a document fragment to hold the options while we create them
    for (var i = 0; i <= 55; i+= 5) { 
        var option = document.createElement('option'); 
        option.value = i; 
        option.appendChild(document.createTextNode(option.value.padStart(2,'0'))); // set the textContent in a safe way.
        df.appendChild(option); 
        if(i===0){
            var option = document.createElement('option'); 
            option.value = 1; 
            option.appendChild(document.createTextNode(option.value.padStart(2,'0'))); // set the textContent in a safe way.
            df.appendChild(option); 
        }
    }
    selectMinute.appendChild(df); 
  
    // var selectSec = document.getElementById('ss'), // get the select
    //     df = document.createDocumentFragment(); // create a document fragment to hold the options while we create them
    // for (var i = 0; i <= 50; i+=10) { 
    //     var option = document.createElement('option'); 
    //     option.value = i; 
    //     option.appendChild(document.createTextNode(option.value.padStart(2,'0'))); // set the textContent in a safe way.
    //     df.appendChild(option); 
    // }
    // selectSec.appendChild(df); 
  }()
);



chrome.identity.getProfileUserInfo(function(userinfo) {
    const userid = userinfo.id
    // ------------- content1: 1.입력받아서 Box에 그리고 json 저장 -------------------
    let addSiteText = document.getElementById('input-site')
    let addHourSelect = document.getElementById('hh')
    let addMinSelect = document.getElementById('mm')
    let addItemBtn = document.getElementById('btn-addsite')
    const box = document.getElementById("blockedSiteBox")
    let saveButton = document.getElementById("saveButton")

    function parseMillisec(hh, mm){
        let h=parseInt(hh)
        let m=parseInt(mm)
        return (h*3600 + m*60)*1000
    }

    let deleteBtnList=[]
    let siteList =[]
    let userInfo

    function createSiteBlock(siteList){
        deleteBtnList=[]
        box.innerHTML = "";
        let i = 0;
        for(site of siteList){
            let div = document.createElement('div')
            let sec = site.blocktime/1000
            let time = `${parseInt(sec/3600)} 시간 ${parseInt((sec%3600)/60)} 분`
            div.classList.add('blockedSiteContainer')
            div.innerHTML=`<div class=sitetext>${site.hostname}</div>
                            <div class=textelem1>제한시간: ${time}</div>
                            <div class=textelem1>${site.point}일간 완주 중</div>
                            <button class="btn btn-delete">
                            <span class="mdi mdi-delete mdi-24px"></span>
                            <span class="mdi mdi-delete-empty mdi-24px"></span>
                            <span>Delete</span>
                            </button>
                            `
            box.appendChild(div)
            deleteBtnList.push(document.getElementById(`deleteBtn${i}`))
            i+=1
        }
        for(let i =0; i < deleteBtnList.length; i++){
            deleteBtnList[i].addEventListener('click', ()=>{
                console.log(i);
                siteList.splice(i,1)
                deleteBtnList.splice(i,1)
                userInfo.sites = siteList
                console.log(userInfo)

                jsonObj = {"userid":userid, "data": userInfo}
                changeInfo(jsonObj)
                createSiteBlock(siteList)
            })
        }
    }

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
            console.log(jsondata)
            userInfo = jsondata
            siteList = jsondata.sites
            console.log(siteList)
            createSiteBlock(siteList)
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
        }).then(res=>res.json()).then(console.log())
    }

    // ------------- content1: 1. 저장되어 있는 json 불러와서 블럭 안에 표시!
    let jsonObj = {"userid": userid}
    getInfo(jsonObj)

    // ------------------- content1: 2. item 추가 --------------
    addItemBtn.addEventListener('click', ()=>{
        let hostnamelist = siteList.map(x => x.hostname)
        if(addSiteText.value == "" || hostnamelist.indexOf(addSiteText.value) != -1){
            return
        }
        let newsite = {
            "hostname": addSiteText.value,
            "blocktime": parseMillisec(addHourSelect.value, addMinSelect.value),
            "currenttime": 0,
            "isbroken": 0,
            "point":0
        }
        addSiteText.value = ""
        siteList.push(newsite)

        // json에 저장
        //chrome.runtime.getURL("/test.json")
        userInfo.sites = siteList
        let jsonObj = {"userid":userid, "data": userInfo}
        changeInfo(jsonObj)
        createSiteBlock(siteList)
    })

    saveButton.addEventListener('click', () => {
        chrome.runtime.reload()
    })

    // ------------------- Remove Blockes Site --------------------
    for(i = 0; i < deleteBtnList.length; i++)
    {
        document.getElementById(deleteBtnList[i]).addEventListener("click", ()=>{
            console.log(i)
        });
    }
});