var Decoder = require ( './decoder' );
var Parser  = require ( './parser' );
var Terminal = require ( './terminal' );
var ErrHandler = require ( './errorHandler' );

function Controller ( opt ) {
	this.options = opt || {};
	this.decoder = new Decoder();
	this.parser  = new Parser();
	this.terminal = new Terminal( this );
	this.errorHandler = new ErrHandler();
}

Controller.prototype.setSocket = function ( socket ) {
	this.socket = socket;
	this.initSocketEmitters();
}

Controller.prototype.initSocketEmitters = function initSocketEmitters() {
	var self = this;
	this.socket.on ( 'data', function ( data ) {
		self.argvs = self.parser.parse( self.decoder.decode( data ) );
		self.process();
	} );
}

Controller.prototype.process = function process() {
	console.log(this.argvs);
	var self = this;
	var command = this.argvs.method.toLowerCase();
	if ( command in this.terminal.commands ) {
		this.terminal.commands[command].process( this.argvs.params,function ( err, result ) {
			if ( err ) {
				self.socket.write( self.errorHandler.error( err.type, err ) );
			} else {
				self.socket.write( '+' + result + ' \r\n' );
			}
		} );
	} else {
		this.socket.write( this.errorHandler.error( 'UNKNOWN', { message: this.argvs.method } ) );
	}
}

module.exports = Controller;
