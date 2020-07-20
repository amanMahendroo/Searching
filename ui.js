$(document).ready(function () {
	let $tutorial = [
		//welcome
		new Hint($(window).width() / 2 - 150, 10, "Welcome to my Pathfinding Visualiser tool. Here you can view how some of the famous pathfinding algorithms work :)"),
		//start-end
		new Hint(10, 100, "Select the start or end nodes with these buttons, then use the arrow keys to move them around to your preference"),
		//algorithms
		new Hint($(window).width() - 500, 100, "You can choose the algorithm to view from this menu"),
		//walls
		new Hint(300, 300, "Best part: Use your mouse to draw walls anywhere you want on the grid!"),
		//reset-play
		new Hint($(window).width() - 350, 100, "Use the reset button to reset *everything* and the play button to view your algorithm!"),
		//have-fun
		new Hint($(window).width() / 2 - 150, 10, "So have fun! Would <3 for you to star this repo and follow me on GitHub! ;)"),
	]
	let $hintIndex = 0
	console.log($tutorial)
	$tutorial[$hintIndex].show()

	$('.tutorial').click(function () {
		$hintIndex++
		console.log($hintIndex, $tutorial.length)
		if ($hintIndex == $tutorial.length) {
			$('.tutorial').remove()
			setTimeout(() => {tools.canvAvailable = true}, 1)
		} else {
			$tutorial[$hintIndex].show()
		}
	})

	$('.skip').click(function () {
		$('.tutorial').remove()
		setTimeout(() => {tools.canvAvailable = true}, 1)
	})

	$('.alg div').click(function () {
		$('.alg div').removeClass('active')
		$('.alg div').removeClass('active-s')
		$('.alg div').removeClass('active-e')
		if($(this).hasClass('s')) {
			$(this).addClass('active-s active')
		} else if($(this).hasClass('e')) {
			$(this).addClass('active-e active')
		} else {
			$(this).addClass('active')
		}
		let x = $(this).attr('id')
		if (x == 'AS') {
			tools.alg = new AStar()
		} else if (x == 'DJ') {
			tools.alg = new Dijkstra()
		} else {
			tools.alg = new Sample()
		}
	})

	$('.move div').click(function () {
		$('.move div').removeClass('active')
		$('.move div').removeClass('active-s')
		$('.move div').removeClass('active-e')
		if($(this).hasClass('s')) {
			$(this).addClass('active-s active')
		} else if($(this).hasClass('e')) {
			$(this).addClass('active-e active')
		} else {
			$(this).addClass('active')
		}

		let x = $(this).attr('id')
		if (x == 'S') {
			tools.move = 'S'
		} else if (x == 'E') {
			tools.move = 'E'
		}
	})

	$('.play').click(function () {
		if (tools.alg) {
			tools.play = true
		} else {
			alert('Please choose algorithm')
		}
	})

	$('.reset').click(function () {
		setup()
		tools.canvAvailable = true
		$('.alg div').removeClass('active')
		$('.alg div').removeClass('active-s')
		$('.alg div').removeClass('active-e')
		$('.move div').removeClass('active')
		$('.move div').removeClass('active-s')
		$('.move div').removeClass('active-e')
	})
})

class Hint {
	constructor(_x, _y, _t) {
		this.x = _x
		this.y = _y
		this.text = _t
	}

	show() {
		let div = $("<div>", {'class': 'hint'})
		let txt = $("<div>" + this.text + "</div>")
		txt.addClass('text')
		let ctn = $("<div>Click anywhere to continue</div>")
		ctn.addClass('continue')
		div.append(txt)
		div.append(ctn)
		let skip = $("<div>skip tutorial</div>")
		skip.addClass('skip')
		div.css({'top': this.y + 'px', 'left': this.x + 'px'})
		$('.tutorial').html(div)
		$('.tutorial').append(skip)
	}
}