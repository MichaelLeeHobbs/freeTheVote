'use strict';

var app = require('../..');
var request = require('supertest');

var newPoll;

describe('Poll API:', function() {

  describe('GET /api/polls', function() {
    var polls;

    beforeEach(function(done) {
      request(app)
        .get('/api/polls')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          polls = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      polls.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/polls', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/polls')
        .send({
          ownerId: 1337,
          name: 'New Poll',
          options: ['Poll 1', 'Poll 2', 'Poll 3']
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newPoll = res.body;
          done();
        });
    });

    it('should respond with the newly created poll', function() {
      newPoll.ownerId.should.equal(1337);
      newPoll.name.should.equal('New Poll');
      newPoll.options.should.equal(['Poll 1', 'Poll 2', 'Poll 3']);
      newPoll.votes.should.equal([0]);
    });

  });

  describe('GET /api/polls/:id', function() {
    var poll;

    beforeEach(function(done) {
      request(app)
        .get('/api/polls/' + newPoll._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          poll = res.body;
          done();
        });
    });

    afterEach(function() {
      poll = {};
    });

    it('should respond with the requested poll', function() {
      poll.ownerId.should.equal(1337);
      poll.name.should.equal('New Poll');
      poll.options.should.equal(['Poll 1', 'Poll 2', 'Poll 3']);
      poll.votes.should.equal([0, 0, 0]);
    });

  });

  describe('PUT /api/polls/:id', function() {
    var updatedPoll;

    beforeEach(function(done) {
      request(app)
        .put('/api/polls/' + newPoll._id)
        .send({
          name: 'Updated Poll',
          options: ['Poll 1', 'Poll 2', 'Poll 3'],
          votes: [-1, 0, 5]
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPoll = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPoll = {};
    });

    it('should respond with the updated poll', function() {
      updatedPoll.name.should.equal('Updated Poll');
      updatedPoll.options.should.equal(['Poll 1', 'Poll 2', 'Poll 3']);
      updatedPoll.votes.should.equal([-1, 0, 5]);
    });

  });

  describe('DELETE /api/polls/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/polls/' + newPoll._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when poll does not exist', function(done) {
      request(app)
        .delete('/api/polls/' + newPoll._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
