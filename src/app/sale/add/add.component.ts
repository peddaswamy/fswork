import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators,FormArray} from '@angular/forms';
import {RestApiService} from '../../service/rest-api.service';
import {Size} from '../../size/size';
import {Supplier} from '../../supplier/supplier';
import {Category} from '../../category/category';
import {Brand} from '../../brand/brand';
import {Router} from '@angular/router';
@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
	addForm: FormGroup;
	sizes: Size[];
	suppliers: Supplier[];
	categories: Category[];
	brands: Brand[];
	showSpinner: Boolean;
	isOpCompleted: Boolean;
	hasError: Boolean;
	errorMessage: String;
	successMessage: String;
	submitted: Boolean;
	constructor(private fb: FormBuilder,private restApiService: RestApiService,private router: Router) {
		this.addForm=this.fb.group({
			'name':[null],
			'mobile':[null,Validators.required],
			'address':[null],
			'products':fb.array([
				fb.group({
						'code':[null,Validators.required],
						'productId':[null,Validators.required],
						'sellingPrice':[null,Validators.required],
						'discount':[null,Validators.required],
						'amount':[null,Validators.required],
						'quantity':[null,Validators.required],
					})
				]),
		});
	}
	getProductsFormArray(){
		return this.addForm.get('products') as FormArray;
	}
	addProducts(){
		this.getProductsFormArray().push(
			this.fb.group({
				'code':[null,Validators.required],
				'productId':[null,Validators.required],
				'sellingPrice':[null,Validators.required],
				'discount':[null,Validators.required],
				'amount':[null,Validators.required],
				'quantity':[null,Validators.required]
			})
		);
	}
	delProducts(index: number){
		if(this.getProductsFormArray().length>1){
			this.getProductsFormArray().removeAt(index);
		}
	}
	
	ngOnInit() {
	}
	add(){
		this.submitted=true;
		this.showSpinner=true;
		this.hasError=false;
		this.isOpCompleted=false;
		if(this.addForm.valid){
			this.restApiService.postData('product/create',this.addForm.value).subscribe(result=>{
				if(result.status==200){
					this.isOpCompleted=true;
					this.successMessage=result.message;
					this.router.navigate(['product'])
				}else{
					this.hasError=true
					this.errorMessage=result.error;
				}
				this.showSpinner=false;
				this.submitted=false;

			})
		}
		else{
			this.showSpinner=false;
			this.submitted=false;
		}
	}
}