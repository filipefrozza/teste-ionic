import { Component } from '@angular/core';

import { LoadingController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public logado;

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Produtos',
      url: '/lista-produtos',
      icon: 'list'
    }
  ];

  constructor(
    public api: ApiService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    this.logado = false;
  }

  initializeApp() {
    this.getLogado();
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async getLogado(){
    try{
        await this.api.check('users').subscribe(res => {
            var ret = res;
            if(ret){
              this.logado = true;
            }
        }, err => {
            console.log(err);
        });
    }catch(e){
      console.log(e);
    }
  }

  async deslogar(){
    window.localStorage.removeItem('token');

    window.location.reload();
  }
}
