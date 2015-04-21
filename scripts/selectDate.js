//将当鼠标移动到上个月或下个月的任何一天上时，去除当前的半透明效果
function displayLastMonth(num, nodeUl){
	//var nodeUl = document.getElementById("node");
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

//当点击某一天时，改变li的样式

