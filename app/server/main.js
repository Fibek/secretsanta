import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Mongo } from 'meteor/mongo';
import { Random } from 'meteor/random';

Raffle = new Mongo.Collection('raffle');

Accounts.onCreateUser((user) => {
  console.warn('Register:', user.email, '-', user.profile.name);

  const customUser = Object.assign({
    pickedPerson: '',
  }, user);

  Meteor.call('startSecretSanta'); //it can't be here! Must be called after user creation
  return customUser;
});

Meteor.methods({
  'startSecretSanta'() {
    if(Meteor.isServer) {
      const raffle = Raffle.findOne({rafflename: 'test'});
      console.log(raffle);
      if(raffle.usercount == Meteor.users.find().count()) {
	console.warn('starting SecretSanta!', Meteor.users.find().count());
      } else {
	console.log('Not enough users!',Meteor.users.find().count());
      }
    }
  },
  'pickPerson'() {
    console.log('pickPerson()');
  }
});

Meteor.startup(() => {
  if(!Raffle.findOne({rafflename: 'test'})) {
    console.log('test');
    Raffle.insert({rafflename: 'test', usercount: 2, users: [{giver: 'a', recipient: 'b'}]});
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
/*
{ rafflename: '',
  raffle_count: 1,
  users: [
    {giver: recipient},
    {giver: recipient},
  ]
}
*/
