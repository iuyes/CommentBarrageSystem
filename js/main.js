// Danmu
this.danmu = this.danmu || {};

(function(){

	/**
	 * 动画配置参数
	 **/	
	danmu.FPS = 60;					// 动画帧率


	/**
	 * 初始化道具配置参数
	 **/

	/**
	 * 根据指定参数创建一个弹幕对象
	 * @text 	{object}	弹幕文本
	 * @styl 	{object}	弹幕样式
	 * @pos 	{object}	弹幕位置
	 * @return dm对象
	 **/
	danmu.drawDanmu = function(text, styl, posY) {

		if(!text) return;

		var dm = {},

			_styl = {
				color: '#fff',
				alpha: 1,
				scale: 1,
				font: '16px Microsoft Yahei'
			},

			_posY = 0;

		styl = $.extend({}, _styl, styl);
		posY = posY || _posY;

		dm = new createjs.Text(text, styl.font, styl.color);

		dm.y = posY;

		return dm;

	}


})();

$(function(){


	createjs.Ticker.setFPS(danmu.FPS);

	danmu.timer = 0,

	danmu.queue = [],

	danmu.size = 0;

	danmu.textMeasure = document.getElementById('cbs_Text');

	var stage = new createjs.Stage('cbs_Stage');

	createjs.Ticker.addEventListener('tick', stage);

	createjs.Ticker.addEventListener('tick', danmuProcesser);


	// 模拟广播触发弹幕事件
	var interval = null;

	$('#send').click(function(e){

		if( interval ) clearInterval(interval);
		var time = parseInt( $('input[type="text"]').val() );
		interval = setInterval(function(){
			var i1 = Math.floor(Math.random()*10),
				i2 = Math.floor(Math.random()*10),
				i3 = Math.floor(Math.random()*10);

			sendDamu(i1,i2,i3, {posY: 20});
			sendDamu(i1,i2,i3, {posY: 20});
			sendDamu(i1,i2,i3, {posY: 40});
			sendDamu(i1,i2,i3, {posY: 60});
			sendDamu(i1,i2,i3, {posY: 80});
			sendDamu(i1,i2,i3, {posY: 100});
			sendDamu(i1,i2,i3, {posY: 120});
			sendDamu(i1,i2,i3, {posY: 140});
			sendDamu(i1,i2,i3, {posY: 160});
			sendDamu(i1,i2,i3, {posY: 180});
			sendDamu(i1,i2,i3, {posY: 200});
			sendDamu(i1,i2,i3, {posY: 220});
			sendDamu(i1,i2,i3, {posY: 240});
			sendDamu(i1,i2,i3, {posY: 260});
			sendDamu(i1,i2,i3, {posY: 280});
			sendDamu(i1,i2,i3, {posY: 300});
			sendDamu(i1,i2,i3, {posY: 320});
			sendDamu(i1,i2,i3, {posY: 340});
			sendDamu(i1,i2,i3, {posY: 360});
			sendDamu(i1,i2,i3, {posY: 380});
			sendDamu(i1,i2,i3, {posY: 400});
			sendDamu(i1,i2,i3, {posY: 420});
			sendDamu(i1,i2,i3, {posY: 440});
			sendDamu(i1,i2,i3, {posY: 460});

		}, time);

//		sendDamu();

	});

	$('#stop').click(function(e) {
		clearInterval(interval);
	});

	// 弹幕发送事件
	function sendDamu(r,g,b, opt) {

		var text = '这是一个测试弹幕' + Math.random()*1000,
			styl = { color: '#' + r + g + b},
			posY = opt.posY;
			newDm = danmu.drawDanmu(text,styl,posY);

		danmu.queue.push(newDm);

		danmu.size++;

	}

	// 弹幕队列管理
	function danmuProcesser() {

		if( (danmu.size > 1 && danmu.timer >= 10) || danmu.size >= 100 ) {

			var container = new createjs.Container();

			for( var i = 0; i < danmu.size; i++ )
				container.addChild(danmu.queue[i]);

			container.x = 880;

			container.cache(0, 0, 880, 500);

			stage.addChild(container);

			createjs.Tween.get(container)
				.to({x: -400}, 5000)
				.call(function(child){
					// console.log(stage.children.length);
					stage.removeChild(child);
			}, [container]);

			danmu.queue = [];

			danmu.timer = 0;

			danmu.size = 0;

			return;
		}
		danmu.timer++;
	}

});
