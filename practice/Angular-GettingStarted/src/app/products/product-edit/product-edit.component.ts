import { Component, OnInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { IProduct } from '../product.model';
import { Subscription } from 'rxjs';
import { GenericValidator } from 'src/app/shared/generic-validator';

@Component({
  selector: 'pm-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'Product Edit';
  errorMesssage: string;
  productForm: FormGroup;
  product: IProduct;
  private sub: Subscription;

  // use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  get tags(): FormArray {
    return this.productForm.get('tags') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      productCode: ['', Validators.required],
      starRating: ['', [Validators.min(1), Validators.max(5)]],
      tag: this.fb.array([]),
      description: ''
    });

    this.sub = this.route.paramMap
      .subscribe(
        params => {
          const id = +params.get('id');
          this.productService.getProduct(id).subscribe(product => this.product = product);
        }
      );
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  save(): void {
    console.log('Save form here...');
  }
}
