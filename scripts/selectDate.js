/*当点击年份时显示年份选择框
  node: 被点击的节点
  num：当前的年份
*/
function dispalyYearList(node, nodeUl, num){
	node.onclick = function(){
		for (var i = num - 50; i < num + 50; i++) {
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
};

//当点击月份时显示月份选择框
function displayMonthList(node, nodeUl){
	node.onclick = function(){
		nodeUl.style.display = "block";
	};
	nodeUl.onmouseover = function(){
		nodeUl.style.display = "block";
	};
	nodeUl.onmouseout = function(){
		nodeUl.style.display = "none";
	};
};


/*当点击左右按钮时，数字加1，并改变日历的显示
  node：箭头元素
  num: 需要改变的数字
  bool：-1表示左箭头，0，表示数字，1表示右箭头
*/
function clickArrow(nodeUl, node, bool){
	var x = node.innerHTML;
	for (var i = 0; i < nodeUl.length; i++) {	
		nodeUl[i].onclick = function(){
			switch (bool){
				case -1:
					node.innerHTML = x--;
					break;
				case 0:
					num;
					break;
				case 1:
					node.innerHTML = x++;
					break;
			}
		}
	}
}


//将当鼠标移动到上个月或下个月的任何一天上时，去除当前的半透明效果
function displayLastMonth(num, nodeUl){
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
};

/*当鼠标移动到某一天上，改变li的样式
  nodeUl: li s
*/
function displayFocusDay(nodeUl){
	for (var i = 0; i < nodeUl.length; i++) {
		nodeUl[i].onmouseover = function(){
			this.style.fontWeight = "bold";
		}
		nodeUl[i].onmouseout = function(){
			this.style.fontWeight = "normal";
		}
	};
}

