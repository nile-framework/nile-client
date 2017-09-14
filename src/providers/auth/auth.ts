// This service providers contains authentication functionality for firebase.


import { Injectable } from '@angular/core';

import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';


@Injectable()
export class AuthProvider {

  // CompanyPushId OBSERVABLE$
  private _companyId = new ReplaySubject<any>(1);
  public companyId = this._companyId.asObservable();

  // authorization state OBSERVABLE$
  private _authState = new ReplaySubject<any>(1);
  public authState = this._authState.asObservable();

  // company position OBSERVABLE$
  private _comPosition = new ReplaySubject<any>(1);
  public comPosition = this._comPosition.asObservable();

  // the users information as an observable which that components can subscribe to.
  private _user: ReplaySubject<any> = new ReplaySubject<any>(1);
  public user: Observable<any> = this._user.asObservable();



  constructor(
    private _afAuth: AngularFireAuth,
    private _afDb: AngularFireDatabase
  ) {
    const authState = this._afAuth.authState.subscribe( user => {
      if (user) {
        firebase.database().ref(`users/${this._afAuth.auth.currentUser.uid}`)
        .once('value').then( snapshot => {
          if (snapshot.val() === null) {
          } else {
            let user = snapshot.val();

            this._user.next(user);
            let companyId = user.company.id;
            let comPosition = user.company.position
            // emit a new value for the company position Subject
            this._comPosition.next(comPosition);
  
            this._companyId.next(companyId);
            // determine authorization state
            firebase.database().ref(`companies/${companyId}/authState`).once('value').then(snapshot => {
              let value = snapshot.val();
              this._authState.next(value);
            });
            // this commented out section does the same operation as above, but we subscribe to the auth state, we don't get the value once.
              // the problem is that when we log out, the auth state changes which triggers the observable we are currently inside to emit a new value
              // then we try to do a database read and are not authorized. TODO: fix this...
            // this._afDb.object(`companies/${companyId}/authState`, {preserveSnapshot: true}).subscribe( snapshot => {
            //   let value = snapshot.val();
            //   this._authState.next(value);
            // });
          }
        });
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
        email: email
        // 
      });
    });
  }


  loginWithEmail(email: string, password: string): firebase.Promise<any> {
    return this._afAuth.auth.signInWithEmailAndPassword(email, password)
  }

  resetPassword(email: string): firebase.Promise<any> {
    return this._afAuth.auth.sendPasswordResetEmail(email);
  }

}
