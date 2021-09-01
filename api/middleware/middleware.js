const { getById } = require('../users/users-model')

function logger(req, res, next) {
  console.log(`${req.method} ${req.url} on ${Date()}`);
  next();
}

function validateUserId(req, res, next) {
  getById(req.params.id)
    .then(user => {
      if (user){
        req.user === user;
        next()
      }else{
        next({status: 404, message: "user not found" })
      }
    })
    .catch(next)
}

function validateUser(req, res, next) {
  if (req.body.name){
    next()
  }else{
    next({ status: 400, message: "missing required name field"})
  }
}

function validatePost(req, res, next) {
  if (req.body.text){
    next()
  }else{
    next({ status: 400, message: "missing required text field" })
  }
}

function errorHandler(err, req, res, next){
  console.log(err);
  res.status(err.status).json({message: err.message});
}

// do not forget to expose these functions to other modules
module.exports = { logger, validateUserId, validateUser, validatePost, errorHandler };
