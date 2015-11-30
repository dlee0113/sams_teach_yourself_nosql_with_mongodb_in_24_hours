from pymongo import MongoClient
def displayAggregate(results):
    for result in results['result']:
        print (result)
def largeSmallVowels(collection):
    match = {'$match' :
               {'first' :
                 {'$in' : ['a','e','i','o','u']}}}
    group = {'$group' : 
               {'_id' : '$first', 
                     'largest' : {'$max' : '$size'},
                     'smallest' : {'$min' : '$size'},
                     'total' : {'$sum' : 1}}};
    sort = {'$sort' : {'first' : 1}};
    result = collection.aggregate([match, group, sort])
    print ("\nLargest and smallest word sizes for " + \
          "words beginning with a vowel:")
    displayAggregate(result)
def top5AverageWordFirst(collection):
    group = {'$group' : 
               {'_id' : '$first', 
                     'average' : {'$avg' : '$size'}}}
    sort = {'$sort' : {'average' : -1}}
    limit = {'$limit' : 5}
    result = collection.aggregate([group, sort, limit]);
    print ("\nFirst letter of top 5 largest average " + \
          "word size:")
    displayAggregate(result)
if __name__=="__main__":
    mongo = MongoClient('mongodb://localhost:27017/')
    db = mongo['words']
    collection = db['word_stats']
    largeSmallVowels(collection)
    top5AverageWordFirst(collection)