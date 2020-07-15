class Dijkstra {
	constructor() {
		this.found = false
		this.cur = start
		grid[this.cur.i][this.cur.j].t_dist = 0
	}

	h(n, m = end) {
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
		grid[start.i][start.j].state = 1
		grid[end.i][end.j].state = 2
		let a = grid[x.parent.i][x.parent.j]
		if (!this.cellComp(x.parent, start)) {
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
			let _ = grid[this.cur.i + n[i][0]][this.cur.j + n[i][1]]
			if (_.state == 3) {
				n.splice(i, 1)
			} else {
				neighbors.push(_)
			}
		}

		neighbors.map((c, i) => {
			let g = grid[this.cur.i][this.cur.j].t_dist + this.h(c, this.cur)
			if (g < grid[c.i][c.j].t_dist) {
				grid[c.i][c.j].t_dist = g
				grid[c.i][c.j].parent = {i: grid[this.cur.i][this.cur.j].i, j: grid[this.cur.i][this.cur.j].j}
			}
			if (grid[c.i][c.j].state != 5) {
				grid[c.i][c.j].state = 4
			}
		})

		grid[this.cur.i][this.cur.j].visited = true
		grid[this.cur.i][this.cur.j].state = 5

		let min = Infinity
		grid.map((row, i) => row.map((cell) => min = (cell.t_dist < min && !cell.visited) ? cell.t_dist : min))
		if (grid[end.i][end.j].visited) {
			return grid[end.i][end.j]
		}
		if (min == Infinity) {
			console.log('not found')
			return
		}

		grid.map((row) => row.map((cell) => (cell.t_dist == min && !cell.visited) ? this.cur = {i: cell.i, j: cell.j} : this.cur))
		grid[start.i][start.j].state = 1
		grid[end.i][end.j].state = 2
	}
}