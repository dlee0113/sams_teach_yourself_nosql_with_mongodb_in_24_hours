mongo = new Mongo("localhost");
myDB = mongo.getDB("admin");
stats = myDB.stats();
printjson(stats);