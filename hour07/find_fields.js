function displayWords(cursor){
  words = cursor.forEach(function(word){
    print(JSON.stringify(word, null, 2));
  });
}
mongo = new Mongo("localhost");
wordsDB = mongo.getDB("words");
wordsColl = wordsDB.getCollection("word_stats");
cursor = wordsColl.find({first:'p'});
print("Full Word:");
displayWords(cursor.limit(1));
cursor = wordsColl.find({first:'p'}, {word:1});
print("Only the word field:");
displayWords(cursor.limit(1));
cursor = wordsColl.find({first:'p'}, {word:1,size:1,stats:1});
print("Only the word, size and stats fields:");
displayWords(cursor.limit(1));
cursor = wordsColl.find({first:'p'}, {word:1,first:1,last:1});
print("Only the word, first and last fields:");
displayWords(cursor.limit(1));
cursor = wordsColl.find({first:'p'}, {charsets:false, stats:false});
print("Excluding charsets and stats:");
displayWords(cursor.limit(1));