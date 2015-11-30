mongo = new Mongo("localhost");
db = mongo.getDB("test")
db.addUser( { user: "testAdmin",
              pwd: "test",
              roles: [ "dbAdmin" ] } );
db.addUser( { user: "testWriter",
              pwd: "test",
              roles: [ "readWrite" ] } );
db.addUser( { user: "testReader",
              pwd: "test",
              roles: [ "read" ] } );
db = mongo.getDB("admin")
db.addUser( { user: "testUser",
              userSource: "test",
              roles: [ "read" ],
              otherDBRoles: { test: [ "readWrite" ] } } );
