
import { Sensor } from './sensor';
import { Actuator } from './actuator';

export class Device {
  deviceId: string;
  version: string;
  type: string;
  enabled: boolean;
  status: boolean;
  sensors: Sensor[] = []; // this should be of type sensors
  actuators: Actuator[] = [];
  timestamp: string;
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
    this.timestamp = settings.timestamp;

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
