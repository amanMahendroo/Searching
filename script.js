function setup() {
	createCanvas(500, 500)
	n_W = Math.floor(width / 20)
	n_H = Math.floor(height / 20)
	
	grid = new Array(n_W).fill(undefined)
	grid = grid.map((row, i) => {
		let t = new Array(n_H).fill(undefined)
		t = t.map((col, j) => new Cell(i, j))
		return t
	})
	hyperparametrize()
}

let grid, start, end, fills, points, n_W, n_H, alg

function draw() {
	background(51)
	grid.map((row) => row.map((cell) => cell.show()))
	if (alg) {
		if (!alg.found) {
			alg.search()
		}
	}
}

function keyPressed() {
	if (keyCode == 32) {
		alg = new Dijkstra()
	}
}

function mouseDragged() {
	if (alg == undefined) {
		grid[Math.floor(mouseX / 20)][Math.floor(mouseY / 20)].state = 3
	}
}

function mouseClicked() {
	if (alg == undefined) {
		grid[Math.floor(mouseX / 20)][Math.floor(mouseY / 20)].state = 3
	}
}