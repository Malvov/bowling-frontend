import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import {GamesComponent} from './games/games.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    GamesComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
