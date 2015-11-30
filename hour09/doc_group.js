mongo = new Mongo('localhost');
wordsDB = mongo.getDB('words');
wordsColl = wordsDB.getCollection('word_stats');
results = wordsColl.group({ key: {first: 1, last: 1}, 
  cond: {first:'a',last:{$in:['a','e','i','o','u']}},
  initial: {"count":0}, 
  reduce: function (obj, prev) { prev.count++; }
});
print("'A' words grouped by first and last" +
           " letter that end with a vowel: ");
results.forEach(function(item){
  print(JSON.stringify(item));
});
results = wordsColl.group({key: {first: 1}, 
  cond: {size:{$gt:13}},
  initial: {"count":0, "totalVowels":0}, 
  reduce: function (obj, prev) { 
            prev.count++; 
            prev.totalVowels += obj.stats.vowels;
          }
});
print("Words larger than 13 character grouped by first letter : ");
results.forEach(function(item){
  print(JSON.stringify(item));
});
results = wordsColl.group({key: {first: 1}, 
  cond: {},
  initial: {"count":0, "vowels":0, "consonants":0}, 
  reduce: function (obj, prev) { 
            prev.count++;
            prev.vowels += obj.stats.vowels;
            prev.consonants += obj.stats.consonants;
          }, 
  finalize: function (obj) { 
              obj.total = obj.vowels + obj.consonants; 
            }
});
print("Words grouped by first letter with totals: ");
results.forEach(function(item){
  print(JSON.stringify(item));
});
