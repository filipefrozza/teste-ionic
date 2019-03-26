import { Component } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
	userForm: FormGroup;
	email:string='';
	password:string='';
	logado:boolean=false;

	constructor(
		public api: ApiService,
	    public loadingController: LoadingController,
	    public alertController: AlertController,
	    public route: ActivatedRoute,
	    public router: Router,
	    private formBuilder: FormBuilder
	){};

	ngOnInit() {
  		this.userForm = this.formBuilder.group({
	      	'email' : [null, Validators.required],
	      	'password' : [null, Validators.required],
	    });
  	}

  	ionViewWillEnter(){
	    if(window.localStorage.getItem('token')){
	    	this.logado = true;
	    }else{
	    	this.logado = false;
	    }
  	}

  	async logar(form:NgForm) {
	    const loading = await this.loadingController.create({
	      	message: 'Loading...'
	    });
	    await loading.present();
	    await this.api.login(form).subscribe(res => {
	        // let id = res['_id'];
	        loading.dismiss();
	        if(res){
	        	window.localStorage.setItem('token',res['token']);
	        	window.location.reload();
	        }else{
	        	
	        }
	        console.log("login",res);
	        // this.router.navigate([ `/` ], { relativeTo: this.route.parent });
	    }, (err) => {
	        console.log(err);
	        loading.dismiss();
	    });
	}
}
