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
    for (var i = 0; i <= 59; i++) { 
        var option = document.createElement('option'); 
        option.value = i; 
        option.appendChild(document.createTextNode(option.value.padStart(2,'0'))); // set the textContent in a safe way.
        df.appendChild(option); 
    }
    selectMinute.appendChild(df); 

    var selectSec = document.getElementById('ss'), // get the select
        df = document.createDocumentFragment(); // create a document fragment to hold the options while we create them
    for (var i = 0; i <= 59; i++) { 
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
