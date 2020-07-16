class Dijkstra {
	constructor() {
		this.found = false
		this.cur = tools.start
		tools.grid[tools.start.i][tools.start.j].t_dist = 0
	}

	h(n, m = tools.end) {
		let [x, y] = [abs(n.i - m.i), abs(n.j - m.j)] 
		return (1.4*Math.min(x, y) + Math.abs(x - y))
	}

	search() {
		let x = this.searchStep()
		if (x) {
			this.found = true
			this.retrace(x)
			return
		}
	}

	retrace(x) {
		tools.grid[tools.start.i][tools.start.j].state = 1
		tools.grid[tools.end.i][tools.end.j].state = 2
		let a = tools.grid[x.parent.i][x.parent.j]
		if (!this.cellComp(x.parent, tools.start)) {
			a.state = 6
			this.retrace(a)
		} else {
			return
		}
	}

	cellComp(a, b) {
		return (a.i == b.i) && (a.j == b.j)
	}

	searchStep() {
		let n = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1], ], neighbors = []
		for (var i = 0; i < n.length; i++) {
			let _ = tools.grid[this.cur.i + n[i][0]][this.cur.j + n[i][1]]
			if (_.state == 3) {
				n.splice(i, 1)
			} else {
				neighbors.push(_)
			}
		}

		neighbors.map((c, i) => {
			let g = tools.grid[this.cur.i][this.cur.j].t_dist + this.h(c, this.cur)
			if (g < tools.grid[c.i][c.j].t_dist) {
				tools.grid[c.i][c.j].t_dist = g
				tools.grid[c.i][c.j].parent = {i: tools.grid[this.cur.i][this.cur.j].i, j: tools.grid[this.cur.i][this.cur.j].j}
			}
			if (tools.grid[c.i][c.j].state != 5) {
				tools.grid[c.i][c.j].state = 4
			}
		})

		tools.grid[this.cur.i][this.cur.j].visited = true
		tools.grid[this.cur.i][this.cur.j].state = 5

		let min = Infinity
		tools.grid.map((row, i) => row.map((cell) => min = (cell.t_dist < min && !cell.visited) ? cell.t_dist : min))
		if (tools.grid[tools.end.i][tools.end.j].visited) {
			return tools.grid[tools.end.i][tools.end.j]
		}
		if (min == Infinity) {
			console.log('not found')
			return
		}

		tools.grid.map((row) => row.map((cell) => (cell.t_dist == min && !cell.visited) ? this.cur = {i: cell.i, j: cell.j} : this.cur))
		tools.grid[tools.start.i][tools.start.j].state = 1
		tools.grid[tools.end.i][tools.end.j].state = 2
	}
}