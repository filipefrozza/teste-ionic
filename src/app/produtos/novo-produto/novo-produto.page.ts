import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Produto } from '../../model/produto';

@Component({
  selector: 'app-novo-produto',
  templateUrl: './novo-produto.page.html',
  styleUrls: ['./novo-produto.page.scss'],
})
export class NovoProdutoPage implements OnInit {
	produtoForm: FormGroup;
	nome:string='';
	descricao:string='';
	preco:number=null;
	peso:number=null;

  	constructor(
		public api: ApiService,
	    public loadingController: LoadingController,
	    public alertController: AlertController,
	    public route: ActivatedRoute,
	    public router: Router,
	    private formBuilder: FormBuilder
	){};

  	ngOnInit() {
  		this.produtoForm = this.formBuilder.group({
	      	'nome' : [null, Validators.required],
	      	'descricao' : [null, Validators.required],
	      	'preco' : [null, Validators.required],
	      	'peso' : [null, Validators.required]
	    });
  	}

  	async cadastrar(form:NgForm) {
	    const loading = await this.loadingController.create({
	      	message: 'Loading...'
	    });
	    await loading.present();
	    await this.api.add('produtos', form).subscribe(res => {
	        let id = res['_id'];
	        loading.dismiss();
	        console.log("addProduto",res);
	        this.router.navigate([ `/detalhe-produto/${id}` ], { relativeTo: this.route.parent });
	    }, (err) => {
	        console.log(err);
	        loading.dismiss();
	    });
	}
}
