
// This service providers contains authentication functionality for firebase.


import { Injectable } from '@angular/core';

import { ReplaySubject } from 'rxjs/ReplaySubject';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';


@Injectable()
export class AuthProvider {

  // CompanyPushId OBSERVABLE
  private _companyId = new ReplaySubject<any>(1);
  public companyId = this._companyId.asObservable();

  constructor(
    private _afAuth: AngularFireAuth,
    private _afDb: AngularFireDatabase
  ) {
    const authState = this._afAuth.authState.subscribe( user => {
      if (user) {
        firebase.database().ref(`users/${this._afAuth.auth.currentUser.uid}/company`)
        .once('value').then( snapshot => {
          // console.log('companyId is: ' + snapshot.val());
          this._companyId.next(snapshot.val());
        })
      } else {
        // console.log('user is false');
      }
    });
  }

  getUser():firebase.User {
    return this._afAuth.auth.currentUser;
  }

  logout(): firebase.Promise<any> {
    return this._afAuth.auth.signOut();
  }

  signUpWithEmail(email: string, password: string, phoneNumber: any, firstName: string, lastName: string): firebase.Promise<any> {
    return this._afAuth.auth.createUserWithEmailAndPassword(email, password).then( newUser => {
      console.log('new user uid is: ' + newUser.uid);
      this._afDb.object(`users/${newUser.uid}`).set({
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        email: email,
        waitingPage: true
        // 
      });
    });
  }


  loginWithEmail(email: string, password: string):firebase.Promise<any> {
    return this._afAuth.auth.signInWithEmailAndPassword(email, password)
  }

  resetPassword(email: string):firebase.Promise<any> {
    return this._afAuth.auth.sendPasswordResetEmail(email);
  }

}
