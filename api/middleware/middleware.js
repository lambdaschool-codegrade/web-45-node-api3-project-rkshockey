const { getById } = require('../users/users-model')

function logger(req, res, next) {
  console.log(`${req.method} request for ${req.url} at ${Date()}`);
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
  console.log('Hello from validate user');
  next();
}

function validatePost(req, res, next) {
  console.log('Hello from validate post');
  next();
}

function errorHandler(err, req, res, next){
  console.log('Hello from error handler');
  console.log(err);
  res.status(err.status).json({message: err.message});
}

// do not forget to expose these functions to other modules
module.exports = { logger, validateUserId, validateUser, validatePost, errorHandler };
