var bumper;
var button;
var texture;
var volume;

//------------------------------------------------PRELOAD
function preload(){

  bumper = loadSound("./assets/TG1_new.mp3");
  earth = loadImage("./assets/earth.jpeg");
}

//------------------------------------------------SETUP
function setup() {

  createCanvas(windowWidth,windowHeight, WEBGL);

 // The analyzer allows to perform analysis on a sound file
  analyzer = new p5.Amplitude();
  analyzer.setInput(bumper);

  //button
  button = createButton('PLAY/PAUSE');

  tg1 = createGraphics(256,256);

  textureMode(NORMAL);
}

//------------------------------------------------DRAW
function draw() {
  volume = analyzer.getLevel();
  volume = map(volume,0,1,0,height);

  //earth
  createSphere();

  //play/pause bumper
  button.mousePressed(playMusic);
  if (bumper.isPlaying()==true){
    button.mousePressed(stopMusic);
  }


  //resize canvas
  windowResized();

}

//------------------------------------------------CUSTOM FUNCTIONS
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
  button.position(windowWidth/2-button.width/2, windowHeight/2+windowHeight/3);
//  background('blue');
}

//------------------------------------------------
function playMusic() {
   bumper.play();
}

//------------------------------------------------
function stopMusic() {
  bumper.stop();
}

//------------------------------------------------
function createSphere() {
  push();
  //rotation on Y axe
  rotateY(millis() / 2000);
  //make some interesting sphere move with the mouse
  translate(-mouseX/10, mouseY/10);
  clear();
  texture(earth);
  //lights
  let dirY = (mouseY / height - 0.5) *2;
  let dirX = (mouseX / width - 0.5) *2;
  directionalLight(250, 250, 250, dirX, -dirY, -2);
  noStroke();
  sphere(volume, 24, 24);
  pop();
}
