var extraChancePercent = 10;
var trackLength = 1000;
var trackHeight = 600;

function Horse(name, color, yPos) {
  this.completeRounds = 0;
  this.name = name;
  this.color = color;
  this.pace = Math.ceil(Math.random() * 5 + 5);
  this.stamina = Math.random() * 200 + 300;
  this.odds = (this.pace * this.stamina) / 100;
  this.extraChance = Math.random();
  this.size = 20;
  this.xPos = trackLength / 2;
  this.yPos = yPos;
  this.finished = false;
  this.position = 0;

  var twoThirds = (2 * this.stamina) / 3;

  this.show = function () {
    // show horses
    fill(this.color);
    circle(this.xPos + this.size / 2, this.yPos + this.size / 2, this.size);
    // show names
    fill("black");
    textAlign(CENTER, CENTER);
    text(
      this.xPos,
      this.xPos + this.size / 2,
      this.yPos + 10,
      this.size,
      this.size
    );
  };

  this.showFinished = function () {
    // show finished horses
    fill(this.color);
    circle(trackLength * 0.66 - this.position * 30, trackHeight / 2, this.size);
    // show finish numbers
    fill("black");
    textAlign(CENTER, CENTER);
    text(
      this.position,
      trackLength * 0.66 - this.position * 30,
      trackHeight / 2 + 10,
      this.size,
      this.size
    );
    // show finished names
    fill("black");
    textAlign(RIGHT, CENTER);
    text(
      this.name,
      trackLength * 0.66 - this.position * 30,
      trackHeight / 2 + 20,
      this.size,
      this.size
    );
  };

  this.run = function () {
    // if horses are finished - stop them
    if (this.completeRounds === 3) {
      this.finished = true;
      this.pace = 0;
    }
    // count number of times horse has completed the track
    if (
      Math.round(this.xPos) === trackLength / 2 &&
      this.yPos <= trackHeight / 2
    ) {
      this.completeRounds++;
    }

    // // bend top right
    // if (this.xPos >= trackLength - 150 && this.yPos <= 150) {
    //   this.yPos += this.pace / 4;
    //   this.xPos += this.pace / 4;
    // }
    // // bend bottom right
    // else if (this.xPos >= trackLength - 150 && this.yPos >= trackHeight - 150) {
    //   this.yPos += this.pace / 4;
    //   this.xPos -= this.pace / 4;
    // }
    // // bend bottom left
    // else if (this.xPos <= 150 && this.yPos >= trackHeight - 150) {
    //   this.yPos -= this.pace / 4;
    //   this.xPos -= this.pace / 4;
    // }
    // // bend top left
    // else if (this.xPos <= 150 && this.yPos <= 150) {
    //   this.yPos -= this.pace / 4;
    //   this.xPos += this.pace / 4;
    // }

    // move top (left to right)
    if (this.xPos <= trackLength - 100 && this.yPos <= 100) {
      this.xPos += this.pace;
    }
    // move right (top to bottom)
    else if (this.xPos >= trackLength - 100 && this.yPos <= trackHeight - 100) {
      this.yPos += this.pace;
    }
    // move left (bottom to top)
    else if (this.xPos <= 100 && this.yPos >= 100) {
      this.yPos -= this.pace;
    }
    // move bottom (right to left)
    else if (this.yPos >= trackHeight - 100) {
      this.yPos = this.yPos;
      this.xPos -= this.pace;
    }
    // start them off
    else {
      this.xPos += this.pace;
    }
    this.stamina -= 1;
    if (this.stamina <= 0) {
      this.pace = this.pace / Math.ceil(Math.random() * 1 + 1);

      this.stamina = Infinity;
    }
  };

  //   this.run = function () {
  //     // if horses are finished - stop them
  //     if (this.xPos >= trackLength - 10) {
  //       this.finished = true;
  //       this.pace = 0;
  //       this.xPos = trackLength - 5;
  //       // stamina management (two thirds stamina)
  //     } else if (this.stamina >= twoThirds) {
  //       this.xPos += this.pace;
  //       this.stamina -= 1;
  //       // horses are drained
  //     } else if (this.stamina > 1) {
  //       this.xPos += this.pace / 2;
  //       this.stamina -= 0.5;
  //       // extra chance for the horses (10% chance)
  //     } else if (
  //       this.stamina <= 1 &&
  //       this.extraChance >= 1 - extraChancePercent
  //     ) {
  //       this.xPos += this.pace / 4 + 2;
  //     } else {
  //       this.xPos += this.pace / 4;
  //     }
  //   };
}

function Player(money) {
  this.money = money;

  //this.money = money;
  this.chosenHorse;
  let errors = document.getElementById("errors");

  this.bet = function () {
    let betName = document.getElementById("betName").value;
    let betAmount = document.getElementById("betAmount").value;
    let playerFunds = document.getElementById("playerFunds");

    if (betAmount > this.money) {
      errors.innerText = "You do not have funds to make this bet";
    } else if (betName == "" || betAmount == "") {
      errors.innerText = "The amount field cannot be empty";
    } else {
      errors.innerText = "";
      this.setMoney(this.money - betAmount);
      //this.money = money;
      this.chosenHorse = betName;
      playerFunds.innerText = this.money;
      return true;
    }
    return false;
  };

  this.getMoney = function () {
    return money;
  };
  this.setMoney = function (money) {
    let playerFunds = document.getElementById("playerFunds");
    this.money = money;
    playerFunds.innerText = money;
  };
}

function Track() {
  this.length = trackLength;
  this.height = trackHeight;
  this.show = function () {
    // show track
    fill("brown");
    rect(0, 0, this.length, this.height, 100);
    // show inner rectangle with rounded corners of size 100
    fill("green");
    rect(200, 200, this.length - 400, this.height - 400, 50);

    // show finish line in the middle
    fill("white");
    rect(this.length / 2 + 20, 0, 10, this.height / 3);
  };
}
