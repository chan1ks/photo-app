import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth.guard';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/login/register/register.component';

export const routes: Routes = [
   {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
   }, {
      path: 'login',
      component: LoginComponent
   }, {
      path: 'register',
      component: RegisterComponent
   }, {
      path: 'albums',
      loadChildren: 'app/components/album/album.module#AlbumModule',
      canActivate: [AuthGuard]
   },
   {path: '**', redirectTo: 'album'}
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   providers: [AuthGuard],
   exports: [RouterModule]
})
export class AppRoutingModule {
}
