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
            XMLHttpReq.onreadystatechange = function(){             //指定响应函数 
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

var zxj = {

    apps:{
        tabSwitch:function(){
            var doc = document;
            var oLi = doc.getElementById("zxj-list").getElementsByTagName('li');
            var i,
                len=oLi.length;
            var z0 = doc.getElementById('zxj-pan-0');
            var z1 = doc.getElementById('zxj-pan-1');
            var z2 = doc.getElementById('zxj-pan-2');
            var z3 = doc.getElementById('zxj-pan-3');
            var z4 = doc.getElementById('zxj-pan-4');
            var htmlstr = '';
            for( i = 0;i < len;i++ ){
                oLi[i].index = i ;
                oLi[i].onclick = function(ev){
                    //请求数据并添加DOM
                    switch(this.index){
                        case 0:
                        default:
                            ajax.request({
                                url:'../backend/restAPI.php?category=person',
                                type:'get',
                                callback:function(r){
                                    console.log(r);
                                    var zxjdata0 = JSON.parse(r); 
                                    for(var i=0,len=zxjdata0.data.length; i<len; i++){

                                      htmlstr += "<div class='item'><div class='note checked'><b>"+zxjdata0.data[i]['content']+"</b><span id='itemdate'>6月5日 19:00</span></div><div class='checks'></div><div class='incheck  checked'></div><div class='icons'><div class='star'></div><div class='dustbin'></div><div class='pencil'></div></div></div>";
                                    }
                                    z0.innerHTML = htmlstr;
                                    htmlstr = "";
                                    // DO DOM
                                }
                            });
                            break;
                        case 1:
                            ajax.request({
                                url:'../backend/restAPI.php?category=work',
                                type:'get',
                                callback:function(r){
                                    console.log(r);
                                    var zxjdata1 = JSON.parse(r); 
                                    for(var i=0,len=zxjdata1.data.length; i<len; i++){

                                      htmlstr += "<div class='item'><div class='note checked'><b>"+zxjdata1.data[i]['content']+"</b><span id='itemdate'>6月5日 19:00</span></div><div class='checks'></div><div class='incheck  checked'></div><div class='icons'><div class='star'></div><div class='dustbin'></div><div class='pencil'></div></div></div>";
                                    }
                                    z1.innerHTML = htmlstr;
                                    htmlstr ="";
                                    // DO DOM
                                }
                            });
                            break;
                        case 2:
                            ajax.request({
                                url:'../backend/restAPI.php?category=otherthing',
                                type:'get',
                                callback:function(r){
                                    console.log(r);
                                    var zxjdata2 = JSON.parse(r); 
                                    for(var i=0,len=zxjdata2.data.length; i<len; i++){

                                      htmlstr += "<div class='item'><div class='note checked'><b>"+zxjdata2.data[i]['content']+"</b><span id='itemdate'>6月5日 19:00</span></div><div class='checks'></div><div class='incheck  checked'></div><div class='icons'><div class='star'></div><div class='dustbin'></div><div class='pencil'></div></div></div>";
                                    }
                                    z2.innerHTML = htmlstr;
                                    htmlstr = "";
                                    // DO DOM
                                }
                            });
                            break;
                        case 3:
                            ajax.request({
                                url:'../backend/restAPI.php?category=shopping',
                                type:'get',
                                callback:function(r){
                                    var zxjdata3 = JSON.parse(r);
                                    console.log(zxjdata3); 
                                    for(var i=0,len=zxjdata3.data.length; i<len; i++){

                                      htmlstr += "<div class='item'><div class='note'><b>"+zxjdata3.data[i]['content']+"</b><span id='itemdate'>6月5日 19:00</span></div><div class='checks'></div><div class='incheck'></div><div class='icons'><div class='star'></div><div class='dustbin'></div><div class='pencil'></div></div></div>";
                                    }
                                    z3.innerHTML = htmlstr;
                                    htmlstr = "";
                                    // DO DOM
                                }
                            });
                            break;
                        case 4:
                            ajax.request({
                                url:'../backend/restAPI.php?category=all',
                                type:'get',
                                callback:function(r){
                                    console.log(r);
                                    var zxjdata4 = JSON.parse(r); 
                                    for(var i=0,len=zxjdata4.data.length; i<len; i++){

                                      htmlstr += "<div class='item'><div class='note'><b>"+zxjdata4.data[i]['content']+"</b><span id='itemdate'>6月5日 19:00</span></div><div class='checks'></div><div class='incheck'></div><div class='icons'><div class='star'></div><div class='dustbin'></div><div class='pencil'></div></div></div>";
                                    }
                                    z4.innerHTML = htmlstr;
                                    htmlstr = "";
                                    // DO DOM
                                }
                            });
                            break;
                    }
                    for(var j=0;j<len;j++){
                        console.log(oLi);
                        oLi[j].className = " ";
                    }
                    this.className = "active";
                };
            }
        },
        
    }
};

window.onload = function(){
    zxj.apps.tabSwitch();
    var doc = document;
    var z0 = doc.getElementById('zxj-pan-0');
    var htmlstr="";
    ajax.request({
                                url:'../backend/restAPI.php?category=person',
                                type:'get',
                                callback:function(r){
                                    var zxjdata0 = JSON.parse(r); 
                                    console.log(zxjdata0);
                                    for(var i=0,len=zxjdata0.data.length; i<len; i++){

                                      htmlstr += "<div class='item'><div class='note checked'><b>"+zxjdata0.data[i]['content']+"</b><span id='itemdate'>6月5日 19:00</span></div><div class='checks'></div><div class='incheck  checked'></div><div class='icons'><div class='star'></div><div class='dustbin'></div><div class='pencil'></div></div></div>";
                                    }
                                    z0.innerHTML = htmlstr;
                                    htmlstr = "";
                                    // DO DOM
                                }
                            });
}


