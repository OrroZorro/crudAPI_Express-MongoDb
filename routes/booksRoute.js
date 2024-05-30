const express = require('express');
const Book = require('../models/bookModel.js');


const router = express.Router();

router.get('/', (req, res) => {
  res.render('info');
});

router.post('/', async (req, res) => {
    try {
     
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                message: 'Send all required fields'
            });
        }
       
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        };
        const book = await Book.create(newBook);
        return res.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});


router.get('/books', async (req, res) => {
  try {
      const books = await Book.find({});
      res.render('index', { books }); 
  } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
  }
});


router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        return res.status(200).json({ book });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({ message: 'Send all required fields' });
        }
        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);
        if (!result) {
            return res.status(404).json({ message: 'Book not found' });
        }
        return res.status(200).send({ message: 'Book updated successfully!' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: 'Book not found' });
        }
        return res.status(200).send({ message: 'Book deleted' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});


router.get('/', (req, res) => {
    res.render('home', { message: 'Please go to /books to see the list of books' });
});

module.exports = router;
