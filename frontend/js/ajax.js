
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
    createXMLHttpRequest(); //创建XMLHttpRequest对象  
	url = arguments[0].url || null;  
	dataType = arguments[0].dataType || 'text'; 
	type = arguments[0].type || 'post'; 
	async = arguments[0].async || true;
	callBack = arguments[0].callBack || null;
	data = arguments[0].data || null;
	if(!url) return null;
	if(data){
		if(type.toLowerCase() === 'get'){
			url += url.indexOf('?') == -1 ? '?' : '';
			if(typeof data != 'object'){
				try{
					data =JSON.parse(data);
				}catch(e){
					data = eval("("+data+")");
				}
			}
			for(var o in data){
				url += '&' + o + "=" + data[o];
			}
			sendData = null;
			XMLHttpReq.open(type, url, async); 

		}else{
    		XMLHttpReq.open(type, url, async); 
			XMLHttpReq.setRequestHeader("Content-type","application/raw"); 
			var sendData = data;
		}
	}else{
		sendData = null;
	}       
	XMLHttpReq.send(sendData);         
    XMLHttpReq.onreadystatechange = function(){				//指定响应函数 
    	if (XMLHttpReq.readyState == 4) {  
	        if (XMLHttpReq.status == 200) {  
	            var res = XMLHttpReq.responseText;
	 			if(callBack){
	 				callBack(res);
	 			}
	        }  
    	} 
    };
}  
