mongo = new Mongo('localhost');
wordsDB = mongo.getDB('words');
wordsDB.runCommand( { getLastError: 1, w: 1, j: true, wtimeout: 1000 } );
wordsColl = wordsDB.getCollection('word_stats');
cursor = wordsColl.find({word: 'righty'}, 
                        {word:1, size:1, stats:1, letters:1});
print("Before Upsert: ");
printjson(cursor.toArray());
wordsColl.update({ word: 'righty'}, 
                 { $set: {word:'righty', size: 4, 
                   letters: ['r','i','g','h'],
                   'stats.consonants': 3, 'stats.vowels': 1}}, 
                 true, true);
cursor = wordsColl.find({word: 'righty'}, 
                        {word:1, size:1, stats:1, letters:1});
print("After Upsert: ");
printjson(cursor.toArray());
wordsColl.update({ word: 'righty'}, 
    { $set: {word:'righty', size: 6, 
      letters: ['r','i','g','h','t','y'],
      'stats.consonants': 5, 'stats.vowels': 1}}, true, true);
cursor = wordsColl.find({word: 'righty'}, 
                        {word:1, size:1, stats:1, letters:1});
print("After Second Upsert: ");
printjson(cursor.toArray());









//clean up
wordsColl.remove({ word: 'righty'});