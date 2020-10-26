module.exports = function (app, Book) {
  app.get('/', function (req, res) {
    res.render('index.html');
  });

  app.get('/books/list', function(req, res) {
    res.render('list.html');
  });
}