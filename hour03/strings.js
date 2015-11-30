var myStr = "I think therefore I am.";
print("\nOriginal string: ");
print(myStr);
print("\nFinding the substing think: ")
if (myStr.indexOf("think") != -1){
  print(myStr + " contains think");
}
print("\nReplacing the substing think with feel: ")
var newStr = myStr.replace("think", "feel");
print(newStr);
print("\nConverting the phrase into an array: ")
var myArr = myStr.split(" ");
printjson(myArr);