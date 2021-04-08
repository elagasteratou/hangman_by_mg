
let lives = 10;
const words = ["human", "pets", "rooms", "bedroom"];
const clues = [
  "person",
  "they keep you company",
  "plenty of them in a house",
  "lets have a snooze"
];
const guesses =  "abcdefghijklmnopqrstuvwxyz".split("");


const newWord = document.getElementById("reset");
const hint = document.getElementById("theClue");
const alphabetButton = document.getElementById("gameButtons");

let answerWord = document.getElementById("answerWord");
let randomIndex;
let selectedWord = "";
let hiddenWords = document.createElement("ul"); //hide the answer and use space instead
hiddenWords.setAttribute("id", "answerWord");
answerWord.appendChild(hiddenWords);



const generateRandomIndex = () => {
  //generates random index for the clues(getHint) and the words(newGame)
  randomIndex = Math.floor(Math.random() * words.length);
};


const newGame = () => {
  generateRandomIndex();
  selectedWord = words[randomIndex];
  document.getElementById("theClue").innerHTML = ""; //clear hints
  answerWord.innerHTML = "";
  document.getElementById("hint").hidden = false; //display hint button
  lives = 10;
  document.getElementById("mylives").innerHTML = lives + " Lives left"; //reset the lives left

  for (var i = 0; i < selectedWord.length; i++) {
    //loop to swap the letters to spaces
    let letter = document.createElement("li"); //for every letter create an li element
    letter.setAttribute("id", "letter_" + i);
    letter.innerHTML = "_";
    answerWord.appendChild(letter);

  }
  let lettersButton = alphabetButton.childNodes
  lettersButton.forEach(element => element.disabled = false)
  document.getElementById("gameStatus").innerHTML = "";
};


const getHint = () => {
  hint.textContent = clues[randomIndex];
  hint.textContent = "Hint: " + clues[randomIndex];
};


newWord.addEventListener("click", newGame); //when newWord (the reset button is clicked to carry outhte function above)
document.getElementById("hint").addEventListener("click", getHint);

const  disableAllLetterButtons = () => {
  let lettersButton = alphabetButton.childNodes
  lettersButton.forEach(element => element.disabled = true)
}


const play = (event) => {
  event.target.disabled = true; //disable letters already clicked
  let isFinished = true; // finsihed game by default is true more in if statement below.
  const letter = event.target.innerHTML;

  if (selectedWord.includes(letter)) {

    for (var i = 0; i < answerWord.childNodes.length; i++) {
      if (selectedWord[i] === letter) {
        answerWord.childNodes[i].innerHTML = letter;
      } 
    }
  } else {
    if (lives > 0) {
      lives--;
    } 
  }
    for (var i = 0; i < answerWord.childNodes.length; i++) {
      if (answerWord.childNodes[i].innerHTML === "_") {
        isFinished = false;
      }
    }
  
    if (lives === 0) {
      isFinished = true;

    } 

 
  document.getElementById("mylives").innerHTML = lives + " Lives left";


 if(isFinished){
  disableAllLetterButtons()
  if (lives === 0) {
    document.getElementById("gameStatus").innerHTML = "Game Over";
  } else{
    document.getElementById("gameStatus").innerHTML = "You win";
  }
 }

};

guesses.forEach((guesses) => {
  //creating buttons for each letter in alphabet
  let lettersButton = document.createElement("button");
  lettersButton.setAttribute("id", "indvLetter");
  lettersButton.textContent = guesses;
  lettersButton.addEventListener("click", play);
  alphabetButton.appendChild(lettersButton);
});

disableAllLetterButtons();
