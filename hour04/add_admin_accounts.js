mongo = new Mongo("localhost");
db = mongo.getDB("admin");
db.addUser( { user: "dbadmin",
              pwd: "test",
              roles: [ "readWriteAnyDatabase", 
                       "dbAdminAnyDatabase", 
                       "clusterAdmin" ] } );
db.addUser( { user: "useradmin",
              pwd: "test",
              roles: [ "userAdminAnyDatabase" ] } )