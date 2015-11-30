from pymongo import MongoClient
def displayCursor(cursor):
    print (cursor)
def includeFields(collection, fields):
    query = {'first': 'p'}
    fieldObj = {}
    for field in fields:
      fieldObj[field] = True
    word = collection.find_one(query, fieldObj)
    print ("\nIncluding " + str(fields) +" fields:")
    displayCursor(word)
def excludeFields(collection, fields):
    query = {'first': 'p'}
    if not len(fields):
        fieldObj = None
    else:
        fieldObj = {}
        for field in fields:
          fieldObj[field] = False
    doc = collection.find_one(query, fieldObj)
    print ("\nExcluding " + str(fields) + " fields:")
    displayCursor(doc)
if __name__=="__main__":
    mongo = MongoClient('mongodb://localhost:27017/')
    db = mongo['words']
    collection = db['word_stats']
    excludeFields(collection, [])
    includeFields(collection, ['word', 'size'])
    includeFields(collection, ['word', 'letters'])
    excludeFields(collection, ['letters', 'stats', 'charsets'])