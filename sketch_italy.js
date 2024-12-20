let data;
let monumentGrotesk;

let analyser;

let renzi;
let craxi;
let berlusconi;
let andreotti;

renziFill = 0;
craxiFill = 0;
berlusconiFill = 0;
andreottiFill = 0;

let giorniDraghi;

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

  analyser_craxi = new p5.Amplitude();
  analyser_craxi.setInput(craxi);

  analyser_renzi = new p5.Amplitude();
  analyser_renzi.setInput(renzi);

  analyser_berlusconi = new p5.Amplitude();
  analyser_berlusconi.setInput(berlusconi);

  analyser_andreotti = new p5.Amplitude();
  analyser_andreotti.setInput(andreotti);

  frameRate(240);
}

function draw() {
  background(255);

  let presidenti = data.presidenti;
  let today = new Date();

  for (let i = 0; i < presidenti.length; i++) {
    const presidente = presidenti[i];
    const name = presidente.name;
    let size = presidente.daysInOffice;
    const offset = width / presidenti.length;
    const foto = presidente.image;
    const partito = presidente.party;
    const ngoverni = presidente.govNum;

    // Calculate days in office for the current prime minister
    if (i === presidenti.length - 1) {
      const tookOfficeDate = new Date(presidente.tookOffice.split("-").reverse().join("-"));
      const diffTime = Math.abs(today - tookOfficeDate);
      size = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

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

  let volume_craxi = analyser_craxi.getLevel();
  volume_craxi = map(volume_craxi, 0, 0.4, height / 2, 0);

  let volume_renzi = analyser_renzi.getLevel();
  volume_renzi = map(volume_renzi, 0, 1, height / 2, 0);

  let volume_berlusconi = analyser_berlusconi.getLevel();
  volume_berlusconi = map(volume_berlusconi, 0, 0.3, height / 2, 0);

  let volume_andreotti = analyser_andreotti.getLevel();
  volume_andreotti = map(volume_andreotti, 0, 0.4, height / 2, 0);

  //barre parameters
  craxi_x1 = (width / 31) * 15;
  craxi_x2 = (width / 31) * 16;

  //se il mouse è nella zona giusta, verrà riprodotto l'audio associato ed una barra seguirà l'andamento del volume.

  //audio renzi
  if (mouseX > (width / 31) * 26 && mouseX < (width / 31) * 27) {
    push();
    blendMode(DIFFERENCE);
    noStroke();
    rectMode(CORNERS);
    fill("white");
    rect((width / 31) * 26, height, (width / 31) * 27, volume_renzi);
    pop();
    if (renzi.isPlaying() == false) {
      renzi.play();
      renziFill = 0;
    }
  } else {
    renzi.stop();
    renziFill = 0;
  }

  //audio craxi
  if (mouseX > craxi_x1 && mouseX < craxi_x2) {
    push();
    blendMode(DIFFERENCE);
    noStroke();
    rectMode(CORNERS);
    fill(255);
    rect(craxi_x1, height, craxi_x2, volume_craxi);
    pop();
    if (craxi.isPlaying() == false) {
      craxi.play();
      craxiFill = 0;
    }
  } else {
    craxi.stop();
    craxiFill = 0;
  }

  //audio berlusconi
  if (mouseX > (width / 31) * 20 && mouseX < (width / 31) * 21) {
    push();
    blendMode(DIFFERENCE);
    noStroke();
    rectMode(CORNERS);
    fill("white");
    rect((width / 31) * 20, height, (width / 31) * 21, volume_berlusconi);
    pop();
    if (berlusconi.isPlaying() == false) {
      berlusconi.play();
      berlusconiFill = 0;
    }
  } else {
    berlusconi.stop();
    berlusconiFill = 0;
  }

  //audio andreotti
  if (mouseX > (width / 31) * 11 && mouseX < (width / 31) * 12) {
    push();
    blendMode(DIFFERENCE);
    noStroke();
    rectMode(CORNERS);
    fill("white");
    rect((width / 31) * 11, height, (width / 31) * 12, volume_andreotti);
    pop();
    if (andreotti.isPlaying() == false) {
      andreotti.play();
      andreottiFill = 0;
    }
  } else {
    andreotti.stop();
    andreottiFill = 0;
  }

  fill(renziFill);
  circle((width / 31) * 26 + 12, height - 16, 12);
  fill(craxiFill);
  circle((width / 31) * 15 + 12, height - 16, 12);
  fill(berlusconiFill);
  circle((width / 31) * 20 + 12, height - 16, 12);
  fill(andreottiFill);
  circle((width / 31) * 11 + 12, height - 16, 12);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
