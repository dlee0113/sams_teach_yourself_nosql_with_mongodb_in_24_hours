from pymongo import MongoClient
def getOne(collection):
  doc = collection.find_one()
  print ("Single Document:")
  print (doc)
def getManyFor(collection):
  print ("\nMany Using For Loop:")
  cursor = collection.find()
  words = []
  for doc in cursor:
    words.append(str(doc['word']))
    if len(words) > 10:
        break
  print (words)
def getManySlice(collection):
  print ("\nMany Using Cursor Slice:")
  cursor = collection.find()
  cursor = cursor[5:10]
  words = []
  for doc in cursor:
    words.append(str(doc['word']))
  print (words)
if __name__=="__main__":
    mongo = MongoClient('mongodb://localhost:27017/')
    db = mongo['words']
    collection = db['word_stats']
    getOne(collection)
    getManyFor(collection)
    getManySlice(collection)