import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Provider } from '@angular/core';
import { AuthorizationInterceptor } from '../authorization.interceptor';
import { CreditsModule } from '../credits/credits.module';
import { BoardCardComponent } from './board-card/board-card.component';
import { BoardsListComponent } from './boards-list/boards-list.component';
import { BoardsPageIndexComponent } from './boards-page-index/boards-page-index.component';
import { BoardsRoutingModule } from './boards-routing.module';
import { BoardsService } from './boards.service';
import { BoardPageComponent } from './board-page/board-page.component';

const interceptors: Array<Provider> = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthorizationInterceptor,
    multi: true,
  },
];

@NgModule({
  declarations: [
    BoardsListComponent,
    BoardCardComponent,
    BoardsPageIndexComponent,
    BoardPageComponent,
  ],
  imports: [CommonModule, HttpClientModule, BoardsRoutingModule, CreditsModule],
  exports: [BoardsListComponent],
  providers: [BoardsService, ...interceptors],
})
export class BoardsModule {}
