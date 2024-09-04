import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
})
export class CreateProductComponent implements OnInit {
  constructor(private dialog: MatDialog, private location: Location) {}
  ngOnInit(): void {
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
