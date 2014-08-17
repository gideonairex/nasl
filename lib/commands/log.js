function Log ( controller ) {
	this.db = controller.options.db;
	this.uuid = controller.options.uuid;
}

Log.prototype.process = function ( args, callback ) {
	if ( args[0] ) {

		try {
			var data = JSON.parse( args[0] );
		} catch ( e ) {
			var error = { type : "PARSEERROR", message : "JSON parse error" } ;
			callback ( error );
			return;
		}

		var query = "insert into log ( log_id, app, log_level, message, tag ) values ( ?,?,?,?,? )";
		this.db.execute( query, [ this.uuid.v1(), data.app, data.log_level, data.message, data.tag ], function ( err, result ) {
			if ( !err ) {
				callback( null, 1 );
			} else {
				var error = { type : "DBERROR", message : "DB error" } ;
				callback ( error );
			}
		} );
	} else {
		var error = { type : "MISSINGARGUMENTS", message : "arguments missing" } ;
		callback ( error );
	}
	return;
}

module.exports = Log;
