mongo = new Mongo("localhost");
db = mongo.getDB("test");
cur = db.system.users.find();
printjson(cur.toArray());