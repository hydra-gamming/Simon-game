var buttonColours=["red","blue","green","yellow"];
var gamePattren=new Array();
var userClickedPattern=new Array();
var level=0;
var started=false;


$(document).keydown(function(){
    if(!started){

        nextSequence();
        started=true;
    }
});

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("h1").text("Level "+level);
  var randomnumber=Math.floor(Math.random()*4);
  
  var randomChoosenColour=buttonColours[randomnumber];
  
  gamePattren.push(randomChoosenColour);
  $("#"+randomChoosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playsound(randomChoosenColour);
 // animatePress(randomChoosenColour)
 // var audio=new Audio("sounds/"+randomChoosenColour+".mp3");
  //audio.play();
}
$(".btn").click(function(){
    var userChoosenColor=$(this).attr("id");
    playsound(userChoosenColor);
    animatePress(userChoosenColor);
   userClickedPattern.push(userChoosenColor);
   checkAnswer(userClickedPattern.length-1);
});
function playsound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattren[currentLevel]){
        if(userClickedPattern.length===gamePattren.length){
        setTimeout(function(){
            nextSequence();
        },1000);
    }     
    }
    else{
        $("body").addClass("game-over");
        playsound("wrong");
        $("h1").text("Game Over, Press any key to Restart");
        startOver();
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
    }
}


function startOver(){
    started=false;
    gamePattren=[];
    level=0;
}