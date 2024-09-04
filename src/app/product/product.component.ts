import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { ControlInterface } from '../control-interface';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ProductTableComponent } from '../product-table/product-table.component';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ProductTableComponent, RouterModule, MatDialogModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  controlForTable: ControlInterface = {
    pageSize: [10, 15, 20],
    sorting: false,
    filter: false,
    columns: [
      'productName',
      'category',
      'price',
      'count',
      'createdDate',
      'action',
    ],
    actions: true,
  };
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private location: Location
  ) {}
  ngOnInit(): void {}
  createProduct() {
    this.dialog
      .open(ProductFormComponent, {
        width: '80%',
      })
      .afterClosed()
      .subscribe(() => {
        this.location.back();
      });
  }
}
