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

//I'll modify this later, this is just for testing that this works.
function loadWiki(attr){
  console.log("Data loaded successfully");
  console.log(attr);
}