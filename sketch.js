let data;
let provaimg;

function preload() {
  data = loadJSON("assets/italy_prime_ministers.json");
  provaimg = loadImage("assets/lamb.jpg");
  monumentGrotesk = loadFont("assets/MonumentGrotesk-Regular.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  let presidenti = data.presidenti;

  for (let i = 0; i < presidenti.length; i++) {
    const presidente = presidenti[i];
    const name = presidente.name;
    const size = presidente.daysInOffice;
    const offset = width / presidenti.length;
    const foto = presidente.image;
    const partito = presidente.party;
    const ngoverni = presidente.govNum;
    const dal = presidente.tookOffice;

    let img = createImg(foto);
    img.hide();

    push();
    translate(offset * i, 0);
    image(img, 0, 0, size / 10, size / 7.5);
    //cornice
    noFill();
    rect(0, 0, size / 10, size / 7.5);
    rect(0, 0, width, height);
    pop();

    push();
    angleMode(DEGREES);
    rotate(90);
    translate(height / 2, -(offset * i + 5));
    fill(0);
    textSize(20);
    textFont(monumentGrotesk);
    // text(partito, 5, 55);
    // text(dal, 5, 30);
    text(name, 0, 0);
    text(partito, height / 4, 0);
    text("X " + ngoverni, height / 2.3, 0);

    pop();
  }
}

function draw() {}
