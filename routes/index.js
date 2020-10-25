module.exports = function(app, Book) {
  app.get('/api/books', function(req, res) {
    console.log("GET /api/books");
    Book.find(function(err, books) {
      if(err) return res.status(500).send({error: 'database failure'});
      res.json(books);
    });
  });

  app.get('/api/books/:book_id', function(req, res) {
    console.log("GET /api/books/:book_id");
    Book.findOne({_id: req.params.book_id}, function(err, book) {
      if(err) return res.status(500).json({error: err});
      if(!book) return res.status(404).json({error: 'book not found'});
      res.json(book);
    });
  });

  app.get('/api/books/author/:author', function(req, res) {
    console.log("GET /api/books/author/:author");
    Book.find({author: req.params.author}, {_id:0, title: 1, published_date: 1}, function(err, books) {
      if(err) return res.status(500).json({error: err});
      if(books.length === 0) return res.status(404).json({error: 'book not found'});
      res.json(books);
    });
  });

  app.post('/api/books', function(req, res) {
    console.log("POST /api/books");

    var book = new Book();
    book.title = req.body.name;
    book.author = req.body.author;
    book.published_date = new Date(req.body.published_date);

    book.save(function(err) {
      if(err) {
        console.log(err);
        res.json({result: 0});
        return;
      }
      res.json({result: 1});
    });
  });

  app.put('/api/books/:book_id', function(req, res) {
    console.log("PUT /api/books/:book_id");

    // Book.findById(req.params.book_id, function(err, book) {
    //   if(err) return res.status(500).json({error: err});
    //   if(!book) return res.status(404).json({error: 'book not found'});

    //   if(req.body.title) book.title = req.body.title;
    //   if(req.body.author) book.author = req.body.author;
    //   if(req.body.published_date) book.published_date = req.body.published_date;

    //   book.save(function(err) {
    //     if(err) res.status(500).json({error: 'failed to update'});
    //     res.json({message: 'book updated'});
    //   });

    // });
    Book.update({_id: req.params.book_id}, {$set: req.body}, function(err, output) {
      if(err) return res.status(500).json({error: 'database failure'});
      console.log(output);
      if(!output.n) return res.status(404).json({error: 'book not found'});
      res.json({message: 'book updated'});
    })
  });

  app.delete('/api/books/:book_id', function(req, res) {
    console.log("DELETE /api/books/:book_id");

    Book.remove({_id: req.params.book_id}, function(err, output) {
      if(err) return res.status(500).json({error: 'database failure'});
      if(!output.n) return res.status(404).json({error: 'book not found'});
      res.json({message: 'book deleted'});

      res.status(204).end();
    })
  });
}