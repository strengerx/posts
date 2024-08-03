const express = require('express')
const { posts, postAdd, postByID } = require('../controllers/postsController')
const { postValidationRules } = require('../utilities/validators')

const ROUTER = express.Router()

ROUTER.get('/posts', posts)
ROUTER.post('/posts/add', postValidationRules(), postAdd)
ROUTER.get('/posts/:postID', postByID)

module.exports = ROUTER