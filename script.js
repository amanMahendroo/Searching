function setup() {
	createCanvas(windowWidth, windowHeight - 100)
	n_W = Math.ceil(width / size)
	n_H = Math.ceil(height / size)
	
	grid = new Array(n_W).fill(undefined)
	grid = grid.map((row, i) => {
		let t = new Array(n_H).fill(undefined)
		t = t.map((col, j) => new Cell(i, j))
		return t
	})
	hyperparametrize()
	play = false
	alg = undefined
	move = undefined
	// noLoop()
}

let grid, start, end, fills, points, n_W, n_H, alg, play, size = 20, move

function draw() {
	background(51)
	grid.map((row) => row.map((cell) => cell.show()))
	if (play && alg) {
		if (!alg.found) {
			alg.search()
		}
	}
}

function mouseDragged() {
	if (!play) {
		grid[Math.floor(mouseX / size)][Math.floor(mouseY / size)].state = 3
	}
}

function mouseClicked() {
	if (!play) {
		grid[Math.floor(mouseX / size)][Math.floor(mouseY / size)].state = 3
	}
}

function keyPressed() {
	if (move == 'S') {
		if (keyCode == LEFT_ARROW) { 
			grid[start.i][start.j].state = 0
			start.i--
			grid[start.i][start.j].state = 1
		}
		if (keyCode == RIGHT_ARROW) { 
			grid[start.i][start.j].state = 0
			start.i++
			grid[start.i][start.j].state = 1
		}
		if (keyCode == UP_ARROW) { 
			grid[start.i][start.j].state = 0
			start.j--
			grid[start.i][start.j].state = 1
		}
		if (keyCode == DOWN_ARROW) { 
			grid[start.i][start.j].state = 0
			start.j++
			grid[start.i][start.j].state = 1
		}
	}
	if (move == 'E') {
		if (keyCode == LEFT_ARROW) { 
			grid[end.i][end.j].state = 0
			end.i--
			grid[end.i][end.j].state = 2
		}
		if (keyCode == RIGHT_ARROW) { 
			grid[end.i][end.j].state = 0
			end.i++
			grid[end.i][end.j].state = 2
		}
		if (keyCode == UP_ARROW) { 
			grid[end.i][end.j].state = 0
			end.j--
			grid[end.i][end.j].state = 2
		}
		if (keyCode == DOWN_ARROW) { 
			grid[end.i][end.j].state = 0
			end.j++
			grid[end.i][end.j].state = 2
		}
	}
}