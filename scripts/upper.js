	function getTimeNow(){
		var today = new Date();
		var year = today.getFullYear();	//年
		var month = today.getMonth() + 1;		//月 1-12
		var day = today.getDate();	//日
		var hour = today.getHours();	//时
		var minute = today.getMinutes();	//分
		var second = today.getSeconds();	//秒
		var weekday = today.getDay();	//星期0-6
		//让时分秒以两位数字的方式显示
		hour = checkTime(hour);
		minute = checkTime(minute);
		second = checkTime(second);		
		document.getElementById("timenow").innerHTML = hour + ":" + minute + ":" + second;
		//setTimeout("getTimeNow()",1000);	//每秒加载一次getTimeNow函数
		
		var monthLen = getMonthLength(year, month);//当前月份的天数
		//alert(monthLen);
		var lastMonthLen = getMonthLength(year, month-1);//上个月的最后一天
		//alert(lastMonthLen);
		var firstDayWeek = getFirstDay(year, month);//当前月份第一天是星期几
		//alert(firstDayWeek);
		//将上个月最后几天添加到日历中去
		var lastMonthUl = document.getElementById("lastmonthul");
		displayMonth(firstDayWeek, lastMonthLen, lastMonthUl);
		var recentMonthUl = document.getElementById("recentmonthul");
		displayMonth(monthLen, monthLen, recentMonthUl);
		var nextMonthUl = document.getElementById("nextmonthul");
		var nextMonthDays = 35 - monthLen - firstDayWeek;
		//alert(nextMonthDays);
		displayMonth(nextMonthDays, nextMonthDays, nextMonthUl);
	};

	function checkTime(i){
		if(i < 10){
			return "0" + i;
		}else{
			return i;
		}
	};

	//获得某个月月一共多少天
	function getMonthLength(year, month){
		//获取下个月的第一天,算出这个月的最后一天，然后通过getDate（）方法获得这个月的天数
		var nextMonth = new Date(year, month);
		nextMonth.setHours(nextMonth.getHours() - 3);
		monthLen = nextMonth.getDate();
		return nextMonth.getDate();
	};
	
	//获得某个月的第一天是星期几
	function getFirstDay(year, month){
		var firstDay = new Date(year, month-1, 1);
		var firstDayWeek = firstDay.getDay();
		return firstDayWeek;
	};

	/*
		获得某个月需要显示的天数
		num: 当前月份需要显示的天数
		len：当前月份的最后一天
		node：需要将这些部分增加到的节点
	*/
	function displayMonth(num, len, node){
		for (var i = num; i > 0; i--) {
			var li = document.createElement("li");
			var span = document.createElement("span");
			li.appendChild(span);
			span.innerHTML = len-i+1 + "号";
			node.appendChild(li);
		}
	};

//addLoadEvent(getMonthLength);
addLoadEvent(getTimeNow);