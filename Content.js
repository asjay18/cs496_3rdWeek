// contentscript.js
const css = [`.center{
  position: absolute;
  background-color: #414141;
  width: 30vh;
  height: 30vh;
  border-radius: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: spin-right 30s linear infinite;
}
#c1{
  position: absolute;
  background-color: #000000;
  width: 4vh;
  height: 4vh;
  border-radius: 4vh;
}
#c0{
  position: absolute;
  background-color: #cf5739;
  width: 10vh;
  height: 10vh;
  border: 0.5vh solid #fff;
  border-radius: 10vh;
}
#c2{
  position: absolute;
  background-color: transparent;
  width: 17vh;
  height: 17vh;
  border-radius: 17vh;
  border: 1vh solid transparent;
  border-top: .8vh solid rgb(44, 44, 44);
  border-right: .8vh solid rgb(44, 44, 44);
  border-left: .8vh solid rgb(44, 44, 44);
}
#c3{
  position: absolute;
  background-color: transparent;
  width: 23vh;
  height: 23vh;
  border-radius: 23vh;
  border: 1vh solid transparent;
  border-right: .8vh solid rgb(44, 44, 44);
  border-top: .8vh solid rgb(150, 150, 150);
  border-left: .8vh solid rgb(44, 44, 44);
}
#s0{
  position: absolute;
  background-color: transparent;
  width: 20vh;
  height: 20vh;
  border-radius: 20vh;
  border: 1vh solid transparent;
  border-bottom: .8vh solid rgb(150, 150, 150);
}
.orbit{
  position: absolute;
  background-color: #ff009500;
  width: 55vh;
  height: 55vh;
  border-radius: 55vh;
  
  display: flex;
  align-items: center;
}
@keyframes spin-right {
  100%{
      transform: rotate(360deg);
  }
}
#edge1{
  background-color: #f3cf00;
  width: 5vh;
  height: 3vh;
  border-radius: 3vh;
  transform: rotate(30deg);
  margin-left: 15vh;
  margin-top: 10vh;
}
#edge2{
  background-color: #f3cf00;
  width: 10vh;
  height: 1vh;
  border-radius: 1vh;
  transform: rotate(30deg);
  margin-left: -12vh;
  margin-top: 4.5vh;
}
#edge3{
  background-color: #f3cf00;
  width: 1vh;
  height: 15vh;
  border-radius: 1vh;
  margin-left: -9.5vh;
  margin-top: -14vh;
} `
,
/* 지구ver */
`.center{
  position: absolute;
  background-color: #39beff;
  width: 30vh;
  height: 30vh;
  border-radius: 30vh;
  overflow: hidden;
}
.con{
  background-color: #238f35;
}
.sea{
  background-color: #39beff;
}
#c0{
  border-radius: 29% 44% 100% 0% / 43% 75% 51% 41% ;
  margin-top: -1px;
  width: 15vh;
  height: 15vh;
}
#c1{
  border-radius:35% 100% 100% 100% / 53% 74% 41% 0% ;
  width: 25vh;
  height: 25vh;
  margin-top: 8vh;
  margin-left: 3vh;
}
#c2{
  border-radius:100% 83% 100% 78% / 69% 95% 21% 74%  ;
  width: 15vh;
  height: 10vh;
  margin-top: -28vh;
  margin-left: 1vh;
}
#s0{
  border-radius: 100% 83% 100% 78% / 69% 95% 21% 74% ;
  width: 20vh;
  height: 10vh;
  margin-top: -13.2vh;
  margin-left: 15.4vh;
}
#c3{
  border-radius: 100% 83% 100% 78% / 69% 95% 21% 74% ;
  width: 20vh;
  height: 20vh;
  margin-top: -28vh;
  margin-left: 23.9vh;
}


.orbit{
  position: absolute;
  background-color: #ff009500;
  width: 55vh;
  height: 55vh;
  border-radius: 55vh;
  
  display: flex;
  align-items: center;
  animation: spin-right 30s linear infinite;
}
@keyframes spin-right {
  100%{
      transform: rotate(360deg);
  }
} `, 
/* tree */
` #edge1{
  background-color: #116b20;
  width: 8vh;
  height: 8vh;
  border-radius: 8vh;
}
#edge2{
  margin-left: -4vh;
  width: 0;
  height: 0;
  border-top: 2vh solid transparent;
  border-bottom: 2vh solid transparent;
  border-right: 9vh solid #4e3728;
} */
/* heart */
/* #edge1 {
  position: relative;
  width: 10vh;
  height: 9vh;
  rotate: -90deg;
  margin-left: 4vh;
}
#edge1:before,
#edge1:after {
  position: absolute;
  content: "";
  left: 5vh;
  top: 0;
  width: 5vh;
  height: 8vh;
  background: red;
  border-radius: 5vh 5vh 0 0;
  transform: rotate(-135deg);
  transform-origin: 0 100%;
}
#edge1:after {
  left: 0;
  transform: rotate(-45deg);
  transform-origin: 100% 100%;
} `,
/* moon */
` #edge1 {
  margin-left: -2vh;
  width: 8vh;
  height: 8vh;
  border-radius: 50%;
  box-shadow: 2vh 2vh 0 0 rgb(255, 238, 0);
}  `]


const generateSTYLES = () => {
  return `<style>@import url(https://fonts.googleapis.com/css?family=opensans:500);
  body {
    background: #15095c;
    color: #fff;
    font-family: "Open Sans", sans-serif;
    max-height: 700px;
    overflow: hidden;
}

.top{
    width: 100%;
    height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2vh;
}

${css[1]}

.bottom {
    text-align: center;
    display: block;
    position: relative;
    width: 80%;
    margin-left: 10%;
    margin-top: 2vh;
}
._1 {
    text-align: center;
    display: block;
    position: relative;
    letter-spacing: 12px;
    font-size: 4em;
    line-height: 80%;
    padding: 10px;
}
._2 {
    text-align: center;
    display: block;
    position: relative;
    font-size: 20px;
    padding: 10px;
}
hr {
    padding: 0;
    border: none;
    border-top: 5px solid #fff;
    color: #fff;
    text-align: center;
    margin: 0px auto;
    width: 420px;
    height: 10px;
    z-index: -10;
}
hr:after {
    display: inline-block;
    position: relative;
    top: -0.75em;
    font-size: 2em;
    padding: 0 0.2em;
    background: #33cc99;
}

.btn{
    color: #fff;
    border: none;
    margin: 20px;
    padding: 20px 30px;
    font-size: 18px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 4px;
    cursor: pointer;
    border-radius: 5px;
    transition: 0.5s;
    transition-property: box-shadow;
}
  
.btn-primary{
    background: #50A7FF;
    box-shadow: 0 0 25px #50A7FF;
}

.btn-primary:hover{
    box-shadow: 0 0 5px #50A7FF,
                0 0 25px #50A7FF,
                0 0 50px #50A7FF,
                0 0 100px #50A7FF;
}
   </style>`;
};


const generateHTML = (pageName) => {
  return `<!DOCTYPE html>
  <html>
      <head>
          <meta charset="utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <title>ScreenSaver</title>
          <meta name="description" content="">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="stylesheet" href="screen.css">
      </head>
      <body>
          <div class="top">
              <div class="center">
                  <div class="con" id="c0"></div>
                  <div class="con" id="c1"></div>
                  <div class="con" id="c2"></div>
                  <div class="sea" id="s0"></div>
                  <div class="con" id="c3"></div>
              </div>
              <div class="orbit">
                  <div id="edge1"></div>
                  <div id="edge2"></div>
                  <div id="edge3"></div>
              </div>
          </div>
          <div class='bottom'>
              <hr>
              <div class='_1'>GET BACK TO WORK</div>
              <div class='_2'>STUDYING > ${pageName}</div>
              <button type="button" class="btn btn-primary active" id="gameBtn">게임해서 잠금해제</button>
          </div>
      </body>
  </html>
   `;
};

function gameBtnFunc(){
  chrome.runtime.sendMessage({hostname: window.location.hostname, isgame: true}, (response) => {
    if(response.blocked == "gaming"){
      document.location.href = `http://192.249.18.156:443/spacegame?id=${response.userid}&hostname=${window.location.hostname}&time=60000` //1분 안에 통과해야 함
    }
    else{
      alert("오늘은 더 이상 게임을 시도할 수 없습니다.")
      document.location.href= `http://192.249.18.156:443/spacegame?id=${response.userid}&hostname=${window.location.hostname}&time=60000` //1분 안에 통과해야 함
      // should remove after debugging!!
    }
  })
}

function drawHTML(){
  document.head.innerHTML = generateSTYLES();
    document.body.innerHTML = generateHTML("This Page is Blocked");
    const btn = document.getElementById("gameBtn")
    btn.addEventListener('click',()=>{
      gameBtnFunc()
    })
  const imgsrc1 = chrome.runtime.getURL("asset/49.png")
  const imgsrc2 =  chrome.runtime.getURL("./asset/40.png")
  document.getElementById("img1").src = imgsrc1
  document.getElementById("img2").src = imgsrc2
  console.log(document.getElementById("img1"))
}


chrome.runtime.sendMessage({hostname: window.location.hostname, isgame: false}, (response) => {
  // 처음 접속에서 blocked인지 확인
  
  console.log(window.location.hostname)
  console.log(response.blocked);
  userid = response.userid
  if(response.blocked === "blocked"){
    // 만약 blocked이면 blocked로 두면 됨
    drawHTML()
  }
  else if(response.blocked === "not yet"){
    // 아직 blocked가 아닌 경우, 인터벌마다 다시 bloked인지  확인함.

    setTimeout(function run(){
      chrome.runtime.sendMessage({hostname: window.location.hostname}, (response) => {
        console.log(response.blocked);
        if(response.blocked === "blocked"){
          // 만약 blocked가 되면 timeout 지우고 blocked로 두기.
          clearTimeout()  // TODO timeout 바꾸기
          drawHTML()
        }
      })
    setTimeout(run, 60000); // 1분 (60초) 마다
    }, 60000);
  }
  else{
    // 만약 blocked site가 아닌 경우 걍 아무 동작도 하지 않고 함수 끝냄.
  }
})