
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
   it("Creates board", function() {
        var newBoard = new Board( );
        expect( newBoard.spaces.length ).to.equal( 9 ); 
   });
});
