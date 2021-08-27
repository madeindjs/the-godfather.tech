import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit {
  public uuid$: Observable<string>;
  public htmlTag$: Observable<string>;
  public readonly scripTag =
    '<script src="http://dist.lvh.me/main.js"></script>';
  public readonly apiUrl = environment.backend.url;

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.uuid$ = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('id'))
    );

    this.htmlTag$ = this.uuid$.pipe(
      map(
        (uuid) =>
          `<kanban-board\n  uuid="${uuid}"\n  api-url="${this.apiUrl}">\n</kanban-board>`
      )
    );
  }
}
