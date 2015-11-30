function displayWords(msg, cursor, pretty){
  print("\n"+msg);
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
cursor = wordsColl.find({first: {$in: ['a', 'b', 'c']}});
displayWords("Words starting with a, b or c: ", cursor);
cursor = wordsColl.find({size:{$gt: 12}});
displayWords("Words longer than 12 characters: ", cursor);
cursor = wordsColl.find({size:{$mod: [2,0]}});
displayWords("Words with even Lengths: ", cursor);
cursor = wordsColl.find({letters:{$size: 12}});
displayWords("Words with 12 Distinct characters: ", cursor);
cursor = wordsColl.find({$and: 
                           [{first:{
                              $in: ['a', 'e', 'i', 'o', 'o']}},
                            {last:{
                              $in: ['a', 'e', 'i', 'o', 'o']}}]});
displayWords("Words that start and end with a vowel: ", cursor);
cursor = wordsColl.find({"stats.vowels":{$gt: 5}});
displayWords("Words containing 6 or more vowels: ", cursor);
cursor = wordsColl.find({letters:{$all: ['a','e','i','o','u']}});
displayWords("Words with all 5 vowels: ", cursor);
cursor = wordsColl.find({otherChars: {$exists: true}});
displayWords("Words with non-alphabet characters: ", cursor);
cursor = wordsColl.find({charsets:{
                          $elemMatch:{
                            $and:[{type: 'other'},
                                  {chars: {$size: 1}}]}}});
displayWords("Words with 1 non-alphabet characters: ", cursor);