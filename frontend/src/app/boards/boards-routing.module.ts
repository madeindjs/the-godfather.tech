import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardsPageIndexComponent } from './boards-page-index/boards-page-index.component';

const routes: Routes = [
  {
    path: '',
    component: BoardsPageIndexComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardsRoutingModule {}
