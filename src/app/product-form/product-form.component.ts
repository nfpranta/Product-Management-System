import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ProductRecord, ProductService } from '../product.service';
@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent {
  optionList = ['yes', 'no'];
  ActionButtonName: string = 'Save';
  productForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ProductFormComponent>,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.min(3), Validators.max(50)]],
      description: ['', [Validators.min(3), Validators.max(250)]],
      category: ['', Validators.required],
      price: ['', Validators.required],
      count: ['', [Validators.required, Validators.max(10)]],
      createdDate: ['', Validators.required],
    });

    if (this.editData) {
      console.log(this.editData);
      this.ActionButtonName = 'Update';
      this.productForm.controls['name'].setValue(this.editData.name);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['count'].setValue(this.editData.count);
      this.productForm.controls['createdDate'].setValue(
        this.editData.createdDate
      );
      this.productForm.controls['description'].setValue(
        this.editData.description
      );
      this.productForm.controls['name'].updateValueAndValidity();
    }
  }

  CreateOrEditProduct() {
    if (this.editData) {
      const updatedRecord: ProductRecord = {
        id: this.editData.id,
        ...this.productForm.value,
      };
      this.productService.editProductRecord(updatedRecord);
      alert('Product updated Successfully');
      this.productForm.reset();
      this.dialogRef.close('updated');
    } else {
      if (this.productForm.valid) {
        this.productService.addProductRecord(this.productForm.value);
        alert('Product added successfully');
        this.productForm.reset();
        this.dialogRef.close('save');
      }
    }
  }

  public cancle() {
    this.dialogRef.close();
  }
}
