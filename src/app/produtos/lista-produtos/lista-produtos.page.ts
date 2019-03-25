import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { Produto } from '../../model/produto';
// import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.page.html',
  styleUrls: ['./lista-produtos.page.scss'],
})
export class ListaProdutosPage implements OnInit {
	produtos: Produto[] = [];

  	constructor(
		public api: ApiService,
	    public loadingController: LoadingController,
	    public router: Router,
	    public route: ActivatedRoute
	){}

  	ngOnInit() {
  		this.getProdutos();
  	}

  	ionViewWillEnter(){
	    this.getProdutos();
  	}

  	async getProdutos() {
	    const loading = await this.loadingController.create({
	      message: 'Loading...'
	    });
	    await loading.present();
		try{
		    await this.api.getProdutos().subscribe(res => {
		        this.produtos = res;
		        console.log(this.produtos);
		        loading.dismiss();
		    }, err => {
		        console.log(err);
		        loading.dismiss();
		    });
		}catch(e){
			console.log(e);
			loading.dismiss();
		}
  	}
}
