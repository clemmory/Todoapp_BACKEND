var express = require('express');
var router = express.Router();
const pool = require('../db')

/* GET all todos. */
router.get('/', function(req, res) {
  pool.query('SELECT * FROM todos', (error, results) =>{
    if (error) {
      throw error
    }
    res.status(200).json(results.rows);
  })
});

/* ADD todo */
router.post('/', (req,res) => {
  const { due_date, description, status} = req.body

  pool.query('INSERT INTO todos (due_date, description,status) VALUES ($1, $2, $3)', [due_date, description,status], (error, results) => {
    if (error) {
      res.status(500).json({error: 'Unable to create todo'})
    }
    res.status(201).json( {result: true, todo: results})
  })
});

/* GET todo by Id */
router.get('/:id', (req,res) => {
  const id = parseInt(req.params.id);
  pool.query('SELECT * FROM todos WHERE id=$1', [id],(error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows);
  })
});

// GET todo by date
router.get('/:date', (req,res) => {
  const date = req.params.date;
  console.log(date)
  pool.query('SELECT * FROM todos WHERE due_date=$1', [date], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows);
  })
})

/* Update todo by Id */
router.put('/:id', (req,res) => {
  const id = parseInt(req.params.id);
  const {due_date, description,status } = req.body

  pool.query(
    'UPDATE todos SET due_date=$1, description=$2, status=$3 WHERE id=$4', 
    [due_date, description, status,id], (error,results) => {
    if (error) {
      throw error
    }
    res.status(200).send('todo modified successfully!')
  })
});

/* Delete todo by Id */

router.delete('/:id', (req,res) => {
  const id = parseInt(req.params.id);

  pool.query('DELETE FROM todos WHERE id=$1', [id], (error, results) => {
    if (error){
      throw error
    }
    res.status(200).send('Todo deleted successfully!')
  })
});

module.exports = router;
