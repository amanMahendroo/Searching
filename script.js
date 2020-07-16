function setup() {
	createCanvas(windowWidth, windowHeight - 100)
	tools = new Essentials(width, height)
}

let tools

function draw() {
	background(51)
	tools.grid.map((row) => row.map((cell) => cell.show()))
	if (tools.play && tools.alg) {
		if (!tools.alg.found) {
			tools.alg.search()
		}
	}
}

function mouseDragged() {
	if (!tools.canvAvailable) {
		return
	}
	if (!tools.play) {
		tools.grid[Math.floor(mouseX / tools.size)][Math.floor(mouseY / tools.size)].state = 3
	}
}

function mouseClicked() {
	if (!tools.canvAvailable) {
		return
	}
	if (!tools.play) {
		tools.grid[Math.floor(mouseX / tools.size)][Math.floor(mouseY / tools.size)].state = 3
	}
}

function keyPressed() {
	if (!tools.canvAvailable) {
		return
	}
	tools.moveNode(keyCode)
}