import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Produto } from '../../model/produto';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.page.html',
  styleUrls: ['./editar-produto.page.scss'],
})
export class EditarProdutoPage implements OnInit {

	produtoForm: FormGroup;
	_id:any='';
	nome:string='';
	descricao:string='';
	peso:number=null;
	preco:number=null;

  	constructor(
  		public api: ApiService,
	    public loadingController: LoadingController,
	    public alertController: AlertController,
	    public route: ActivatedRoute,
	    public router: Router,
	    private formBuilder: FormBuilder
	){};

	ngOnInit() {
    	this.getProduto(this.route.snapshot.params['id']);
    	this.produtoForm = this.formBuilder.group({
	      	'nome' : [null, Validators.required],
	      	'descricao' : [null, Validators.required],
	      	'peso' : [null, Validators.required],
	      	'preco' : [null, Validators.required]
    	});
  	}

  	async getProduto(id) {
	    if(this.route.snapshot.params['id'] == 'null') {
	      this.presentAlertConfirm('You are not choosing an item from the list');
	    } else {
      	const loading = await this.loadingController.create({
        	message: 'Loading...'
      	});
    		await loading.present();
    		await this.api.getProduto(id).subscribe(data => {
        		this._id = data._id;
        		this.produtoForm.setValue({
          		nome: data.nome,
          		descricao: data.descricao,
          		preco: data.preco,
          		peso: data.peso
        		});
        		loading.dismiss();
      	}, err => {
        		console.log(err);
        		loading.dismiss();
      	});
    	}
  	}

  	async editar(form:NgForm) {
      this.presentAlertConfirm('Tem certeza que deseja salvar?',async () => {
    	  await this.api.updateProduto(this._id, form).subscribe(res => {
          let id = res['_id'];
          this.router.navigate([ `/detalhe-produto/${id}`], { relativeTo: this.route.parent });
        }, (err) => {
          console.log(err);
        });
      });
  	}

  	async presentAlertConfirm(msg: string, func?: any) {
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
