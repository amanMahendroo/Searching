function hyperparametrize() {
	// Sets initial values required for pathfinding and visualization
	start = {i: floor(n_H/2), j: floor(n_H/2)}, end = {i: n_W - floor(n_H/2), j: floor(n_H/2)}
	grid.map((row, i) => row.map((cell, j) => cell.state = (i == 0 || i == n_W - 1 || j == 0 || j == n_H - 1) ? 3: 0))
	grid[start.i][start.j].state = 1
	grid[end.i][end.j].state = 2

	fills = [color(0, 0, 0, 0), 	// transparent
			color(255, 136, 0), 	// orange
			color(0, 255, 136), 	// green
			color(0), 				// black
			color(0, 255, 255, 51), // cyan shade
			color(255, 153), 		// white
			color(171, 215, 235)]	// soft blue
}
