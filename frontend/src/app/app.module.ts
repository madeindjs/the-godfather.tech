// frontend/src/app/app.module.ts
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, NO_ERRORS_SCHEMA, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorizationInterceptor } from './authorization.interceptor';
import { boardsReducer } from './boards.reducer';
import { creditsReducer } from './credits/credits.reducer';
import { LoginModule } from './login/login.module';
import { loginReducer } from './login/login.reducer';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ToastModule } from './toast/toast.module';
import { toastsReducer } from './toast/toast.reducer';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ['login'], rehydrate: true })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

const interceptors: Array<Provider> = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthorizationInterceptor,
    multi: true,
  },
];

@NgModule({
  declarations: [AppComponent, NavBarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(
      {
        boards: boardsReducer,
        login: loginReducer,
        credits: creditsReducer,
        toasts: toastsReducer,
      },
      { metaReducers }
    ),
    LoginModule,
    ToastModule,
  ],
  providers: [...interceptors],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
