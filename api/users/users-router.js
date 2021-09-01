const express = require('express');
const { validateUserId, validateUser, validatePost } = require('../middleware/middleware')
const Users = require('./users-model')
const Posts = require('../posts/posts-model')

const router = express.Router();

router.get('/', (req, res, next) => {
  Users.get()
    .then(users => res.status(200).json(users))
    .catch(next);
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.post('/', validateUser, (req, res, next) => {
  Users.insert(req.body)
    .then(user => res.status(201).json(user))
    .catch(next);
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  Users.update(req.params.id, req.body)
    .then(user => res.status(200).json(user))
    .catch(next);
});

router.delete('/:id', validateUserId, (req, res, next) => {
  Users.remove(req.params.id)
    .then(() => res.status(200).json(req.user))
    .catch(next);
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  Posts.get()
    .then(posts => res.status(200).json(posts.filter(post => post.user_id == req.params.id)))
    .catch(next)
});

router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
  Posts.insert({ ...req.body, user_id: req.params.id })
    .then(post => {
      console.log(post);
      res.status(200).json(post);
    })
    .catch(next)
});

module.exports = router;
