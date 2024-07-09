let mandalas = []; // Create an empty array called 'mandalas' to store instances of the 'Mandala' class.

function setup() {
  createCanvas(windowWidth, windowHeight); // Create a canvas using the window's width and height.
  noFill(); // Disable filling shapes.
  stroke(255); // Set the stroke color to white.
  
  generateMandalas(); // Call a function to generate initial mandalas.
}

function draw() {
  background(0); // Set the background color to black.

  for (let mandala of mandalas) {
    mandala.update(); // Call the 'update' method of each 'Mandala' instance.
    mandala.display(); // Call the 'display' method of each 'Mandala' instance.
  }
}

function generateMandalas() {
  mandalas = []; // Clear previous mandalas

  let numMandalas = int(random(1, 4)); // Randomly choose number of mandalas (between 1 and 3).

  for (let i = 0; i < numMandalas; i++) {
    let x = random(width); // Random x-coordinate of the mandala's center.
    let y = random(height); // Random y-coordinate of the mandala's center.
    let radius = random(50, min(width, height) / 2); // Random radius of the mandala.
    let numLayers = int(random(5, 15)); // Random number of layers in the mandala.
    let speed = random(0.005, 0.02); // Random rotation speed of the mandala.
    mandalas.push(new Mandala(x, y, radius, numLayers, speed)); // Create a new 'Mandala' instance and add it to 'mandalas' array.
  }
}

function mouseClicked() {
  generateMandalas(); // Regenerate mandalas when mouse is clicked.
}

class Mandala {
  constructor(x, y, radius, numLayers, speed) {
    this.x = x; // Initialize the x-coordinate of the mandala's center.
    this.y = y; // Initialize the y-coordinate of the mandala's center.
    this.radius = radius; // Initialize the mandala's radius.
    this.numLayers = numLayers; // Initialize the number of layers in the mandala.
    this.speed = speed; // Initialize the rotation speed of the mandala.
    this.angle = 0; // Initialize the initial angle of rotation.
  }

  update() {
    this.angle += this.speed; // Increment the angle of rotation.
  }

  display() {
    push(); // Save the current drawing style.
    translate(this.x, this.y); // Translate the canvas to the mandala's center.
    rotate(this.angle); // Rotate the canvas by the current angle.

    for (let i = 0; i < this.numLayers; i++) {
      let layerRadius = this.radius * ((i + 1) / this.numLayers);
      let numPoints = int(map(i, 0, this.numLayers - 1, 2, 12));
      let layerSpacing = map(sin(frameCount * 0.01), -1, 1, 2, 20);
      let layerColor = map(i, 0, this.numLayers - 1, 100, 255);

      stroke(layerColor, 150); // Set the stroke color for the layer.
      beginShape();

      for (let j = 0; j < numPoints; j++) {
        let angle = TWO_PI / numPoints * j;
        let x = layerRadius * cos(angle);
        let y = layerRadius * sin(angle);
        vertex(x, y);
      }

      endShape(CLOSE);
      translate(0, layerSpacing);
    }

    pop(); // Restore the previous drawing style.
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Resize the canvas when the window is resized.
}
