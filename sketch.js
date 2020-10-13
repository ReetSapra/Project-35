

var dog, happyDog, database, foodS, foodStock;
var addFood,feed;
var fedTime, lastFed;
var foodObj;

function preload()
{
  dogImg = loadImage("images/dogImg.png")
 
}



function setup() {
	createCanvas(500, 500);
  happyDog = loadImage ("images/dogImg1.png")
  dog = createSprite (200,200,10,10);

  foodObj = new Food ();

  feed = createButton ("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87);
  dog.addImage(dogImg)
  dog.scale = 0.3
  
  fedTime = databse.ref ('FeedTime');
  fedTime.on ("value", function(data){
    lastFed = data.val();
  });

  textSize(20);
  fill("white");
  text ("Food Left", foodStock, 200,100);

  feed.display();
  addFood.display();

  drawSprites();
  //add styles here
  
}

function writeStock(x){
  if (x<=0){
    x = 0
  }
  else {
    x = x-1;
  }

  database.ref ('/').update({
    Food:x
  })
}

function readStock (data){
  foodS=data.val();
}


