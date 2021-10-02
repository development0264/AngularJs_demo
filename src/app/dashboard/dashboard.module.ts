import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeLandingComponent } from './home-landing/home-landing.component';
import { Routes, RouterModule } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats} from '@angular/material/core';
import { LoginComponent } from './login/login.component';
import { ConsumerHoumComponent } from './consumer-houm/consumer-houm.component';
import { MatPaginatorModule } from "@angular/material/paginator";

@NgModule({
  declarations: [HomeLandingComponent, LoginComponent, ConsumerHoumComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RouterModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
		{

			provide: MAT_DATE_FORMATS,
			useValue: {
				parse: {
					dateInput: ["MMM YYYY"],
				},
				display: {
					dateInput: "MMM D, YYYY",
					dayMonthDateLabel: "d MMM YYYY",
					monthYearLabel: "MMM YYYY",
					dateA11yLabel: "L",
					monthYearA11yLabel: "MMM YYYY",
				},
			} as MatDateFormats,
		}
	],
})
export class DashboardModule { }
