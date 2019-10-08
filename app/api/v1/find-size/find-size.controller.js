const BaseController = require("../base").BaseController;
const FindSizeHandler = require("./find-size.handler");
class FindSizeController extends BaseController {
  constructor() {
    super();
    this._FindSizeHandler = new FindSizeHandler();
  }

  find(req, res, next) {
    this._FindSizeHandler.findSizeInfo(
      req,
      this._responseManager.getDefaultResponseHandler(res)
    );
  }
}

module.exports = FindSizeController;
