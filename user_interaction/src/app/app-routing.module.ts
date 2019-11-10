import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LogupComponent } from './logup/logup.component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';
import { CertificationComponent } from './certification/certification.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', component: HomeComponent},
  { path: 'home/:idNum', component: HomeComponent},
  { path: 'logup', component: LogupComponent},
  { path: 'list', component: ListComponent},
  { path: 'update', component: UpdateComponent},
  { path: 'certification', component: CertificationComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
