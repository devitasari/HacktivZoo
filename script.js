var card = document.getElementsByClassName("card");
var cards = [...card];
var collect = document.getElementById("card-collect");
var moves = 0;
var counter = document.querySelector(".moves");
var stars = document.querySelectorAll(".fa-star");
var matchedCard = document.getElementsByClassName("match");
var starsList = document.querySelectorAll(".stars li");
var closeicon = document.querySelector(".close");
var modal = document.getElementById("popup1")
var openedCards = [];
var nameUser1 = ''
//pop up name when loaded or refresh
function init() {
    var name = prompt("Welcome to the Hacktiv Zoo. For administration purpose, let us know your name");
    if (name === null || name === "" ) {
        alert("Sorry, you can't help Devita due to incomplete data");
        window.location.href = "index.html"
    } else {
        nameUser1 = name
        alert("Hi " + name + "! We appreciate your kind for helping Devita😄")
        startGame();
    }
}
document.body.onload = init();
//shuffles cards based on math random
function shuffle(array) {
    var currentIndex = array.length
    while (currentIndex !== 0) {
        var randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        var temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};
//start new game
function startGame(){
    openedCards = [];
    cards = shuffle(cards);
    for (var i = 0; i < cards.length; i++){
        collect.innerHTML = "";
        [].forEach.call(cards, function(item) {
            collect.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    // reset moves
    moves = 0;
    counter.innerHTML = moves;
    // reset rating
    for (var i= 0; i < stars.length; i++){
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }
    //reset timer
    second = 0;
    minute = 0; 
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}
//open and show class to display cards
var displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};
//Add opened cards to OpenedCards list and check if cards are match or not
function cardOpen() {
    openedCards.push(this);
    var len = openedCards.length;
    if(len === 2){
        moveCounter();
        if(openedCards[0].type === openedCards[1].type){
            matched();
        } else {
            unmatched();
        }
    }
};
//Cards match
function matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}
//Cards don't match
function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "no-event","unmatched");
        openedCards[1].classList.remove("show", "open", "no-event","unmatched");
        enable();
        openedCards = [];
    },1100);
}
//Disable cards temporarily
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}
//Enable cards and disable matched cards
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}
//Count player's moves
function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    //start timer on first click
    if(moves == 1){
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
    }
    // setting rates based on moves
    if (moves > 8 && moves < 12){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 13){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}
//Timer
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = " " + minute+" mins "+second+" secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}
//Greeting card
function congratulations(){
    if (matchedCard.length == 16){
        clearInterval(interval);
        finalTime = timer.innerHTML;
        modal.classList.add("show");
        var starRating = document.querySelector(".stars").innerHTML;
        document.getElementById("nameUser").innerHTML = nameUser1;
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;
        closeModal();
    };
}
function closeModal(){
    closeicon.addEventListener("click", function(e){
        modal.classList.remove("show");
        startGame();
    });
}
//To play Again 
function replay(){
    modal.classList.remove("show");
    startGame();
}
// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click",congratulations);
};
