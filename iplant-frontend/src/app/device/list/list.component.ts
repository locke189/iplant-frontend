import { Component, OnInit, Input,  Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() title = 'title'
  @Input() textContent = 'text content';
  @Input('data') devices = ['obj1', 'obj2'];
  @Output() selectedDevice = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  selectDevice(device) {
    this.selectedDevice.emit(device.deviceId);

  }
}
