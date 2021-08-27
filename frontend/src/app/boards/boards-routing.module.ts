import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardPageComponent } from './board-page/board-page.component';
import { BoardsPageIndexComponent } from './boards-page-index/boards-page-index.component';

const routes: Routes = [
  {
    path: '',
    component: BoardsPageIndexComponent,
  },
  {
    path: ':id',
    component: BoardPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardsRoutingModule {}
