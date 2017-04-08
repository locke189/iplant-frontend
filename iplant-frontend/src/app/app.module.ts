import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DeviceComponent } from './device/device.component';
import { ListComponent } from './device/list/list.component';
import { DetailsComponent } from './device/details/details.component';
import { DataComponent } from './device/data/data.component';
import { HttpService } from './services/http.service';
import { DataService } from './services/data.service';
import { environment } from '../environments/environment';



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
    HttpModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [HttpService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
