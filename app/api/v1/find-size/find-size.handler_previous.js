class FindSizeHandler {
  constructor() {}

  findSizeInfo(req, callback) {
    let obj = req.body;

    return new Promise((resolve, reject) => {
      if (obj) {
        //format the data
        let formattedObject = {};
        //recursively check for type

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

  recursiveSum(obj) {
    let localSum = 0;
    for (var prop in obj) {
        //check for if the object node has content property
        //if so go into recursive loop
        //else it is a inside a content, so add the sizes and return
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        if (prop == "content") {
          // this object is directory object
          this.recursiveSearch(obj.content);
        } else {
          localSum = localSum + obj.size;
        }
      }
    }
    return localSum;
  }

  recursiveSearch(content) {
    for (var elem in content) {
      //for every obj element in the content array
      //loop and search for more directory
      this.recursiveSum(elem);
    }
  }
}
module.exports = FindSizeHandler;
