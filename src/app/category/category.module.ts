import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms'
import { CategoryRoutingModule } from './category-routing.module';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { MaterialModule} from '../includes/material/material.module';
import { EditComponent } from './edit/edit.component';

@NgModule({
  
  declarations: [AddComponent, ListComponent,EditComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  
  
})
export class CategoryModule { }
