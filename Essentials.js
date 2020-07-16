class Essentials {
	constructor(_w, _h) {
		this.grid
		this.size = 20
		this.n_W = Math.ceil(_w / this.size)
		this.n_H = Math.ceil(_h / this.size)
		this.grid = new Array(this.n_W).fill(undefined)
		this.grid = this.grid.map((row, i) => {
			let t = new Array(this.n_H).fill(undefined)
			t = t.map((col, j) => new Cell(i, j, this.size))
			return t
		})
		this.start
		this.end 
		this.fills 
		this.points 
		this.alg 
		this.play = false
		this.move
		this.canvAvailable = false
		this.hyperparametrize()
	}

	hyperparametrize() {
		this.start = {
			i: floor(this.n_H/2), 
			j: floor(this.n_H/2)
		}
		this.end = {
			i: this.n_W - floor(this.n_H/2), 
			j: floor(this.n_H/2)
		}
		this.grid.map((row, i) => row.map((cell, j) => cell.state = (i == 0 || i == this.n_W - 1 || j == 0 || j == this.n_H - 1) ? 3: 0))
		this.grid[this.start.i][this.start.j].state = 1
		this.grid[this.end.i][this.end.j].state = 2

		this.fills = [color(0, 0, 0, 0), color(255, 136, 0), color(0, 255, 136), color(0), color(0, 255, 255, 51), color(255, 153), color(171, 215, 235)]
	}

	moveNode(keyCode) {
		if (this.move == 'S') {
			console.log(keyCode, LEFT_ARROW, RIGHT_ARROW, UP_ARROW, DOWN_ARROW)
			if (keyCode == LEFT_ARROW) { 
				this.grid[this.start.i][this.start.j].state = 0
				this.start.i--
				this.grid[this.start.i][this.start.j].state = 1
			}
			if (keyCode == RIGHT_ARROW) { 
				this.grid[this.start.i][this.start.j].state = 0
				this.start.i++
				this.grid[this.start.i][this.start.j].state = 1
			}
			if (keyCode == UP_ARROW) { 
				this.grid[this.start.i][this.start.j].state = 0
				this.start.j--
				this.grid[this.start.i][this.start.j].state = 1
			}
			if (keyCode == DOWN_ARROW) { 
				this.grid[this.start.i][this.start.j].state = 0
				this.start.j++
				this.grid[this.start.i][this.start.j].state = 1
			}
		}
		if (this.move == 'E') {
			if (keyCode == LEFT_ARROW) { 
				this.grid[this.end.i][this.end.j].state = 0
				this.end.i--
				this.grid[this.end.i][this.end.j].state = 2
			}
			if (keyCode == RIGHT_ARROW) { 
				this.grid[this.end.i][this.end.j].state = 0
				this.end.i++
				this.grid[this.end.i][this.end.j].state = 2
			}
			if (keyCode == UP_ARROW) { 
				this.grid[this.end.i][this.end.j].state = 0
				this.end.j--
				this.grid[this.end.i][this.end.j].state = 2
			}
			if (keyCode == DOWN_ARROW) { 
				this.grid[this.end.i][this.end.j].state = 0
				this.end.j++
				this.grid[this.end.i][this.end.j].state = 2
			}
		}
	}
}