import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { ProductComponent } from './product/product.component';
const routes: Routes = [
  { path: '', redirectTo: '/product', pathMatch: 'full' },

  {
    path: '',
    component: ProductComponent,
    children: [
      {
        path: 'createNew',
        component: CreateProductComponent,
      },
    ],
  },
  {
    path: 'product',
    component: ProductComponent,
    children: [
      {
        path: 'createNew',
        component: CreateProductComponent,
      },
    ],
  },
  { path: '**', component: ProductTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
