/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/polls              ->  index
 * GET     /api/polls/byOwner/:id  ->  index by owner
 * POST    /api/polls              ->  create
 * GET     /api/polls/:id          ->  show
 * PUT     /api/polls/:id          ->  update
 * DELETE  /api/polls/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Poll = require('./poll.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.extend(entity, updates);
    // changed _.merge to _.extend
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Polls
exports.index = function(req, res) {
  Poll.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a list of Polls by Owner id
exports.indexByOwner = function(req, res) {
  Poll.findAsync({ownerId:req.params.id})
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Poll from the DB
exports.show = function(req, res) {
  Poll.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Poll in the DB
exports.create = function(req, res) {
  Poll.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Poll in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Poll.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Vote on an existing Poll in the DB
exports.vote = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Poll.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Poll from the DB
exports.destroy = function(req, res) {
  Poll.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
