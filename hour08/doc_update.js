function displayWords(cursor){
  words = cursor.map(function(word){
    return word.word + "(" + word.size + ")";
  });
  wordStr = JSON.stringify(words);
  if (wordStr.length > 65){
    wordStr = wordStr.slice(0, 50) + "...";
  }
  print(wordStr);
}
mongo = new Mongo('localhost');
wordsDB = mongo.getDB('words');
wordsDB.runCommand( { getLastError: 1, w: 1, j: true, wtimeout: 1000 } );
wordsColl = wordsDB.getCollection('word_stats');
cursor = wordsColl.find({category:"QYwords"});
print("Before QYwords Update: ");
displayWords(cursor);
wordsColl.update( { $and:[{ first: "q"},{last:'y'}]},
                  { $set: {category:'QYwords'}},
                  false, true);
cursor = wordsColl.find({category:"QYwords"});
print("After QYwords Update: ");
displayWords(cursor);
print("Before Left Update: ");
word = wordsColl.findOne({word: 'left'}, 
                         {word:1, size:1, stats:1, letters:1});
printjson(word);
wordsColl.update({ word: 'left'}, 
                 { $set: {word:'lefty'},
                   $inc: {size: 1, 'stats.consonants': 1},
                   $push: {letters: "y"}}, 
                 false, false);
word = wordsColl.findOne({word: 'lefty'}, 
                         {word:1, size:1, stats:1, letters:1});
print("After Left Update: ");
printjson(word);
wordsColl.update({category:"QYwords"}, 
                 {$set: {category:"none"}}, false, true);
wordsColl.update( { word: 'lefty'}, 
                  { $set: {word:'left'},
                    $inc: {size: -1, 'stats.consonants': -1},
                    $pop: {letters: 1}});
word = wordsColl.findOne({word: 'left'}, 
    {word:1, size:1, stats:1, letters:1});
print("After Lefty Update: ");
printjson(word);