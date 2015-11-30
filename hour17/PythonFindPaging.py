from pymongo import MongoClient
def displayCursor(cursor):
    words = ''
    for doc in cursor:
      words += doc["word"] + ","
    if len(words) > 65:
      words = words[:65] + "..."
    print (words)
def pageResults(collection, skip):
    query = {'first': 'w'}    
    cursor = collection.find(query)
    cursor.limit(10)
    cursor.skip(skip)
    print ("Page " + str(skip+1) + " to " + \
          str(skip + cursor.count(True)) + ":")
    displayCursor(cursor);
    if(cursor.count(True) == 10):
      pageResults(collection, skip+10);
if __name__=="__main__":
    mongo = MongoClient('mongodb://localhost:27017/')
    db = mongo['words']
    collection = db['word_stats']
    pageResults(collection, 0)