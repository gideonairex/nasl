function Parser () {
}

Parser.prototype.parse = function parse ( data ){
	var METHOD = data.shift();
	var PARAMS = data;

	return {
		method : METHOD,
		params : PARAMS
	}
}

module.exports = Parser;
