var net = require('net');
var Cassandra = require( 'cassandra-client').Connection;
var con = new Cassandra( { host: '127.0.0.1', port: 9160, keyspace: 'node_server' } );
con.connect(function(err) { console.log ( 'Cassandra deployed' ); });
var uuid = require ( 'node-uuid' );
var Controller = require( './lib/controller' );
var controller = new Controller( { db : con, uuid: uuid } );

var server = net.createServer( function ( socket ) {
	controller.setSocket( socket );
} );

var port = 1000;
server.listen( port , function() {
	console.log('Logging server initiated');
} );
