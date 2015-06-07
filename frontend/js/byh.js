var byh=function(){};

byh.addButton=document.getElementsByClassName("add")[0].getElementsByTagName("a")[0];

//添加按钮事件
byh.addButton.addEventListener("click", function(){
	//检测添加框是否已经有内容
	var addInput=document.getElementsByClassName("addinput")[0];
	if(addInput.value===""){
		addInput.placeholder="请填写任务的内容";
		return;
	}
	//显示mask
	var mask=document.getElementsByClassName("mask")[0];
	mask.style.visibility="visible";
	
}, false);


//检测时间
byh.checkTime=function(){
	var nowDate=new Date();
	if(nowDate.getSeconds()>=58||nowDate.getSeconds()<=2){
		byh.getTime();
	}
}

setInterval(byh.checkTime, 1000);

//更新时间
byh.getTime=function(){
	var monthStr,dateStr,apm,hour,min,weekday,nowDate=new Date();
	//月份
	switch(nowDate.getMonth()){
		case 0:
			monthStr="Jan";
			break;
		case 1:
			monthStr="Feb";
			break;
		case 2:
			monthStr="Mar";
			break;
		case 3:
			monthStr="Apr";
			break;
		case 4:
			monthStr="May";
			break;
		case 5:
			monthStr="Jun";
			break;
		case 6:
			monthStr="Jul";
			break;
		case 7:
			monthStr="Aug";
			break;
		case 8:
			monthStr="Sep";
			break;
		case 9:
			monthStr="Oct";
			break;
		case 10:
			monthStr="Nov";
			break;
		case 11:
			monthStr="Dec";
			break;
		default:
			monthStr="";
	}
	document.getElementById("byh-month").innerHTML=monthStr;
	//日期
	document.getElementById("byh-day").innerHTML=nowDate.getDate();
	//星期几
	switch(nowDate.getDay()){
		case 0:
			weekday="Sun";
			break;
		case 1:
			weekday="Mon";
			break;
		case 2:
			weekday="Tue";
			break;
		case 3:
			weekday="Wed";
			break;
		case 4:
			weekday="Thu";
			break;
		case 5:
			weekday="Fri";
			break;
		case 6:
			weekday="Sat";
			break;
		default:
			weekday="";
	}
	document.getElementById("byh-weekday").innerHTML=weekday;
	//时分
	hour=nowDate.getHours();
	if(hour>=12){
		hour-=12;
		apm="PM";
	}
	else{
		apm="AM";
	}
	document.getElementById("byh-apm").innerHTML=apm;
	min=nowDate.getMinutes();
	if(hour<10){
		hour="0"+hour;
	}
	if(min<10){
		min="0"+min;
	}
	document.getElementById("byh-time").innerHTML=hour+":"+min;
};
byh.getTime();

//为check添加事件
byh.changeChosenState=function(){
	var span=this.getElementsByTagName("span")[0];
	if(span.className==="checked"){
		span.className="";
	}
	else{
		//取消其他
		var checkboxs=document.getElementsByClassName("byh-add");
		for (var i = 0; i < checkboxs.length; i++) {
			checkboxs[i].getElementsByTagName("span")[0].className="";
		};
		span.className="checked";
	}
}

document.getElementById("byh-add-personal").addEventListener("click", byh.changeChosenState, false);
document.getElementById("byh-add-work").addEventListener("click", byh.changeChosenState, false);
document.getElementById("byh-add-others").addEventListener("click", byh.changeChosenState, false);
document.getElementById("byh-add-shopping").addEventListener("click", byh.changeChosenState, false);

//将datetime-local转化为Date
byh.dateConvert=function(str){
	if(typeof str!="string"){
		return null;
	}
	var dt=str.match(/^(\d{1.4})(-|\/|[]|[.])(\d{1.2})\2(\d{1,2})$/);
	var newdate=new Date();
	if(dt==null){
		return null;
	}
	var y,m,d;
	y=parseInt(dt[1],10);
	m=parseInt(dt[2],10);
	d=parseInt(dt[3],10);
	if(m>12 || m<0){
		return null;
	}
	if(d>0){
		newdate.setFullYear(y);
		newdate.setDate(d);
		newdate.setMonth(m);  
		return newdate;
	}
	else{
		return null;
	} 
}

//发布任务
byh.addTargetCallback=function(data){
	// location.reload(true);
	console.log(data);
}

//查询天气
byh.setWeather=function(data){
	var weather=JSON.parse(data);
	console.log(weather);
	alert(weather.data.temp);
}

byh.ajaxRequst=function(method,url,data,callback){
	var xmlhttp;
	console.log(window.XMLHttpRequest);
	if (window.XMLHttpRequest)
	{
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	}
	else
	{
		// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4 && xmlhttp.status==200){	
			callback(xmlhttp.responseText);
		}
	}
	xmlhttp.open(method,url,false);
	xmlhttp.send(data);
}

//发布事件
document.getElementById("byh-submittask").addEventListener("click", function(){
	//检查是否填写时间
	// if(!document.getElementById("byh-datetime").value){
	// 	document.getElementById("byh-input-notice").innerHTML="请填写时间哦";
	// }
	// else{
	// 	var date=new Date();
	// 	var tempTime=document.getElementById("byh-datetime").value.split("-");
	// 	date.setYear(tempTime[0]);
		
	// 	var tempTime2=tempTime[2].split("T");
	// 	date.setMonth(tempTime[1],tempTime2[0]);
	// 	var tempTime3=tempTime2[1].split(":");
	// 	date.setHours(tempTime3[0],tempTime3[1]);
	// 	var mtime=date.getTime();
	// 	//组装数据
	// 	var mcontext=document.getElementById("byh-input-add-task").value;
	// 	var checkboxs=document.getElementsByClassName("byh-add");
	// 	var mcategory="";
	// 	for (var i = 0; i < checkboxs.length; i++) {
	// 		if(checkboxs[i].getElementsByTagName("span")[0].className==="checked"){
	// 			// switch(i){
	// 			// 	case 0:
	// 			// 		mcategory="person";
	// 			// 		break;
	// 			// 	case 1:
	// 			// 		mcategory="work";
	// 			// 		break;
	// 			// 	case 2:
	// 			// 		mcategory="others";
	// 			// 		break;
	// 			// 	case 3:
	// 			// 		mcategory="shopping";
	// 			// 		break;
	// 			// }
	// 			mcategory=i;
	// 			break;
	// 		}
	// 	};
	// 	var data = '{"assign": [{"context": "'+mcontext+'","category": '+mcategory+',"end_time" : '+mtime+'}]}';
		var data='{"assign": [{"context": "加一个","category": 1,"end_time" : 12345678912}]}';
		byh.ajaxRequst('POST',"../backend/restAPI.php",data,byh.addTargetCallback);
		// ajax.request({
		// 	url:'../backend/restAPI.php',
		// 	data:{
		// 		context:mcontext,
		// 		category:mcategory,
		// 		end_time:mtime
		// 	},
		// 	//type:'get',
		// 	callback:function(r){
		// 		console.log(r);
		// 	}
		// });
		// byh.sendAsynchronRequest("../backend/restAPI.php",param,byh.addTargetCallback);
	//}
	
}, false);

byh.getWeather=function(){
	byh.ajaxRequst("GET","../backend/restAPI.php?weather=1",null,byh.setWeather);
}



//zy 添加item勾选事件
var item=document.getElementsByClassName("incheck").length;

for(var i=0;i<item;i++){
	document.getElementsByClassName("incheck").item(i).addEventListener("click",showcheck);
	
	function showcheck(){
		if(this.parentNode.className=="item"){
			this.parentNode.setAttribute("class", "checked item"); 
		}else{
			this.parentNode.setAttribute("class", "item"); 
		}
	}
}