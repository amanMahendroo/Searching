function h(n, m = end) {
	let [x, y] = [abs(n.i - m.i), abs(n.j - m.j)] 
	return min(x, y) * 1.4 + abs(x - y)
}

function searchStep(open) {
	let [cur, cur_ind] = getCur(open)
	if (cur.index.i == end.i && cur.index.j == end.j) {
		return cur
	}

	open.splice(cur_ind, 1)
	grid[cur.index.i][cur.index.j].state = 5

	let n = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1], ]
	let neighbors = []
	for (var i = 0; i < n.length; i++) {
		let _ = grid[cur.index.i + n[i][0]][cur.index.j + n[i][1]]
		if (_.state == 3 || _.state == 5) {
			n.splice(i, 1)
		} else {
			neighbors.push(_)
		}
	}

	neighbors.map((c, i) => {
		let g = cur.g_score + h(cur.index, grid[c.index.i][c.index.j].index)
		if (g < grid[c.index.i][c.index.j].g_score) {
			grid[c.index.i][c.index.j].parent = cur.index
			grid[c.index.i][c.index.j].g_score = g
			grid[c.index.i][c.index.j].f_score = g + h(grid[c.index.i][c.index.j].index)
			grid[c.index.i][c.index.j].state = 4
			
			let flag = false
			for (var i = 0; i < open.length; i++) {
				if (cellComp(open[i], c)) {
					flag = true
					break
				}
			}
			if (!flag) {
				open.push(c)
			}
		}
	})
}

function getCur(_o) {
	let index = 0
	_o.map((c, i) => { index = c.f_score < _o[index].f_score ? i : index })
	return [_o[index], index]
}

function cellComp(a, b) {
	(a.index.i == b.index.i) && (a.index.j == b.index.j)
}

class AStar {
	constructor() {
		this.open = [grid[start.i][start.j]]
		this.found = false
		grid[start.i][start.j].g_score = 0
	}

	search() {
		let x = searchStep(this.open)
		if (x) {
			this.found = true
			this.retrace(x)
			return
		}
	}
	retrace(x) {
		let a = grid[x.parent.i][x.parent.j]
		if (x.parent.i != start.i || x.parent.j != start.j) {
			a.state = 6
			this.retrace(a)
		} else {
			return
		}
	}
}