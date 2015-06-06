/* 
* ajax实现
* @author lq9328@126.com
* @date 2015/6/5
* @param url 必选，请求路劲
* @param type 可选，请求类型，默认post
* @param data 可选，发送给服务器的数据，json类型
* @param async 可选，同步，默认同步执行（true）
* @param callback 可选，function回调函数
* @param dataType 可选,预期返回的数据类型，默认为text
*/ 
var ajax = function(){
	var XMLHttpReq = function () {  
		var xhr = null;
	    try {  
	        xhr = new ActiveXObject("Msxml2.XMLHTTP");//IE高版本创建XMLHTTP  
	    }  
	    catch(E) {  
	        try {  
	            xhr = new ActiveXObject("Microsoft.XMLHTTP");//IE低版本创建XMLHTTP  
	        }  
	        catch(E) {  
	            xhr = new XMLHttpRequest();//兼容非IE浏览器，直接创建XMLHTTP对象  
	        }  
	    }  
	  return xhr;
	}();
	var parseData = function(data){
		if(!data) return {};	
		if(typeof data != 'object'){
			try{
				data = JSON.parse(data);
			}catch(e){
				data = eval("("+data+")");
			}
		}
		return data;
	};
	var isEmptyObject = function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	};
	return the = {
	 	request : function(){
			var url = arguments[0].url || null;  
			var dataType = arguments[0].dataType || 'text'; 
			var type = arguments[0].type || 'post'; 
			var async = arguments[0].async || true;
			var callback = arguments[0].callback || null;
			var data = arguments[0].data || null;

			if(!url) return null;
			data = parseData(data);
			if(type.toLowerCase() === 'get'){
				if(!isEmptyObject(data)){					
					url += url.indexOf('?') == -1 ? '?' : '&';
					for(var o in data){
						url += o + "=" + data[o] + '&';
					}
					url = url.substring(0, url.length-1);
				}
				var sendData = null;
				XMLHttpReq.open(type, url, async); 
			}else{
	    		XMLHttpReq.open(type, url, async); 
				XMLHttpReq.setRequestHeader("Content-type","application/x-www-form-urlencoded");
				if(!isEmptyObject(data)){
					var sendData = '';
					for(var o in data){
						sendData += o + "=" + data[o] + '&';  
					}
					sendData = sendData.substring(0, sendData.length - 1);
				}else{
					var sendData = null;
				}
			}
			XMLHttpReq.send(sendData);         
		    XMLHttpReq.onreadystatechange = function(){				//指定响应函数 
		    	if (XMLHttpReq.readyState == 4) {  
			        if (XMLHttpReq.status == 200) { 
			        	switch(dataType.toLowerCase()){
			        		case 'json' :
			        			var res = XMLHttpReq.responseText;
			        			res = JSON.parse(res);
			        			break;
			        		case 'xml' :
			        			var res = XMLHttpReq.responseXML;	
			        			break;
			        		default :
			        			var res = XMLHttpReq.responseText;
			        	}
			 			if(callback){
			 				callback(res);
			 			}
			        }  
		    	} 
		    };
		}
	}

}();