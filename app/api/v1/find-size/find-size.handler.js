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
        let objectArray = [];
        objectArray.push(obj);
        
        this.sum(objectArray, 0);

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

  sum(obj, localSum) {
    //loop through each object if it is an array
      for (var elem in obj) {
        //if the obj has a content property than it is a directory object
        if (obj[elem].hasOwnProperty("content")) {
          //it is a directory object, add size property to it
          obj[elem]["size"] = localSum + this.sum(obj[elem]["content"], localSum);
          localSum = obj[elem]["size"];
        } else {
          //the obj is file object, so it has size property
          localSum = localSum + obj[elem]["size"];
        }
      }
    return localSum;
  }
}
module.exports = FindSizeHandler;
