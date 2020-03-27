class cannon {
 constructor(gameWidth, gameHeight) {
   this.width = gameWidth;
   this.height= gameHeight;
  this.pos= {
    x:this.width/2,
    y: this.height
    };

    }
cannonDraw(can){
    can.fillStyle="blue";
 can.fillRect(this.pos.x,this.pos.y-150,50,100);
 can.beginPath();
 can.arc(this.pos.x,this.pos.y-25,25,0,Math.PI*2);
 can.closePath();
 can.fillStyle="blue";
 can.fill();
 can.beginPath();
 can.fillStyle="blue";
 can.arc(this.pos.x+50,this.pos.y-25,25,0,Math.PI*2);
 can.closePath();
 can.fillStyle="blue";
 can.fill();
}

}
class bullet{
  constructor(gameWidth,gameHeight){
    this.width = gameWidth;
    this.height= gameHeight;
    this.inherit= new cannon(gameWidth,gameHeight);
    this.bpos=[];
    this.bpos[0]={x:this.inherit.pos.x,
      y:this.inherit.pos.y-150};
  }
  bulletDraw(can,l){

    can.arc(this.bpos[l].x,this.bpos[l].y,5,0,Math.PI*2);
    can.closePath();
    can.fill();
    can.arc(this.bpos[l].x+25,this.bpos[l].y,5,0,Math.PI*2);
    can.closePath();
    can.fill();
    can.arc(this.bpos[l].x+50,this.bpos[l].y,5,0,Math.PI*2);
    can.closePath();
    can.fill();
  }
}
class rock{
  constructor(gameWidth,gameHeight){
      this.r=[];
      this.r[0]= Math.floor(Math.random() * 91 + 60);
      this.strength=[];
      this.strength[0]= this.r[0];
      this.rpos=[];
      this.rpos[0]= {x:gameWidth-this.r[0],
        y:this.r[0]};
        if(this.rpos[0].y<this.r[0]){this.rpos[0].y=this.r[0];}
        this.color=[];
        this.color[0]="#2185C5";

  }
  rockDraw(can,t){
    if(this.r[t]>0)
    {
    can.fillStyle=this.color[t];
    can.arc(this.rpos[t].x,this.rpos[t].y,this.r[t],0,Math.PI*2);
    can.closePath();
    can.fill();}
  }
}
var canvas=document.getElementById("ballBlast");
var can = canvas.getContext("2d");
var game_height= window.innerHeight;
var game_width= window.innerWidth;
var dby=5,drx=[],dry=[],score=0,j,t,i=0,high_score=0;
  var coin_restart=1;
canvas.width=game_width;
canvas.height=game_height;
var mount= new Image(),rand_mount=0,rand_time=0;
var arr_img=["https://static3.scirra.net/images/newstore/products/1506/7.png","https://static3.scirra.net/images/newstore/products/1506/7.png","https://static3.scirra.net/images/newstore/products/1506/2.png","https://static3.scirra.net/images/newstore/products/1506/1.png","mountain.jpg"];
function random_mount(){
  var random= Math.floor(Math.random()*5);
  mount.src= arr_img[random];
}
random_mount();
function rand_timer(){
  rand_time= Math.floor(Math.random() * 400 + 400);
}
rand_timer();
const colors = ['#2185C5', '#7ECEFD','#FFF6E5', '#FF7F66'];
var car= new cannon(game_width,game_height);
var bull= new bullet(game_width,game_height);
var nRock= new rock(game_width,game_height);
var l=bull.bpos.length-1,rl=0,inst=0;
var rock_time=0,score_note=0,once=0,twice=0,click_once=0,tot_coin=Number(localStorage.getItem("total coin")),coin=0;
drx[0]=5;
dry[0]=5;
if(tot_coin== undefined)
{tot_coin=0;
localStorage.setItem("total coin",tot_coin);
}
var score_high=localStorage.getItem("high score");
var arr_r=[];
arr_r[0]=nRock.r[0];
var store=localStorage.getItem("store");
if(store== undefined)
{store=0;
  store++;
localStorage.setItem("store",store);
}
if(score_high==undefined){
  score_high=0;
localStorage.setItem("high score",score_high);
}

function draw(){
  if(score%10==0&&score>0&&rand_mount==0){random_mount();
  rand_mount++;}
  can.drawImage(mount,0,0,game_width,game_height);
  if(click_once==0){
    can.fillStyle="green";
    can.fillRect(game_width-150,10,138,40);
    can.fillStyle ="red";
    can.font= "25px 'montserrat' ";
    can.fillText('Instruction',game_width-150,40);
    can.fillStyle ="red";
    can.fillRect(40,10,210,40);
    can.fillStyle ="yellow";
    can.font= "25px 'montserrat' ";
    can.fillText('total coins:'+tot_coin,50,40);
    can.fillStyle ="red";
    can.font= "40px 'montserrat' ";
    can.fillText('BALL BLAST GAME!!',game_width/2-100,game_height/2-100);
    can.fillStyle ="green";
    can.font= "30px 'montserrat' ";
    can.fillText('Click Any where to Continue',game_width/2-100,game_height/2);
  }
  else{
    can.fillStyle ="black";
    can.fillRect(40,10,150,40);
    can.fillStyle ="yellow";
    can.font= "25px 'montserrat' ";
    can.fillText('coins:'+coin,50,40);

  can.fillStyle ="red";
  can.font= "25px 'montserrat' ";
  can.fillText('score:'+score,game_width/2-100,40);

  can.fillStyle ="red";
  can.font= "25px 'montserrat' ";
  can.fillText('high score:'+score_high,game_width/2+30,40);

  if(inst>0){
    can.fillStyle="green";
    can.fillRect(game_width-150,10,130,40);
    can.fillStyle ="red";
    can.font= "30px 'montserrat' ";
    can.fillText('continue',game_width-150,40);
    instruction();
  }
  else{

  can.fillStyle="green";
  can.fillRect(game_width-150,10,138,40);
  can.fillStyle ="red";
  can.font= "25px 'montserrat' ";
  can.fillText('Instruction',game_width-150,40);
  gameOver();
     if(i>0){}
    else{
  car.cannonDraw(can);
  if(l<=bull.bpos.length){
  if(bull.bpos[l].y<=game_height-200){l++;
    // console.log("pos"+l);
     bulletChange(l);}}
  bulletUpdate();
  if(rock_time%rand_time==0&&rock_time>0){
    ++rl;
    rand_timer();
    rockNew(rl);
  }
  rock_time++;
  if(score%10==0&&score>0&&score_note==0){dby+=2;
  score_note++;}
  rockMove();
  scoreUpdate();
}}}
  requestAnimationFrame(draw);
}
draw();
function bulletUpdate()
{
for(j=0;j<=l;j++){
    bull.bpos[j].y-=dby;
    bull.bulletDraw(can,j);
    if(bull.bpos[0].y<0){bull.bpos.shift();
    l--;
  // console.log("up"+l);
}
}
  }
  function  bulletChange(l)
    {
      bull.bpos[l]={x:car.pos.x,
        y:car.pos.y-150};
      }
      function rockMove(){
        for(t=0;t<=rl;t++){
        if(nRock.rpos[t].x+nRock.r[t]>game_width||nRock.rpos[t].x<nRock.r[t]){drx[t]=-drx[t];}
        if(nRock.rpos[t].y+nRock.r[t]>game_height||nRock.rpos[t].y<nRock.r[t]){dry[t]=-dry[t];}
        nRock.rpos[t].x+=drx[t];
        nRock.rpos[t].y+=dry[t];
        nRock.rockDraw(can,t);
        }
      }
      function rockNew(rl)
      {
        nRock.r[rl]= Math.floor(Math.random() * 91 + 60);
        arr_r[rl]=nRock.r[rl];
        nRock.strength[rl]=nRock.r[rl];
        nRock.rpos[rl]={x:randomx(rl),
                        y:randomy(rl)};
        drx[rl]=5;
        dry[rl]=5;
        nRock.color[rl]= colors[Math.floor(Math.random() * colors.length)];
      }
      function randomx(rl){
        var randx=Math.random();
        if(randx<0.5){
          return nRock.r[rl];
        }
        else{
          return game_width-nRock.r[rl];
        }
      }
      function randomy(rl){
        var rand=Math.random()*(game_height/2);
        if(rand<nRock.r[rl]){return nRock.r[rl];}
        else{return rand;}
      }

      function scoreUpdate(){
        for(j=0;j<=l;j++){
          for(t=0;t<=rl;t++){
              if(j<l){
              if(((bull.bpos[j].y>=nRock.rpos[t].y-nRock.r[t]&&bull.bpos[j].y<=nRock.rpos[t].y+nRock.r[t])&&(bull.bpos[j].x>=nRock.rpos[t].x-nRock.r[t]&&bull.bpos[j].x<=nRock.rpos[t].x+nRock.r[t]))||((bull.bpos[j].x+25>=nRock.rpos[t].x-nRock.r[t]&&bull.bpos[j].x+25<=nRock.rpos[t].x+nRock.r[t])&&(bull.bpos[j].y>=nRock.rpos[t].y-nRock.r[t]&&bull.bpos[j].y<=nRock.rpos[t].y+nRock.r[t]))||((bull.bpos[j].x+50>=nRock.rpos[t].x-nRock.r[t]&&bull.bpos[j].x+50<=nRock.rpos[t].x+nRock.r[t])&&(bull.bpos[j].y>=nRock.rpos[t].y-nRock.r[t]&&bull.bpos[j].y<=nRock.rpos[t].y+nRock.r[t]))){
                nRock.r[t]-=5;
                nRock.strength[t]-=5;
                if(l>2){
                bull.bpos.splice(j,1);
                 l--;}
                 // console.log(l);
                nRock.rpos[t].y-=0.5;
                if(nRock.r[t]<20&&arr_r[t]>70){
                  rockBy2(t,arr_r[t]);
                  score++;
                  coin+=50;
                  rand_mount=0;
                  score_note=0;
   }
                else if(nRock.r[t]<20){
                  nRock.r[t]=0;
                  nRock.strength[t]=0;

                  score++;
                  coin+=50;
                  rand_mount=0;
                  score_note=0;
                   }
              }   if(nRock.strength[t]>0){
                 can.fillStyle ="red";
                    can.font= "30px 'montserrat' ";
                    can.fillText(nRock.strength[t],nRock.rpos[t].x,nRock.rpos[t].y);}
    } }}}
function rockBy2(t,a){
  nRock.r[t]=Math.round(a/2);
  rl++;
  nRock.r[rl]=nRock.r[t];
    nRock.strength[t]=nRock.r[rl];
  nRock.strength[rl]=nRock.r[rl];
  nRock.rpos[rl]={x:nRock.rpos[t].x,
                  y:nRock.rpos[t].y};
  arr_r[t]=a/2;
  arr_r[rl]=a/2;
  drx[rl]=-5;
  dry[rl]=-5;
}
  function gameOver(){
    for(j=0;j<=rl;j++){
    if((((car.pos.x-25>=nRock.rpos[j].x-nRock.r[j])&&(car.pos.x-25<=nRock.rpos[j].x+nRock.r[j]))||((car.pos.x+25>=nRock.rpos[j].x-nRock.r[j])&&(car.pos.x+25<=nRock.rpos[j].x+nRock.r[j]))||((car.pos.x-25>=nRock.rpos[j].x-nRock.r[j])&&(car.pos.x+25<=nRock.rpos[j].x+nRock.r[j])))&&(nRock.rpos[j].y<=game_height&&nRock.rpos[j].y>=game_height-150)||i>0){
      i++;
      can.fillStyle ="red";
      can.fillRect(20,10,210,40);
      can.fillStyle ="yellow";
      can.font= "25px 'montserrat' ";
      can.fillText('total coins:'+tot_coin,25,40);
      can.fillStyle ="red";
      can.font= "70px 'montserrat' ";
      can.fillText("gameOver",(game_width/2)-200,(game_height/2)-100);
      can.fillStyle ="green";
      can.font= "50px 'montserrat' ";
      can.fillText("Refresh to Play Again",(game_width/2)-200,(game_height/2));
      can.fillStyle ="red";
      can.fillRect((game_width/2)-200,(game_height/2)+100,230,40);
      can.fillStyle ="yellow";
      can.font= "25px 'montserrat' ";
      can.fillText('continue?=>'+(200*coin_restart),(game_width/2)-198,(game_height/2)+120);
      highScore();
      if(once==0){
      localStorage.setItem("score-"+store,score);
      store++;
      localStorage.setItem("store",store);
       once++;
       tot_coin+=Number(coin);
       localStorage.setItem("total coin",tot_coin);

     }}         }
        }
  function highScore(){
    if(twice==0){
    if(score>score_high){
      score_high=score;
      localStorage.setItem("high score",score_high);
      high_score++;
   }
    twice++;}
    if(high_score>0){
      can.fillStyle="green";
      can.font= "50px 'montserrat' ";
      can.fillText("HIGH SCORE!!!",(game_width/2)-200,150);
    }
  }
  function instruction(){
    can.fillStyle ="#0028ff";
    can.font= "30px 'montserrat' ";
    can.fillText("Instructions->",game_width/2-100,100);
    can.fillStyle ="red";
    can.font= "20px 'montserrat' ";
    can.fillText("=> use -> and <- keys for moving the cannon.",100,150);
    can.fillStyle ="red";
    can.font= "20px 'montserrat' ";
    can.fillText("=> score points by destroying the deadly rocks.",100,200);
    can.fillStyle ="red";
    can.font= "20px 'montserrat' ";
    can.fillText("=> But don't get too close or you lose.",100,250);
    can.fillStyle ="red";
    can.font= "20px 'montserrat' ";
    can.fillText("=> Certain rocks will split after you destroy it",100,300);
    can.fillStyle ="red";
    can.font= "20px 'montserrat' ";
    can.fillText("=> Now click 'Continue' to proceed and have fun",100,350);
  }
function cannonShop(){
  can.fillStyle="blue";
can.fillRect(this.pos.x,this.pos.y-150,50,100);
can.beginPath();
can.arc(this.pos.x,this.pos.y-25,25,0,Math.PI*2);
can.closePath();
can.fillStyle="blue";
can.fill();
can.beginPath();
can.arc(this.pos.x+50,this.pos.y-25,25,0,Math.PI*2);
can.closePath();
can.fillStyle="blue";
can.fill();

}
    window.addEventListener("keydown",cannonMove, false);
function cannonMove(key){
  if(key.keyCode== "37"&&car.pos.x>35){car.pos.x-=15;}
  else if(key.keyCode== "39"&&car.pos.x<game_width-80){car.pos.x+=15;}}//for cannon mpvement
  canvas.addEventListener('click',function(event){//to access instruction
    if(event.x>game_width-150&&event.x<game_width-20&&event.y>10&&event.y<50){
      if(inst>0){inst=0;}
      else{inst++;}
    }
  });
canvas.addEventListener('click',function(event){click_once++;

});
canvas.addEventListener('click',function(event){
  if(event.x>game_width/2-200&&event.x<game_width+20&&event.y>game_height/2+100&&event.y<game_height/2+150){
  if(i>0&&tot_coin>=(200*coin_restart)){
    tot_coin-=(200*coin_restart);
    localStorage.setItem("total coin",tot_coin);
    dby=5;drx=[];dry=[];i=0;high_score=0;
    car= new cannon(game_width,game_height);
    bull= new bullet(game_width,game_height);
    nRock= new rock(game_width,game_height);
    l=0;rl=0;inst=0;
    score_note=0;once=0;twice=0;coin=0;
    drx[0]=5;
    dry[0]=5;
    coin_restart++;
  }

  }
});
