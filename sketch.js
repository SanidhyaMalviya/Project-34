//Create variables here
var dog,happyDog;
var foodS,foodStock;
var database;

function preload(){
  //load images here
  dogImg = loadImage("images/dogImg.png");
  dogImg1 = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  
  foodStock = database.ref('food');
  foodStock.on("value",readStock);

  dog = createSprite(250,350);
  dog.addImage(dogImg);
  dog.scale = 0.15;
}

function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg1);
  }

  drawSprites();

  //add styles here
  push();
  textSize(16);
  stroke("black");
  strokeWeight(2);
  fill("white");
  text("Note: Press UP_ARROW key to feed Milk",100,30);
  text("Food Remaining: "+foodS,170,260);
  pop();
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    food:x
  })
}