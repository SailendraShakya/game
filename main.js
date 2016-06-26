"use strick";

$(document).ready(function(){
	var levelIndicator = 10;
	var level = 1;
	var width = 600;
	var height = 500;
	var speed = 4;
	var bird;
	var bgImage = 'bird.gif';
	var birdLeft = 200;
	var birdTop = 200;
	var birdWidth = 50;
	var birdHeight = 50;
	var bgPosition = 0;
	var gameOver = false;
	var pipes = [];
	var pipePositions = [[0,100,250,250],[0,200,350,150],[0,300,450,50]];
	var innerScreen = $('#inner-screen');
	innerScreen.html('<div id="start" class="initial">Start</div>');

	$(document).on('click','#start',game);
	$(document).on('click','#restart',function(){
		location.reload();
	});

	$('#mode').change(function(){
		// $('#inner-screen').css('background':url(this.value));
	});

	function game() {
		makeBird();
		setInterval(gameLoop, 50);
	}

	function makeBird() {
		bird = $("<img>");
		bird.attr('src','bird.gif').addClass('bird').css({'left':birdLeft+'px','top':birdTop+'px'});
		innerScreen.html(bird);
		window.onkeyup = flap;
	}

	function flap() {
		if (gameOver) {
			return;
		}
		birdTop -= 50;
		birdTop = (birdTop < 0) ? 0 : birdTop;
		bird.css('top',birdTop+'px');
	}

	function gameLoop() {
		if (gameOver) {
			return;
		}
		moveBg();
		gravity();
		movePipes();
		if (bgPosition % 200 == 0) {
			makePipes();
		}
		$('#score').html(pipes.length);
		if(pipes.length > levelIndicator){
			level +=1;
			levelIndicator += 10;
			$('#level').html(level);
		}
	}

	function moveBg() {
		bgPosition -= speed;
		innerScreen.css('marginLeft',bgPosition+"px");
	}

	function gravity() {
		birdTop += 5;
		bird.css('top',birdTop+"px");
		if (birdTop+birdHeight >= height) {
			gameIsOver()
		}
	}

	function gameIsOver() {
		gameOver = true;
		// speed = 0;
		$('#screen').html('').html('<div class="initial"><span class="gameover">Game Over</span><a id="restart" href="javascript:void(0);">Goto Menu</a></div>');
	}

	function getRandom(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function makePipes() {
		var pipeWidth = 30;
		var pp = pipePositions[getRandom(0,2)];
		var top1 = pp[0];
		var top2 = pp[2];
		var height1 = pp[1];
		var height2 = pp[3];
		var firstPipe = $('<img>');
		firstPipe.attr('src','pipeDown.png').css({'position':'absolute','top':top1+'px','height':height1+'px','left':width-pipeWidth+'px'})
		.attr({'data-top':top1,'data-left':width,'data-width':pipeWidth,'data-height':height1,'width':'50px'});
		var secondPipe = $('<img>');
		secondPipe.attr('src','pipeUp.png').css({'position':'absolute','top':top2+'px','height':height2+'px','left':width-pipeWidth+'px'})
		.attr({'data-top':top2,'data-left':width,'data-width':pipeWidth,'data-height':height2,'width':'50px'});
		innerScreen.append(firstPipe).append(secondPipe);
		pipes.push(firstPipe);
		pipes.push(secondPipe);
	}


	function movePipes() {
		if (gameOver) {
			return;
		}

		for (var i=0; i<pipes.length; i++) {
			var pipe = pipes[i];
			var pipeTop = +pipe.data("top");
			var pipeLeft = +pipe.data("left");
			var pipeHeight = +pipe.data("height");
			var pipeWidth = +pipe.data("width");
			console.log(pipeLeft);
			pipeLeft = pipeLeft - speed;
			console.log(pipeLeft);	
			pipe.data("left", pipeLeft).css('left',pipeLeft+'px');
			
			if ((birdLeft+birdWidth) >= pipeLeft && birdLeft < pipeLeft+pipeWidth){
				if ((birdTop+birdHeight) > pipeTop && birdTop < pipeTop+pipeHeight){
					gameIsOver();
				}
			}
		}
	}

});