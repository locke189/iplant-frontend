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
import { HistoricComponent } from './device/historic/historic.component';
import { ChartsModule } from 'ng2-charts';
import { SensorComponent } from './device/sensor/sensor.component';
import { ActuatorComponent } from './device/actuator/actuator.component';
import { ControlComponent } from './device/control/control.component';
import { DropboxComponent } from './device/dropbox/dropbox.component';
import { CameraComponent } from './device/control/camera/camera.component';
import { BaseComponent } from './device/control/base/base.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DeviceComponent,
    ListComponent,
    DetailsComponent,
    DataComponent,
    HistoricComponent,
    SensorComponent,
    ActuatorComponent,
    ControlComponent,
    DropboxComponent,
    CameraComponent,
    BaseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ChartsModule
  ],
  providers: [HttpService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
