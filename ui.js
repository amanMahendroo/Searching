$(document).ready(function () {
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
			alg = new AStar()
		} else if (x == 'DJ') {
			alg = new Dijkstra()
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
			move = 'S'
		} else if (x == 'E') {
			move = 'E'
		}
	})

	$('.play').click(function () {
		if (alg) {
			play = true
		} else {
			alert('Please choose algorithm')
		}
	})

	$('.reset').click(function () {
		setup()
		$('.alg div').removeClass('active')
		$('.alg div').removeClass('active-s')
		$('.alg div').removeClass('active-e')
		$('.move div').removeClass('active')
		$('.move div').removeClass('active-s')
		$('.move div').removeClass('active-e')
	})
})