
import { Sensor } from './sensor';
import { Actuator } from './actuator';
import * as moment from 'moment';

export class Device {
  deviceId: string;
  type: string;
  enabled: boolean;
  status: boolean;
  sensors: Sensor[] = []; // this should be of type sensors
  actuators: Actuator[] = [];
  timestamp: any;
  image: string;
  online: boolean;

  sensorTextList: string;
  actuatorTextList: string;

  constructor(settings) {

    this.image = settings.image;
    let components = [];

    this.deviceId = settings.id;
    this.type = settings.type;
    this.enabled = settings.enabled;
    this.status = settings.status;
    this.online = settings.online;
    this.timestamp = moment.utc(settings.timestamp, "YYYY-MM-DD hh:mm:ss").utcOffset("-05:00").toString();


    if(settings.sensors){
      // we have to convert the object into a list... just in case
      if(settings.sensors.constructor !== Array){
        components = Object.keys(settings.sensors).map( (key) => {
          return settings.sensors[key];
        } );
      } else {
        components = settings.sensors;
      }
      this.sensorTextList = '';
      components.forEach((sensor) => {
        this.sensors.push(new Sensor(sensor));
        this.sensorTextList += sensor.type + " ";
      });
    }

    if(settings.actuators){
      // we have to convert the object into a list... just in case
      if(settings.actuators.constructor !== Array){
        components = Object.keys(settings.actuators).map( (key) => {
          return settings.actuators[key];
        } );
      } else {
        components = settings.actuators;
      }

      this.actuatorTextList = '';
      components.forEach((actuator) => {
        this.actuators.push(new Actuator(actuator));
        this.actuatorTextList += actuator.type + " ";
      });
    }


  }


  getSensorById(id: string) {
    return this.sensors.find( (sensor) => sensor.sensorId === id);
  }

  getActuatorById(id: string) {
    return this.actuators.find( (actuator) => actuator.actuatorId === id);
  }

}
