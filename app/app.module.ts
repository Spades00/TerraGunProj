import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TerraGunModules } from './material';
import { PreloadImageService } from './preloadimage.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TerraGunModules,
    BrowserModule, 
    FormsModule, 
    HttpClientModule
  ],
  providers: [PreloadImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
