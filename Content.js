// contentscript.js


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
  .center{
      position: absolute;
      width: 30vh;
      height: 30vh;
      animation: spin-right 20s linear infinite;
  }
  .edge{
      width: 8vh;
      height: 8vh;
      margin-top: -2vh;
      margin-left: -2vh;
  }
  @keyframes spin-right {
      100%{
          transform: rotate(360deg);
      }
  }


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
                  <img id="img1" class="center">
                  <div class="edge">
                      <img id="img2" class="edge">
                  </div>
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
    console.log(response)
  })
  document.location.href='http://192.249.18.156:443/spacegame'
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