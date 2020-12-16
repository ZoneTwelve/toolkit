// ==UserScript==
// @name     GoogleSearch With Keyboard
// @version  1
// @grant    none
// ==/UserScript==

// @match        https://www.google.com/search?*
// @include      /www.google.com/search?*

const halfHeight = window.innerHeight/2;

var pre = 0;//document.createElement("a");
var preSize = 20;
var result = [];
document.body.style.scrollBehavior = "smooth";
window.onkeypress = function(event){
  
  if(!isNaN(parseInt(event.key,  10))){
  	focus( (parseInt( event.key, 10 ) + 9 ) % 10 )
  }else if(event.key=="Enter" && document.activeElement!=document.querySelector('input[type="text"]')){
    console.log("open");
   	window.open(result[pre].parentElement.href);
  }else if(event.key.toLowerCase()=="n"){
    if(pre<result.length)
		  focus(pre+1);
  }else if(event.key.toLowerCase()=="p"){
    if(pre>0)
	    focus(pre-1);
  }else if(event.key.toLowerCase()=="s"){
   	document.querySelector('input[type="text"]').focus(); 
  }else if(event.key.toLowerCase()=="e"){
   	document.querySelector("#pnnext").click();
  }else if(event.key.toLowerCase()=="q"){
   	document.querySelector("#pnprev").click();
  }
  
}

function focus(opt){
    let ch = opt;
    result = document.querySelectorAll("h3:not(.r), div.related-question-pair");
  console.log(result);
    
    if( result[ch] ){
      //result[ch].scrollIntoView();
      let el = result[opt];
      result[pre].style.fontSize = preSize+"px";
      result[pre].style.color = "blue";
      result[ch].style.color = "red";
      preSize = ( Number(window.getComputedStyle(result[ch]).getPropertyValue('font-size').match(/\d+/)[0]) );
      result[ch].style.fontSize = `${preSize+1}px`;
      console.log( preSize );
      pre = ch

      let pos = position( result[ch] );
      window.scrollTo( { 
        top: pos[1] - halfHeight + 50, 
        behavior: "smooth" 
      } )
			console.log( result[pre] );
      //window.scrollTo(0, pos[1] - halfHeight + 50);
    }

}

function position(elem) {
    var left = 0,
        top = 0;

    do {
        left += elem.offsetLeft;
        top += elem.offsetTop;
    } while ( elem = elem.offsetParent );

    return [ left, top ];
}