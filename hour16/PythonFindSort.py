from pymongo import MongoClient
def displayCursor(cursor):
  words = ''
  for doc in cursor:
    words += doc["word"] + ","
  if len(words) > 65:
    words = words[:65] + "..."
  print (words)
def sortWordsAscending(collection):
  query = {'first': 'w'}
  cursor = collection.find(query)
  sorter = [('word', 1)]
  cursor.sort(sorter)
  print ("\nW words ordered ascending:")
  displayCursor(cursor)
def sortWordsDescending(collection):
  query = {'first': 'w'}
  cursor = collection.find(query)
  sorter = [('word', -1)]
  cursor.sort(sorter)
  print ("\n\nW words ordered descending:")
  displayCursor(cursor)
def sortWordsAscAndSize(collection):
  query = {'first': 'q'}
  cursor = collection.find(query)
  sorter = [('last', 1), ('size', -1)]
  cursor.sort(sorter)
  print ("\nQ words ordered first by last letter " + \
        "and then by size:")
  displayCursor(cursor)
if __name__=="__main__":
    mongo = MongoClient('mongodb://localhost:27017/')
    db = mongo['words']
    collection = db['word_stats']
    sortWordsAscending(collection)
    sortWordsDescending(collection)
    sortWordsAscAndSize(collection)