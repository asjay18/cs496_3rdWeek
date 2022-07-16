
var last = 1;

var tab1 = document.getElementById('tab1');
var tab2 = document.getElementById('tab2');
var tab3 = document.getElementById('tab3');
var tab4 = document.getElementById('tab4');
var content1 = document.getElementById('content1');
var content2 = document.getElementById('content2');
var content3 = document.getElementById('content3');
var content3 = document.getElementById('content4');

var last_content;
var last_tab;
var tab;
var content;

tab1.addEventListener("click", function(){loadtab(1)});
tab2.addEventListener("click", function(){loadtab(2)});
tab3.addEventListener("click", function(){loadtab(3)});
tab4.addEventListener("click", function(){loadtab(4)});

function loadtab(tab_number){
	console.log(tab_number);
  if (tab_number === last_tab) return;
  last_content = document.getElementById("content" + last);
  last_tab =  document.getElementById("tab" + last);
  content = document.getElementById("content" + tab_number);
  tab =  document.getElementById("tab" + tab_number);

  last_content.style.display = "none";
  content.style.display = "block";
  last_tab.style.background = "inherit";
  tab.style.background = "white";
  tab.style.color = "black";
  last_tab.style.color = "white";

  last = tab_number;
}

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
  for (var i = 0; i <= 50; i+= 10) { 
      var option = document.createElement('option'); 
      option.value = i; 
      option.appendChild(document.createTextNode(option.value.padStart(2,'0'))); // set the textContent in a safe way.
      df.appendChild(option); 
  }
  selectMinute.appendChild(df); 

  var selectSec = document.getElementById('ss'), // get the select
      df = document.createDocumentFragment(); // create a document fragment to hold the options while we create them
  for (var i = 0; i <= 50; i+=10) { 
      var option = document.createElement('option'); 
      option.value = i; 
      option.appendChild(document.createTextNode(option.value.padStart(2,'0'))); // set the textContent in a safe way.
      df.appendChild(option); 
  }
  selectSec.appendChild(df); 
}());


/**
* ---------------------------------------------------------------------------------
* | 옵션 |
* ---------------------------------------------------------------------------------
**/

// button element 요소
let page = document.getElementById("buttonDiv");
// CSS 클래스명
let selectedClassName = "current";
// 제공할 배경색 목록
const presetButtonColors = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1"];
let add_btn = document.getElementById("addColor");
// CSS 클래스명
let i=0;
// 제공할 배경색 목록
const addButtonColors = ["#000", "orange", "purple", "pink"]

/**
* @param {object} event - 이벤트
* @description 스토리지 API 를 호출하여 배경색을 저장하고 현재 웹 페이지의 배경색을 변경하여 줍니다.
**/
function handleButtonClick(event) {
let current = event.target.parentElement.querySelector(`.${selectedClassName}`);
if (current && current !== event.target) {
  current.classList.remove(selectedClassName);
}

let color = event.target.dataset.color;
event.target.classList.add(selectedClassName);
chrome.storage.sync.set({ color }); 
}

/**
* @param {object} buttonColors - 버튼 컬러 목록
* @description 제공할 배경색을 웹 페이지에 표시하여 줍니다.
**/
function constructOptions(buttonColors) {
chrome.storage.sync.get("color", (data) => {
  let currentColor = data.color;
  for (let buttonColor of buttonColors) {
    let button = document.createElement("button");
    button.classList.add('skin')
    button.dataset.color = buttonColor;
    button.style.backgroundColor = buttonColor;

    if (buttonColor === currentColor) {
      button.classList.add(selectedClassName);
    }

    button.addEventListener("click", handleButtonClick);
    page.appendChild(button);
  }
});
}

// 최초 버튼 컬러 표시 및 이벤트 등록 호출
constructOptions(presetButtonColors);

add_btn.addEventListener("click", add);
function add(){
console.log("add");
//presetButtonColors.push("#000");
//console.log(presetButtonColors[5])

constructOptions([addButtonColors[i++]]);
}

