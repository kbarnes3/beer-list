import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BeerTableComponent } from './beer-table/beer-table.component';

const routes: Routes = [
  { path: '', component: BeerTableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
