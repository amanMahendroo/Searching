class Cell {
	// A single, fully conscious cell
	constructor(_i, _j) {
		this.i = _i
		this.j = _j
		this.pos = createVector(_i * 20, _j * 20)
		this.state = 0
		this.g_score = Infinity
		this.f_score = Infinity
		this.t_dist = Infinity
		this.parent
		this.visited = false
	}

	show() {
		stroke(255, 50)
		fill(fills[this.state])
		rect(this.pos.x, this.pos.y, 20)
	}
}


// STATE DICT
// 0: empty
// 1: start
// 2: end
// 3: wall
// 4: open
// 5: closed
// 6: final
