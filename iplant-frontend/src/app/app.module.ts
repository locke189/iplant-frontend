import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DeviceComponent } from './device/device.component';
import { ListComponent } from './shared/list/list.component';
import { DetailsComponent } from './device/details/details.component';
import { DataComponent } from './device/data/data.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DeviceComponent,
    ListComponent,
    DetailsComponent,
    DataComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
