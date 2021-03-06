function addloadEvent(func){
	var oldonload=window.onload;
	if(typeof window.onload!='function'){
		window.onload=func;
	}else{
		window.onload=function(){
			oldonload();
			func();
		}
	}
}
function insertAfter(newElement,targetElement){
	var parent=targetElement.parentNode;
	if(parent.lastChild==targetElement){
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement,targetElement.nextSibilng);
	}
}
function addClass(element,value){
	if(!element.className){
		element.className=value;
	}else{
		newClassName=element.className;
		newClassName+="";
		newClassName+=value;
		element.className=newClassName;
	}
}
function highlightPage(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	var headers=document.getElementsByTagName("header");
	if(headers.length==0) return false;
	var navs=headers[0].getElementsByTagName("nav");
	if(navs.length==0) return false;
	var links=navs[0].getElementsByTagName("a");
	for(var i=0;i<links.length;i++){
		var linkurl;
		for(var i=0;i<links.length;i++){
			linkurl=links[i].getAttribute("href");
			if(window.location.href.indexOf(linkurl)!=-1){
				links[i].className="here";
				var linktext=links[i].lastChild.nodeValue.toLowerCase();
				// document.body.setAttribute("id",linktext);
			}
		}
	}
}
function moveElement(elementID,final_x,final_y,interval){
	if(!document.getElementById||!document.getElementsByTagName) return false;
	var elem=document.getElementById(elementID);
	if(elem.movement){
		clearTimeout(elem.movement);
	}
	if(!elem.style.left){
		elem.style.left="0px";
	}
	if(!elem.style.top){
		elem.style.top="0px";
	}
	var xpos=parseInt(elem.style.left);
	var ypos=parseInt(elem.style.top);
	if(xpos==final_x&&ypos==final_y){
		return true;
	}
	if(xpos<final_x){
		var dlist=Math.ceil((final_x-xpos)/10);
		xpos=xpos+dlist;
	}
	if(xpos>final_x){
		var dlist=Math.ceil((xpos-final_x)/10);
		xpos=xpos-dlist;
	}
	if(ypos<final_y){
		var dlist=Math.ceil((final_y-ypos)/10);
		ypos=ypos+dlist;
	}
	if(ypos>final_y){
		var dlist=Math.ceil((ypos-final_y)/10);
		ypos=ypos-dlist;
	}
	elem.style.left=xpos+"px";
	elem.style.top=ypos+"px";
	var repeat="moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
	elem.movement=setTimeout(repeat,interval);
}
function prepareSlideshow(){
	if(!document.getElementById||!document.getElementsByTagName) return false;
	if(!document.createElement) return false;
	    var intro=document.getElementById("intro");
	    if(document.getElementById("intro")){
			var slideshow=document.createElement("div");
			slideshow.setAttribute("id","slideshow");
			var frame=document.createElement("img");
			frame.setAttribute("src","images/frame.gif");
			frame.setAttribute("alt","");
		    frame.setAttribute("id","frame");
		    slideshow.appendChild(frame);
			var preview=document.createElement("img");
			preview.setAttribute("src","images/slideshow.gif");
			preview.setAttribute("alt","a glipse of what awaits you");
			preview.setAttribute("id","preview");
			slideshow.appendChild(preview);
			insertAfter(slideshow,intro);
			var links=document.getElementsByTagName("a");
			var destination;
			for(var i=0;i<links.length;i++){
				links[i].onmouseover=function(){
					destination=this.getAttribute("href");
					if(destination.indexOf("index.html")!=-1){
						moveElement("preview",0,0,5);
					}
					if(destination.indexOf("about.html")!=-1){
						moveElement("preview",-150,0,5);
					}
					if(destination.indexOf("photos.html")!=-1){
						moveElement("preview",-300,0,5);
					}
					if(destination.indexOf("live.html")!=-1){
						moveElement("preview",-450,0,5)
					}
					if(destination.indexOf("contact.html")!=-1){
						moveElement("preview",-600,0,5);
					}
				}
			}
		}else{
			return false;
	}
}		
function showSection(id){
	var sections=document.getElementsByTagName("section");
	for(var i=0;i<sections.length;i++){
		if(sections[i].getAttribute("id")!=id){
			sections[i].style.display="none";
		}else{
			sections[i].style.display="block";
		}
	}
}
function prepareInternalnav(){
	if(!document.getElementsByTagName||!document.getElementById) return false;
	var articles=document.getElementsByTagName("article");
	if(articles.length==0) return false;
	var navs=articles[0].getElementsByTagName("nav");
	if(navs.length==0) return false;
	var nav=navs[0];
	var links=nav.getElementsByTagName("a");
	for(var i=0;i<links.length;i++){
		var sectionId=links[i].getAttribute("href").split("#")[1];
		if(!document.getElementById(sectionId)) continue;
		document.getElementById(sectionId).style.display="none";
		links[i].destination=sectionId;
		links[i].onclick=function(){
			showSection(this.destination);
			return false;
		}
	}
}
function preparePlaceholder(){
	if(!document.getElementById) return false;
	if(!document.createElement||!document.createTextNode) return false;
	if(document.getElementById("imagegallery")){
		var placeholder=document.createElement("img");
		placeholder.setAttribute("src","images/placeholder.gif");
		placeholder.setAttribute("id","placeholder");
		var description=document.createElement("p");
		description.setAttribute("id","description");
		var desc_text=document.createTextNode("Choose an image");
		description.appendChild(desc_text);
		var image=document.getElementById("imagegallery");
		insertAfter(description,image);
		insertAfter(placeholder,description);
		var links=image.getElementsByTagName("a");
		for(var i=0;i<links.length;i++){
			links[i].onclick=function(){
				showPic(this);
				return false;
			}
		}
	}
}
function showPic(whichpic){	
	if(!document.getElementsByTagName) return false;
	var source=whichpic.getAttribute("href");
	var placeholder=document.getElementById("placeholder");
	placeholder.setAttribute("src",source);
	var title=whichpic.getAttribute("title");
	var description=document.getElementById("description");
	description.firstChild.nodeValue=title;
}
function stripeTables(){
	if(!document.getElementById) return false;
	var tables=document.getElementsByTagName("table");
	for(var i=0;i<tables.length;i++){
		var odd=false
		var rows=tables[i].getElementsByTagName("tr");
		for(var j=0;j<rows.length;j++){
			if(odd==true){
				addClass(rows[j],"odd");
				odd=false;
			}else{
				odd=true;
			}
	 	}
	}
}
function displayAbbreviations(){
	if(!document.getElementById||!document.getElementsByTagName||!document.createTextNode) return false;
	var abbrs=document.getElementsByTagName("abbr");
	if(abbrs.length<1) return false;
	var defs=new Array();
	for(var i=0;i<abbrs.length;i++){
		if(abbrs[i].childNodes.length<1) continue;
		var definition=abbrs[i].getAttribute("title");
		var key=abbrs[i].lastChild.nodeValue;
		defs[key]=definition;
	}
		var dlist=document.createElement("dl");
		for(key in defs){
			definition=defs[key];
			var dtitle=document.createElement("dt");
			var dtitle_text=document.createTextNode(key);
			dtitle.appendChild(dtitle_text);
			var ddesc=document.createElement("dd");
			var ddesc_text=document.createTextNode(definition);
			ddesc.appendChild(ddesc_text);
			dlist.appendChild(dtitle);
			dlist.appendChild(ddesc);
		}
			var header=document.createElement("h3");
			var header_text=document.createTextNode("Abbreviations");
			header.appendChild(header_text);
			var articles=document.getElementsByTagName("article");
			var container=articles[0];
			container.appendChild(header);
			container.appendChild(dlist);
}
function focusLabels(){
	if(!document.getElementsByTagName) return false;
	var labels=document.getElementsByTagName("label");
	for(var i=0;i<labels.length;i++){
		if(!labels[i].getAttribute("for")) continue;
		labels[i].onclick=function(){
			var id=this.getAttribute("for");
			if(!document.getElementById(id)) return false;
			var element=document.getElementById(id);
			element.focus();
		}
	}
}
function resetFields(whichform){
	for(var i=0;i<whichform.elements.length;i++){
		var element=whichform.elements[i];
		if(element.type=="submit") continue;
		var check=element.placeholder||element.getAttribute("placeholder");
		if(!check) continue;
		element.onfocus=function(){
			var text=this.placeholder||this.getAttribute("placeholder");
			if(this.value==text){
				this.className="";
				this.value="";
			}
		}
		element.onblur=function(){
			if(this.value==""){
				this.className="placeholder";
				this.value=this.placeholder||this.getAttribute("placeholder");
			}
		}
		element.onblur();
	}
}
function prepareForms(){
	for(var i=0;i<document.forms.length;i++){
		var thisform=document.forms[i];
		resetFields(thisform);
		thisform.onsubmit=function(){
			if(!validateForm(this)) return false;
			var article=document.getElementsByTagName('article')[0];
			if(submitFormWithAjax(this,article)) return false;
			return true;
		}
	}
}
function validateForm(whichform){
	for(var i=0;i<whichform.elemnents.length;i++){
		var element=whichform.elements[i];
		if(element.required=='required'){
			if(!isFilled(element)){
				alert("Please fill in the"+element.name+"field.");
				return false;
			}
		}
		if(element.type=='email'){
			if(!isEmail(element)){
				alert("The "+element.name+"field must be a valid email address");
				return fasle;
			}
		}
	}
	return true;
}
function getHTTPObject(){
	if(typeof XMLHttpRequest=="undefined")
		XMLHttpRequest=function(){
			try{
				return new ActiveXObject("Msxml2.XMLHttp.6.0");
			}catch(e){}
			try{
				return new ActiveXObject("Msxml2.XMLHttp.3.0");
			}catch(e){}
			try{
				return new ActiveXObject("Msxml2.XMLHttp");
			}catch(e){}
			return false;
		}
		return new XMLHttpRequest();
}
function displayAjaxLoading(element){
	while(element.hasChildNodes()){
		element.removeChild(element.lastChild);
	}
	var content=document.createElement("img");
	content.setAttribute("src","images/loading.gif");
	content.setAttribute("alt","Loading...");
	element.appendChild(content);
}
function submitFormWithAjax(whichform,thetarget){
	var request=getHTTPObject();
	if(!request){
		return false;
	}
	displayAjaxLoading(thetarget);
	var dataParts=[];
	var element;
	for(var i=0;i<whichform.elements.length;i++){
		element=whichform.elements[i];
		dataParts[i]=element.name+'='+encodeURIComponent(element,value);
	}
	var data=dataParts.join("&");
	request.open('post',whichform.getAttribute("action"),true);
	request.setRequestHeader("content-type","application/x-www-form-urlencoded");
	request.onreadystatechange=function(){
		if(request.readyState==4){
			if(request.state==200||request.status==0){
				var matches=request.reponseText.match(/<article>([\s\S]+)<\/article>/);
				if(matches.length>0){
					thetarget,innerHTML=matches[1];
				}else{
					thetarget.innerHTML='<p>Oops,there was an error.Sorry.</p>';
				}
			}else{
				thetarget.innerHTML='<p>'+request.statusText+'</p>';
			}
		}
	};
	request.send(data);
	return true;
}
addloadEvent(highlightPage);
addloadEvent(prepareSlideshow);	
addloadEvent(prepareInternalnav);
addloadEvent(preparePlaceholder);
addloadEvent(stripeTables);	
addloadEvent(displayAbbreviations);
addloadEvent(focusLabels);
addloadEvent(prepareForms);