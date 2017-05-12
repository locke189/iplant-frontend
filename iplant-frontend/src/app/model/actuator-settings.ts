export class ActuatorSettings {

  hflip: boolean;
  vflip: boolean;
  periodicUpdates: boolean;
  sharpness: Number;
  contrast: Number;
  brightness: Number;
  saturation: Number;
  iso: Number;
  timer: Number;



  constructor(settings) {
    this.hflip = settings.hflip;
    this.vflip = settings.vflip;
    this.sharpness = settings.sharpness;
    this.contrast = settings.contrast;
    this.brightness = settings.brightness;
    this.saturation = settings.saturation;
    this.iso = settings.iso;
    this.timer = settings.timer;
    this.periodicUpdates = settings.periodicUpdates;
  }
}
