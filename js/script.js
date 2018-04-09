var input=document.getElementById("searchform");
var inputText;


input.addEventListener("keyup",function(event){
  event.preventDefault();
  if(event.keyCode===13){
    inputText=document.getElementById("searchform").value;
    console.log("Input text was: "+inputText); //Debugging
    searchWiki();
  }
});

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

function loadWiki(attr){
  console.log("Data loaded successfully");
  console.log(attr);
  var cardDivs=[];
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
    var resultsBox=document.getElementById("resultsbox");
    cardDivs[index].append(cardSpan);
    resultsBox.append(cardDivs[index]);

  });
  attr[3].forEach(element => { //Spits out the links for Cards
    console.log(element);
  });
}

