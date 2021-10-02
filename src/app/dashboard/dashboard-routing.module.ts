import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeLandingComponent } from './home-landing/home-landing.component';
import { LoginComponent } from './login/login.component';
import { ConsumerHoumComponent } from './consumer-houm/consumer-houm.component';
import { AuthGuard } from '../core/auth.guard';


const routes: Routes = [
  {
    path: "houm-build",
    component: HomeLandingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "consumer-houm",
    component: ConsumerHoumComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "",
    component: LoginComponent,
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardRoutingModule { }
