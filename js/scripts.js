function Player(team, name, computer)
{
  this.team = team;
  this.name = name;
  this.computer = computer;
}

function Space(locationX, locationY, team)
{
  this.player = -1;
  this.location = [locationX,locationY,team];
}

function Board(difficulty)
{
  this.spaces = [new Space(0,0),new Space(0,1),new Space(0,2),
                 new Space(1,0),new Space(1,1),new Space(1,2),
                 new Space(2,0),new Space(2,1),new Space(2,2)];
  this.difficulty = difficulty;
}

Board.prototype.getSpaceByLocation = function(x, y)
{
  var spaces = this.spaces;
  for(var i = 0; i < spaces.length; i++)
  {
    if(spaces[i].location[0] === x && spaces[i].location[1] === y)
    {
      return spaces[i];
    }
  }
};

Board.prototype.findAvailableSpaces = function()
{
  var spaces = this.spaces;
  var availableSpaces = [];
  for(var i = 0; i < spaces.length; i++)
  {
    if(spaces[i].player === -1)
    {
      availableSpaces.push(spaces[i]);
    }
  }
  return availableSpaces
}

Board.prototype.checkForWinner = function()
{
  spaces = this.spaces;
  var team = spaces[0].player;
  // Check if top row belongs to one player
  if(spaces[1].player === team && spaces[2].player === team)
  {
    return spaces[0].player;
  }
  // Check if middle row belongs to one player
  team = spaces[3].player;
  if(spaces[4].player === team && spaces[5].player === team)
  {
    return spaces[3].player;
  }
  // Check if bottom row belongs to one player
  team = spaces[6].player;
  if(spaces[7].player === team && spaces[8].player === team)
  {
    return spaces[6].player;
  }
  // Check if first column belongs to one player
  team = spaces[0].player;
  if(spaces[3].player === team && spaces[6].player === team)
  {
    return spaces[0].player;
  }
  // Check if middle column belongs to one player
  team = spaces[1].player;
  if(spaces[4].player === team && spaces[7].player === team)
  {
    return spaces[1].player;
  }
  // Check if last column belongs to one player
  team = spaces[2].player;
  if(spaces[5].player === team && spaces[8].player === team)
  {
    return spaces[2].player;
  }
  // Check if 0-9 diagonal belongs to one player
  team = spaces[0].player;
  if(spaces[4].player === team && spaces[8].player === team)
  {
    return spaces[0].player;
  }
  // Check if 2-6 diagonal belongs to one player
  team = spaces[6].player;
  if(spaces[4].player === team && spaces[2].player === team)
  {
    return spaces[6].player;
  }
  // If no conditions are met, return no player
  return -1;
}

Board.prototype.getComputerChoice = function () {
  var forgottenStrategies = this.generateForgottenStrategies();

  var move = -1;

  var twoInLineCheck = this.checkForTwoInLine();
  var playerWithTwoInLine = twoInLineCheck[0];
  var availableMoveToMakeThree = twoInLineCheck[1];

  // var forkCheck = this.checkforFork();
  var playerWithForkAvailable = -1//forkCheck[0];
  var availableMoveToMakeFork = -1//forkCheck[1];

  var cornerAvailability = this.checkForSpaceAvailability('corners');
  var sideAvailability = this.checkForSpaceAvailability('sides');

  if (playerWithTwoInLine === 1 && availableMoveToMakeThree && !forgottenStrategies.includes(0)) { // Check for possibility of a win
    move = availableMoveToMakeThree;
  } else if (playerWithTwoInLine === 0 && availableMoveToMakeThree && !forgottenStrategies.includes(1)) { // Check for possibility of a block
    move = availableMoveToMakeThree;
  } else if (playerWithForkAvailable === 1 && !forgottenStrategies.includes(2)) { // Check for possibility of fork
    move = availableMoveToMakeFork;
  } else if (playerWithForkAvailable === 0 && !forgottenStrategies.includes(3)) { // Check for possibility to block fork
    move = availableMoveToMakeFork;
  } else if (this.getSpaceByLocation(1, 1).player === -1 && !forgottenStrategies.includes(4)) { // Check for center availability
    move = 4;
  } else if (cornerAvailability > -1 && !forgottenStrategies.includes(5)) { // Check for empty opposite corner or other empty corner
    move = cornerAvailability;
  } else if (sideAvailability > -1 && !forgottenStrategies.includes(6)) { // Check for empty side
    move = sideAvailability;
  } else {
    return this.findRandomSpace();
  }
  return this.spaces[move];
};

Board.prototype.difficultyAdjustment = function () {
  var difficulty = this.difficulty;
  if (difficulty === 'easy') {
    return 5;
  } else if (difficulty === 'medium') {
    return 2;
  } else if (difficulty === 'hard') {
    return 1;
  } else {
    return 0;
  }
};

Board.prototype.generateForgottenStrategies = function (first_argument) {
  var adjustment = this.difficultyAdjustment();
  var forgottenStrategies = [];
  for (var i = 0; i < adjustment; i++) {
    forgottenStrategies.push(Math.floor(Math.random() * 7));
  }
  return forgottenStrategies;
};

Board.prototype.checkForSpaceAvailability = function (spaceType) {
  var boardSpaces = this.spaces;
  var spacesToCheck;
  if (spaceType === 'corners') {
    spacesToCheck = [0, 2, 6, 8];
  } else if (spaceType === 'sides') {
    spacesToCheck = [1, 3, 5, 7];
  }

  var availableSpaces = [];
  var otherPlayerSpaces = [];
  spacesToCheck.forEach(function(spaceIndex) {
    if (boardSpaces[spaceIndex].player === -1) {
      availableSpaces.push(spaceIndex);
    } else if (boardSpaces[spaceIndex].player === 1) {
      otherPlayerSpaces.push(spaceIndex);
    }
  });

  if (otherPlayerSpaces.lengths > 0) {
    var oppositeSpaces = [];
    if (otherPlayerSpaces.includes(spacesToCheck[0]) && availableSpaces.includes(spacesToCheck[3])) {
      oppositeSpaces.push(spacesToCheck[3]);
    }
    if (otherPlayerSpaces.includes(spacesToCheck[1]) && availableSpaces.includes(spacesToCheck[2])) {
      oppositeSpaces.push(spacesToCheck[2]);
    }
    if (otherPlayerSpaces.includes(spacesToCheck[2]) && availableSpaces.includes(spacesToCheck[1])) {
      oppositeSpaces.push(spacesToCheck[1]);
    }
    if (otherPlayerSpaces.includes(spacesToCheck[3]) && availableSpaces.includes(spacesToCheck[0])) {
      oppositeSpaces.push(spacesToCheck[0]);
    }
    return oppositeSpaces[Math.floor(Math.random() * oppositeSpaces.length)];
  }

  if (availableSpaces.length > 0) {
    return availableSpaces[Math.floor(Math.random() * availableSpaces.length)];
  } else {
    return -1;
  }
};

Board.prototype.checkForTwoInLine = function ()
{
  var rowCheck = [];
  var winPossibilities = [];
  var blockPossibilities = [];
  // Check horizontal
  for (var i = 0; i <= 6; i += 3) {
    rowCheck = this.checkForTwoLoop(i, i + 2, 1);
    if (rowCheck[0] === 1 && rowCheck[1] > -1) {
      winPossibilities.push(rowCheck);
    } else if (rowCheck[0] === 0 && rowCheck[1] > -1) {
      blockPossibilities.push(rowCheck);
    }
  }
  // Check vertical
  for (var i = 0; i <= 2; i += 1) {
    rowCheck = this.checkForTwoLoop(i, i + 6, 3);
    if (rowCheck[0] === 1 && rowCheck[1] > -1) {
      winPossibilities.push(rowCheck);
    } else if (rowCheck[0] === 0 && rowCheck[1] > -1) {
      blockPossibilities.push(rowCheck);
    }
  }
  // Check diagonal 1
  rowCheck = this.checkForTwoLoop(0, 8, 4);
  if (rowCheck[0] === 1 && rowCheck[1] > -1) {
    winPossibilities.push(rowCheck);
  } else if (rowCheck[0] === 0 && rowCheck[1] > -1) {
    blockPossibilities.push(rowCheck);
  }
  // Check diagonal 2
  rowCheck = this.checkForTwoLoop(2, 6, 2);
  if (rowCheck[0] === 1 && rowCheck[1] > -1) {
    winPossibilities.push(rowCheck);
  } else if (rowCheck[0] === 0 && rowCheck[1] > -1) {
    blockPossibilities.push(rowCheck);
  }

  if (winPossibilities.length > 0) {
    return winPossibilities[Math.floor(Math.random() * winPossibilities.length)];
  } else if (blockPossibilities.length > 0) {
    return blockPossibilities[Math.floor(Math.random() * blockPossibilities.length)];
  } else {
    return [-1];
  }
};

Board.prototype.checkForTwoLoop = function (startingIndex, endingIndex, interval)
{
  var spaces = this.spaces;

  var player0Spaces = 0;
  var player1Spaces = 0;
  var emptySpace;
  for (var i = startingIndex; i <= endingIndex; i += interval) {
    if(spaces[i].player === 0) {
      player0Spaces += 1;
    } else if (spaces[i].player === 1) {
      player1Spaces += 1;
    } else {
      emptySpace = i;
    }
  }

  if (player1Spaces === 2) {
    return [1, emptySpace];
  } else if (player0Spaces === 2) {
    return [0, emptySpace];
  } else {
    return [-1];
  }
};

Board.prototype.findRandomSpace = function()
{
  var availableSpaces = this.findAvailableSpaces();
  return availableSpaces[Math.floor(Math.random() * availableSpaces.length)];
}

function Game(playerNameOne, playerNameTwo, difficulty)
{
  this.move = 0;
  this.players = [new Player(0, playerNameOne, false), new Player(1, playerNameTwo, $("#computer").is(":checked"))];
  this.board = new Board(difficulty);
  this.currentPlayer = this.players[this.move];
  this.running = true;
}

$(document).ready(function()
{
  var game;
  var board;
  var clickedSquare;
  var $currentPlayer = $("#current-player");

  // Start the game
  $("#start-game").on("click", function() {
    // console.log($("input#difficulty").val())
    var difficulty = $("select#difficulty").val();
    game = new Game($("#player-one").val(), $("#player-two").val(), difficulty);
    board = game.board;

    // Reset all tiles to white
    $(".img-thumbnail").each(function() {
      $("[name=" + this.name + "]").attr("src", "img/white.png");
    });

    // Reset the text
    $("#header").text("Tic Tac Toe");
    $currentPlayer.text("Current Player: " + game.currentPlayer.name);
  });

  // Game play
  $(".img-thumbnail").on("click", function(event) {
    var x = parseInt(this.name[0]);
    var y = parseInt(this.name[1]);

    clickedSquare = board.getSpaceByLocation(x, y);

    // if there is no current player assigned to the clicked square
    if (clickedSquare.player === -1 && game.running)
    {
      // if game.move === 0, then it's 'O's turn
      var imageType = (game.move === 0) ? "img/O.png" : "img/X.png";
      $(this).attr("src", imageType);

      setupNextMove();

      if(game.currentPlayer.computer)
      {
        computerMove();
      }
    }
  });

  function setupNextMove()
  {
    clickedSquare.player = game.currentPlayer.team;

    var checkWinner = board.checkForWinner();
    // If there is a winner...
    if (checkWinner != -1)
    {
      $("#header").text("Winner! - " + game.players[checkWinner].name);
      game.running = false;

      $currentPlayer.text();
    } else
    {
      // Toggle player between player 0 and player 1
      game.move = (game.move == 0) ? 1 : 0;
      game.currentPlayer = game.players[game.move];
      $currentPlayer.text("Current Player: " + game.currentPlayer.name);
    }
  }

  function computerMove()
  {
    var space = board.getComputerChoice();
    var spaceName = space.location[0].toString() + space.location[1].toString();
    var imageType = (game.move == 0) ? "img/O.png" : "img/X.png";

    clickedSquare = board.getSpaceByLocation(space.location[0], space.location[1]);
    $("[name=" + spaceName + "]").attr("src", imageType);

    setupNextMove();
  }
});
