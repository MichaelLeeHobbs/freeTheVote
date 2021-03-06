'use strict';

var express = require('express');
var controller = require('./poll.controller');
import auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', controller.index);
router.get('/byOwner/:id', controller.indexByOwner);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.put('/:id/vote', controller.vote);

router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;
