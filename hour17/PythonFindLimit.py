from pymongo import MongoClient
def displayCursor(cursor):
    words = ''
    for doc in cursor:
      words += doc["word"] + ","
    if len(words) > 65:
      words = words[:65] + "..."
    print (words)
def limitResults(collection, limit):
    query = {'first': 'p'}
    cursor = collection.find(query)
    cursor.limit(limit)
    print ("\nP words Limited to " + str(limit) +" :")
    displayCursor(cursor)
if __name__=="__main__":
    mongo = MongoClient('mongodb://localhost:27017/')
    db = mongo['words']
    collection = db['word_stats']
    limitResults(collection, 1)
    limitResults(collection, 3)
    limitResults(collection, 5)
    limitResults(collection, 7)