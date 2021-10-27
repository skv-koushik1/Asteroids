var total;
var ship;
var asteroids = [];
var lasers = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	angleMode(RADIANS);
	ship = new Ship();
	total = Math.round(random(5, 15));
	for (var i = 0; i < total; i++) {
		asteroids.push(new Asteroid());
	}
}

function draw() {
	background(0);

	if (frameCount % 400 === 0) {
		asteroids.push(new Asteroid());
	}

	for (var i = 0; i < asteroids.length; i++) {
		if (ship.hits(asteroids[i])) {
			fill(255);
			textSize(40);
			textAlign(CENTER);
			text("GAME OVER", width / 2, height / 2)
			ship.render = false;
		}
		asteroids[i].render();
		asteroids[i].update();
		asteroids[i].edges();
	}

	for (var i = lasers.length - 1; i >= 0; i--) {
		lasers[i].render();
		lasers[i].update();
		if (lasers[i].offscreen()) {
			lasers.splice(i, 1);
		} else {
			for (var j = asteroids.length - 1; j >= 0; j--) {
				if (lasers[i].hits(asteroids[j])) {
					if (asteroids[j].r > 10) {
						var newAsteroids = asteroids[j].breakup();
						asteroids = asteroids.concat(newAsteroids);
					}
					asteroids.splice(j, 1);
					lasers.splice(i, 1);
					break;
				}
			}
		}
	}
	ship.render();
	ship.turn();
	ship.update();
	ship.edges();
}

function keyReleased() {
	ship.setRotation(0);
	ship.boosting(false);
}

function keyPressed() {
	if (key == ' ') {
		lasers.push(new Laser(ship.pos, ship.heading));
	} else if (keyCode == RIGHT_ARROW) {
		ship.setRotation(0.1);
	} else if (keyCode == LEFT_ARROW) {
		ship.setRotation(-0.1);
	} else if (keyCode == UP_ARROW) {
		ship.boosting(true);
	}
}