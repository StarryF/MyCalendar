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
		setTimeout("getTimeNow()",1000);	//每秒加载一次getTimeNow函数		
	};

	function updateCalendar(year, month){
		//显示年份
		document.getElementById("yeardrop").innerHTML = year;
		//显示月份
		document.getElementById("monthnow").innerHTML = month;
		document.getElementById("monthdrop").innerHTML = month;

		$("#lastmonthul li").remove();
		$("#recentmonthul li").remove();
		$("#nextmonthul li").remove();

		var monthLen = getMonthLength(year, month);//当前月份的天数
		var lastMonthLen = getMonthLength(year, month-1);//上个月的最后一天
		var firstDayWeek = getFirstDay(year, month);//当前月份第一天是星期几

		//将上个月最后几天添加到日历中去
		var lastMonthUl = document.getElementById("lastmonthul");
		displayMonth(firstDayWeek, lastMonthLen, lastMonthUl);
		//removeAllChild(lastMonthUl);

		var recentMonthUl = document.getElementById("recentmonthul");
		displayMonth(monthLen, monthLen, recentMonthUl);
		//removeAllChild(recentMonthUl);

		var nextMonthUl = document.getElementById("nextmonthul");
		var nextMonthDays1 = 35 - monthLen - firstDayWeek;
		var nextMonthDays2 = 42 - monthLen - firstDayWeek;
		if ((firstDayWeek+monthLen)< 35) {
			displayMonth(nextMonthDays1, nextMonthDays1, nextMonthUl);
			displayLastMonth(nextMonthDays1, nextMonthUl);
			//removeAllChild(nextMonthUl);
		}else{
			displayMonth(nextMonthDays2, nextMonthDays2, nextMonthUl);
			displayLastMonth(nextMonthDays2, nextMonthUl);
			//removeAllChild(nextMonthUl);
		}
	}

	function getDateNow(){
		var today = new Date();
		var year = today.getFullYear();	//年
		var month = today.getMonth() + 1;		//月 1-12
		var day = today.getDate();	//日


		//显示年份
		document.getElementById("yeardrop").innerHTML = year;
		//显示月份
		document.getElementById("monthnow").innerHTML = "Apr.";
		var monthLen = getMonthLength(year, month);//当前月份的天数
		var lastMonthLen = getMonthLength(year, month-1);//上个月的最后一天
		var firstDayWeek = getFirstDay(year, month);//当前月份第一天是星期几
		//将上个月最后几天添加到日历中去
		var lastMonthUl = document.getElementById("lastmonthul");
		displayMonth(firstDayWeek, lastMonthLen, lastMonthUl);
		var recentMonthUl = document.getElementById("recentmonthul");
		displayMonth(monthLen, monthLen, recentMonthUl);
		var nextMonthUl = document.getElementById("nextmonthul");
		var nextMonthDays1 = 35 - monthLen - firstDayWeek;
		var nextMonthDays2 = 42 - monthLen - firstDayWeek;
		if ((firstDayWeek+monthLen)< 35) {
			displayMonth(nextMonthDays1, nextMonthDays1, nextMonthUl);
			displayLastMonth(nextMonthDays1, nextMonthUl);
		}else{
			displayMonth(nextMonthDays2, nextMonthDays2, nextMonthUl);
			displayLastMonth(nextMonthDays2, nextMonthUl);
		}
		
		displayToday(day);
		//displayWorkDay();
		//鼠标移动到上个月的几天，取出半透明效果
		displayLastMonth(firstDayWeek, lastMonthUl);
		//鼠标点击年份
		var clickYear = document.getElementById("yeardrop");
		var yearList = document.getElementById("yearlist");
		dispalyYearList(clickYear, yearList, year);

		//鼠标点击月份
		var clickMonth = document.getElementById("monthdrop");
		var monthList = document.getElementById("monthlistul");
		displayMonthList(clickMonth, monthList);

		//移动过去改变li样式
		var recentMonthList = document.getElementById("recentmonthul").getElementsByTagName("li");
		displayFocusDay(lastMonthUl.getElementsByTagName("li"));
		displayFocusDay(recentMonthList);
		displayFocusDay(nextMonthUl.getElementsByTagName("li"));

		//当点击某一天时，改变样式
		$("#recentmonthul li").click(function(){
			$(this).addClass('selectday').siblings('li').removeClass('selectday');
		});

		//点击箭头
		
		var leftArrow = document.getElementsByClassName("larrow");
		var rightArrow = document.getElementsByClassName("arrow");
		var yearDrop = document.getElementById("yeardrop");
		clickArrow(leftArrow, yearDrop, -1);
		clickArrow(rightArrow, yearDrop, 1);

		//点击不同月份或年份
		$(".alistof li a").click(function(){
			var x = ($(this).text());
			updateCalendar(2015, x);
		});

		$(".today").click(function(){
			$("#calendarul").getDateNow();
		});

	};

	//显示不同的月份(年份或月份)
	function displayDiffMonth(num){
		var y = $("#yeardrop").text();


		
	};


	function removeAllChild(nodeUl){
		for (var i = nodeUl.length; i > 0 ; i--) {
			nodeUl.removeChild(nodeUl[i]);
		};

		alert("ok");
	}

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
			span.innerHTML = len-i+1;
			node.appendChild(li);
		}
	};


	//在日历上显示当前日期
	function displayToday(num){
		var nowMonth = document.getElementById("recentmonthul");
		var nowDate = nowMonth.getElementsByTagName("li");
		nowDate[num-1].style.color = "white";
		nowDate[num-1].style.background = "#9FEE00";
	}

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

//addLoadEvent(getMonthLength);
addLoadEvent(getTimeNow);
addLoadEvent(getDateNow);
