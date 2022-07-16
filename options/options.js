
chrome.identity.getProfileUserInfo(function(userinfo) {
    const userid = userinfo.id
    // ------------- content1: 1.입력받아서 Box에 그리고 json 저장 -------------------
    let addSiteText = document.getElementById('input-site')
    let addHourSelect = document.getElementById('hh')
    let addMinSelect = document.getElementById('mm')
    let addSecSelect = document.getElementById('ss')
    let addItemBtn = document.getElementById('btn-addsite')
    const box = document.getElementById("blockedSiteBox")

    function parseMillisec(hh, mm, ss){
        let h=parseInt(hh)
        let m=parseInt(mm)
        let s=parseInt(ss)
        return (h*3600 + m*60 + s)*1000
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
            let time = `'${parseInt(sec/3600)}시간${parseInt((sec%3600)/60)}분${parseInt(sec%60)}초'`
            div.classList.add('blockedSiteContainer')
            div.innerHTML=`<div class=sitetext>${site.hostname}</div>
                            <div class=textelem1>제한시간: ${time}</div>
                            <button class="deleteBtn" id="deleteBtn${i}">
                            cancelbtn</button>`
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
    console.log(jsonObj)
    getInfo(jsonObj)

    // ------------------- content1: 2. item 추가 --------------
    addItemBtn.addEventListener('click', ()=>{
        let hostnamelist = siteList.map(x => x.hostname)
        if(addSiteText.value == "" || hostnamelist.indexOf(addSiteText.value) != -1){
            return
        }
        let newsite = {
            "hostname": addSiteText.value,
            "blocktime": parseMillisec(addHourSelect.value, addMinSelect.value, addSecSelect.value),
            "currenttime": 0,
            "isbroken": 0
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

    // ------------------- Remove Blockes Site --------------------
    for(i = 0; i < deleteBtnList.length; i++)
    {
        document.getElementById(deleteBtnList[i]).addEventListener("click", ()=>{
            console.log(i)
        });
    }
});