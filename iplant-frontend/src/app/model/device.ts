
import { Sensor } from './sensor';
import { Actuator } from './actuator';
import * as moment from 'moment';

export class Device {
  deviceId: string;
  version: string;
  type: string;
  enabled: boolean;
  status: boolean;
  sensors: Sensor[] = []; // this should be of type sensors
  actuators: Actuator[] = [];
  timestamp: any;
  image: string;

  sensorTextList: string;
  actuatorTextList: string;

  constructor(settings) {

    this.image = settings.image;

    this.deviceId = settings.id;
    this.version = settings.version;
    this.type = settings.type;
    this.enabled = settings.enabled;
    this.status = settings.status;
    this.timestamp = moment.utc(settings.timestamp, "YYYY-MM-DD hh:mm:ss").utcOffset("-05:00").toString();


    if(settings.sensors){
      this.sensorTextList = '';
      settings.sensors.forEach((sensor) => {
        this.sensors.push(new Sensor(sensor));
        this.sensorTextList += sensor.type + " ";
      });
    }

    if(settings.actuators){
      this.actuatorTextList = '';
      settings.actuators.forEach((actuator) => {
        this.actuators.push(new Actuator(actuator));
        this.actuatorTextList += actuator.type + " ";
      });
    }


  }




}
