import {Component, Input, OnInit} from '@angular/core';
import {Photo} from '../../../services/photo-service/photo.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  @Input() image: Photo;

  constructor() { }

  ngOnInit() {
  }

}
