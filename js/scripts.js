

function Player( team, name )
{
    this.team = team;
    this.name = name;
}

function Space( locationX, locationY, team )
{
    this.player = -1;
    this.location = [locationX,locationY,team];
}

function Board( )
{
    this.spaces = [new Space(0,0,-1),new Space(0,1,-1),new Space(0,2,-1),
                   new Space(1,0,-1),new Space(1,1,-1),new Space(1,2,-1),
                   new Space(2,0,-1),new Space(2,1,-1),new Space(2,2,-1)];
}

Board.prototype.getSpaceByLocation = function( x, y )
{
    for( var i = 0; i < this.spaces.length; i++ )
    {
        if( this.spaces[i].location[0] == x && this.spaces[i].location[1] == y )
        {
            return this.spaces[i];
        }
    }
}

function Game( playerNameOne, playerNameTwo )
{
    this.move = 0;
    this.players = [new Player( 0, playerNameOne ), new Player( 1, playerNameTwo )];
    this.board = new Board( );
    this.currentPlayer = this.players[ this.move ];
}

$(document).ready( function( ) 
{
    var game = new Game( $("#player-one").val( ), $("#player-two").val( ) );
    var currentPlayer = $("#current-player");
    
    currentPlayer.text( "Current Player: " + game.currentPlayer.name );    
    
    $(".img-thumbnail").on("click", function( event ) {
        var x = parseInt( event.currentTarget.name[0] );
        var y = parseInt( event.currentTarget.name[1] );
            
        var clickedSquare = game.board.getSpaceByLocation( x, y );
        
        if ( clickedSquare.player == -1 )
        {
            game.move = ( game.move == 0 ) ? 1 : 0;
            game.currentPlayer = game.players[ game.move ];
            currentPlayer.text( "Current Player: " + game.currentPlayer.name );
            
            clickedSquare.player = game.currentPlayer.team;
            
            var imageType = ( game.move == 0 ) ? "img/O.png" : "img/X.png";
            var elementName = "[name=" + event.currentTarget.name + "]";
            $(elementName).attr("src", imageType );
        }
    });
});

