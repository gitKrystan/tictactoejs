

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
    this.running = false;
}

$(document).ready( function( ) 
{
    var game;
    var currentPlayer = $("#current-player");
    
   $(".img-thumbnail").on("click", function( event ) {
        var x = parseInt( event.currentTarget.name[0] );
        var y = parseInt( event.currentTarget.name[1] );
            
        var clickedSquare = game.board.getSpaceByLocation( x, y );
        
        if ( clickedSquare.player == -1 && game.running )
        {
            clickedSquare.player = game.currentPlayer.team;
            game.move = ( game.move == 0 ) ? 1 : 0;
            game.currentPlayer = game.players[ game.move ];
            currentPlayer.text( "Current Player: " + game.currentPlayer.name );
            
            var imageType = ( game.move == 0 ) ? "img/O.png" : "img/X.png";
            var elementName = "[name=" + event.currentTarget.name + "]";
            $(elementName).attr("src", imageType );
            
            var checkWinner = checkForWinner( game.board.spaces );
            if ( checkWinner != -1 )
            {
                $("#header").text( "Winner! - " + game.players[ checkWinner ].name );
                game.running = false;
                
                currentPlayer.text( );
            }
        }
    });
    
    $("#start-game").on("click", function( ) {
        game = new Game( $("#player-one").val( ), $("#player-two").val( ) );
        game.running = true;
        
        $(".img-thumbnail").each(function( ) {
            $("[name=" + this.name + "]").attr("src", "img/white.png");
        });
        
        $("#header").text( "Tic Tac Toe" );
        currentPlayer.text( "Current Player: " + game.currentPlayer.name );   
    });
    
    function checkForWinner( spaces )
    {
        var team = spaces[0].player;
        if( spaces[1].player === team && spaces[2].player === team )
        {
            return spaces[0].player;
        }
        
        team = spaces[3].player;
        if( spaces[4].player === team && spaces[5].player === team )
        {
            return spaces[3].player;
        }
        
        team = spaces[6].player;
        if( spaces[7].player === team && spaces[8].player === team )
        {
            return spaces[6].player;
        }
        
        team = spaces[0].player;
        if( spaces[3].player === team && spaces[6].player === team )
        {
            return spaces[0].player;
        }
        
        team = spaces[1].player;
        if( spaces[4].player === team && spaces[7].player === team )
        {
            return spaces[1].player;
        }
        
        team = spaces[2].player;
        if( spaces[5].player === team && spaces[8].player === team )
        {
            return spaces[2].player;
        }        
        
        team = spaces[0].player;
        if( spaces[4].player === team && spaces[8].player === team )
        {
            return spaces[0].player;
        }
        
        team = spaces[6].player;
        if( spaces[4].player === team && spaces[2].player === team )
        {
            return spaces[6].player;
        }
        
        return -1;
    }
});

