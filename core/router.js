const express = require('express')
const { posts, postAdd, postByID } = require('../controller/postController')
const { postValidationRules } = require('../utils/validators')

const ROUTER = express.Router()

ROUTER.get('/', posts)
ROUTER.post('/add', postValidationRules(), postAdd)
ROUTER.get('/:postID', postByID)

module.exports = ROUTER