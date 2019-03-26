import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from '../../model/produto';

@Component({
  selector: 'app-detalhe-produto',
  templateUrl: './detalhe-produto.page.html',
  styleUrls: ['./detalhe-produto.page.scss'],
})
export class DetalheProdutoPage implements OnInit {
	produto:Produto = { _id: null, nome: '', descricao: '', peso: null, preco: null, updated_at: null };

  	constructor(
  		public api: ApiService,
    	public loadingController: LoadingController,
    	public alertController: AlertController,
    	public route: ActivatedRoute,
    	public router: Router
   	) {};

  	ngOnInit() {
  		this.getProduto();
  	}

  	async getProduto() {
	    if(this.route.snapshot.paramMap.get('id') == 'null') {
	      	this.presentAlertConfirm('Você não escolheu um item na lista', null);
	    } else {
	      	const loading = await this.loadingController.create({
	        	message: 'Loading...'
	      	});
	      	await loading.present();
	      	console.log(this.route.snapshot.params);
	      	await this.api.get('produtos',this.route.snapshot.params['id']).subscribe(res => {
	          	console.log(res);
	          	this.produto = res;
	          	loading.dismiss();
	        }, err => {
	          	console.log(err);
	          	loading.dismiss();
	        });
	    }
  	}

  	async delete(id) {
  		this.presentAlertConfirm('Tem certeza que deseja remover '+this.produto.nome+'?',async () => {
	  		console.log(id);
		    const loading = await this.loadingController.create({
		      	message: 'Loading...'
		    });
		    await loading.present();
		    await this.api.delete('produtos', id).subscribe(res => {
		        loading.dismiss();
		        this.router.navigate([ '/lista-produtos' ]);
		    }, err => {
		        console.log(err);
		        loading.dismiss();
		    });
	    });
  	}

  	async presentAlertConfirm(msg: string, func: any) {
  		if(func){
  			var handler = func;
  		}else{
  			var handler: any = function(){
  				this.router.navigate(['']);
  			}
  		}

	    const alert = await this.alertController.create({
	      	header: 'Warning!',
	      	message: msg,
	      	buttons: [
		        {
		          	text: 'Aceitar',
		          	handler
		        },
		        {
		        	text: 'Cancelar',
		        	handler: () => {

		        	}
		        }
	      	]
	    });

	    await alert.present();
  	}
}
