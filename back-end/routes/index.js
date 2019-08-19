const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const config = require('../config/config')

const { db, mail } = config;
const connection = mysql.createConnection(db);
connection.connect();

/* GET home page. */
router.get('/', function(req, res) {
  console.log('You hit "/"');
  res.render('index', { title: 'Express' });
});

router.get('/getpools', (req, res) => {
  console.log('Getting pools...');
  const selectionQuery = `SELECT * FROM pools;`;
  connection.query(selectionQuery, [], (error, results) => {
    if (error) {
      throw error;
    } else {
      res.json(results);
    }
  });
});

router.get('/getswimmers/:poolId', (req, res) => {
  console.log('Getting swimmers...');
  const { poolId } = req.params;
  const selectionQuery = `SELECT * FROM swimmers
    WHERE poolId = ?;`;
  connection.query(selectionQuery, [poolId], (error, results) => {
    if (error) {
      throw error;
    } else {
      console.log(results);
      res.json(results);
    }
  });
});

module.exports = router;
