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
        obj["size"] = this.recursiveSum(obj);

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

  recursiveSum(elem) {
    //loop through each object if it is an array
    let localSum = 0;
    // if (!Array.isArray(obj)) {
    //   //object is not an array, can be directory
    //   if(obj.hasOwnProperty("content")){
    //     //it is a directory
    //     console.log("it a directory: ", obj['name']);
    //     obj["size"] = this.recursiveSum(obj['content']);

    //   }
    //   else{
    //     console.log("it is a file: " , obj['name']);
    //     localSum = localSum + obj['size'];
    //   }
      
    // } else {
      console.log("iterating.. ")
      if(Array.isArray(elem)){
        for (let index = 0; index < elem.length; index++) {
          localSum = localSum + this.recursiveSum(elem[index]);            
        }
      }
      else{
        //it is not array
        if (elem.hasOwnProperty("content")) {
          //it is a directory object, add size property to it
          console.log("it is nested directory: " , elem['name']);
          console.log("sum before this directory: ", localSum);
          elem["size"] = localSum + this.recursiveSum(elem["content"]);
          console.log("sum after this directory: ", localSum);
        } else {
          //the obj is file object, so it has size property
          
          console.log("it is a file: ", elem);
          console.log("sum before this file run down: ", localSum);
          localSum = localSum + elem["size"];
          console.log("sum after this file run down: ", localSum);
        }
        
      }
     
        //if the obj has a content property than it is a directory object
        
    // }
    // console.log("localsum: ", localSum)

    return localSum;
  }
}
module.exports = FindSizeHandler;
