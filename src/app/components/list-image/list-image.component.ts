import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-list-image',
  templateUrl: './list-image.component.html',
  styleUrls: ['./list-image.component.css'],
})
export class ListImageComponent {
  word = '';
  suscription: Subscription;
  listImages: any[] = [];
  loading: boolean = false;
  imagePerPage = 30;
  actualPage = 1;
  calcTotalPages = 0;

  constructor(private _imageService: ImageService) {
    this.suscription = this._imageService.getWordSearch().subscribe((data) => {
      this.actualPage = 1;
      this.word = data;
      this.loading = true;
      this.getImagesList();
    });
  }

  getImagesList() {
    this._imageService
      .getImages(this.word, this.imagePerPage, this.actualPage)
      .subscribe(
        (data) => {
          this.loading = false;
          if (data.hits.length < 1) {
            this._imageService.setError('No hay resultados...');
            return;
          }
          this.calcTotalPages = Math.ceil(data.totalHits / this.imagePerPage);

          this.listImages = data.hits;
        },
        (error) => {
          this._imageService.setError('Hubo un error, prueba mas tarde...');
          this.loading = false;
        }
      );
  }

  previousPage() {
    this.actualPage--;
    this.loading = true;
    this.listImages = [];
    this.getImagesList();
  }
  afterPage() {
    this.actualPage++;
    this.loading = true;
    this.listImages = [];
    this.getImagesList();
  }

  actualPageClass() {
    if (this.actualPage === 1) {
      return false;
    } else {
      return true;
    }
  }

  afterPageClass() {
    if (this.actualPage === this.calcTotalPages) {
      return false;
    } else {
      return true;
    }
  }
}
