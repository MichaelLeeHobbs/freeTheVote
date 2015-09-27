/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Poll from '../api/poll/poll.model';

Thing.find({}).removeAsync()
  .then(function () {
    Thing.create({
      name: 'Live Results',
      icon: 'fa-bolt',
      info: 'Live graphs show your poll results immediately in an easy to understand format. One graph will not provide the whole picture, that\'s why we provide multiple graph types to better describe your results.'
    }, {
      name: 'Works Everywhere',
      icon: 'fa-globe',
      info: 'Traditional desktop computers now represent only 30% of Internet traffic. Your poll must work on the tablets, smart phones, netbooks and notebooks that your visitors are using. Our responsive designs do just that.'
    }, {
      name: 'Social Integration',
      icon: 'fa-facebook',
      info: 'Free integrated facebook or traditional comments allow your poll voters to provide immediate feedback and discuss results. Social share buttons encourage your poll voters to help spread the word.'
    });
  });

User.find({}).removeAsync()
  .then(function () {
    User.createAsync({
      provider: 'local',
      name:     'Test User',
      email:    'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role:     'admin',
      name:     'Admin',
      email:    'admin@example.com',
      password: 'admin'
    })
      .then(function () {
        console.log('finished populating users');
      });
  });

/*
 ownerId: Number,
 name: String,
 options: [String],
 votes: [Number],
 active: Boolean
 */

var ownerId;
User.find({email: 'admin@example.com'})
  .then(function (usr) {
    ownerId = usr._id;
  });

Poll.find({}).removeAsync()
  .then(function () {
    Poll.create({
        ownerId: ownerId,
        name:    'Fake Poll 1',
        options: ['Fake Option 1', 'Fake Option 2', 'Fake Option 3'],
        votes:   [5, 7, 9]
      }, {
        ownerId: ownerId,
        name:    'Fake Poll 2',
        options: ['Fake Option 1', 'Fake Option 2', 'Fake Option 3'],
        votes:   [5, 7, 9]
      }, {
        ownerId: ownerId,
        name:    'Fake Poll 3',
        options: ['Fake Option 1', 'Fake Option 2', 'Fake Option 3'],
        votes:   [5, 7, 9]
      },
      {
        ownerId: ownerId,
        name:    'Fake Poll 4',
        options: ['Fake Option 1', 'Fake Option 2', 'Fake Option 3'],
        votes:   [5, 7, 9]
      }, {
        ownerId: ownerId,
        name:    'Fake Poll 5',
        options: ['Fake Option 1', 'Fake Option 2', 'Fake Option 3'],
        votes:   [5, 7, 9]
      }, {
        ownerId: ownerId,
        name:    'Fake Poll 6',
        options: ['Fake Option 1', 'Fake Option 2', 'Fake Option 3'],
        votes:   [5, 7, 9]
      },
      {
        ownerId: ownerId,
        name:    'Fake Poll 7',
        options: ['Fake Option 1', 'Fake Option 2', 'Fake Option 3'],
        votes:   [5, 7, 9]
      }, {
        ownerId: ownerId,
        name:    'Fake Poll 8',
        options: ['Fake Option 1', 'Fake Option 2', 'Fake Option 3'],
        votes:   [5, 7, 9]
      }, {
        ownerId: ownerId,
        name:    'Fake Poll 9',
        options: ['Fake Option 1', 'Fake Option 2', 'Fake Option 3'],
        votes:   [5, 7, 9]
      }
    );
  });
