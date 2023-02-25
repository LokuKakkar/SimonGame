var buttonColors=["red","blue","green","yellow"];

var gamePattern=[];

var userClickedPattern= [];

var level=0;

var timesKeyPressed=0;


// detecting keypress to start game
$(document).keypress(function(){
    timesKeyPressed=timesKeyPressed+1;

    if(timesKeyPressed===1){
        nextSequence();
    }

})

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    // some code.. 
    $("h1").text("lmaoooo");
    }



function nextSequence(){
    var randomNumber= Math.floor(Math.random()*4);
    // return randomNumber;

    console.log(randomNumber);
    var randomChosenColour=buttonColors[randomNumber];

    gamePattern.push(randomChosenColour);

    console.log(gamePattern);




// SOUNDS


    $("#"+ randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();



    // level changer

    level=level+1;
    $("h1").text("Level "+level);

    userClickedPattern=[];

}

// handler function

// function Handler(evnt){
//     var userChosenColour=  
// }




// handler function event

$(".btn").click(function(evnt){
    var userChosenColour = evnt.target.id;
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);

    animatePress(userChosenColour);

    // nextSequence();

    
    checkAnswer(userClickedPattern.length-1);

});


// button click sound

function playSound(name){
    var audio = new Audio("sounds/" + name+ ".mp3");
    audio.play();
}

// button click animate

function animatePress(name){
    // $("#" + name).hasClass(".pressed");
    $("#" + name).addClass("pressed");
    // $("#"+ name).hasClass(".pressed");

    setTimeout(function () {
        $("#" + name).removeClass("pressed");
      }, 100);

}


// check answer function

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
    }
    else{

        // wrong answer sound

        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();

        // body becomes red

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200);


        // change h1 to game over

        $("h1").text("Game-Over. Press any key to restart");
        level=0;
        userClickedPattern=[];
        gamePattern=[];
        timesKeyPressed=0;



        // alert("NOOOOO");
    }

    if(currentLevel===gamePattern.length-1)
    setTimeout(nextSequence,1000);

}
