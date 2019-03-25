import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'lista-produtos', loadChildren: './produtos/lista-produtos/lista-produtos.module#ListaProdutosPageModule' },
  { path: 'novo-produto', loadChildren: './produtos/novo-produto/novo-produto.module#NovoProdutoPageModule' },
  { path: 'detalhe-produto/:id', loadChildren: './produtos/detalhe-produto/detalhe-produto.module#DetalheProdutoPageModule' },
  { path: 'editar-produto/:id', loadChildren: './produtos/editar-produto/editar-produto.module#EditarProdutoPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
