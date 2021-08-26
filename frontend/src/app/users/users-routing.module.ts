import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersPageIndexComponent } from './users-page-index/users-page-index.component';

const routes: Routes = [
  {
    path: '',
    component: UsersPageIndexComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
