const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('./auth-model');


router.post('/register', validateUser, (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 11); 
  user.password = hash;

  Users.add(user)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json({errorMessage:"ERROR 500 in creating account",error});
    });
});

router.post('/login', validateUser, (req, res) => {
  // implement login
  let { username, password } = req.body;
  
  //make sure username and password match
  Users.findBy({ username})
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
          req.session.user = user
        res.status(200).json({
          message: `Welcome ${user.username}!`,
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json({message:"Error 500: error logging in", error});
    });
});

// MiddleWare for Validating If User Req.Body has all needed componets

function validateUser(req, res, next) {
  if (!req.body.username || !req.body.password) {
    res.status(404).json({message:'Username or password description is missing.'});
} else {
    next();
}
}



module.exports = router;