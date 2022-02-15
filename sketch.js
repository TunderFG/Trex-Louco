var trex ,trex_correndo;
var solo ,solo_image;
var soloinv;
var nuvem ,nuvem_image;
var obstaculo, obs1, obs2, obs3, obs4, obs5, obs6;
var score = 0;
var gruponuvens, grupoobs;
var JOGAR = 1;
var ENCERRAR = 0;
var gamestate = JOGAR;
var over, gameover;
var start, gamestart;
var trex_parado;
var jump_sound,die_sound,checkPoint_sound;

function preload(){
    trex_correndo = loadAnimation("trex1.png","trex3.png","trex4.png");
    trex_parado = loadAnimation("trex_collided.png");
    
    solo_image = loadImage("ground2.png");

    nuvem_image = loadImage("cloud2.png");

    obs1 = loadImage("obstacle1.png");
    obs2 = loadImage("obstacle2.png");
    obs3 = loadImage("obstacle3.png");
    obs4 = loadImage("obstacle4.png");
    obs5 = loadImage("obstacle5.png");
    obs6 = loadImage("obstacle6.png");

    over = loadImage("gameOver.png");
    start = loadImage("restart.png");

    jump_sound = loadSound("jump.mp3");
    die_sound = loadSound("die.mp3");
    checkPoint_sound = loadSound("checkPoint.mp3");
    
}

function setup(){
    createCanvas(600,200);
    
    trex = createSprite(30,160,20,50);
    trex.addAnimation("corrida",trex_correndo);
    trex.addAnimation("parado",trex_parado);
    trex.scale = 0.5;
    trex.setCollider("circle",100,0,40);
    //trex.debug = true;

    solo = createSprite(300,180,600,20);
    solo.addImage(solo_image);
    solo.x = solo.width/2;


    gruponuvens = new Group();
    grupoobs = new Group();



    soloinv = createSprite(300,190,600,10);
    soloinv.visible = false;

    gameover = createSprite(300,90);
    gameover.addImage(over);

    gamestart = createSprite(300,150);
    gamestart.addImage(start);
    gamestart.scale = 0.7;
}

function draw(){
    background("white");
    text("Score: "+score,530,50);
    if(gamestate === JOGAR){
        solo.velocityX = -(2+score/500);
        gameover.visible = false;
        gamestart.visible = false;
        trex.collide(soloinv);
        score = score+Math.round(frameCount/200);
        if(solo.x<0){  
            solo.x = solo.width/2;
         }
         if(keyDown("space")&&trex.y>160){
             //trex.velocityY = -12;
             //jump_sound.play();
        }
        trex.velocityY = trex.velocityY + 0.5;
        gerarobstaculos();
        gerarnuvem();
        if(score>0&&score%500 === 0){
            checkPoint_sound.play();
        }
        if(grupoobs.isTouching(trex)){
            //gamestate = ENCERRAR;
            //die_sound.play();
            trex.velocityY = -12;
            jump_sound.play();
        }
    }
    else if(gamestate === ENCERRAR){
        gameover.visible = true;
        gamestart.visible = true;
        solo.velocityX = 0;
        trex.velocityY = 3;
        grupoobs.setVelocityXEach(0);
        gruponuvens.setVelocityXEach(0);
        gruponuvens.setLifetimeEach(-1);
        grupoobs.setLifetimeEach(-1);
        gameover.visible = true;
        gamestart.visible = true;
        trex.changeAnimation("parado",trex_parado);
        
    }
    drawSprites();
}

function gerarnuvem(){
    if(frameCount%50 === 0){
        nuvem = createSprite(600,100,40,10);
        nuvem.velocityX = -2;
        nuvem.addImage(nuvem_image);
        nuvem.y = random(10,100);
        nuvem.scale = random(0.5,1);
        nuvem.depth = trex.depth;
        trex.depth+=1;
        nuvem.lifetime = 350;
        gruponuvens.add(nuvem);
    }
}
function gerarobstaculos(){
    if(frameCount%100 === 0){
        obstaculo = createSprite(600,165,10,40);
        obstaculo.velocityX = -(5+score/100);
        var rend = Math.round(random(1,6));
        switch(rend){
            case 1: obstaculo.addImage(obs1);
            break;
            case 2: obstaculo.addImage(obs2);
            break;
            case 3: obstaculo.addImage(obs3);
            break;
            case 4: obstaculo.addImage(obs4);
            break;
            case 5: obstaculo.addImage(obs5);
            break;
            case 6: obstaculo.addImage(obs6);
            break;
            default:break;
        }
        obstaculo.scale = 0.6;
        obstaculo.lifetime = 350;
        grupoobs.add(obstaculo);
    }

}
