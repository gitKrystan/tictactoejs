

function Player( team, name )
{
    this.team = team;
    this.name = name;
}

function Space( player )
{
    this.player = "null";
}

Space.prototype.setPlayerToSpace = function( player )
{
    this.player = player;
}

function Board( )
{
    this.spaces = [[0,0,-1],[0,1,-1][0,2,-1]
                   [1,0,-1],[1,1,-1],[1,2,-1]
                   [2,0,-1],[2,1,-1],[2,2,-1]];
}

function Game( )
{
    this.players = [];
    this.board = new Board( );
}
