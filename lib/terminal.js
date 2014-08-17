var fs = require( 'fs' );
var path = require( 'path' );
function Terminal ( controller ) {
	var commandPath = __dirname + '/commands/';
	var commands = [];
	var files = fs.readdirSync( commandPath );
	for ( var i = 0; i < files.length; i++ ) {
		var __TempObject = require( commandPath + '/' + files[i]);
		commands[ path.basename( files[i], '.js' ) ] = new __TempObject( controller );
	}
	this.commands = commands;
}

module.exports = Terminal;
