from pymongo import MongoClient
def sizesOfAllWords(collection):
    results = collection.distinct("size")
    print ("\nDistinct Sizes of words: ")
    print (str(results))
def sizesOfQWords(collection):
    query = {'first': 'q'}
    cursor = collection.find(query)
    results = cursor.distinct("size")
    print ("\nDistinct Sizes of words starting with Q:")
    print (str(results))
def firstLetterOfLongWords(collection):
    query = {'size': {'$gt': 12}}
    cursor = collection.find(query)
    results = cursor.distinct("first")
    print ("\nDistinct first letters of words longer than" + \
            "  12 characters:")
    print (str(results))
if __name__=="__main__":
    mongo = MongoClient('mongodb://localhost:27017/')
    db = mongo['words']
    collection = db['word_stats']
    sizesOfAllWords(collection)
    sizesOfQWords(collection)
    firstLetterOfLongWords(collection)