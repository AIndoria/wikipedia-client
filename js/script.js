var input=document.getElementById("searchform");
var inputText;

//Detects Enter
input.addEventListener("keyup",function(event){ 
  event.preventDefault();
  if(event.keyCode===13){
    inputText=document.getElementById("searchform").value;
    searchWiki(); //Clears results before subsequent searches
    (function clearResults(){
      document.getElementById("resultsbox").innerHTML="";
    })(); 
  }
});

//Clears form upon click
input.addEventListener("click",function(event){ 
  event.preventDefault();
  document.getElementById("searchform").value="";
});

//Calls the API
function searchWiki(){
  var request=new XMLHttpRequest();
  request.open("POST","https://en.wikipedia.org//w/api.php?action=opensearch&origin=*&format=json");
  request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  request.setRequestHeader("Api-User-Agent","weatherClient-Indoria");
  request.onload=function getRequest(){
    var data=JSON.parse(request.responseText);
    loadWiki(data);
  }
  request.send(encodeURI("&search="+inputText));
}

//Loads Data
function loadWiki(attr){
  console.log("Data loaded successfully");
  var cardDivs=[];
  var cardSpans=[];
  attr[1].forEach(function(element,index){ //Adds Heading to the Cards.
    var cardDiv=document.createElement("div");
    cardDiv.className="resultsCard"+index;
    cardDiv.id="cards";
    cardDiv.innerHTML ="<h4>"+element+"</h4>";
    //var resultsBox=document.getElementById("resultsbox");
    //resultsBox.append(cardDiv);
    cardDivs.push(cardDiv);
  });

  attr[2].forEach(function(element,index){
    // console.log(cardDivs[index]);
    var cardSpan=document.createElement("span");
    cardSpan.className="cardDesc";
    cardSpan.id="cardsDesc";
    cardSpan.innerHTML="<p>"+element+"</p>";
    cardDivs[index].append(cardSpan);
    var resultsBox=document.getElementById("resultsbox");
    resultsBox.append(cardDivs[index]);
    cardSpans.push(cardDivs[index]);
  });

  attr[3].forEach(function(element, index){
    var wrapper=document.createElement("a");
    wrapper.setAttribute("href", element);
    wrapper.setAttribute("target", "_blank");
    var text=cardSpans[index];
    console.log(text);
    text.parentNode.insertBefore(wrapper, text);
    wrapper.appendChild(text);
  });
}

