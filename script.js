console.log("JavaScript is running.");

var firstNumber, secondNumber, levelDesc, solution, gameLevel, ansResult, probCount = 0, corrCount = 0, pause, timerExpired = false;

let varLevelForm = document.getElementById("frmGameLevel");

// Listen for the user to select a level, then initiate 'playGame(gameLevel)'
varLevelForm.addEventListener("click", (e) => {
  e.preventDefault();
  gameLevel = document.querySelector('input[name = "gameLevel"]:checked').value;
  // Hide the pick level DIV after a level was selected
  document.getElementById("divGameLevel").style.display = 'none';
  // Start the timer
  timer();
  // Play the game
  playGame(gameLevel);
    })

// Function to play game INIT
function playGame(gameLevel){
    //Set the background colors to white
    document.getElementById("colorFlash").style.backgroundColor = "white";
    document.getElementById("totCountHeading").style.backgroundColor = "white";

    // Generate 2 random numbers
    ranNumbers(gameLevel);

    // Generate the problem & describe the level, output to console
    genProblem(firstNumber, secondNumber, levelDesc);

    // Display the problem to the user
    displayProblem(firstNumber, secondNumber)

}  // End playGame()

// Function to create random numbers to multiply
function ranNumbers(gameLevel) {
    //Level 1 Numbers to use in firstNumber
    
    switch (gameLevel) {
        case '1':
            levelDesc = "Level 1: First is 1-10, Second is 1-12.",
            firstNumber = Math.floor((Math.random() * 10) + 1),             // 1st Number is between 1 - 10
            secondNumber = Math.floor((Math.random() * 12) + 1);            // 2nd Number is between 1 - 12
            break;

        case '2':
            levelDesc = "Level 2: First is 1-10, Second is 10-20.",
            firstNumber = Math.floor((Math.random() * 10) + 1),             // 1st Number is between 1 - 10
            secondNumber = Math.floor(Math.random() * (20 - 10) + 10);      // 2nd Number is between 10 - 20
            break;

        case '3':
            levelDesc = "Level 3: First is 1-10, Second is 10-100.",
            firstNumber = Math.floor((Math.random() * 10) + 1),             // 1st Number is between 1 - 10
            secondNumber = Math.floor(Math.random() * 91) + 10;             // 2nd Number is between 10 - 100
            break;

        case '4':
            levelDesc = "Level 4: First is 10-20, Second is 10-20.",
            firstNumber = Math.floor((Math.random() * 20) + 10),              // 1st Number is between 10 - 20
            secondNumber = Math.floor((Math.random() * 20) + 10);             // 2nd Number is between 10 - 20
            break;

        default:
            levelDesc = "Level 5: First is 1-10, Second is 1-12.",
            firstNumber = Math.floor((Math.random() * 10) + 1),             // 1st Number is between 1 - 10
            secondNumber = Math.floor((Math.random() * 12) + 1);            // 2nd Number is between 1 - 12
            break;

        } // END Switch
        return firstNumber, secondNumber, levelDesc;
    }  // END ranNumbers()
 
// Function to generate a problem
function genProblem(firstNumber, secondNumber, levelDesc){
    this.firstNumber = firstNumber,
    this.secondNumber = secondNumber,
    this.levelDesc = levelDesc;
    solution = firstNumber * secondNumber;
    probCount++;
    document.getElementById("level").innerHTML=`${levelDesc}`;
} // END genProblem()

// Function to display a problem and call chkAnswer()
function displayProblem(firstNumber, secondNumber) {
    document.getElementById("question").innerHTML=`${firstNumber} * ${secondNumber} = <input type="number" placeholder="0" style="width: 5em" id="inpAnswer"> <button onclick="chkAnswer()")>Go</button>`;

// Add an event listener for the "keydown" event
    let varAnsForm = document.getElementById("inpAnswer"); 
    varAnsForm.addEventListener("keydown", function(event) {
        // Check if the pressed key is Enter
        if (event.key === "Enter" || event.keyCode === 13) {
        chkAnswer();
        console.log("Enter key pressed!");
        } 
    }); // END 'keydown" listener

} // END displayProblem()

// Function to check the answer and move onto next question
function chkAnswer() {
    let varInpAnswer = document.getElementById("inpAnswer").value;
        // if answer is correct
    if (varInpAnswer == solution){
        ansResult = true;
        corrCount++;
        pause = 1000;
        document.getElementById("colorFlash").style.backgroundColor = "green";
        resultStr = '&#x2714; Correct!';}
    else {
        // if answer is wrong
        document.getElementById("colorFlash").style.backgroundColor = "red";
        resultStr = `&#x274c; Incorrect, the correct answer is ${solution}`;
        pause = 2000;
    } // END if
    
    // Display feedback of User's answer (right/wrong), Display the tally of correct answere & # of problems attempted
    document.getElementById("question").innerHTML+=` ${varInpAnswer} is ${resultStr}.`;
    document.getElementById("tally").innerHTML=`${corrCount}`;    
    document.getElementById("totCount").innerHTML=`${probCount}`;

    // Call the delay function and pass in the gameLevel
    delay(gameLevel);

}  // END chkAnswer
    
// Create the delay between question and answer
async function delay() {
    await new Promise(resolve => setTimeout(resolve, pause));
    console.log(`Delay running, timerExpired = ${timerExpired}`);
    if (timerExpired == false) {

        // If time has NOT expired, play the game
        playGame(gameLevel);

    } // End if then
    else {
        // If time has expired, do not play the game, call endGame()
        endGame();
    }  // END else
    
  } // END delay()

// Countdown Timer
function timer() {
    let timeLeft = 30;
    let elem = document.getElementById('timer');    
    let timerId = setInterval(countdown, 1000);
    
    function countdown() {
      if (timeLeft == -1) {
        // Set the timerExpired variable to true
        timerExpired = true;
        clearTimeout(timerId);
               
      } else {
        elem.innerHTML = '<p>' + timeLeft + ' seconds remaining' + '</p';
        timeLeft--;
      }
    } // END Countdown
} // END timer()

// END OF GAME
function endGame() {
    document.getElementById("question").innerHTML="  TIME'S UP";
    let reloadPage = document.getElementById("reloadPage");

// Listen for the user to Start new game
reloadPage.addEventListener("click", (e) => {
  e.preventDefault();
  location.reload();
});
    
}  // END endGame