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
    this.timestamp = settings.timestamp;

    this.active = settings.active;

  }
}
