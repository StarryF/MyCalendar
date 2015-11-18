addLoadEvent = function(func){
	var oldonload = window.onload;
	if(typeof window.onload != 'function')
		window.onload = func;
	else{
		window.onload = function(){
			oldonload();
			func();
		}
	}
};

setCss = function(_this, cssOption){//设置元素样式
    //判断节点类型
    if ( !_this || _this.nodeType === 3 || _this.nodeType === 8 || !_this.style ) {
        return;
    }
    for(var cs in cssOption){//遍历设置所有样式
        _this.style[cs] = cssOption[cs];
    }
    return _this;
};