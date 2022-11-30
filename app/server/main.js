import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Mongo } from 'meteor/mongo';
import { Random } from 'meteor/random';

Raffle = new Mongo.Collection('raffle');
const _rafname = 'official';
const _ucount = 12;
const secret = Random.secret(10);

Accounts.onCreateUser((options,user) => {

  const customUser = Object.assign({
    pickedPerson: '',
    pickedPersonId: '',
    recipientNote: '',
    note: '',
  }, user);
  
  if(options.profile) {
    customUser.profile = options.profile;
  }

  console.warn('Register:', customUser.profile.name);
  return customUser;
});

Accounts.validateNewUser((user) => {
  const tmp=Raffle.findOne({rafflename: _rafname},{fields: {status:1,token:1}});
  if( tmp.status == 1 ) {
    throw new Meteor.Error(403, 'Wymagana liczba uczestników została osiągnięta');
    return false;
  }
  if( user.profile.token === tmp.token )
    return true;
  else 
    throw new Meteor.Error(403, 'Zły token');
  return false;
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
    if(raffle.status == 0 && raffle.usercount == Meteor.users.find().count()) {
      console.warn('starting SecretSanta!', Meteor.users.find().count(), 'users');
      const tmp = [];
      Meteor.users.find().forEach((person) => {
        tmp.push(person._id);
      });
      [givers, recipients] = match_person(tmp);
      while(!validateMatching(givers,recipients))
        [givers, recipients] = match_person(tmp);

      for(let i = givers.length-1; i >= 0; i--) {
	Raffle.update({rafflename: _rafname},
	  {$push: {users: {giver: givers[i], recipient: recipients[i]}}});
      }
      Raffle.update({rafflename: _rafname}, {$set: {status: 1}});
    } 
  }
});


Meteor.methods({
  'pickPerson'() {
    const rafflestatus = Raffle.findOne({rafflename: _rafname}).status;
    if(rafflestatus == 1) {
      const tmp = Raffle.findOne({'users.giver': Meteor.userId()}, 
          	  {fields: {'users.recipient.$':1}}
          	).users[0].recipient;
      const pickedUserName = Meteor.users.findOne({_id: tmp},{fields: {profile: 1}}).profile.name;
      console.log('pickPerson()',tmp);
      Meteor.users.update({_id: Meteor.userId()}, 
        {$set: {pickedPerson: pickedUserName}});
      Meteor.users.update({_id: Meteor.userId()}, 
        {$set: {pickedPersonId: tmp}});
    } else {
      throw new Meteor.Error('raffle.notenoughusers', 'Aby wylosować osobę, muszą dołączyć wszyscy uczestnicy');
    }
  },
  'saveNote'(textnote) {
    console.log('savenote()',textnote);
    Meteor.users.update({pickedPersonId: Meteor.userId()}, 
      {$set: {recipientNote: textnote}});
    Meteor.users.update({_id: Meteor.userId()}, 
      {$set: {note: textnote}});
  }
});

Meteor.publish('userPickedPerson', function () {
  if (this.userId) {
    return Meteor.users.find({ _id: this.userId }, {
      fields: { pickedPerson: 1}
    });
  } else {
    this.ready();
  }
});

Meteor.publish('userOwnNote', function () {
  if (this.userId) {
    return Meteor.users.find({ _id: this.userId }, {
      fields: { note: 1}
    });
  } else {
    this.ready();
  }
});

Meteor.publish('userReadNote', function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId},{
      fields: {recipientNote: 1}
    });
  } else {
    this.ready();
  }
});

Meteor.startup(() => {
  if(!Raffle.findOne({rafflename: _rafname})) {
    console.warn('Inserting new raffle. Token:',secret);
    Raffle.insert({rafflename: _rafname, token: secret, usercount: _ucount, status: 0, users: []});
  }
});
