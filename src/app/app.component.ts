import { Component, ViewChild } from '@angular/core';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { TranslateService } from '@ngx-translate/core';

import { Config, Nav, Platform, Events, MenuController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { FirstRunPage } from '../pages/pages';
import { Settings } from '../providers/providers';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}


@Component({
  template: `<ion-menu [content]="content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Nile</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <button menuClose ion-item *ngFor="let p of appPages" (click)="openPage(p)">
          {{p.title}}
        </button>
      </ion-list>
    </ion-content>

  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage: any;

  @ViewChild(Nav) nav: Nav;

    // List of pages that can be navigated to from the left menu
    // the left menu only works after login
    // the login page disables the left menu
    appPages: PageInterface[] = [
      { title: 'Home', name: 'TabsPage', component: 'TabsPage', tabComponent: 'HomePage', index: 0, icon: 'home' },
      { title: 'Vendors', name: 'TabsPage', component: 'TabsPage', tabComponent: 'VendorsPage', index: 1, icon: 'basket' },
      { title: 'Job Sites', name: 'TabsPage', component: 'TabsPage', tabComponent: 'JobSitesPage', index: 2, icon: 'ionic' },
      { title: 'Settings', name: 'SettingsPage', component: 'SettingsPage', icon: 'information-circle' }
    ];

    // waitingPages: PageInterface[] = [
    //   { title: 'Login', name: 'LoginPage', component: LoginPage, icon: 'log-in' },
    //   { title: 'Support', name: 'SupportPage', component: SupportPage, icon: 'help' },
    //   { title: 'Account', name: 'SignupPage', component: SignupPage, icon: 'person-add' }
    // ];

  // pages: any[] = [
  //   { title: 'Tutorial', component: 'TutorialPage' },
  //   { title: 'Welcome', component: 'WelcomePage' },
  //   { title: 'Tabs', component: 'TabsPage' },
  //   { title: 'Cards', component: 'CardsPage' },
  //   { title: 'Content', component: 'ContentPage' },
  //   { title: 'Login', component: 'LoginPage' },
  //   { title: 'Signup', component: 'SignupPage' },
  //   { title: 'Map', component: 'MapPage' },
  //   { title: 'Master Detail', component: 'ListMasterPage' },
  //   { title: 'Menu', component: 'MenuPage' },
  //   { title: 'Settings', component: 'SettingsPage' },
  //   { title: 'Search', component: 'SearchPage' }
  // ]

  constructor(
    private translate: TranslateService,
    private platform: Platform, settings: Settings,
    private config: Config,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    public events: Events,
    public menuCtrl: MenuController,
    private _afAuth: AngularFireAuth,
  ) 
  {
    // we subscribe to the Firebase authState and navigate the user based on the authState value.
    const authState = this._afAuth.authState.subscribe( user => {
      if (user) {
        // we're done with the authState observable at this point.
        authState.unsubscribe();
        // now we check the users profile inside the database for the value of 'waitingPage' 
        //NOTICE: we use template literals (backticks ( ` ` )) in the database call.
        firebase.database().ref(`users/${this._afAuth.auth.currentUser.uid}/waitingPage`).once('value').then( snapshot => {
          // extract the value from the snapshot
          let value = snapshot.val();
          // console.log('snapshot.val() is : ' + value);
          // If waitingPage === true, we send the user to the waiting page,
          // if waitingPage === false, we navigate the user to the home page. I know, no shit sherlock.
          if (value === true) {
            this.nav.setRoot('WaitingPage');
            this.menuCtrl.enable(false);
          } else {
            this.nav.setRoot('TabsPage');
            this.menuCtrl.enable(true);    // If we're authorized, we also enable the navigation menu.
          }
        });
      } else {
        this.nav.setRoot('LandingPage');
        // this.nav.setRoot('SignupForkPage');
        this.menuCtrl.enable(false);
        authState.unsubscribe();
      }
    });

    this.listenToEvents();

    this.initTranslate();
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  // we subscribe to a few different events primarily to enable and disable the main navigation menu.
  listenToEvents() {
    this.events.subscribe('menu:disable', _ => {
      this.menuCtrl.enable(false);
    });
    this.events.subscribe('menu:enable', _ => {
      this.menuCtrl.enable(true);
    });
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');

    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
