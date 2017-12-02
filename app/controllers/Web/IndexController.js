class IndexController {
    indexAction(req, res) {
        res.render('index/index.ejs');
    }
}

module.exports = new IndexController();
