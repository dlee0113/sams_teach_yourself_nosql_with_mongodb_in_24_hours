from pymongo import MongoClient
import gridfs
def listGridFSFiles(db):
    fs = gridfs.GridFS(db)
    print (fs.list())
def putGridFSFile(db):
    fs = gridfs.GridFS(db)
    fs.put("Stored From Python", filename="python.txt", encoding="utf8")
def getGridFSFile(db):
    fs = gridfs.GridFS(db)
    file = fs.get_last_version(filename="python.txt")
    print (file.read())
def deleteGridFSFile(db):
    fs = gridfs.GridFS(db)
    file = fs.get_last_version(filename="python.txt")
    fs.delete(file._id)
if __name__=="__main__":
    mongo = MongoClient('mongodb://localhost:27017/')
    mongo.write_concern = {'w' : 1, 'j' : True}
    db = mongo['myFS']
    print ("\nFiles Before Put:")
    listGridFSFiles(db)
    putGridFSFile(db)
    print ("\nFiles After Put:")
    listGridFSFiles(db)
    print ("\nContents of Retrieve File:")
    getGridFSFile(db)
    deleteGridFSFile(db)
    print ("\nFiles After Delete:")
    listGridFSFiles(db)