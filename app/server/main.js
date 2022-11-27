import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Mongo } from 'meteor/mongo';

Raffle = new Mongo.Collection('raffle');

Accounts.onCreateUser((user) => {
  console.warn('Register:', user.email, '-', user.profile.name);

  Raffle.insert({user: user.email})
  const test = Raffle.findOne({user: user.email});

  return user;
});

Meteor.methods({
  'pickPerson'() {
    console.log('testtest');
    users = Raffle.find({user: {$ne: 'admin@admin.com'}});
    users.forEach((u) => {
      console.log('User:',u.user);
    });
  }
});

Meteor.startup(() => {
  if (!Accounts.findUserByUsername('admin')) {
    Accounts.createUser({
      username: 'admin',
      email: 	'admin@admin.com',
      password: 'admin',
    });
  }
});
