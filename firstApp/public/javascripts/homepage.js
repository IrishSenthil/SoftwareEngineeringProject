var context;
var jumpCanvas;
var x=0;  //Starting x value
var y=100;  //starting y value
var dx=6;  //rate of change of x value (x-speed)
var dy=0;  //rate of change of y value (y-speed)
var marioGround = new Image;
var marioSky = new Image;
var marioRun = new Image;
var marioRunFlipped = new Image;
var marioRunTwo = new Image;
var marioRunTwoFlipped = new Image;
var marioRunThree = new Image;
var marioRunThreeFlipped = new Image;
var marioJump = new Image;
var marioJumpFlipped = new Image;
var bulletBill = new Image;
var bulletBillx=0;
var bulletBilldx=6;
var marioWall = new Image;
var moveMeter = 0;
var gameScore = 0;
var jumpTrigger = false;
var j=0;
var midStep = false;
var marioJumping = document.getElementById("marioJumping");
var jumpTime=0;
var jumpStage=0;
var marioPosition = 100;
var vulnerable = false;
var hit = false;
var clear = false;

marioWall.src = "https://scontent-dub4-1.xx.fbcdn.net/v/t1.0-9/27331748_772113252983075_7180966356641750945_n.jpg?oh=ede0f5cd696c5a7beaf7e2fab2f02bd6&oe=5B21E1D6";
marioGround.src = "https://scontent.fdub1-1.fna.fbcdn.net/v/t31.0-8/27164633_769642033230197_3310307531449694508_o.png?oh=e4eff069f7af82bbad5f74a747786535&oe=5AEC980A";
marioSky.src = "https://scontent.fdub1-1.fna.fbcdn.net/v/t31.0-8/27023329_769678173226583_7851678716185046962_o.png?oh=c390d6c674f5b55d8ca05b0a0902512e&oe=5AE389FB";
marioRun.src = "https://scontent.fdub1-1.fna.fbcdn.net/v/t1.0-9/27332531_769687789892288_3206730982696979901_n.png?oh=3780f86ed7c684540518eb8b53c37731&oe=5ADA5B7B";
marioRunTwo.src = "https://scontent.fdub1-1.fna.fbcdn.net/v/t1.0-9/27336939_769691086558625_7265624589848601238_n.png?oh=795dcb57a4132cd9df898d65227b4853&oe=5AE70CDC";
marioRunThree.src = "https://scontent.fdub1-1.fna.fbcdn.net/v/t1.0-9/27331788_769701963224204_7515919421864263316_n.png?oh=dfcbc7cc2a78226f8796480eccaed668&oe=5B1D5539";
marioJump.src ="https://scontent.fdub1-1.fna.fbcdn.net/v/t1.0-9/27336757_769999943194406_192357506866066718_n.png?oh=b173e5a46221eae0727ec39b7c7554ac&oe=5B2034A3";
bulletBill.src="https://scontent.fdub1-1.fna.fbcdn.net/v/t1.0-9/27067571_771790183015382_2945565804751162241_n.png?oh=bee1ad37ccb5e2cf532f21a282943dfc&oe=5ADB501E";

function init()
{
    context= myCanvas.getContext('2d');
    jumpCanvas = canvasTwo.getContext('2d');
    setInterval(draw,50); //speed of animation execution
}

function draw()
{
    context.font = "20px Georgia";
    context.clearRect(0,0, 300,300);
    context.beginPath();
    context.fillStyle="red";
    // Draws a circle of radius 20 at the coordinates 100,100 on the canvas
    //context.arc(x,y,20,0,Math.PI*2,true);

    //context.rect(x, y, 20, 20);

    context.fill();
    // Boundary Logic
    if( (x<0) || (x>=1300)) {

        dx = -dx;
    }
    bulletBillx = x;
    bulletBillx = bulletBillx*3;
    //if(bulletBillx>1300)
   // {
   //     bulletBilldx = -bulletBilldx;
   // }
    context.drawImage(marioSky, -x*0.5-10, 0, 1920*0.3, 1080*0.3);
    context.drawImage(marioSky, -x*0.5+490, 0, 1920*0.3, 1080*0.3);
    context.drawImage(marioGround, (-x-10), 280, 1152*0.5, 648*0.5);
    context.drawImage(marioGround, (-x+500), 280, 1152*0.5, 648*0.5);
    context.drawImage(marioGround, (-x+1000), 280, 1152*0.5, 648*0.5);
    context.rect(0, 200, 20, 20);
    context.drawImage(bulletBill, bulletBillx, 260, 17, 17);
    context.drawImage(marioWall, 0-x, 180, 100, 100);
    context.drawImage(marioWall, 1430-x, 180, 100, 100);
    context.closePath();
    // jumpCanvas.drawImage(bulletBill, 100, 255, 25, 25);

    if((vulnerable==true) && ((bulletBillx>82) && (bulletBillx<130)) && (clear==false))
    {
        hit = true;
    }

    if(hit == true)
    {
        context.fillText(marioPosition, 50, 40);
        context = null;
    }

    if((moveMeter <= 3) && (jumpTrigger == false))
    {
        context.drawImage(marioRun, 100, 240, 142*0.25, 158*0.25);
        midStep = false;
    }

    if((((moveMeter<=6)&&(moveMeter>3))||((moveMeter<=12) &&(moveMeter>9)))  && (jumpTrigger == false))
    {

        context.drawImage(marioRunTwo, 100, 240, 110*0.25, 160*0.25);
        midStep=true;

    }

    if((moveMeter <= 9) && (moveMeter >6) && (jumpTrigger == false))
    {
        context.drawImage(marioRunThree, 100, 240, 142*0.25, 158*0.25);
        midStep = false;
    }

    if((moveMeter >11) && (jumpTrigger == false))
    {

        moveMeter = 0;
        midStep = false;
    }

    context.fillText(x, 20, 20);

    moveMeter++;
    gameScore++;
    context.fillText(bulletBillx, 100, 40);

    if(midStep == true)
    {
        x+=(dx)*0.5;
    }
    else {
        x+=dx;
    }
    j++;

    if(bulletBillx>1300 || bulletBillx<0)
    {

    }


    if(jumpTrigger == true)
    {
        vulnerable = true;
        //jumpCanvas.drawImage(marioJump, 200, 240 - (j * 0.5), 142 * 0.25, 158 * 0.25);
        // jumpCanvas.clearRect(200, 240 - (j * 0.5), 142 * 0.25, 158 * 0.25);
        //  jumpTrigger = false;
        //if(jumpTime>20)
        marioJumping.style.visibility = "visible";
        if(jumpTime<5)
        {
            marioJumping.style.top = (76-jumpTime*5)+'%';
            jumpTime++;
            if(jumpTime>=3)
            {
                clear = true;
            }
            if(jumpTime==5)
            {
                jumpStage = 1;
            }
        }

        if(jumpStage==1)
        {
            if(jumpTime>7)
            {
                jumpStage = 0;
                jumpTrigger = false;
                marioJumping.style.visibility = "hidden";
                jumpTime = 0;
            }

            if(jumpTime<=4)
            {
                clear = false;
            }
            //jumpTime=0;
            marioJumping.style.top = (46+jumpTime*4)+'%';
            jumpTime++;

        }

    }
}

function jump() {
    jumpTrigger = true;
}
