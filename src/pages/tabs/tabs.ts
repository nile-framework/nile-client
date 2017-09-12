import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Tab1Root } from '../pages';
import { Tab2Root } from '../pages';
import { Tab3Root } from '../pages';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = Tab1Root;
  tab2Root: any = Tab2Root;
  tab3Root: any = Tab3Root;

  tab1Title = "";
  tab2Title = "";
  tab3Title = "";

  mySelectedIndex: number;

  constructor(
    public navCtrl: NavController,
    public translateService: TranslateService,
    public navParams: NavParams
  ) {

    this.mySelectedIndex = navParams.data.tabIndex || 0;

    translateService.get(['Home', 'Vendors', 'Job-Sites']).subscribe(values => {
      this.tab1Title = values['Home'];
      this.tab2Title = values['Vendors'];
      this.tab3Title = values['Job-Sites'];
    });
  }
}
