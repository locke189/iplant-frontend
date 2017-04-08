import * as moment from 'moment';

export class Sensor {
  sensorId: string;
  version: string;
  type: string;
  enabled: boolean;
  timestamp: string;
  // Data related properties
  data: string;
  // Filter related
  avgData: number;
  filter: boolean;
  filterSamples: number;

  constructor(settings) {
    this.sensorId = settings.id;
    this.version = settings.version;
    this.type = settings.type;
    this.enabled = settings.enabled;
    this.timestamp = moment.utc(settings.timestamp, "YYYY-MM-DD hh:mm:ss").utcOffset("-05:00").toString();


    this.data = settings.data;

    // Filter related
    this.avgData = settings.avgData;
    this.filter = settings.filter;
    this.filterSamples = settings.filterSamples;
  }
}
