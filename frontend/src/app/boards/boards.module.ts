import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, Provider } from '@angular/core';
import { AuthorizationInterceptor } from '../authorization.interceptor';
import { CreditsModule } from '../credits/credits.module';
import { BoardCardComponent } from './board-card/board-card.component';
import { BoardPageComponent } from './board-page/board-page.component';
import { BoardsListComponent } from './boards-list/boards-list.component';
import { BoardsPageIndexComponent } from './boards-page-index/boards-page-index.component';
import { BoardsRoutingModule } from './boards-routing.module';
import { BoardsService } from './boards.service';
import { BoardHostComponent } from './board-host/board-host.component';

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
    BoardHostComponent,
  ],
  imports: [CommonModule, HttpClientModule, BoardsRoutingModule, CreditsModule],
  exports: [BoardsListComponent],
  providers: [BoardsService, ...interceptors],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BoardsModule {}
