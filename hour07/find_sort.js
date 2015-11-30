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
cursor = wordsColl.find({first:'w'});
print("Words starting with w ascending:");
displayWords(cursor.sort({word:1}));
cursor = wordsColl.find({first:'w'});
print("\nWords starting with w descending:");
displayWords(cursor.sort({word:-1}));
print("\nQ words sorted by last letter and by size: ");
cursor = wordsColl.find({first:'q'});
displayWords(cursor.sort({last:1, size:-1}));
print("\nQ words sorted by size  then by last letter: ");
cursor = wordsColl.find({first:'q'});
displayWords(cursor.sort({size:-1}).sort({last:1}));
print("\nQ words sorted by last letter then by size: ");
cursor = wordsColl.find({first:'q'});
displayWords(cursor.sort({last:1}).sort({size:-1}));