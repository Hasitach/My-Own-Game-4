var bg,bgS
var hero ,heroImage
var enemy1
var daggerI
var fireballI
var gameoverI
var fireballG ,daggerG
var enemyG
var life=3
var heart1,heart2,heart3
var heartI
var brHeartI
var gameState = "PLAY"
function preload(){
bg=loadImage("background2.jpg")
enemy1=loadAnimation("enemy1.png","enemy2.png","enemy3.png","enemy4.png")
heroImage=loadAnimation("hero1.png","hero2.png","hero3.png","hero4.png","hero5.png")
daggerI=loadImage("dagger.png")
fireballI=loadImage("fireball.png")
gameoverI=loadImage("Game over image.jpg")
heartI=loadImage("life.png")
brHeartI=loadImage("Broken heart.png")
}

function setup() {
 createCanvas (1200,700)
 bgS=createSprite(600,400,1200,700)
 bgS.addImage(bg)
 bgS.scale=3

 hero=createSprite(400,600,50,50)
 hero.addAnimation("walking",heroImage)

 heart1=createSprite(200,60,20,20)
 heart1.addImage(heartI)
 heart1.scale=0.02
 heart2=createSprite(250,60,20,20)
 heart2.addImage(heartI)
 heart2.scale=0.02
 heart3=createSprite(300,60,20,20)
 heart3.addImage(heartI)
 heart3.scale=0.02

 fireballG=new Group()
 daggerG=new Group()
 enemyG=new Group()
}

function draw() {
 background("black")
 if (gameState==="PLAY"){

 if(keyDown(RIGHT_ARROW)&& gameState==="PLAY"){
    bgS.velocityX=bgS.velocityX-1    
 }
 if(bgS.x<250){
     bgS.x=600
 }
 makeEnemies();
 
 if(keyDown(ENTER)){
     makeFireball()
 }
 if(keyDown("space")){
     makeDagger()
 }
 if(daggerG.isTouching(enemyG)){
     daggerG.destroyEach()
     enemyG.destroyEach()
 } 
  if(fireballG.isTouching(enemyG)){
    fireballG.destroyEach()
    enemyG.destroyEach()
}
 
if(enemyG.isTouching(hero)){
    life=life-1
    enemyG.destroyEach()
    console.log(life)
    if(life===2){
        heart1.addImage(brHeartI)
    }
    else if(life===1){
        heart2.addImage(brHeartI)
    }
    else if(life===0){
        heart3.addImage(brHeartI)
        gameState="END"
    }

  }
}
else if (gameState ==="END") {
  bgS.velocityX=0
  enemyG.setVelocityXEach (0)

}
drawSprites();
textSize(25)
fill("white")
text("LIFE: ",100,70)
 }

function makeEnemies(){
    if(frameCount%180===0){
    var enemy=createSprite(1200,600,50,50)
    enemy.addAnimation("walking",enemy1)
    enemy.debug=false
    enemy.setCollider("rectangle",40,0,20,enemy.height)
    //enemy.velocityX =-1   
    enemy.velocityX=enemy.velocityX-3  
    enemyG.add(enemy) 
}
}
function makeFireball(){
  var fireball =createSprite(400,600,20,20)
   fireball.addImage(fireballI)
   fireball.scale=0.1
   fireball.velocityX=5
   fireballG.add(fireball)
}
function makeDagger(){
    var dagger =createSprite(400,600,20,20)
     dagger.addImage(daggerI)
     dagger.scale=0.1
     dagger.velocityX=5
     daggerG.add(dagger)
  }