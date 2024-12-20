let data, monumentGrotesk;
let analyser_craxi, analyser_renzi, analyser_berlusconi, analyser_andreotti;
let renzi, craxi, berlusconi, andreotti;
let country;

renziFill = 0;
craxiFill = 0;
berlusconiFill = 0;
andreottiFill = 0;

function preload() {
  const urlParams = new URLSearchParams(window.location.search);
  country = urlParams.get("country");

  console.log("Country parameter:", country);

  if (country === "uk") {
    console.log("Loading UK data");
    data = loadJSON("assets/uk_prime_ministers.json", onDataLoaded, onError);
  } else if (country === "france") {
    console.log("Loading France data");
    data = loadJSON("assets/france_prime_ministers.json", onDataLoaded, onError);
  } else if (country === "usa") {
    console.log("Loading USA data");
    data = loadJSON("assets/usa_prime_ministers.json", onDataLoaded, onError);
  } else if (country === "italy") {
    console.log("Loading Italy data");
    data = loadJSON("assets/italy_prime_ministers.json", onDataLoaded, onError);
    renzi = loadSound("assets/renzi.mp3");
    craxi = loadSound("assets/craxi.mp3");
    berlusconi = loadSound("assets/berlusconi.mp3");
    andreotti = loadSound("assets/andreotti.mp3");
  } else {
    console.error("Invalid country parameter:", country);
  }
  monumentGrotesk = loadFont("assets/MonumentGrotesk-Regular.ttf");
}

function onDataLoaded(loadedData) {
  data = loadedData;
  console.log("Data loaded:", data);
}

function onError(error) {
  console.error("Error loading data:", error);
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  if (country === "italy") {
    analyser_craxi = new p5.Amplitude();
    analyser_craxi.setInput(craxi);

    analyser_renzi = new p5.Amplitude();
    analyser_renzi.setInput(renzi);

    analyser_berlusconi = new p5.Amplitude();
    analyser_berlusconi.setInput(berlusconi);

    analyser_andreotti = new p5.Amplitude();
    analyser_andreotti.setInput(andreotti);
  }

  frameRate(240);
}

function draw() {
  background(255);
  if (data && data.presidenti) {
    drawCountry(data.presidenti, country === "italy");
  } else {
    console.error("Data not loaded or invalid format");
    console.log("Data object:", data);
  }
}

function drawCountry(presidenti, isItaly = false) {
  let today = new Date();

  for (let i = 0; i < presidenti.length; i++) {
    const presidente = presidenti[i];
    const name = presidente.name;
    let size = presidente.daysInOffice;
    const offset = width / presidenti.length;
    const foto = presidente.image;
    const partito = presidente.party;
    const ngoverni = presidente.govNum;

    if (i === presidenti.length - 1) {
      const tookOfficeDate = new Date(presidente.tookOffice.split("-").reverse().join("-"));
      const diffTime = Math.abs(today - tookOfficeDate);
      size = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    let img = createImg(foto);
    img.hide();

    push();
    translate(offset * i, 0);
    image(img, 0, 0, size / 10, size / 7.5);
    noFill();
    rect(0, 0, size / 10, size / 7.5);
    rect(0, 0, width, height);
    pop();

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

  if (isItaly) {
    handleItalyAudio();
  }
}

function handleItalyAudio() {
  let volume_craxi = analyser_craxi.getLevel();
  volume_craxi = map(volume_craxi, 0, 0.4, height / 2, 0);

  let volume_renzi = analyser_renzi.getLevel();
  volume_renzi = map(volume_renzi, 0, 1, height / 2, 0);

  let volume_berlusconi = analyser_berlusconi.getLevel();
  volume_berlusconi = map(volume_berlusconi, 0, 0.3, height / 2, 0);

  let volume_andreotti = analyser_andreotti.getLevel();
  volume_andreotti = map(volume_andreotti, 0, 0.4, height / 2, 0);

  craxi_x1 = (width / 31) * 15;
  craxi_x2 = (width / 31) * 16;

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
