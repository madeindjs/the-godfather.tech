import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-users-page-index',
  templateUrl: './users-page-index.component.html',
  styleUrls: ['./users-page-index.component.scss'],
})
export class UsersPageIndexComponent implements OnInit {
  constructor(private readonly usersService: UsersService) {}

  ngOnInit(): void {
    this.reloadUsers();
  }

  reloadUsers() {
    this.usersService.getUsers().pipe(take(1)).subscribe();
  }
}
