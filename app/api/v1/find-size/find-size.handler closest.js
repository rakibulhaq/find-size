class FindSizeHandler {
  constructor() {}

  findSizeInfo(req, callback) {
    let obj = req.body;
    return new Promise((resolve, reject) => {
      if (obj) {
        //format the data
        let formattedObject = {};
        //recursively check for type
        //send in the object
        
        obj["size"] = this.recursiveSum(obj, 0);

        formattedObject["sizeData"] = obj;
        resolve(formattedObject);
      } else {
        reject(new Error("No Data Passed For formatting"));
      }
    })
      .then(formattedObject => {
        callback.onSuccess(formattedObject);
      })
      .catch(error => {
        callback.onError(error);
      });
  }

  recursiveSum(obj, localSum) {
    //loop through each object if it is an array
    // var localSum = 0;
    if (!Array.isArray(obj)) {
      //object is not an array, can be directory
      if(obj.hasOwnProperty("content")){
        //it is a directory
        console.log("it is root directory: ", obj['name']);
        obj["size"] = localSum + this.recursiveSum(obj['content'], localSum);

      }
      else{
        console.log("it is a file, should never reach " , obj['name']);
        localSum = localSum + obj['size'];
      }
      
    } else {
      console.log("iterating.. ")
      for (var elem in obj) {
        //if the obj has a content property than it is a directory object
        if (obj[elem].hasOwnProperty("content")) {
          //it is a directory object, add size property to it
          console.log("it is nested directory: " , obj[elem]['name']);
          console.log("sum before this nested directory: ", localSum);
          obj[elem]["size"] = localSum + this.recursiveSum(obj[elem]["content"], localSum);
          localSum = obj[elem]["size"];
          console.log("sum after this nested directory: ", localSum);
        } else {
          //the obj is file object, so it has size property
          console.log("it is a file: ", obj[elem]['name']);
          console.log("sum before this file run down: ", localSum);
          localSum = localSum + obj[elem]["size"];
          console.log("sum after this file run down: ", localSum);
        }
      }
    }
    // console.log("localsum: ", localSum)

    return localSum;
  }
}
module.exports = FindSizeHandler;
