mongo = new Mongo('localhost');
wordsDB = mongo.getDB('words');
wordsColl = wordsDB.getCollection('word_stats');
results = wordsColl.mapReduce(
  function() { emit(this.first, this.stats.vowels); },
  function(key, values){ return Array.sum(values); },
  { out: {inline: 1}}
);
print("\nTotal vowel count in words beginning with " +
      "a certain leter: ");
for(i in results.results){
  print(JSON.stringify(results.results[i]));
}
results = wordsColl.mapReduce(
  function() { emit(this.first, 
                    { vowels: this.stats.vowels, 
                      consonants: this.stats.consonants})
  },
  function(key, values){
    result = {count: values.length,
              vowels: 0, consonants: 0};
    for(var i=0; i<values.length; i++){
      if (values[i].vowels)
        result.vowels += values[i].vowels;
      if(values[i].consonants)
        result.consonants += values[i].consonants;
    }
    return result;
  },
  { out: {inline: 1},
    query: {last: {$in:['a','e','i','o','u']}},
    finalize: function (key, obj) { 
                obj.characters = obj.vowels + obj.consonants;
                return obj;
              }
  }
);
print("\nTotal words, vowels, consonants and characters in words " +
      "beginning with a certain leter that end with a vowel: ");
for(i in results.results){
  print(JSON.stringify(results.results[i]));
}