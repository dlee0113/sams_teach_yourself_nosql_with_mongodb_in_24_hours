from pymongo import MongoClient
def showWord(collection):
    query = {'word': {'$in' : ['left', 'lefty']}}
    cursor = collection.find(query)
    for doc in cursor:
      print (doc)
def updateDoc(collection):
    query = {'word' : "left"}
    update = {
        '$set' : {'word' : 'lefty'},
        '$inc' : {'size' : 1, 'stats.consonants' : 1},
        '$push' : {'letters' : 'y'}}
    results = collection.update(query, update, upsert=False, multi=False)
    print ("\nUpdate Doc Result: ")
    print (str(results))
    print ("\nAfter Updating Doc: ")
    showWord(collection)
def resetDoc(collection):
    query = {'word' : "lefty"}
    update = {
        '$set' : {'word' : 'left'},
        '$inc' : {'size' : -1, 'stats.consonants' : -1},
        '$pop' : {'letters' : 1}}
    results = collection.update(query, update, upsert=False, multi=False)
    print ("\nReset Doc Result: ")
    print (str(results))
    print ("\nAfter Resetting Doc: ")
    showWord(collection)
if __name__=="__main__":
    mongo = MongoClient('mongodb://localhost:27017/')
    mongo.write_concern = {'w' : 1, 'j' : True}
    db = mongo['words']
    collection = db['word_stats']
    print ("Before Updating:")
    showWord(collection)
    updateDoc(collection)
    resetDoc(collection)
