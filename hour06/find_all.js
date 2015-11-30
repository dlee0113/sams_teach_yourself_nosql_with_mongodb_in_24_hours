mongo = new Mongo("localhost");
wordsDB = mongo.getDB("words");
wordsColl = wordsDB.getCollection("word_stats");
print("\nFor Each List: ");
cursor = wordsColl.find().limit(10);
cursor.forEach(function(word){
  print("word: " + word.word);
});
print("\nMapped Array: ");
cursor = wordsColl.find().limit(10);
words = cursor.map(function(word){
  return word.word;
});
printjson(words);
print("\nIndexed Docuemnt in Array: ");
cursor = wordsColl.find();
words = cursor.toArray();
print(JSON.stringify(words[55]));
print("\nNext Document in Cursor: ");
cursor = wordsColl.find();
word = cursor.next();
print(JSON.stringify(word));