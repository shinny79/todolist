
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


