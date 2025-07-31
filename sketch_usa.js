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

function preload() {
  data = loadJSON("assets/usa_prime_ministers.json");
  monumentGrotesk = loadFont("assets/MonumentGrotesk-Regular.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  frameRate(240);
}

function draw() {
  background(255);

  let presidenti = data.presidenti;
  let today = new Date();

  // Set the current president's name here
  const currentPresidentName = "Donald Trump"; // Change as needed

  for (let i = 0; i < presidenti.length; i++) {
    const presidente = presidenti[i];
    const name = presidente.name;
    const offset = width / presidenti.length;
    const foto = presidente.image;
    const partito = presidente.party;
    const ngoverni = presidente.govNum;

    // Calculate total days in office using terms array
    let size = 0;
    if (Array.isArray(presidente.terms)) {
      for (const term of presidente.terms) {
        const tookOfficeDate = new Date(term.tookOffice.split("-").reverse().join("-"));
        let leftOfficeDate;
        if (term.leftOffice) {
          leftOfficeDate = new Date(term.leftOffice.split("-").reverse().join("-"));
        } else {
          leftOfficeDate = today;
        }
        const diffTime = Math.abs(leftOfficeDate - tookOfficeDate);
        size += Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      }
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
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
