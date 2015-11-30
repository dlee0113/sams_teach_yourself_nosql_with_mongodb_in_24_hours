blog = {
  word: 'blog', first: 'b', last: 'g',
  size: 4, letters: ['b','l','o','g'],
  stats: {vowels: 1, consonants: 3},
  charsets: [ {type: 'consonants', chars: ['b','l','g']},
              {type: 'vowels', chars: ['o']} ],
  category: 'New' };
mongo = new Mongo('localhost');
wordsDB = mongo.getDB('words');
wordsDB.runCommand( { getLastError: 1, w: 1, j: true, wtimeout: 1000 } );
wordsColl = wordsDB.getCollection('word_stats');
cursor = wordsColl.find({category:"blue"}, {word: 1, category:1});
print("Before Existing Save: ");
printjson(cursor.toArray());
word = wordsColl.findOne({word:"ocean"});
word.category="blue";
wordsColl.save(word);
word = wordsColl.findOne({word:"sky"});
word.category="blue";
wordsColl.save(word);
cursor = wordsColl.find({category:"blue"}, {word: 1, category:1});
print("After Existing Save: ");
printjson(cursor.toArray());
word = wordsColl.findOne({word:"blog"});
print("Before New Document Save: ");
printjson(word);
wordsColl.save(blog);
word = wordsColl.findOne({word:"blog"}, {word: 1, category:1});
print("After New Document Save: ");
printjson(word);










//clean up
word = wordsColl.findOne({word:"sky"});
word.category="";
wordsColl.save(word);
word = wordsColl.findOne({word:"ocean"});
word.category="";
wordsColl.save(word);
wordsColl.remove({word:"blog"});