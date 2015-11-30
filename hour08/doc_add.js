selfie = {
  word: 'selfie', first: 's', last: 'e',
  size: 4, letters: ['s','e','l','f','i'],
  stats: {vowels: 3, consonants: 3},
  charsets: [ {type: 'consonants', chars: ['s','l','f']},
              {type: 'vowels', chars: ['e','i']} ],
  category: 'New' };
tweet = {
    word: 'tweet', first: 't', last: 't',
    size: 4, letters: ['t','w','e'],
    stats: {vowels: 2, consonants: 3},
    charsets: [ {type: 'consonants', chars: ['t','w']},
                {type: 'vowels', chars: ['e']} ],
    category: 'New' };
google = {
    word: 'google', first: 'g', last: 'e',
    size: 4, letters: ['g','o','l','e'],
    stats: {vowels: 3, consonants: 3},
    charsets : [ {type: 'consonants', chars: ['g','l']},
                 {type: 'vowels', chars: ['o','e']} ],
    category: 'New' };

mongo = new Mongo('localhost');
wordsDB = mongo.getDB('words');
wordsDB.runCommand( { getLastError: 1, w: 1, j: true, wtimeout: 1000 } );
wordsColl = wordsDB.getCollection('word_stats');
print('Before Inserting selfie: ');
cursor = wordsColl.find({word: {$in: ['tweet','google', 'selfie']}},
                        {word:1});
printjson(cursor.toArray());
wordsColl.insert(selfie);
print('After Inserting selfie: ');
cursor = wordsColl.find({word: {$in: ['tweet','google', 'selfie']}}, 
                        {word:1});
printjson(cursor.toArray());
print('After Inserting tweet and google');
wordsColl.insert([tweet, google]);
cursor = wordsColl.find({word: {$in: ['tweet','google', 'selfie']}},
                        {word:1});
printjson(cursor.toArray());










//cleanup
//wordsColl.remove({word: {$in: ['tweet','google', 'selfie']}});