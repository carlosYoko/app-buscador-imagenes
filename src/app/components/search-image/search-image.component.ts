import { Component } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-search-image',
  templateUrl: './search-image.component.html',
  styleUrls: ['./search-image.component.css'],
})
export class SearchImageComponent {
  nameImage: string;

  constructor(private _imageService: ImageService) {
    this.nameImage = '';
  }

  searchImages() {
    if (this.nameImage == '') {
      this._imageService.setError('Escribe algo para buscar!');
      return;
    }

    this._imageService.sendWordSearch(this.nameImage);
  }
}
