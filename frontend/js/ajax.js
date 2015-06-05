var XMLHttpReq;  
function createXMLHttpRequest() {  
    try {  
        XMLHttpReq = new ActiveXObject("Msxml2.XMLHTTP");//IE高版本创建XMLHTTP  
    }  
    catch(E) {  
        try {  
            XMLHttpReq = new ActiveXObject("Microsoft.XMLHTTP");//IE低版本创建XMLHTTP  
        }  
        catch(E) {  
            XMLHttpReq = new XMLHttpRequest();//兼容非IE浏览器，直接创建XMLHTTP对象  
        }  
    }  
  
}  
function sendAjaxRequest() {
	url = arguments['url'] || null;  
	dataType = arguments['dataType'] || 'text'; 
	type = arguments['type'] || 'post'; 
	if(url) return null;
    createXMLHttpRequest();                                //创建XMLHttpRequest对象  
    XMLHttpReq.open("post", url, true);  
    XMLHttpReq.onreadystatechange = processResponse; //指定响应函数  
    XMLHttpReq.send(null);  
}  
//回调函数  
function processResponse() {  
    if (XMLHttpReq.readyState == 4) {  
        if (XMLHttpReq.status == 200) {  
            var text = XMLHttpReq.responseText;  
  
            /** 
             *实现回调 
             */  
            text = window.decodeURI(text);  
            var cp = document.getElementById("cp");  
            cp.innerHTML = "";  
            var values = text.split("|");  
            for (var i = 0; i < values.length; i++) {  
                var temp = document.createElement("option");  
                temp.text = values[i];  
                temp.value = values[i];  
                cp.options.add(temp);  
            }  
  
  
        }  
    }  
  
}  