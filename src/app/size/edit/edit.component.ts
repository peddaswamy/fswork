import { Component, OnInit } from '@angular/core';
import { Size } from '../size';
import { RestApiService } from 'src/app/service/rest-api.service';
import {ActivatedRoute,Router  } from "@angular/router";
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {Location} from '@angular/common';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  size: Size;
  selectedId: number;
  errorMessage: string;
  hasError: Boolean;
  editForm: FormGroup;
  showSpinner: Boolean;
  isOpCompleted: Boolean;
  successMessage: string;
  constructor(private restApiService: RestApiService,private activatedRoute: ActivatedRoute,private fb: FormBuilder, private router: Router, private location: Location) { }

  ngOnInit() {
    this.selectedId=this.activatedRoute.snapshot.params['id'];
    this.getCatgory(this.selectedId);
    this.editForm=this.fb.group({
			'name':[null,Validators.required],
      'isActive':[null]

		});
    
  }
  getCatgory(id){
    const url=`size/get/${id}`;
    this.restApiService.getAll(url).subscribe(result=>{
      if(result.status==200){
        this.size=result.size;
        this.editForm.setValue({
          'name':this.size.name,
          'isActive':this.size.isActive
        })
      }
      else{
        this.errorMessage="No size is exists with provided input."
        this.hasError=true;
      }
    })
  }
  edit(id){
    
		this.showSpinner=true;
		this.hasError=false;
		this.isOpCompleted=false;
  		if(this.editForm.valid){

  			this.restApiService.updateData('size/update',this.editForm.value,id).subscribe(result=>{
			if(result.status==200){
				this.isOpCompleted=true;
				this.successMessage=result.message;
				this.router.navigate(['size'])
			}else{
				this.hasError=true
				this.errorMessage=result.error;
			}
			  this.showSpinner=false;
			
				  
  			})
  		}
  		else{
			  this.showSpinner=false;
  		}
  }
  goBack(){
    this.location.back();
  }
}
