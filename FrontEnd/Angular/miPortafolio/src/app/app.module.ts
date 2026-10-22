import { NgModule, provideZoneChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { AppRoutingModule } from "./app-routing.module";
import { ContactoComponent } from './contacto/contacto.component';
const appRoutes:Routes=[
  {path:'',component:HomeComponent},
  {path:'nosotros',component:NosotrosComponent},
  {path:'contacto',component:ContactoComponent},
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NosotrosComponent,
    ContactoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [provideZoneChangeDetection(), ],
  bootstrap: [AppComponent]
})
export class AppModule { }
