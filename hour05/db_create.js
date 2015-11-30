mongo = new Mongo("localhost");
newDB = mongo.getDB("newDB");
newDB.createCollection("newCollection");