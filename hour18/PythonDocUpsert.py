from pymongo import MongoClient
def showWord(collection):
    query = {'word' : 'righty'}
    doc = collection.find_one(query)
    print (doc)
def addUpsert(collection):
    query = {'word' : 'righty'}
    update = { '$set' :
       {
         'word' : 'righty', 'first' : 'r', 'last' : 'y', 
         'size' : 4, 'category' : 'New', 
         'stats' : {'vowels' : 1, 'consonants' : 4},
         'letters' : ["r","i","g","h"], 
         'charsets' : [ 
           {'type' : 'consonants', 'chars' : ["r","g","h"]},
           {'type' : 'vowels', 'chars' : ["i"]}]}}
    results = collection.update(query, update, upsert=True, multi=False)
    print ("\nUpsert as insert results: ")
    print (results)
    print ("After Upsert as insert:")
    showWord(collection)
def updateUpsert(collection):
    query = {'word' : 'righty'} 
    update = { '$set' :
       {
         'word' : 'righty', 'first' : 'r', 'last' : 'y', 
         'size' : 6, 'category' : 'Updated', 
         'stats' : {'vowels' : 1, 'consonants' : 5},
         'letters' : ["r","i","g","h","t","y"], 
         'charsets' : [ 
           {'type' : 'consonants', 'chars' : ["r","g","h","t","y"]},
           {'type' : 'vowels', 'chars' : ["i"]}]}}
    results = collection.update(query, update, upsert=True, multi=False)
    print ("\nUpsert as update results:")
    print (results)
    print ("After Upsert as update:")
    showWord(collection)
if __name__=="__main__":
    mongo = MongoClient('mongodb://localhost:27017/')
    mongo.write_concern = {'w' : 1, 'j' : True}
    db = mongo['words']
    collection = db['word_stats']
    print ("Before Upserting:")
    showWord(collection)
    addUpsert(collection)
    updateUpsert(collection)






    def clean(collection):
        query = {'word': "righty"}
        collection.remove(query)
    clean(collection)