var vowelArr = "aeiou";
var consenantArr = "bcdfghjklmnpqrstvwxyz";
function addWord(word){
  var vowelCnt = ("|"+word+"|").split(/[aeiou]/i).length-1;
  var consonantCnt = ("|"+word+"|").split(/[bcdfghjklmnpqrstvwxyz]/i).length-1;
  var letters = [], vowels = [], consonants = [], 
      other = [], charsets = [];
  for (var i=0; i<word.length; i++){
    var ch = word[i];
    if (letters.indexOf(ch) === -1)
      letters.push(ch);
    if (vowelArr.indexOf(ch) !== -1){
      if(vowels.indexOf(ch) === -1)
        vowels.push(ch);
    }else if (consenantArr.indexOf(ch) !== -1){
      if(consonants.indexOf(ch) === -1)
        consonants.push(ch);
    }else{
      if(other.indexOf(ch) === -1)
        other.push(ch);
    }
  }
  if(consonants.length)
    charsets.push({type:"consonants", chars:consonants});
  if(vowels.length)
    charsets.push({type:"vowels", chars:vowels});
  if(other.length)
    charsets.push({type:"other", chars:other});
  print(letters);
  var wordObj = { word: word, first: word[0], 
                  last: word[word.length-1],
                  size: word.length, letters: letters,
                  stats: { vowels: vowelCnt, consonants: consonantCnt },
                  charsets: charsets };
  if(other.length)
    wordObj.otherChars = other;
  printjson(wordObj);
}
addWord("test");
//mongo = new Mongo("localhost");
//wordsDB = mongo.getDB("words");
//wordsColl = wordsDB.getCollection("word_stats");
//    addObject(nebulae, {ngc:"NGC 7293", name:"Helix",
//      type:"planetary",location:"Aquila"});
//    addObject(nebulae, {ngc:"NGC 6543", name:"Cat's Eye",
//      type:"planetary",location:"Draco"});
//    addObject(nebulae, {ngc:"NGC 1952", name: "Crab",
//      type:"supernova",location:"Taurus"});
//  });
//});