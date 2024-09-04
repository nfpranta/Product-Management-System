import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ProductTableComponent } from './product-table/product-table.component';
import { ProductService } from './product.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ProductTableComponent, MatIconModule, MatButtonModule],
})
export class AppComponent {
  title = 'product-management-system';
  constructor(
    private dialog: MatDialog,
    private productService: ProductService
  ) {}

  allProducts: any[] = [];

  ngOnInit(): void {
    this.getAllProduct();
  }

  getAllProduct() {
    this.productService.getProductRecords().subscribe({
      next: (res) => {
        this.allProducts = res;
      },
      error: (err) => {
        console.log('Error while getting all the products');
      },
    });
  }
}
