import { NgModule } from '@angular/core';
import { NoPreloading, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './login.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./home-page/home-page.module').then((m) => m.HomePageModule),
  },
  {
    path: 'boards',
    canActivate: [LoginGuard],
    loadChildren: () =>
      import('./boards/boards.module').then((m) => m.BoardsModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login-page/login-page.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./signup-page/signup-page.module').then(
        (m) => m.SignupPageModule
      ),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./about-page/about-page.module').then((m) => m.AboutPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: NoPreloading })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
