var canvas= document.querySelector("#ballBlast");
var can= canvas.getContext('2d');
var x=window.innerWidth;
var y=window.innerHeight;//for the x and y positions of cannon
var x1=x;
var y1=y;//stores the width and height for checking
var bx,by,rx,ry;
var dx=5,dy=5,r,str,scr=0,i=0,m=0,l=0,u=0;
var j= localStorage.getItem("j");
if(j== undefined)
{j=0;
localStorage.setItem("j",0);
localStorage.setItem("score"+j,m);
j++;}//to get the total no of scores
var bullx=[];//for concecutive bullets
var bully=[];
var sec=0;
function radius(){
  r=Math.random();
  r*=200;
  if(r<50)
  {
    r=60;
  }
  str=Math.round(r);
}
radius();//gets the radius and strength of the boulder
function newRock(){
rx=Math.random()*(x1);
if(rx<x1/2)
{
  rx=r;
}
else{
  rx=x1-r;
}
ry=Math.random()*(y1/2);
if(ry<r)
{
  ry=r;
}}
newRock();//gets starting position of new rock;
canvas.width= x;
canvas.height= y;
var bgn= new Image();
bgn.src="mountain.jpg";
x/=2;
function draw(){

  can.drawImage(bgn,0,0);
  if(((x+25>=rx&&x+25<=rx+(2*r))&&(ry<=y1&&ry>=y-150))||i>0)
  {
    can.fillStyle ="red";
    can.font= "70px 'montserrat' ";
    can.fillText("gameOver",(x1/2)-200,(y1/2)-100);
    can.fillStyle ="green";
    can.font= "50px 'montserrat' ";
    can.fillText("Refresh to Play Again",(x1/2)-200,(y1/2));
    drawText();
    i++;
    highScore();
  }
  else{
  drawText();
  can.fillStyle ="blue";
    can.fillRect(x,y-150,50,100);
    can.beginPath();
    can.arc(x,y-25,25,0,Math.PI*2);
    can.closePath();
    can.fill();
    can.beginPath();
    can.arc(x+50,y-25,25,0,Math.PI*2);
    can.closePath();
    can.fill();
    can.beginPath();
    can.arc(bx,by,5,0,Math.PI*2);
    can.closePath();
    can.fill();
    can.beginPath();
    can.arc(bx+25,by,5,0,Math.PI*2);
    can.closePath();
    can.fill();
    can.beginPath();
    can.arc(bx+50,by,5,0,Math.PI*2);
    can.closePath();
    can.fill();
    can.beginPath();
    can.arc(rx,ry,r,0,Math.PI*2);
    can.closePath();
    can.fill();
    if(str>=0){
    can.fillStyle ="white";
    can.font= "40px 'montserrat' ";
    can.fillText(str,rx,ry);}
   requestAnimationFrame(draw);
}}
draw();
window.addEventListener("keydown",left, false);//for movemnt
function left(key){
  if(key.keyCode== "37")
  {
    if(x-53>=0){
    x-=20;
    draw();}
 }
 else if(key.keyCode== "39")
 {
   if(x+100<=x1)
   {
     x+=20;
     draw();
 }

}}
bx=x;
by=y-150;
bullx.push(bx);
bully.push(by);
function bullet(){
  if(rx+r>x1||rx<r){dx=-dx;}
  if(ry+r>y1||ry<r){dy=-dy;}
  rx+=dx;
  ry+=dy;
  by-=10;
  draw();
  if(by<=0){by=y1-150;
  bx=x;}
  if(((by>=ry-r&&by<=ry+r)&&(bx>=rx-r&&bx<=rx+r))||((bx+25>=rx-r&&bx+25<=rx+r)&&(by>=ry-r&&by<=ry+r))||((bx+50>=rx-r&&bx+50<=rx+r)&&(by>=ry-r&&by<=ry+r))){
    by=y-150;
    bx=x;
    ry--;
     r-=500;
     str-=5;
     if(r<10){r=0;}
     draw();
   }

      if(r<=10&&i==0)
      {
        scr++;
        str--;
        ry--;
        radius();
        newRock();
        draw();

      }
      requestAnimationFrame(bullet);
    }
    bullet();
    function drawText(){
      can.fillStyle ="red";
      can.font= "40px 'montserrat' ";
      can.fillText('score:'+scr,x1/2-100,50);
    }
    function rockNew()
    {
      can.beginPath();
      can.arc(rx,ry,r,0,Math.PI*2);
      can.closePath();
      can.fill();
      if(str>=0){
      can.fillStyle ="white";
      can.font= "40px 'montserrat' ";
      can.fillText(str,rx,ry);}
      // requestAnimationFrame(rockNew);

    }
    function highScore()
    {
      for(var k=0;k<j;k++){
        var fun=localStorage.getItem("score"+k);
        if(scr>fun)
        {
          ++l;
        }
      }
      if(l>0){
        can.fillStyle ="red";
        can.font= "70px 'montserrat' ";
        can.fillText("HIGH SCORE",(x1/2),200);

      }
      if(u==0){
      localStorage.setItem("score"+j,scr);
      j++;
      u++;
      localStorage.setItem("j",j);
      }

    }
    setInterval(function(){++sec;},1000);
