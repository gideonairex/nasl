nasl
====
node-async-logger-server

###Install
----
1. Node
 * brew install node
2. Cassandra
 * brew install cassandra
3. Redis
 *  brew install redis

####Setup Cassandra keyspace
1. Create keyspace with node_server
```
CREATE KEYSPACE node_server WITH REPLICATION = { 'class' :
SimpleStrategy', 'replication_factor' : 3 };
```
WITH is your choice except for the "node_server" keyspace it is needed
n the node-async-logger-server
2. Create the table
```
CREATE TABLE log (
      log_id uuid,
      app text,
      log_level text,
      message text,
      tag text,
      PRIMARY KEY ((log_id))
    )
```

###Get Package
1. sudo npm install nasl -g

###Run Server
1. sudo npm nasl start
2. sudo npm nasl stop
