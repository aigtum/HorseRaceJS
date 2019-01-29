
var extraChancePercent = 10;
var trackLength = 779;


function Horse(name, color, xPos) {
    this.name = name;
    this.color = color;
    this.pace = Math.random()*5+5;
    this.stamina = Math.random()*50+30;
    this.odds = 9.01 - (this.pace * this.stamina / 100);
    this.extraChance = Math.random();
    this.size = 20;
    this.xPos = xPos;
    this.yPos = 0;
    this.finished = false;
    this.position = 0; 

    var twoThirds = 2*this.stamina/3;
    
    this.show = function() {
        // show horses
        fill(this.color);
        rect(this.xPos, this.yPos, this.size, this.size);
        // show names
        fill("black");
        textAlign(LEFT, CENTER);
        text(this.name, this.xPos+this.size+5, this.yPos+8, this.size, this.size);
    };
    
    this.showFinished = function() {
        // show finished horses
        fill(this.color);
        rect(this.xPos, this.yPos, this.size, this.size);
        // show finish numbers
        fill("black");
        textAlign(CENTER, CENTER);
        text(this.position, this.xPos+2, this.yPos, this.size, this.size);
        // show finished names
        fill("black");
        textAlign(RIGHT, CENTER);
        text(this.name, this.xPos-this.size, this.yPos+8, this.size, this.size);
    };
    
    this.run = function() {
        // if horses are finished - stop them
        if (this.xPos >= trackLength - 5) {
            this.finished = true;
            this.pace = 0;
            this.xPos = trackLength - 5;
        // stamina management (two thirds stamina)
        } else if (this.stamina >= twoThirds) {
            this.xPos += this.pace;
            this.stamina -= 1;
        // horses are drained
        } else if (this.stamina > 1) {
            this.xPos += this.pace / 2;
            this.stamina -= 0.5;
        // extra chance for the horses (10% chance)
        } else if (this.stamina <= 1 && this.extraChance >= (1-extraChancePercent)) {
            this.xPos += this.pace / 4 + 2;
        } 
        else {
            this.xPos += this.pace / 4;
        }
    };   
}

function Player(money) {
    this.money = money;

    //this.money = money;
    this.chosenHorse;
    let errors = document.getElementById("errors");
    
    this.bet = function() {
        let betName = document.getElementById("betName").value;
        let betAmount = document.getElementById("betAmount").value;
        let playerFunds = document.getElementById("playerFunds");
        
        if (betAmount > this.money) {
            errors.innerText = "You do not have funds to make this bet";
        }
        else if (betName == "" || betAmount == "") {
            errors.innerText = "The amount field cannot be empty";
        } else {
            errors.innerText = "";
            this.setMoney(this.money-betAmount);
            //this.money = money;
            this.chosenHorse = betName;
            playerFunds.innerText = this.money;
            return true;
        }
        return false;
    }

    this.getMoney = function() {
        return money;
    }
    this.setMoney = function(money) {
        let playerFunds = document.getElementById("playerFunds");
        this.money = money;
        playerFunds.innerText = money;
    } 
    
}

function Track() {
    this.length = 500;
    this.height = horses.length * 30;
}