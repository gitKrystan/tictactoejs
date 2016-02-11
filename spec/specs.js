describe( 'Tick Tac Toe', function() {
  it("Creates player", function() {
    var newPlayer = new Player( 0, "Player" );
    expect( newPlayer.team ).to.equal( 0 );
    expect( newPlayer.name ).to.equal( "Player" );
  });
  it("Creates space", function() {
    var newSpace = new Space( 2, 2, 0 );
    expect( newSpace.location[0] ).to.equal( 2 );
    expect( newSpace.location[1] ).to.equal( 2 );
    expect( newSpace.location[2] ).to.equal( 0 );
    expect( newSpace.player ).to.equal( -1 );
  });
});

describe('Board', function() {
  it("Creates board", function() {
    var newBoard = new Board( );
    expect( newBoard.spaces.length ).to.equal( 9 );
  });

  describe('checkForTwoInLine', function() {
    it('knows when two horizontally in-line squares have been selected', function() {
      var game = new Game( );
      var players = game.players;
      var board = game.board;
      var spaces = board.spaces;
      var topLeftSquare = spaces[0];
      var topMiddleSquare = spaces[1];
      var topRightSquare = spaces[2];
      topLeftSquare.player = 0;
      topMiddleSquare.player = 0;
      expect(board.checkForTwoInLine()).to
        .eql([0, 2]);
    });

    it('knows when two horizontally in-line squares have been selected', function() {
      var game = new Game( );
      var players = game.players;
      var board = game.board;
      var spaces = board.spaces;
      var middleLeftSquare = spaces[3];
      var middleMiddleSquare = spaces[4];
      var middleRightSquare = spaces[5];
      middleLeftSquare.player = 0;
      middleRightSquare.player = 0;
      expect(board.checkForTwoInLine()).to
        .eql([0, 4]);
    });

    it('knows when two vertically in-line squares have been selected', function() {
      var game = new Game( );
      var players = game.players;
      var board = game.board;
      var spaces = board.spaces;
      var topMiddleSquare = spaces[1];
      var middleMiddleSquare = spaces[4];
      var bottomMiddleSquare = spaces[7];
      middleMiddleSquare.player = 0;
      bottomMiddleSquare.player = 0;
      expect(board.checkForTwoInLine()).to
        .eql([0, 1]);
    });

    it('knows when two diagonally in-line squares have been selected', function() {
      var game = new Game( );
      var players = game.players;
      var board = game.board;
      var spaces = board.spaces;
      var topLeftSquare = spaces[0];
      var middleMiddleSquare = spaces[4];
      var bottomRightSquare = spaces[8];
      middleMiddleSquare.player = 0;
      bottomRightSquare.player = 0;
      expect(board.checkForTwoInLine()).to
        .eql([0, 0]);
    });
  });
});
