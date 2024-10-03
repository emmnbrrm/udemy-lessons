var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;

function nextSequence(){

    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    level++;
    $("#level-title").text("Level " + level);
}


$(".btn").click(function(){

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    // console.log(userClickedPattern);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

})


function playSound(color){
    var audio = new Audio(`sounds/${color}.mp3`);
    audio.play();
}

function animatePress(currentColor){
    $(`#${currentColor}`).addClass('pressed');

    var delayInMilliseconds = 100; //1 second

    setTimeout(function() {
        $(`#${currentColor}`).removeClass('pressed');
    }, delayInMilliseconds);
}

$(document).click(function(){

    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;

      }
})

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        // console.log(gamePattern[currentLevel]);
        // console.log(userClickedPattern[currentLevel]);
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {


                console.log(level);
                //MODIFICATION
                if(level === 4){
                    // $("#level-title").text("HAHAHHAH");
                    document.location.href = "page.html";
                }else{
                    nextSequence();
                }

            }, 1000);
          }
    }else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass('game-over');
        setTimeout(function () {
            $("body").removeClass('game-over');
          }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}


function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

