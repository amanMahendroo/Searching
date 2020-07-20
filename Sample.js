class Sample {
	constructor() {
		this.step = 0
		this.queue = [[{
			i: tools.start.i,
			j: tools.start.j,
			c: 0
		}]]
		this.buffer = []
		this.found = false
		tools.grid[tools.start.i][tools.start.j].state = 5
	}

	cellComp(a, b) {
		return (a.i == b.i) && (a.j == b.j)
	}

	search() {
		let x = this.searchStep(this.step)
		console.log(x)
		this.step++
		if (x) {
			this.found = true
			this.retrace(x)
			return
		}
	}

	retrace(x) {
		let a = tools.grid[x.parent.i][x.parent.j]
		if (!this.cellComp(x.parent, tools.start)) {
			a.state = 6
			this.retrace(a)
		} else {
			return
		}
	}

	searchStep(step) {
		for (var h = 0; h < this.queue[step].length; h++) {
			let c = this.queue[step][h]
			if (c.i == tools.end.i && c.j == tools.end.j) {
				return tools.grid[c.i][c.j]
			}
			tools.grid[c.i][c.j].state = 5
			let cells = [[-1, 0], [0, -1], [1, 0], [0, 1]]
			for (let i = cells.length - 1; i >= 0; i--) {
				let x = tools.grid[c.i + cells[i][0]][c.j + cells[i][1]]
				if (x.state == 5 || x.state == 3 || x.state == 1) {
					cells.splice(i, 1)
				}
				for (let j = 0; j < this.queue.length; j++) {
					for (let k = 0; k < this.queue[j].length; k++) {
						if (this.queue[j][k].i == x.i && this.queue[j][k].j == x.j && this.queue[j].c < step) {
							cells.splice(i, 1)
							j = this.queue.length
							break
						}
					}
				}
			}
			cells.map((cur) => {
				let inBuffer = false
				for (var i = 0; i < this.buffer.length; i++) {
					if (this.buffer[i].i == c.i + cur[0] && this.buffer[i].j == c.j + cur[1]) {
						inBuffer = true
					}
				}
				if (!inBuffer) {
					this.buffer.push({
						i: c.i + cur[0],
						j: c.j + cur[1],
						c: step
					})
					tools.grid[c.i + cur[0]][c.j + cur[1]].parent = tools.grid[c.i][c.j]
				}
			})
			this.buffer.map((cur) => {
				tools.grid[cur.i][cur.j].state = 4
			})
		
		}
		console.log(this.buffer.length)
		this.queue.push(this.buffer)
		this.buffer = []

		tools.grid[tools.start.i][tools.start.j].state = 1
		tools.grid[tools.end.i][tools.end.j].state = 2
	}
}