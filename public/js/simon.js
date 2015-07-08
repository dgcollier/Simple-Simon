"use strict";

    // Start game: reset array, run: Simon's Turn
    function startGame () {
        simonClick = [];
        simonsTurn();
    };

    /* Simon's turn: reset user array, Run: check high score,
    select random, and replay array */
    function simonsTurn () {
        gamerClick = [];
        checkHighScore();
            // console.log(highScore);
        selectRandom();
        replayArray();
    };

    /* Select random: get random # from 0-3 (inclusive), store game buttons in var boxes, 
    store index of button == random # in highlightButton, get id of that button and store in id,
    add this id to Simon's array */
    function selectRandom () {
        var random = Math.floor(Math.random() * 4);
        var boxes = $(".box");
        var highlightButton = boxes[random];
        var id = highlightButton.id;
            // console.log(id);
        simonClick.push(id);
            // console.log(simonClick);
    };

    /* Replay array: Run: disable gamer click to prevent user error during Simon's "turn".
    Update the game round, set interval on Simon's clicks and clear when he has produced his
    entire array Run: highlight box on jQuery object with id == Simon's click; enable gamer 
    click to turn on event listeners for user click. Wrapped in timeout function to affect UE 
    and speed of round changes and updates. */
    function replayArray () {
        disableGamerClick();

        setTimeout(function () {
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
        }, 1000);
    };

    /* Highlight box: adds class to decrease opacity and change border on game button,
    then removes it 0.5 seconds later inside a timeout function. Both user clicks and 
    Simon's are passed through this. */
    function highlightBox (box) {
           box.addClass("highlight");
        setTimeout(function () {
            box.removeClass("highlight");
        }, 500);
    };

    /* Gamer clicked: called by event listeners on each game button (scroll to bottom).
    Grabs id attribute of game button clicked, stores and pushes to user array, calls 
    the highlight box function from above on the box clicked. Run: compare arrays. */
    function gamerClicked () {
        var gamerChoice = this.id
        // console.log(gamerChoice);
        highlightBox($(this));
        gamerClick.push(gamerChoice);
        // console.log(gamerClick);
        compareArrays();
    };

    /* Check high score: store length of Simon array in variable, use conditional statement
    to update high score when passed, keep value until page refreshed.  */
    function checkHighScore () {
        var currentScore = simonClick.length;

        if(currentScore > highScore) {
            $("#high-score").text("High Score: " + currentScore);
            highScore += 1;
        } else {
            $("#high-score").text("High Score: " + highScore);
        }
    };

    /* Compare arrays: declare variable to hold boolean value, run for loop for each 
    index of user-click array comparing to the Simon-click array, if each index does
    not match, error is true. Run: End Game. Otherwise, once the arrays are the same
    length, Run: Simon's turn. */
    function compareArrays () {
        var gamerError = false;
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

    /* End game: store confirm message in variable, start new game or reload page,
    wrapped in timeout function to prevent UE flaws. */
    function endGame () {
        setTimeout(function() {
            var loser = confirm("You lost. Try again?");
            if (loser) {
                startGame();
            } else {
                location.reload(true);
            }
        }, 501);
    };

    /* Quit game: alerts the user of their final score with a message,
    refreshes page (side effect: resets high score). */
    function quitGame () {
        if (simonClick.length < 5) {
            alert("Your high score was " + (highScore) + ". Did you even try, bro?");
        } else if (simonClick.length < 7) {
            alert("Your high score was " + (highScore) + ". Good effort.");
        } else if (simonClick.length < 10) {
            alert("Your high score was " + (highScore) + ". Great job!");
        } else if (simonClick.length < 15) {
            alert("Your high score was " + (highScore) + ". Wow! You're awesome!");
        } else {
            alert("Your high score was " + (highScore) + ". SUPER. HUMAN.");
        }

        location.reload(true);
    };

    /* Enable gamer click: allow user to click buttons while not Simon's turn.  */
    function enableGamerClick () {
        $("#0").on("click", gamerClicked);
        $("#1").on("click", gamerClicked);
        $("#2").on("click", gamerClicked);
        $("#3").on("click", gamerClicked);
    };

    /* Disable gamer click: disallow user-click on buttons while Simon's turn. */
    function disableGamerClick () {
        $("#0").off("click", gamerClicked);
        $("#1").off("click", gamerClicked);
        $("#2").off("click", gamerClicked);
        $("#3").off("click", gamerClicked);
    };

    /* Declared global variables */
    var gamerClick;
    var simonClick;
    var highScore = 0;

    /* Start button: clicking start calls function Start Game. */
    $("#start").click(function() {
        startGame();
    });

    /* Quit button: clicking quit calls function Quit Game. */
    $("#quit").click(function() {
        quitGame();
    });