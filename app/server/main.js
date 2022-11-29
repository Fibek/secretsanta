import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Mongo } from 'meteor/mongo';
import { Random } from 'meteor/random';

Raffle = new Mongo.Collection('raffle');
const _rafname = 'test';
const _ucount = 12;

Accounts.onCreateUser((options,user) => {

  const customUser = Object.assign({
    pickedPerson: '',
    note: '',
  }, user);
  
  if(options.profile) {
    customUser.profile = options.profile;
  }

  console.warn('Register:', customUser.profile.name);
  return customUser;
});

const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function match_person(attendees) {
  givers = [...attendees];
  shuffleArray(givers);
  recipients = [...givers]
  recipients.shift();
  recipients.push(givers[0]);
  return [givers,recipients];
}

function validateMatching(arr1, arr2) {
  for(let i = arr1.length-1; i >= 0; i--) {
    if(arr1[i] == arr2[i])
      return false;
  }
  return true; 
}


Accounts.onLogin(() => {
  if(Meteor.isServer) {
    const raffle = Raffle.findOne({rafflename: _rafname});
    console.log(raffle);
    if(raffle.status == 0 && raffle.usercount == Meteor.users.find().count()) {
      console.warn('starting SecretSanta!', Meteor.users.find().count(), 'users');
      const tmp = [];
      Meteor.users.find().forEach((person) => {
        tmp.push(person._id);
      });
      [givers, recipients] = match_person(tmp);
      while(!validateMatching(givers,recipients))
        [givers, recipients] = match_person(tmp);
      Raffle.update({rafflename: _rafname}, {$set: {status: 1}});
      console.log(givers);
      console.log(recipients);
    } 
  }
});


Meteor.methods({
  'pickPerson'() {
    console.log('pickPerson()');
  }
});

Meteor.startup(() => {
  if(!Raffle.findOne({rafflename: _rafname})) {
    console.log('Inserting new raffle');
    Raffle.insert({rafflename: _rafname, usercount: _ucount, status: 0, users: []});
  }
  /*
  if (!Accounts.findUserByUsername('admin')) {
    Accounts.createUser({
      username: 'admin',
      email: 	'admin@admin.com',
      password: 'admin',
      profile: {name: 'admin'}
    });
  }
  */
});
