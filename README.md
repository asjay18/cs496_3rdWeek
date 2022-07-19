# <img src="https://user-images.githubusercontent.com/68576681/177258571-64e4855d-bdca-4335-b221-e23d54708cbe.jpg" width="30" height="30"> TimeSaver
> 2분반 3주차(2022.07.13~07.19) By 김태연, 정세진, 정재모
​
# Table Of Contents
* [Project Summary](#project-summary)
* [Developer Information](#developer-information)
* [Development Environment](#development-environment)
  * [0. Chrome Extension Option Page](#0-chrome-extension-option-page)
  * [1. Technique](#1-Technique)
  * [2. Future Work](#2-future-work)
***
​
# Project Summary
* youtube, instagram 등의 사이트 접속 시간을 제한하는 chrome extension이다.
* option 페이지에서 사이트와 접속 시간을 설정할 수 있다.
* 설정한 시간 이상 사용시 차단 페이지가 뜨며, 페이지의 테마 또한 설정할 수 있다. 
* 차단을 풀고 싶은 경우 3stage로 이루어진 게임을 통과해야 하며, 5분 안에 모든 게임을 성공하지 못하는 경우 자정이 지나기 전까지 게임을 재시도할 수 없다.
* 모든 게임 도합 5분 이내 성공 시 잠금이 풀렸다는 메시지가 뜨며, 해당 사이트에 접속할 수 있다. 
***
​
# Developer Information
* [김태연](https://github.com/tykim5931) (DGIST 기초학부) 
* [정세진](https://github.com/asjay18) (고려대학교 컴퓨터학과)
* [정재모](https://github.com/JaemoJeong) (KAIST 전산학부) 
***
​
# Development Environment
* OS: Window & Mac
* Language: Java Script & HTML & css
* IDE: Matter-js
* Server: NodeJs
***
​
# Chrome Extension Information
## 0. Chrome Extension Option Page
### 차단 사이트 설정
​![image](https://user-images.githubusercontent.com/98383656/179732117-c37e9dc6-7a0e-4227-99d7-dcc9a3c933ee.png)
* 차단하고 싶은 사이트와 제한 시간을 설정할 수 있습니다.
### 스크린 세이버 테마 설정
​
![image](https://user-images.githubusercontent.com/98383656/179738210-ec615cd5-d4f7-45a9-8424-2ccff8becada.png)
차단된 페이지의 테마를 설정할 수 있습니다.
![image](https://user-images.githubusercontent.com/98383656/179738122-e368c873-d465-476c-8da5-0560e0d905d3.png)
​
### 게임 설명
** 아래 내용은 chrome extension option 게임 설명 탭에 있는 내용과 첨부 사진이다.

![image](https://user-images.githubusercontent.com/98383656/179733305-e7f1ede7-3378-4353-96bc-e2746b47a260.png)
* 공의 모험 Part 1: SpaceBall
'게임해서 잠금해제'를 클릭하면 우주선을 타고 우주에 도착해 게임이 시작된다.
사방에서 날아오는 다양한 적을 맞추는 슈팅 게임이다.
마우스로 화면을 클릭하면 가운데 하얀 공으로부터 클릭한 곳으로 총알이 발사된다.
다양한 크기와 색과 속도를 가진 적이 1초마다 하나씩 생성되어 다가오는데, 총알로 맞춰 하얀 공에 닿기 전에 터트려야 한다.
비교적 큰 크기의 적은 두세번 맞춰야 완전히 터진다.
적을 맞추면 10점, 완전히 터트리면 추가 5점이 부여된다.
1000점에 도달하면 다음 단계로 넘어갈 수 있다.
1000점이 넘어도 게임이 자동으로 종료되지는 않는다.
그러므로 다음 단계로 빠르게 넘어가고 싶다면 왼쪽 상단의 점수를 확인하며 1000점이 넘으면 게임에서 죽은 후, 넘어가야 한다.

![image](https://user-images.githubusercontent.com/98383656/179733341-7b26c068-47a4-44b8-bc10-8b4474f92e7e.png)
공의 모험 Part 2: JungleBall
Part 1을 깨면 UFO를 타고 지구의 어느 정글에 불시착하게 되며 게임이 시작된다.
점프를 통해 랜덤으로 생성되는 발판을 밟으며 다가오는 적들을 피해 10000미터를 완주하는 달리기 게임이다.
마우스로 화면을 클릭하면 점프를 할 수 있고, 여러 번 클릭해 무한 점프가 가능하다.
다만, 너무 많이 점프를 하면 하얀 공이 화면의 상단에 닿아 '새에 맞아 죽었습니다.'라는 메시지와 함께 게임이 종료되므로 조심해야 한다.
점프를 못 해 하얀 공이 화면의 하단에 닿아도 '뱀에 물려 죽었습니다.'라는 메시지와 함께 게임이 종료된다.
Part 2에서도 다양한 크기와 색과 속도를 가진 적이 랜덤으로 생성된다. 다만, 여기서 적들은 오른쪽에서만 나타난다.
적을 피하지 못하면 '외계 바이러스에 감염되었습니다.'라는 메시지와 함께 게임이 종료된다.
10000미터에 도달하면 화면이 자동으로 멈추며 다음 단계로 넘어갈 수 있다.

![image](https://user-images.githubusercontent.com/98383656/179733364-942e2382-5ae8-4387-b106-660ae49ab755.png)
공의 모험 Part 3: CityBall
Part 2를 완주하면 헬리콥터를 타고 집 근처에 도달하게 되며 게임이 시작된다.
주어진 볼을 총알로 이용해 오브젝트들을 넘어뜨려 컴퓨터 모양의 오브젝트에 닿아야하는 게임이다.
볼은 총 세 종류가 있고, 매 게임마다 5개가 종류에 상관없이 랜덤으로 주어진다.
갈색 공은 기본 공이며, 기본 스탯이 다른 공들에 비해 무겁다.
파란 공을 날릴 시 일정 시간이 지난 후 크기가 커지는데, 이를 통해 큰 타격을 줄 수 있다.
노란 공은 날아가는 중간에 클릭하면 x축 속도가 올라가는데, 이를 이용하면 원하는 위치에 쉽게 도달할 수 있다.
컴퓨터에 닿지 못했는데 주어진 볼을 다 썼다면 게임이 종료되고 재시도를 할 수 있다.
주어진 볼을 이용하여 컴퓨터에 닿는 데에 성공한다면 게임이 종료되고 엔딩 영상과 함께 이제 사이트에 접속할 수 있다는 안내문이 뜬다. 꼭 게임에 성공해서 엔딩 영상을 보길 바란다.
그럼 행운을 빈다!

## 2. Technique

본 프로젝트에서 서버와의 통신은 node.js를 통해 이루어졌다. 유저가 가지고 있는 sitelist의 길이가 상이할 수 있다는 점, 데이터의 크기가 많지 않다는 점, 개발자가 백엔드 개발에 미숙하다는 점에 의해 mysql을 사용하는 대신 각 유저에 대한 json파일을 작성하는 방식을 사용했다.
또한 익스텐션에서 게임페이지를 호출했을 때 서버에 있는 게임 html을 전송해 게임을 띄워준다. 
게임이 끝나면 접속한 유저의 특정 사이트에 대해 게임을 클리어해줬는지에 대한 정보를 저장해 주어야 하기 때문에 게임 페이지 url에 쿼리정보를 붙여 전송했다.
매일 유저의 각 사이트 포인트와 사이트에서 보낸 시간을 초기화해주기 위해 npm의 schedular 모듈을 활용했다.
크롬 익스텐션 개발이므로, Contents.js와 background.js간의 통신에서 동기식, 비동기식 방식을 적절히 활용하였으며 주기적으로 메시지를 전송하는 방식을 사용했다.


​
## 3. Future Work
​
게임을 클리어하면 게임 창을 닫고 제한해제된 사이트에 따로 접속하는 대신 제한을 푼 해당 탭의 사이트로 직접 연결되도록 개선할 수 있다. 
v.1.0에서 해당 기능이 구현되지 못한 이유는 다음과 같다.
> chrome extension의 구조상 현 브라우저 화면에 contents를 띄우는 content.js 와 chrome 탭과 런타임, 서버와의 통신을 담당하는 backgroud.js가 분리되어 있다.
> 이들은 chrome.runtime message로 통신한다. 동기식으로 작동하는 message안의 코드와 달리, 서버로부터 정보를 읽어오는 fetch 함수는 비동기식으로 작동한다.
> 이러한 구조 때문에 게임을 클리어했을 때 서버에는 클리어 정보가 반영되지만, 클라이언트인 background.js는 업데이트되기 이전의 유저 정보에 기반하여 Contents.js에
> 필요한 메시지를 전송한다. 결국 Contents.js는 유저가 게임을 클리어하지 않았다고 판단해 사이트를 block 시키게 된다.
> 해당 탭을 닫고, 새 탭을 열었을 때에야 업데이트된 정보가 반영되어 background.js가 contents.js에 메시지를 전달하므로 새 창에서만 새 정보가 반영되게 되는 것이다.

