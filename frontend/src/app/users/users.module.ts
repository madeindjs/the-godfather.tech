import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { UserNamePipe } from '../user-name.pipe';
import { UserCardComponent } from './user-card/user-card.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersPageIndexComponent } from './users-page-index/users-page-index.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersService } from './users.service';

@NgModule({
  declarations: [
    UsersListComponent,
    UserCardComponent,
    UsersPageIndexComponent,
    UserNamePipe,
  ],
  imports: [CommonModule, HttpClientModule, UsersRoutingModule],
  exports: [UsersListComponent],
  providers: [UsersService],
})
export class UsersModule {}
