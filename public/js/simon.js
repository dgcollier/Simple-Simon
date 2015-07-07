"use strict";
    // Declare variables for gamer and Simon's "choices" in the game
    // Declare variable for jQuery array with all buttons
    var gamerClick;
    var simonClick;
    var highScore = 0;
    // var difficulty = 10000;

    // Function called when gamer clicks "Start Game" or wants to continue after losing
    // Resets Simon's array for game reset
    function startGame () {
        simonClick = [];
        simonsTurn();
    };

    // Function called when new game is started
    // Resets gamer's array for game reset
    //
    function simonsTurn () {
        gamerClick = [];
        checkHighScore();
        // console.log(highScore);
        selectRandom();
        replayArray();
    };

    function selectRandom () {
        var random = Math.floor(Math.random() * 4);
        var boxes = $(".box");
        var highlightButton = boxes[random];
        var id = highlightButton.id;
        // console.log(id);
        simonClick.push(id);
        console.log(simonClick);
    };

    function highlightBox (box) {
           box.addClass("highlight");
        setTimeout(function () {
            box.removeClass("highlight");
        }, 500);
    };

    function replayArray () {

        disableGamerClick();

        $("#round").text("Round: " + simonClick.length);

        var i = 0;
        
        var intervalId = setInterval(function () {
            
            highlightBox($("#" + simonClick[i]));
            
            i++;

            if (i >= simonClick.length){
                clearInterval(intervalId);
                enableGamerClick();
            }
        }, 1000);
    };

    function compareArrays () {
        //set variable for comparison
        var gamerError = false;
        // loop through gamerClick and compare arrays
        for (var i = 0; i < gamerClick.length; i++) {
            if (simonClick[i] != gamerClick[i]) {
                gamerError = true;
                break;
            }
        }

        if (gamerError) {
            endGame();
        } else if (gamerClick.length == simonClick.length) {
            simonsTurn();
        }
    };

    function endGame () {
        // reload page, prompt to play again

        var loser = confirm("You lost. Try again?");
        if (loser) {
            startGame();
        } else {
            location.reload(true);
        }
    };

    function quitGame () {
        // stop the game
        if (simonClick.length < 5) {
            alert("Your final score was " + (simonClick.length - 1) + ". Did you even try, bro?");
        } else if (simonClick.length < 7) {
            alert("Your final score was " + (simonClick.length - 1) + ". Good effort.");
        } else if (simonClick.length < 10) {
            alert("Your final score was " + (simonClick.length - 1) + ". Great job!");
        } else if (simonClick.length < 15) {
            alert("Your final score was " + (simonClick.length - 1) + ". Wow! You're awesome!");
        } else {
            alert("Your final score was " + (simonClick.length - 1) + ". SUPER. HUMAN.");
        }

        location.reload(true);
    };

    function gamerClicked () {
        // create variable to collect id of dot clicked
        var gamerChoice = this.id
        // console.log(gamerChoice);
        // call highlight on *this* 
        highlightBox($(this));
        // add id of dot clicked by user to gamerClick array
        gamerClick.push(gamerChoice);
        // console.log(gamerClick);
        // call compareArrays();
        compareArrays();
    };

    function enableGamerClick () {
        $("#0").on("click", gamerClicked);
        $("#1").on("click", gamerClicked);
        $("#2").on("click", gamerClicked);
        $("#3").on("click", gamerClicked);
    };

    function disableGamerClick () {
        $("#0").off("click", gamerClicked);
        $("#1").off("click", gamerClicked);
        $("#2").off("click", gamerClicked);
        $("#3").off("click", gamerClicked);
    };

    function checkHighScore () {

        var currentScore = simonClick.length;

        if(currentScore > highScore) {
            $("#high-score").text("High Score: " + currentScore);
            highScore += 1;
        } else {
            $("#high-score").text("High Score: " + (highScore));
        }
    };

    $("#start").click(function() {
        startGame();
    });

    $("#quit").click(function() {
        quitGame();
    });

