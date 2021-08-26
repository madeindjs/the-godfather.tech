import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BoardCardComponent } from './board-card/board-card.component';
import { BoardsListComponent } from './boards-list/boards-list.component';
import { BoardsPageIndexComponent } from './boards-page-index/boards-page-index.component';
import { BoardsRoutingModule } from './boards-routing.module';
import { BoardsService } from './boards.service';

@NgModule({
  declarations: [
    BoardsListComponent,
    BoardCardComponent,
    BoardsPageIndexComponent,
  ],
  imports: [CommonModule, HttpClientModule, BoardsRoutingModule],
  exports: [BoardsListComponent],
  providers: [BoardsService],
})
export class BoardsModule {}
