mongo = new Mongo("localhost");
wordsDB = mongo.getDB("words");
wordsColl = wordsDB.getCollection("word_stats");
word = wordsColl.findOne();
print("Single Document: ");
printjson(word);