import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddComponent} from './add/add.component';
import {ListComponent} from './list/list.component';
import { EditComponent } from './edit/edit.component';
const routes: Routes = [
  {path:'',component:ListComponent},
  {path:'all',component:ListComponent},
  {path:'add',component:AddComponent},
  {path:'edit/:id',component:EditComponent},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
