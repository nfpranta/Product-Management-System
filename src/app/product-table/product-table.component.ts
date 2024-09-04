import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { ControlInterface } from '../control-interface';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [
    MatPaginator,
    MatSort,
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.scss',
  providers: [ProductFormComponent],
})
export class ProductTableComponent implements OnInit {
  @Input() controlObjForService: ControlInterface = {
    pageSize: [10, 15, 20],
    sorting: true,
    filter: true,
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
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(
    private dialog: MatDialog,
    private productService: ProductService,
    private router: Router
  ) {}

  length: number | undefined;
  pageSize: number = 10;
  pageIndex: number = 0;
  pageSizeOptions: any;

  onPaginateChange(event: any) {
    console.log('length' + event.length);
    console.log('pageSize' + event.pageSize);
    console.log('pageIndex' + event.pageIndex);
    console.log('pageSizeOption' + event.pageSizeOptions);
    this.getAllProducts();
  }
  ngOnInit(): void {
    this.displayedColumns = this.controlObjForService.columns;
    this.productService.productRecords$.subscribe((res) => {
      this.getAllProducts();
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const normalizedFilterValue = filterValue?.trim().toLowerCase() || '';
    this.dataSource.filter = normalizedFilterValue;
  }

  getAllProducts() {
    this.productService.getProductRecords().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        if (this.paginator) {
          if (this.paginator !== undefined) {
            this.dataSource.paginator = this.paginator;
          }
        }
        if (this.sort) {
          this.dataSource.sort = this.sort;
        }
      },
      error: (err) => {
        alert('Error while fetching the records');
      },
    });
  }

  getProductsInChunk() {
    this.productService.getInChunk(this.pageIndex, this.pageSize).subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        if (this.paginator != undefined) {
          this.dataSource.paginator = this.paginator;
        }
        if (this.sort != undefined) {
          this.dataSource.sort = this.sort;
        }
      },
      error: (err) => {
        alert('Error while fetching the records');
      },
    });
  }

  editProduct(row: any) {
    this.dialog
      .open(ProductFormComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'updated') {
          this.getAllProducts();
        }
      });
  }

  deleteProduct(id: number) {
    console.log(id);
    this.productService.deleteProductRecord(id);
    alert('deleted Successfully');
    this.getAllProducts();
  }
}
