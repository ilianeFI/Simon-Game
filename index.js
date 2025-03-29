var userClickedPattern=[];
var gamePattern=[];
var buttonCoulours=["red","yellow","blue","green"];
var gameState=false;
var level=0;

//Detecting keyPress
if(gameState===false){
    $(document).on("keydown",function(){
        nextSequence();
        gameState=true;
    });
}


function nextSequence(){
    userClickedPattern=[];
    var randomNumber=Math.floor(Math.random()*4);//generate A random Number
    var randomChosenColour=buttonCoulours[randomNumber];//selecting a random coulour
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100); //flash
     playSound(randomChosenColour);//play sound for coulour
    level++;
    $("h1").text("level "+level);
}
//function to play sound for random button
function playSound(name){
    var audio=new Audio("./sounds/"+name+".mp3");
    audio.play();
}

$(".btn").on("click",function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    $("#"+userChosenColour).fadeOut(100).fadeIn(100);
    playSound(userChosenColour);
    // console.log(userClickedPattern);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
 });

function animatePress(currentCoulour){
    $("#"+currentCoulour).addClass("pressed");
    setTimeout(function(){
       $("#"+currentCoulour).removeClass("pressed");
    },50)
}   

//checking player Answer

    function checkAnswer(currentLevel){
        
        if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
            
            if(gamePattern.length===userClickedPattern.length){
                setTimeout(function(){
                    nextSequence();
                },1000);
                
            }
        }else{
            playSound("wrong");
            $("body").addClass("game-over")
            setTimeout(function(){
                $("body").removeClass("game-over");
            },200);
            $("#level-title").text("Game Over, Press Any Key to Restart");
            startOver();
        }

    }

    function startOver(){
        level=0;
        gamePattern=[];
        gameState=false;
    }



