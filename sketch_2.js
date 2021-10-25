let data;
let monumentGrotesk;

let renzi;
let craxi;
let berlusconi;
let andreotti;

renziFill = 255;
craxiFill = 255;
berlusconiFill = 255;
andreottiFill = 255;

function preload() {
  data = loadJSON("assets/italy_prime_ministers.json");
  monumentGrotesk = loadFont("assets/MonumentGrotesk-Regular.ttf");
  renzi = loadSound("assets/renzi.mp3");
  craxi = loadSound("assets/craxi.mp3");
  berlusconi = loadSound("assets/berlusconi.mp3");
  andreotti = loadSound("assets/andreotti.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
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

    //le foto sono recuperate da URL all'interno del JSON
    let img = createImg(foto);
    img.hide();

    push();
    translate(offset * i, 0);
    //la dimensione della foto è proporzionata al numero di giorni che ha trascorso come capo del governo
    image(img, 0, 0, size / 10, size / 7.5);
    //cornice
    noFill();
    rect(0, 0, size / 10, size / 7.5);
    //divisori
    sezioni = rect(0, 0, width, height);
    pop();

    //testi
    push();
    angleMode(DEGREES);
    rotate(90);
    translate(height / 2, -(offset * i + 7));
    fill(0);
    textSize(20);
    textFont(monumentGrotesk);
    text(name, 0, 0);
    text(partito, height / 4, 0);
    text("X " + ngoverni, height / 2.4, 0);
    pop();
  }

  //audio renzi
  if (mouseX > (width / 30) * 26 && mouseX < (width / 30) * 27) {
    if (renzi.isPlaying() == false) {
      renzi.play();
      renziFill = 0;
    }
  } else {
    renzi.stop();
    renziFill = 255;
  }

  //audio craxi
  if (mouseX > (width / 30) * 15 && mouseX < (width / 30) * 16) {
    if (craxi.isPlaying() == false) {
      craxi.play();
      craxiFill = 0;
    }
  } else {
    craxi.stop();
    craxiFill = 255;
  }

  //audio berlusconi
  if (mouseX > (width / 30) * 20 && mouseX < (width / 30) * 21) {
    if (berlusconi.isPlaying() == false) {
      berlusconi.play();
      berlusconiFill = 0;
    }
  } else {
    berlusconi.stop();
    berlusconiFill = 255;
  }

  //audio andreotti
  if (mouseX > (width / 30) * 11 && mouseX < (width / 30) * 12) {
    if (andreotti.isPlaying() == false) {
      andreotti.play();
      andreottiFill = 0;
    }
  } else {
    andreotti.stop();
    andreottiFill = 255;
  }

  fill(renziFill);
  circle((width / 30) * 26 + 12, height - 16, 12);
  fill(craxiFill);
  circle((width / 30) * 15 + 12, height - 16, 12);
  fill(berlusconiFill);
  circle((width / 30) * 20 + 12, height - 16, 12);
  fill(andreottiFill);
  circle((width / 30) * 11 + 12, height - 16, 12);

  // if (mouseX > width / 30 && mouseX < (width / 30) * 2) {
  //   push();
  //   blendMode(MULTIPLY);
  //   noStroke();
  //   fill("red");
  //   rect(width / 30, 0, width / 30, height);
  //   pop();
  // }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
