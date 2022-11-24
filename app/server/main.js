import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';


Meteor.startup(() => {
  if (!Accounts.findUserByUsername('admin')) {
    Accounts.createUser({
      username: 'admin',
      password: 'admin',
    });
  }
});
