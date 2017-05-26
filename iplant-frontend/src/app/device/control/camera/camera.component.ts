import { Component, Input, DoCheck, OnInit, ViewChild } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as moment from 'moment';

import { Actuator } from '../../../model/actuator';
import { DataService } from '../../../services/data.service';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { HttpService } from '../../../services/http.service';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit, DoCheck {

  @Input() actuator ;
  @Input() actuatorId ;
  @Input() deviceId ;

  image: string;
  brightness: number;
  actionQuery: FirebaseObjectObservable<any>;
  brightnessQuery: FirebaseObjectObservable<any>;
  contrastQuery: FirebaseObjectObservable<any>;
  sharpnessQuery: FirebaseObjectObservable<any>;
  saturationQuery: FirebaseObjectObservable<any>;
  isoQuery: FirebaseObjectObservable<any>;
  vflipQuery: FirebaseObjectObservable<any>;
  hflipQuery: FirebaseObjectObservable<any>;
  timerQuery: FirebaseObjectObservable<any>;
  periodicUpdatesQuery: FirebaseObjectObservable<any>;

  settingsQuery: FirebaseListObservable<any>;

  constructor(private dataService: DataService, private httpService: HttpService, private af: AngularFire) { };

  ngOnInit(){
    this.brightness = this.actuator.settings.brightness;
  }

  ngDoCheck() {
    if(this.actuatorId) {

      this.image = this.actuator.data + "?" + this.actuator.time
      const actionPath = '/devices/' + this.deviceId + '/actuators/' +this.actuatorId+'/actions';
      this.actionQuery =  this.af.database.object(actionPath);
      const settingsPath = '/devices/' + this.deviceId + '/actuators/' +this.actuatorId+'';
      this.settingsQuery =  this.af.database.list(settingsPath);
      const brightnessPath = '/devices/' + this.deviceId + '/actuators/' +this.actuatorId+'/settings/brightness';
      const contrastPath = '/devices/' + this.deviceId + '/actuators/' +this.actuatorId+'/settings/contrast';
      const sharpnessPath = '/devices/' + this.deviceId + '/actuators/' +this.actuatorId+'/settings/sharpness';
      const saturationPath = '/devices/' + this.deviceId + '/actuators/' +this.actuatorId+'/settings/saturation';
      const isoPath = '/devices/' + this.deviceId + '/actuators/' +this.actuatorId+'/settings/iso';
      const vflipPath = '/devices/' + this.deviceId + '/actuators/' +this.actuatorId+'/settings/vflip';
      const hflipPath = '/devices/' + this.deviceId + '/actuators/' +this.actuatorId+'/settings/hflip';
      const timerPath = '/devices/' + this.deviceId + '/actuators/' +this.actuatorId+'/settings/timer';
      const periodicUpdatesPath = '/devices/' + this.deviceId + '/actuators/' +this.actuatorId+'/settings/periodicUpdates';

      this.brightnessQuery =  this.af.database.object(brightnessPath);
      this.contrastQuery =  this.af.database.object(contrastPath);
      this.sharpnessQuery =  this.af.database.object(sharpnessPath);
      this.saturationQuery =  this.af.database.object(saturationPath);
      this.isoQuery =  this.af.database.object(isoPath);
      this.vflipQuery =  this.af.database.object(vflipPath);
      this.hflipQuery =  this.af.database.object(hflipPath);
      this.timerQuery =  this.af.database.object(timerPath);
      this.periodicUpdatesQuery =  this.af.database.object(periodicUpdatesPath);
    }
  }

  captureAction(action){
    this.actionQuery.set('CAPTURE');
  }

  startAction(action){
    this.periodicUpdatesQuery.set(true);
  }

  stopAction(action){
    this.periodicUpdatesQuery.set(false);
  }


  setValue(value){
    this.settingsQuery.update('settings', { value : this.actuator.settings[value]});
  }

  setBrightness(){
    this.brightnessQuery.set(this.actuator.settings.brightness);
  }
  setContrast(){
    this.contrastQuery.set(this.actuator.settings.contrast);
  }
  setSharpness(){
    this.sharpnessQuery.set(this.actuator.settings.sharpness);
  }
  setSaturation(){
    this.saturationQuery.set(this.actuator.settings.saturation);
  }
  setIso(){
    this.isoQuery.set(this.actuator.settings.iso);
  }

  setVflip(){
    this.vflipQuery.set(this.actuator.settings.vflip);
  }
  setHflip(){
    this.hflipQuery.set(this.actuator.settings.hflip);
  }
  setTimer(){
    this.timerQuery.set(this.actuator.settings.timer);
  }
  setPeriodicUpdates(){
    this.periodicUpdatesQuery.set(true);
  }

  stopPeriodicUpdates(){
    this.periodicUpdatesQuery.set(false);
  }
}
