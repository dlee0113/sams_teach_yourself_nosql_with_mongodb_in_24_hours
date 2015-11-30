function displayWords(cursor){
  words = cursor.map(function(word){
    return word.word;
  });
  wordStr = JSON.stringify(words);
  if (wordStr.length > 65){
    wordStr = wordStr.slice(0, 50) + "...";
  }
  print(wordStr);
}
mongo = new Mongo("localhost");
wordsDB = mongo.getDB("words");
wordsColl = wordsDB.getCollection("word_stats");
cursor = wordsColl.find();
print("Total Words :", cursor.count());
print("Limiting to 10: ");
displayWords(cursor.limit(10));
cursor = wordsColl.find({first:'p'});
print("Total Words starting with p :", cursor.count());
print("Limiting to 3: ");
displayWords(cursor.limit(3));
cursor = wordsColl.find({first:'p'});
print("Limiting to 5: ");
displayWords(cursor.limit(5));