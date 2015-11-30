print("Hostname:");
print("\t"+hostname());
print("Date:");
print("\t"+Date());
db = connect("localhost/admin");
print("Admin Collections:");
printjson(db.getCollectionNames());