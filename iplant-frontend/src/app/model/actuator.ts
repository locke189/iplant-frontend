import * as moment from 'moment';
import { ActuatorSettings } from './actuator-settings';

export class Actuator {
  actuatorId: string;
  type: string;
  enabled: boolean;
  timestamp: string;
  time: string;
  data: string;
  // Data related properties
  busy: boolean;
  actions: String;
  settings: ActuatorSettings;
  // Filter related


  constructor(settings) {
    this.actuatorId = settings.id;
    this.type = settings.type;
    this.enabled = settings.enabled;
    this.timestamp = moment.utc(settings.timestamp, "YYYY-MM-DD hh:mm:ss").utcOffset("-05:00").toString();
    this.time = moment.utc(settings.timestamp, "YYYYMMDDhhmmss").utcOffset("-05:00").toString();
    this.data = settings.data;
    this.busy = settings.busy;
    this.actions = settings.actions;
    if(settings.settings){
      this.settings = new ActuatorSettings(settings.settings);
    }

  }
}
