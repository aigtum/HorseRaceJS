var startButton, newGameButton; 
var started = false;

var horses = [];
var finished = [];


function setup() {
    createCanvas(800, 400);
    frameRate(30);
    background(0, 230, 50);
    
    player = new Player(100);
    var betInput = document.getElementById("submitBetInput");
    
    var playerFunds = document.getElementById("playerFunds").innerText = player.money;
    
    betInput.addEventListener("click", function() {
        var betAccepted = player.bet();
        if(betAccepted == true) {
            startGame();
        }
    });
    
    //startButton = createButton("Start!");
    //startButton.mousePressed(startGame);
    newGame();
}

function newGame() {
    // clear states
    finished = [];
    horses = [];
    started = false;
    
    let oddsName = document.getElementById("oddsName");
    let oddsOdds = document.getElementById("oddsOdds");
    let betName = document.getElementById("betName");

    oddsName.innerHTML = "";
    oddsOdds.innerHTML = "";
    betName.innerHTML = "";

    // set up horses
    var colors = ["red", "lightblue", "green", "orange", "pink", "yellow", "purple", "magenta", "white", "grey"];
    h1 = new Horse("Rodney", colors.pop(), 10);
    h2 = new Horse("Peter", colors.pop(), 10);
    h3 = new Horse("Bob", colors.pop(), 10);
    h4 = new Horse("Archie", colors.pop(), 10);
    h5 = new Horse("Thor", colors.pop(), 10);
    h6 = new Horse("Odin", colors.pop(), 10);
    h7 = new Horse("Bjorn", colors.pop(), 10);
    h8 = new Horse("Freya", colors.pop(), 10);
    h9 = new Horse("Lazer", colors.pop(), 10);
    h10 = new Horse("Monkey", colors.pop(), 10);
    horses.push(h1, h2, h3, h4, h5, h6, h7, h8, h9, h10);
    
    background(0, 230, 50);
    
    // draw horses on the field
    let counter = 10;
    for (var i = 0; i < horses.length; i++) {
        oddsName.innerHTML += "<td>" + horses[i].name + "</td>";
        oddsOdds.innerHTML += "<td>" + horses[i].odds.toFixed(2) + "</td>";
        betName.innerHTML += "<option>" + horses[i].name + "</option>";

        // set y-position
        horses[i].yPos = counter;
        horses[i].xPos = 10;
        counter += horses[i].size + 20;
        horses[i].show();
    }
}

function startGame() {
    started = true;
}

function draw() {
    if (started == true) {
        background(0, 230, 50);
        
        // show finished horses
        for (var i = 0; i < finished.length; i++) {
            finished[i].showFinished();
        }
        
        for (var i = 0; i < horses.length; i++) {
            if (horses[i].finished == true) {
                // give horse a finish number
                horses[i].position = finished.length+1;
                // remove from runnning -> put in finished
                var index = horses.indexOf(horses[i]);
                if (index > -1) {
                    finished.push(horses[i]);
                    horses.splice(horses.indexOf(horses[i]), 1);
                }
            } else {
                horses[i].show();
                horses[i].run();    
            }
        }
        
        // everyone is done
        if (finished.length == 10) {
            if (player.chosenHorse == finished[0].name) {
                player.setMoney(player.money + floor(betAmount.value * finished[0].odds));
                confirm("Your horse won! Would you like to bet once more?");
                newGame();
            } else {
                if (player.money <= 0) {
                    alert("You lost all your money and cannot continue any more!");
                    setup();
                } else {
                    confirm("Your horse lost! Would you like to play again?");
                    newGame();
                }
            }
            started = false;
        }
    }
}


