var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score ;
var ground, invisibleGround;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restartButton, restartButtonImage;
var hunger

function preload() {
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  restartButtonImage = loadImage("restart-icon-internet-button-on-260nw-250233214.webp");



}

function setup() {
  createCanvas(600, 300);

  //create a monkey   
  monkey = createSprite(100, 200, 20, 50);
  monkey.addAnimation("monkey_running", monkey_running);
  monkey.scale = 0.1;
  //create a ground    
  ground = createSprite(600, 240, 800, 20);
  ground.velocityX = -3;
  ground.x = ground.width / 2;
  //create invisible ground 
  invisibleGround = createSprite(200, 240, 400, 10);
  invisibleGround.visible = false;
  // create groups
  bananaGroup = new Group();
  obstaclesGroup = new Group();
  //score
  score = 0;
  // hunger
  hunger =10;
  
  //restartbutton

}

function draw() {
  background("white");
  if (gameState === PLAY) {
    text("Bananas Collected: " + score, 450, 50);
    if (keyDown("space") && monkey.y >= 200) {
      monkey.velocityY = -15;
    }
    if (monkey.isTouching(obstaclesGroup)) {
      gameState = END;
    }

    if (monkey.isTouching(bananaGroup)) {
      bananaGroup.destroyEach();
      score = score +2;
    }
    spawnObstacles();
    spawnbanana();
  } else if (gameState === END) {
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
          var restartButton = createSprite(50, 50, 10, 40);
    restartButton.addImage(restartButtonImage)
    restartButton.scale = 0.2
         if (mousePressedOver(restartButton)) {
    restartButton.destroy();
    reset();
  }
 
 }

  if (ground.x < 200) {
    ground.x = ground.width / 2;
  }

  monkey.velocityY = monkey.velocityY + 0.8

  //make monkey collide with invis ground
  monkey.collide(invisibleGround);
  drawSprites();
}

function spawnbanana() {
  if (frameCount % 125 === 0) {
    var banana = createSprite(600, 120, 40, 10);
    banana.y = Math.round(random(80, 120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -7;
    //assign lifetime to the variable  
    banana.lifetime = 250;
    //add each banana to the group   
    bananaGroup.add(banana);

  }
}

function spawnObstacles() {
  if (frameCount % 100 === 0) {
    var obstacle = createSprite(600, 195, 10, 40);
    obstacle.velocityX = -8;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.lifetime = 250;
    obstacle.setCollider("circle", 0, 0, 140);

    obstaclesGroup.add(obstacle);
  }
}

function reset() {
  gameState = PLAY;
  obstaclesGroup.destroyEach();
  bananaGroup.destroyEach();
  score = 0;

}