const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const lodash = require('lodash');
const bcrypt = require('bcrypt-nodejs');

const config = require('../config/config');

const { db, mail } = config;
const connection = mysql.createConnection(db);
connection.connect();

// Nodemailer
const ejs = require('ejs');
const nodemailer = require('nodemailer');

const transport = {
  host: 'smtp.gmail.com',
  auth: {
    user: mail.user,
    pass: mail.pass,
  },
};

const transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

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

router.get('/getsizes', (req, res) => {
  console.log('Getting sizes...');
  const selectionQuery = `SELECT * FROM sizes;`;
  connection.query(selectionQuery, [], (error, results) => {
    if (error) {
      throw error;
    } else {
      res.json(results);
    }
  });
});

router.get('/getorders', (req, res) => {
  console.log('Getting orders...');
  const selectionQuery = `SELECT * FROM orders;`;
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

router.get('/getsize/:sizeId', (req, res) => {
  console.log('Getting size...');
  const { sizeId } = req.params;
  const selectionQuery = `SELECT * FROM sizes
    WHERE id = ?;`;
  connection.query(selectionQuery, [sizeId], (error, results) => {
    if (error) {
      throw error;
    } else {
      console.log(results);
      res.json(results);
    }
  });
});

router.get('/getpool/:poolId', (req, res) => {
  console.log('Getting pool...');
  const { poolId } = req.params;
  const selectionQuery = `SELECT * FROM pools
    WHERE id = ?;`;
  connection.query(selectionQuery, [poolId], (error, results) => {
    if (error) {
      throw error;
    } else {
      console.log(results);
      res.json(results);
    }
  });
});

router.get('/getgroup/:groupId', (req, res) => {
  console.log('Getting group...');
  const { groupId } = req.params;
  const selectionQuery = `SELECT * FROM groups
    WHERE id = ?;`;
  connection.query(selectionQuery, [groupId], (error, results) => {
    if (error) {
      throw error;
    } else {
      console.log(results);
      res.json(results);
    }
  });
});

router.get('/getitems', (req, res) => {
  console.log('Getting items...');
  const selectionQuery = `SELECT * FROM items;`;
  connection.query(selectionQuery, [], (error, results) => {
    if (error) {
      throw error;
    } else {
      console.log(results);
      res.json(results);
    }
  });
});

router.post('/updatesize', (req, res) => {
  console.log('UPDATING SIZE...');
  console.log(req.body);
  const { usedSizeId, swimmerId } = req.body;
  const updateQuery = `UPDATE swimmers
    SET usedSizeId = ?
    WHERE id = ?`;
  connection.query(updateQuery, [usedSizeId, swimmerId], (error) => {
    if (error) {
      throw error;
    } else {
      res.json({
        msg: 'sizeUpdateSuccess',
      });
    }
  });
});

router.post('/submitorder', (req, res) => {
  console.log('SUBMITTING ORDER...');
  console.log(req.body);
  const { swimmerId, email, name, phone, swimmerName, order, poolName, groupName, swimmerSize, price } = req.body;
  const insertOrder = `INSERT INTO orders (swimmerId, itemId, sizeId, qty, email, phone, parentName, color, special)
    VALUES
    (?,?,?,?,?,?,?,?,?);`;
  lodash.forEach(order, (order) => {
    connection.query(insertOrder, [swimmerId, order.order.id, order.order.size, order.order.qty, email, phone, name, order.color, order.special], (error) => {
      if(error) {
        throw error;
      }
    });
  });
  console.log('order success!');
  const ejsObjectAdmin = {
    name,
    swimmerName,
    swimmerSize,
    email,
    poolName,
    groupName,
    phone,
    order,
    price,
  }
  ejs.renderFile(__dirname + '/adminEmail.ejs', ejsObjectAdmin, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const mailToAdmin = {
        from: 'New Order',
        to: mail.user,
        subject: `New Order for ${poolName} Pool`,
        html: data,
      };
      transporter.sendMail(mailToAdmin, (err2) => {
        if (err2) {
          res.json({
            msg: 'mailToAdminFail',
          });
        } else {
          const ejsObjectParent = {
            poolName,
            groupName,
            order,
            price,
          }
          ejs.renderFile(__dirname + '/parentEmail.ejs', ejsObjectParent, (err3, data2) => {
            if (err3) {
              console.log(err3);
            } else {
              const mailToParent = {
                from: 'Gold Swim Merchandise',
                to: email,
                subject: `Your Gold Swim Order for ${swimmerName}!`,
                html: data2,
              };
              transporter.sendMail(mailToParent, (err4) => {
                if (err4) {
                  res.json({
                    msg: 'mailToParentFail',
                  });
                } else {
                  res.json({
                    msg: 'orderSuccess',
                  });
                }
              })
            }
          })
        }
      })
    }
  });
});

router.post('/registeruser', (req, res) => {
  console.log('REGISTERING USER...');
  const { email, password } = req.body;
  const hash = bcrypt.hashSync(password);
  const insertUser = `INSERT INTO users (email, password)
    VALUES
    (?,?);`;
  connection.query(insertUser, [email, hash], (error) => {
    if (error) {
      throw error;
    } else {
      res.json({
        msg: 'registerUserSuccess',
      });
    }
  });
});

router.post('/login', function(req, res) {
  console.log('LOGGING IN...');
  console.log(req.body);
  const { email, password } = req.body;
  const checkUser = `SELECT * FROM users
    WHERE email = ?`;
  connection.query(checkUser, [email], (error, results) => {
    if (error) {
      throw error;
    } else if (results.length === 0) {
      res.json({
        msg: 'badLogin',
      });
    } else {
      const checkHash = bcrypt.compareSync(password, results[0].password);
      if (checkHash) {
        res.json({
          msg: 'signInSuccess',
        });
      } else {
        res.json({
          msg: 'badPassword',
        });
      }
    }
  });
});

module.exports = router;
