from pymongo import MongoClient
def displayGroup(results):
    for result in results:
      print (result)
def firstIsALastIsVowel(collection):
    key = {'first' : True, "last" : True}
    cond = {'first' : 'a', 'last' : 
                    {'$in' : ["a","e","i","o","u"]}}
    initial = {'count' : 0}
    reduce = "function (obj, prev) { prev.count++; }"
    results = collection.group(key, cond, initial, reduce)
    print ("\n\n'A' words grouped by first and last" + \
          " letter that end with a vowel:")
    displayGroup(results)
def firstLetterTotals(collection):
    key = {'first' : True}
    cond = {}
    initial = {'vowels' : 0, 'cons' : 0}
    reduce = "function (obj, prev) { " + \
                 "prev.vowels += obj.stats.vowels; " + \
                  "prev.cons += obj.stats.consonants; " + \
              "}"
    finalize = "function (obj) { " + \
                   "obj.total = obj.vowels + obj.cons; " + \
                "}"
    results = collection.group(key, cond, initial, reduce, finalize)
    print ("\n\nWords grouped by first letter " + \
          "with totals:")
    displayGroup(results)
if __name__=="__main__":
    mongo = MongoClient('mongodb://localhost:27017/')
    db = mongo['words']
    collection = db['word_stats']
    firstIsALastIsVowel(collection)
    firstLetterTotals(collection)