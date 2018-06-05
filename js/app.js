/*
 * Create a list that holds all of your cards
 */
let cards=document.getElementsByClassName("card");



let deck=document.querySelector(".deck");
//declare move number variable
let moveNumber=0;
let counter=document.querySelector(".moves");

//declaring star variable
let stars=document.querySelectorAll(".fa-star");


//decalre matchedcard variable
let matchedCards=document.getElementsByClassName("match");

//declare opened cards
let openedCards=[];

//declare restart, playAgain
let restartGame=document.getElementsByClassName("restart");
let playAgain=document.getElementById("playAgain");


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

document.body.onload=startGame();

function startGame(){
  cards=shuffle(cards);
  //deck.innerHTML="";
  for (let i=0; i<cards.length; i++){
    cards[i].classList.remove("show", "open", "match", "disabled");
    deck.append(cards[i]);
  }
  //reset moveNumber
  moveNumber=0;
  counter.innerHTML=moveNumber;
  //reset star rating;
  for (var i=0; i<stars.length; i++){
    stars[i].style.color="ffff00";
    stars[i].style.visibility="visible";
  }
  //reset timer
  let second=0;
  let minute=0;
  let hour=0;
  let timer=document.querySelector(".timer");
  timer.innerHTML="0 hrs 0 mins 0 secs";
  clearInterval(interval);
}

restartGame.addEventListener("click", startGame);
playAgain.addEventListener("click", startGame);

//display the card's symbol
function display(){
  this.classList.add("open");
  this.classList.add("show");
}

//check match or unmatch when open a card
function openCard(){
  openedCards.push(this);
  let len=openedCards.length;
  if(len===2){
    moveCounter();
    if(openedCards[0].children().attr("class")===openedCards[1].children().attr("class")){
      matched();
    }
    else {
      unmatched();
    }
  }
}

// when two cards are matched
function matched(){
  openedCards[0].classList.add("match", "disabled");
  openedCards[1].classList.add("match", "disabled");
  openedCards[0].classList.remove("show", "open");
  openedCards[1].classList.remove("show", "open");
  openedCards=[];
}

//when two cards are not matched
function unmatched(){
  openedCards[0].classList.add("unmatched");
  openedCards[1].classList.add("unmatched");
  Array.prototype.filter.call(cards, function(card){
    card.clssList.add("disabled")
  });
  setTimeout(function(){
    openedCards[0].classList.remove("show", "open");
    openedCards[1].classList.remove("show", "open");
    Array.prototype.filter.call(cards, function(card){
      card.classList.remove("disabled");
      for (let i=0; i<matchedCards.length; i++){
        matchedCard[i].classList.add("disabled");
      }
      openedCards=[];
    });
  }, 1000);
}

function moveCounter(){
  moveNumber++;
  counter.innerHTML=moveNumber;
  //start timer on first move;
  if (moveNumber==1){
    second=0;
    minute=0;
    hour=0;
    startTimer();
  }
  //set star rates based on moves
  if (moveNumber>12 && moveNumber<16) {
    stars[2].style.visibility="collapse";
  }
  else if (moveNumber>15) {
    for (i=1; i<3; i++){
      stars[i].style.visibility="collapse";
    }
  }
}

//timer function
let timer=document.querySelector(".timer");
let interval;
function startTimer(){
  interval=setInterval(function(){
    timer.innerHTML=hour+"hrs"+minute+"mins"+second+"secs";
    second++;
    if (second==60){
      minute++;
      second=0;
    }
    if (minute==60){
      hour++;
      minute=0;
    }
  }, 1000);
}
// win message
function win(){
  if (matchedCard.length==16){
    clearInterval(interval);
    winMemo.classList.add("show");
    document.getElementById("totalMove").innerHTML=moveNumber;
    document.getElementById("starRating").innerHTML=document.querySelector("stars").innerHTML;
  }
}

//add eventlistener to card
for (let i=0; i<cards.length; i++){
  cards[i].addEventListener("click", display);
  cards[i].addEventListener("click", openCard;
  cards[i].addEventListener("click", win);
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
