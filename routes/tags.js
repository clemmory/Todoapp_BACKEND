var express = require('express');
var router = express.Router();
const pool = require('../db')

/* GET all tags. */
router.get('/', function(req, res) {
  pool.query('SELECT * FROM tags', (error, results) =>{
    if (error) {
      throw error
    }
    res.status(200).json(results.rows);
  })
});

/* ADD a tag */
router.post('/', (req,res) => {
    const { name, color } = req.body
    /*Verify if tag already exists in db */
    pool.query('SELECT t FROM tags t WHERE t.name= $1',[name], (error,results) => {
        if (results.rows.length){
            res.send('This tag name already exists');
        } else {
            /*Create new tag */
            pool.query('INSERT INTO tags (name, color) VALUES ($1, $2)', [name, color], (error, results) => {
                if (error){
                throw error
                };
            res.status(201).send( 'Tag created successfully!')
            })
         }
    })
  });

/* DELETE a tag */
router.delete('/:id', (req,res) => {
    const id = parseInt(req.params.id);
    pool.query('DELETE FROM tags WHERE id=$1', [id], (error, results) => {
        if (error){
            throw error
        }
      res.status(200).send('Tag deleted successfully!')
    })
  });

module.exports = router;
