import * as moment from 'moment';

class Historic {

  date: string;
  url: string;

  constructor(settings) {
    this.date = settings.date;
    this.url = settings.url;
  }
}


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
  dataset: number[] = [];
  datasetAvg: number[] = [];
  datasetLabel: string[] = [];

  // Historic data
  historic: Historic[] = [];

  constructor(settings) {
    this.sensorId = settings.id;
    this.version = settings.version;
    this.type = settings.type;
    this.enabled = settings.enabled;
    this.timestamp = moment.utc(settings.timestamp, 'YYYY-MM-DD hh:mm:ss').utcOffset('-05:00').toString();


    this.data = settings.data;

    if (settings.dataset) {
      this.dataset = settings.dataset;
    }

    if (settings.datasetAvg) {
      this.datasetAvg = settings.datasetAvg;
    }

    if (settings.datasetLabel) {
      this.datasetLabel = settings.datasetLabel.map((label) => {
        return moment.utc(label, 'HH:mm').utcOffset('-05:00').format('HH:mm');
      });
    }

    if (settings.historic) {
      settings.historic.forEach((historic) => {
        this.historic.push(new Historic(historic));
      });

    }

    // Filter related
    this.avgData = settings.avgData;
    this.filter = settings.filter;
    this.filterSamples = settings.filterSamples;
  }
}
