const baseController = require('./BaseController');

class PatternController extends baseController {
    constructor() {
        super();
    }

    indexAction(req, res) {
        this.jsonResponse(res, 200, { message: 'OK', patterns: [] });
    }
}

module.exports = new PatternController();
