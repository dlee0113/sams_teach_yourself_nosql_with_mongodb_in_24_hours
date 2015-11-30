mongo = new Mongo("localhost");
myDB = mongo.getDB("newDB");
myDB.dropDatabase();