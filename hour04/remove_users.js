mongo = new Mongo("localhost");
db = mongo.getDB("test");
db.removeUser("testReader");
cur = db.system.users.find();
printjson(cur.toArray());