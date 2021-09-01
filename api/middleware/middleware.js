function logger(req, res, next) {
  console.log('Hello from logger');
  next();
}

function validateUserId(req, res, next) {
  console.log('Hello from validate ID');
  next();
}

function validateUser(req, res, next) {
  console.log('Hello from validate user');
  next();
}

function validatePost(req, res, next) {
  console.log('Hello from validate post');
  next();
}

function errorHandler(err, res, req, next){
  console.log('Hello from error handler');
  console.log(err);
  res.json({message: err.message});
}

// do not forget to expose these functions to other modules
module.exports = { logger, validateUserId, validateUser, validatePost, errorHandler };
