import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';


Meteor.startup(() => {
  if (!Accounts.findUserByUsername('admin')) {
    Accounts.createUser({
      uername:'admin',
      email: 'admin@admin.com',
      password: 'admin',
    });
  }
});
