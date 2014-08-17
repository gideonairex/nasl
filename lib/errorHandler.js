function ErrorHandler () {
}

ErrorHandler.prototype.error = function ( type, options ) {
	return '-Error ' + this[type]( options ) + ' \r\n';
}

ErrorHandler.prototype.UNKNOWN = function ( options ) {
	return 'unknown command "' + options.message + '"';
}

ErrorHandler.prototype.PARSEERROR = function ( options ) {
	return 'parse error ' + options.message;
}

ErrorHandler.prototype.DBERROR = function ( options ) {
	return 'there is ' + options.message;
}

ErrorHandler.prototype.MISSINGARGUMENTS = function ( options ) {
	return options.message;
}

module.exports = ErrorHandler;
