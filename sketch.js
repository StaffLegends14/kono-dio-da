const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;

var bg_img;
var food;
var rabbit;

var button,blower;
var bunny;
var blink,eat,sad;
var mute_btn;

var fr,rope2;

var bk_song;
var cut_sound;
var float
var sad_sound;
var eating_sound;
var air;
function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  airosoft = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 

  glob = loadImage("bubble.png")
}

function setup() {
  createCanvas(500,700);

  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(10,200);
  button.size(50,50);
  button.mouseClicked(drop);

  button2 = createImg('cut_btn.png');
  button2.position(170,350);
  button2.size(50,50);
  button2.mouseClicked(drop1);

  //balon = createImg('balloon.png');
  //balon.position(40,200);
  //balon.size(100,100);
  //balon.mouseClicked(air)

  mute = createImg('mute.png');
  mute.position(width - 40,20);
  mute.size(20,20);
  mute.mouseClicked(silence)
//Bodies.circle(width/2 - 100,550,10,{isStatic: true});
  float = createSprite(width/2 - 100,550,10,10);
  float.addImage(glob)
  


  
  rope = new Rope(4,{x:30,y:200});
  rope1 = new Rope(5,{x:200,y:350});
  ground = new Ground(200,690,600,20);
  ground1 = new Ground(width/2,150,70,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(width/2 - 10,ground1.body.position.y - 70,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(width/2,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con1 = new Link(rope1,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  //imageMode(CENTER)
  float.scale = 0.08
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,490,690);
  //ellipse(float.position.x,float.position.y,20,20);
  push();
  imageMode(CENTER);
  if(fruit){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();
  rope.show();
  rope1.show();
  Engine.update(engine);
  ground.show();
  ground1.show();
  
  // bubble = image(glob,float.position.x,float.position.y,60,60)
  

  drawSprites();

  if(collide(fruit,float,60)==true)
  {
    engine.world.gravity.y = -1;
    float.position.x = fruit.position.x;
    float.position.y = fruit.position.y;

  }


  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('crying');
    fruit=null;
    sad_sound.play();
    bk_song.stop();
     
   }


   if(collide(fruit,bunny,80)==true)
   {
     bunny.changeAnimation('eating');
     eating_sound.play();
     bk_song.stop();
     float.visible = false
     World.remove(world,fruit)
     fruit = null
     
     
     
   }
   //if(fruit.position.y === 550 && fruit.position.x === width/2 - 100)
   //{
    
   // }
   
}

function drop()
{
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
  cut_sound.play();
}

function drop1()
{
  rope1.break();
  fruit_con1.detach();
  fruit_con1 = null; 
  cut_sound.play();
}


function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
              World.remove(engine.world,fruit);
               //fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}

function air(){

   Matter.Body.applyForce(fruit,{x:0, y:0},{x:0.01,y:0});
   airosoft.play();

}

function silence(){
  if(bk_song.isPlaying()){
    bk_song.stop();
  }
   
  else{
    bk_song.play();
  }
  
}