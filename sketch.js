
var rock, coversol,sol, para,ground,sbullet,ebullet;
 var wall,helicopter,rockimg,helicopterimg,sbulletimg,ebulletimg;
 var wallimg,coversolimg, solimg,paraimg;
var enemyimg,enemy, sbulletgp,ebulletgp;
var solhel=3;
var enemyhel=10;
var sshieldh=5;
var eshieldh= 5;
var gameState="play";

 function preload () {
 helicopterimg = loadImage("helicoptre.png");
 wallimg = loadImage ("shilde.png") ;
 coversolimg = loadImage ("coversoldier.png") ;
sbulletimg = loadImage ("solbulletm.png");
ebulletimg = loadImage ("enemybullet.png");
 solimg = loadImage ("firing.png") ;
 paraimg = loadImage ("mainjump.png") ;
 rockimg = loadImage ("cover.png") ;
 enemyimg = loadImage ("enemy.png") ; 
}
 
 function setup() {
  createCanvas(1200,600);
  
  helicopter = createSprite(1200,80,50,50);
  helicopter.addImage(helicopterimg);
  helicopter.scale = 0.6;
  helicopter.velocityX = -3 ;
 
  para = createSprite(150,80,50,50);
  para.addImage(paraimg);
  para.scale = 0.3;
  para.visible=false;
  para.setCollider("rectangle",0,0,250,730);

  sol = createSprite(150,520,50,50);
  sol.addImage(solimg);
  sol.scale = 0.5;
  sol.visible=false;
  sol.setCollider("rectangle",0,0,150,270);
  //para.debug=true;
  //sol.debug=true;
  ground = createSprite(600,580,1200,20); 

  rock = createSprite(400,543,50,50);
  rock.addImage(rockimg);
  rock.scale = 0.4;
 // rock.visible=false;
  rock.setCollider("rectangle",0,0,150,270);
  para.debug=true;

  enemy = createSprite(1050,520,50,50);
  enemy.addImage(enemyimg);
  enemy.scale = 0.13;
  //enemy.visible=false;
  enemy.setCollider("rectangle",0,0,150,270);
  enemy.debug=true;
  

  sbulletgp= new Group();
  ebulletgp= new Group();

}
function draw() {
  background(220);  
  text("Health of soldier= "+ solhel, 50,100);
  text("Health of enemy= "+ enemyhel, 900,100);
  if(gameState==="play"){
  if(helicopter.x===150){
  helicopter.velocityX= 0;
  para.velocityY = 3 ;
  para.visible=true;
 }
 
 if(para.isTouching(ground)){
 helicopter.visible=false;
 para.visible=false;
 sol.visible=true;
}
if(sol.x<=380){
if(keyDown("right")){
sol.x=sol.x+3;
}
if(keyDown("left")){
  sol.x=sol.x-3;
}
}
if(sol.isTouching(rock)){
  sol.x=sol.x-3;
}

if(keyDown("space") && sol.visible===true) {
  createBullet();
}
if(para.isTouching(ground)){
if(frameCount%30 ===0 ){
  createBulletenemy();
}
}

if(solhel===0){
  gameState="over";
}
if(ebulletgp.isTouching(sol) && solhel>0){
  solhel=solhel-1;
}
if(enemyhel===0){
  gameState="over";
}
if(sbulletgp.isTouching(enemy) && enemyhel>0){
  enemyhel=enemyhel-1;
}

}
if(gameState==="over"){
  textSize(20);
  text("Game Over", width/2,height/2);
  ebulletgp.destroyEach();
  sbulletgp.destroyEach();
}

drawSprites();
}

function createBullet(){
sbullet = createSprite(150,500,10,5);
sbullet.velocityX= 7;
sbullet.x= sol.x;
sbullet.lifetime= 300;
sbulletgp.add(sbullet);
sbullet.addImage(sbulletimg);
sbullet.scale=0.09;
}
function createBulletenemy(){
  ebullet = createSprite(1050,500,10,5);
  ebullet.velocityX= -6;
  ebullet.x= enemy.x;
  ebullet.lifetime= 700;
  ebulletgp.add(ebullet);
  ebullet.addImage(ebulletimg);
  ebullet.scale=0.09;
  }