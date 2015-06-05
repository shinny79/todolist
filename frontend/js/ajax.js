
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
/*
*	@param {} url 请求的路劲 dataType 请求的数据类型（text） type 请求类型（post） async 同步（true） callback 回调函数  data {} 提交的数据
*
*/
function sendAjaxRequest() {		
    createXMLHttpRequest(); //创建XMLHttpRequest对象  
	url = arguments[0].url || null;  
	dataType = arguments[0].dataType || 'text'; 
	type = arguments[0].type || 'post'; 
	async = arguments[0].async || true;
	callback = arguments[0].callback || null;
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
			XMLHttpReq.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			if(typeof data != 'object'){
				try{
					data =JSON.parse(data);
				}catch(e){
					data = eval("("+data+")");
				}
			}
			var sendData = '';
			for(var o in data){
				sendData += o + "=" + data[o] + '&';  
			}
			sendData = sendData.substring(0, sendData.length - 1);
		}
	}else{
		sendData = null;
	} 
	XMLHttpReq.send(sendData);         
    XMLHttpReq.onreadystatechange = function(){				//指定响应函数 
    	if (XMLHttpReq.readyState == 4) {  
	        if (XMLHttpReq.status == 200) {  
	            var res = XMLHttpReq.responseText;
	 			if(callback){
	 				callback(res);
	 			}
	        }  
    	} 
    };
}  
