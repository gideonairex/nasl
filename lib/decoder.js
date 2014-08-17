var hiredis = require('hiredis');
var reader = new hiredis.Reader();
var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');

function Decoder () {
}

Decoder.prototype.decode = function decode ( data ) {
	var cent = new Buffer(data);
	var decoded = decoder.write(cent);
	reader.feed( decoded );
	return reader.get();
}

module.exports = Decoder;
