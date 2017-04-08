import * as moment from 'moment';

export class Actuator {
  actuatorId: string;
  version: string;
  type: string;
  enabled: boolean;
  timestamp: string;
  // Data related properties
  active: boolean;
  // Filter related


  constructor(settings) {
    this.actuatorId = settings.id;
    this.version = settings.version;
    this.type = settings.type;
    this.enabled = settings.enabled;
    this.timestamp = moment.utc(settings.timestamp, "YYYY-MM-DD hh:mm:ss").utcOffset("-05:00").toString();

    this.active = settings.active;

  }
}
