const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
var passwordValidator = require('password-validator');
var mailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
  var schema = new passwordValidator();
  schema
  .is().min(8)                                    
  .is().max(100)                                  
  .has().uppercase()                              
  .has().lowercase()                              
  .has().digits(2)                                
  .has().not().spaces()     
// Create and Save a new user
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Verify all inputs
  if (req.body.firstName.length > 50) {
    return res.status(400).json({error: 'Votre prénom doit contenir 50 caractères maximum'})
  } else if (req.body.lastName.length > 50) {
    return res.status(400).json({error: 'Votre nom doit contenir 50 caractères maximum'})     
  } else if (req.body.job.length > 100) {
    return res.status(400).json({error: 'Votre poste doit contenir 100 caractères maximum'})     
  } else if (req.body.state > 2) {
    return res.status(400).json({error: 'Une erreur est apparue'})     
  } else if (!schema.validate(req.body.password)) {
    return res.status(400).json({error : 'Mot de passe non conforme : Votre mot doit contenir au moins 8 caractères avec une majuscule, une minuscule, 2 chiffres et aucun espace'});
  } else if (schema.validate(req.body.password)) {
    if (mailRegex.test(req.body.email)) {
      // bcrypt
      // .hash(req.body.password, 10)
      // .then(hash => {
        const user = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          job: req.body.job,
          email: req.body.email,
          // password: hash
          password: req.body.password
        })
        User.create(user, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the User."
          });
        else res.send(data);
        });
      // })
      // .catch(error => {
      //   res.status(500).json({ error });
      // });
    } else {
      return res.status(400).json({error: 'Email non conforme'})
    }
  }
};
// exports.authentification = (req,res) => {
//   var email = req.body.email;
// 	var password = req.body.password;
//   if (email && password) {
//     User.authentification([email, password], (err,data) => {
//       if (err)
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while creating the User."
//         });
//       else res.send(data);
//     })
// 	} else {
// 		response.send('Please enter Username and Password!');
// 		response.end();
// 	}
// }
// Retrieve all users from the database.
exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};
// Find a single user with a userId
exports.findOne = (req, res) => {
  User.findById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with id " + req.params.userId
        });
      }
    } else res.send(data);
  });
};
// Update a user identified by the userId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  User.updateById(
    req.params.userId,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.userId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id " + req.params.userId
          });
        }
      } else res.send(data);
    }
  );
};
// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
  User.remove(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + req.params.userId
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};
// Delete all users from the database.
exports.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    else res.send({ message: `All Users were deleted successfully!` });
  });
};