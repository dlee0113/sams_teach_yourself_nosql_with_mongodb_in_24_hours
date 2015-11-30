from pymongo import MongoClient
def showWord(collection):
    query = {'word' : 'ocean'}
    fields = {'word' : True, 'category' : True}
    doc = collection.find_one(query, fields)
    print (doc)
def saveBlueDoc(collection):
    query = {'word' : "ocean"}
    doc = collection.find_one(query)
    doc["category"] = "blue"
    results = collection.save(doc)
    print ("\nSave Docs Result:")
    print (str(results))
    print ("\nAfter Saving Doc:")
    showWord(collection)
def resetDoc(collection):
    query = {'word' : "ocean"}
    doc = collection.find_one(query)
    doc["category"] = ""
    results = collection.save(doc)
    print ("\nReset Docs Result:")
    print (str(results))
    print ("\nAfter Resetting Doc:")
    showWord(collection)
if __name__=="__main__":
    mongo = MongoClient('mongodb://localhost:27017/')
    mongo.write_concern = {'w' : 1, 'j' : True}
    db = mongo['words']
    collection = db['word_stats']
    print ("Before Saving:")
    showWord(collection)
    saveBlueDoc(collection)
    resetDoc(collection)
