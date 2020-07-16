class AStar {
	constructor() {
		this.open = [tools.grid[tools.start.i][tools.start.j]]
		this.found = false
		tools.grid[tools.start.i][tools.start.j].g_score = 0
	}

	h(n, m = tools.end) {
		let [x, y] = [abs(n.i - m.i), abs(n.j - m.j)] 
		return (min(x, y) * 1.4 + abs(x - y))
	}

	getCur() {
		let index = 0
		this.open.map((c, i) => { index = c.f_score < this.open[index].f_score ? i : index})
		return [this.open[index], index]
	}

	cellComp(a, b) {
		return (a.i == b.i) && (a.j == b.j)
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
		let a = tools.grid[x.parent.i][x.parent.j]
		if (!this.cellComp(x.parent, tools.start)) {
			a.state = 6
			this.retrace(a)
		} else {
			return
		}
	}

	searchStep() {
		let [cur, cur_ind] = this.getCur()
		if (this.cellComp(cur, tools.end)) {
			return cur
		}

		this.open.splice(cur_ind, 1)
		tools.grid[cur.i][cur.j].state = 5

		let n = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1], ], neighbors = []
		for (var i = 0; i < n.length; i++) {
			let _ = tools.grid[cur.i + n[i][0]][cur.j + n[i][1]]
			if (_.state == 3 || _.state == 5) {
				n.splice(i, 1)
			} else {
				neighbors.push(_)
			}
		}

		neighbors.map((c, i) => {
			let g = cur.g_score + this.h(cur, c)
			if (g < tools.grid[c.i][c.j].g_score) {
				tools.grid[c.i][c.j].parent = {i: cur.i, j: cur.j}
				tools.grid[c.i][c.j].g_score = g
				tools.grid[c.i][c.j].f_score = g + this.h(c)
				tools.grid[c.i][c.j].state = 4

				let flag = false
				for (var i = 0; i < this.open.length; i++) {
					if (this.cellComp(this.open[i], c)) {
						flag = true
						break
					}
				}
				if (!flag) {
					this.open.push(c)
				}
			}
		})
		tools.grid[tools.start.i][tools.start.j].state = 1
		tools.grid[tools.end.i][tools.end.j].state = 2
	}	
}