export class Device {
  deviceId: string;
  version: string;
  type: string;
  enabled: boolean;
  status: boolean;
  sensors: any[]; // this should be of type sensors
  actuators: any[];
  timestamp: string;

  constructor(settings) {
    this.deviceId = settings.id;
    this.version = settings.version;
    this.type = settings.type;
    this.enabled = settings.enabled;
    this.status = settings.status;
    this.actuators = settings.actuators;
    this.sensors = settings.sensors;
    this.actuators = settings.actuators;
    this.timestamp = settings.timestamp;
  }
}
