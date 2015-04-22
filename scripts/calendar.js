var calendar = {
	clist: null,	//初始化显示日历的列表
	year: null,
	month: null,

	//获得year年month月的第一天是星期几
	getFirstDay:function(year,month){
		var firstDay = new Date(year, month, 1);//
		return firstDay.getDay();
	},
	
	//获得year年month月的总天数
	getMonthLength:function(year, month){
		var nextMonth = new Date(year, month);
		nextMonth.setHours(nextMonth.getHours() - 3);
		monthLen = nextMonth.getDate();
		return nextMonth.getDate();
	},

	//创建日历
	createCalendar:function(clist, date){
		calendar.year = date.getFullYear();	//获得年份
		calendar.month = date.getMonth();	//获得月份
		document.getElementById("yeardrop").innerHTML = calendar.year;
		document.getElementById("monthnow").innerHTML = calendar.month+1 + "月";
		calendar.clearCalendar(clist);

		var lastMonthLen = calendar.getMonthLength(calendar.year, calendar.month-1);
		var monthLen = calendar.getMonthLength(calendar.year, calendar.month);
		var firstDay = calendar.getFirstDay(calendar.year, calendar.month);
		var next1 = 35 - monthLen - firstDay;
		var next2 = 42 - monthLen - firstDay;

		var lastMonthUl = document.getElementById("lastmonthul");
		var recentMonthUl = document.getElementById("recentmonthul");
		var nextMonthUl = document.getElementById("nextmonthul");
		//将新的值写入到日历中
		calendar.displayMonth(firstDay,lastMonthLen,lastMonthUl);
		calendar.displayMonth(monthLen, monthLen, recentMonthUl);
		calendar.displayOtherMonth(firstDay, lastMonthUl);
		if ((firstDay+monthLen)< 35) {
			calendar.displayMonth(next1, next1, nextMonthUl);
			calendar.displayOtherMonth(next1, nextMonthUl);
		}else{
			calendar.displayMonth(next2, next2, nextMonthUl);
			calendar.displayOtherMonth(next2, nextMonthUl);
		}
	},

	//清空日历
	clearCalendar:function(list){

	},

	//主方法
	init:function(list){
		calendar.createCalendar(list, new Date(calendar.year, calendar.month, 1));
		//左年键，减去一年，重绘日历
		$("#lastyear").click(function(){
			calendar.createCalendar(list, new Date(calendar.year-1, calendar.month, 1));
		});
		//右年键，加上一年，重绘日历
		$("#nextyear").click(function(){
			calendar.createCalendar(list, new Date(calendar.year+1, calendar.month, 1));
		});
		//左月键，减去一月，重绘日历
		$("#lastmonth").click(function(){
			calendar.createCalendar(list, new Date(calendar.year, calendar.month-1, 1));
		});
		//右月键，加上一月，重绘日历
		$("#nextmonth").click(function(){
			calendar.createCalendar(list, new Date(calendar.year, calendar.month+1, 1));
		});
	},

	/*辅助方法一：显示年列表
	  node: 被点击的节点
	  num: 当前年份
	  nodeUl： 显示列表的父节点
	*/
	displayYearList:function(node, nodeUl, num){
		node.onclick = function(){
			for (var i = num - 10; i < num + 10; i++) {
				var li = document.createElement("li");
				var a = document.createElement("a");
				a.class= "clickthisyear";
				a.href = "#"
				var text = document.createTextNode(i);

				a.appendChild(text);
				li.appendChild(a);
				nodeUl.appendChild(li);
			}	
			nodeUl.style.display = "block";

			nodeUl.onmouseover = function(){
				nodeUl.style.display = "block";
			}
		};
		nodeUl.onmouseout = function(){
			nodeUl.style.display = "none";
		}
	},

	//辅助方法二：显示月份列表
	displayMonthList:function(node, nodeUl){
		node.onclick = function(){
			nodeUl.style.display = "block";
		};
		nodeUl.onmouseover = function(){
			nodeUl.style.display = "block";
		};
		nodeUl.onmouseout = function(){
			nodeUl.style.display = "none";
		};
	},

	//辅助方法三：显示上个月的最后几天，或者下个月的最初几天
	displayOtherMonth:function(num, nodeUl){
		var nodeLi = nodeUl.getElementsByTagName("li");
		nodeUl.onmouseover = function(){
			for (var i = 0; i < num; i++) {
				nodeLi[i].style.opacity = "1";
			};
		};
		nodeUl.onmouseout = function(){
			for (var i = 0; i < num; i++) {
				nodeLi[i].style.opacity = ".4";
			};
		}
	},

	//辅助方法四：显示月份
	displayMonth:function(num, len, node){
		for (var i = num; i > 0; i--){
			var li = document.createElement("li");
			var span = document.createElement("span");
			li.appendChild(span);
			span.innerHTML = len-i+1;
			node.appendChild(li);
		}
	},
}

function myCalendar(){
	var calendars = document.getElementById("calendar");

	calendar.init(calendars);

	//displayToday(new Date().getDay());
	displayWorkDay();
	//移动到某一天上，改变样式
	$("#lastmonthul li, #recentmonthul li, #nextmonthul li").mouseover(function(){
		$(this).css("fontWeight","bold").mouseout(function(){
			$(this).css("fontWeight","none");
		});
	});
	//点击某一天，改变样式
}

//获得时间
function getTimeNow(){
	var today = new Date();
	var hour = today.getHours();	//时
	var minute = today.getMinutes();	//分
	var second = today.getSeconds();	//秒
	var weekday = today.getDay();	//星期0-6
	//让时分秒以两位数字的方式显示
	hour = checkTime(hour);
	minute = checkTime(minute);
	second = checkTime(second);		
	document.getElementById("timenow").innerHTML = hour + ":" + minute + ":" + second;
	setTimeout("getTimeNow()",1000);	//每秒加载一次getTimeNow函数		
};

function checkTime(i){
	if(i < 10){
		return "0" + i;
	}else{
		return i;
	}
};

//显示今天
/*function displayToday(num){
	var nowMonth = document.getElementById("recentmonthul");
	var nowDate = nowMonth.getElementsByTagName("li");
	nowDate[num-1].style.color = "white";
	nowDate[num-1].style.background = "#9FEE00";
}
*/
//在日历上区分工作日和休息日
function displayWorkDay(){
	var allDates = document.getElementById("weekday");
	var weekdays = allDates.getElementsByTagName("span");
	for (var i = 0; i < weekdays.length; i++) {
		if(i%7 == 0 || i%7 == 6){
			weekdays[i].style.color = "#FF7300";
			//weekdays[i].style.backgroundColor = "#9FEE00";
		}
	};
}

addLoadEvent(getTimeNow);
addLoadEvent(myCalendar);