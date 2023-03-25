import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnDestroy {
  msg = '';
  show = false;
  subscription: Subscription;

  constructor(private _imageSerive: ImageService) {
    this.subscription = this._imageSerive.getError().subscribe((data) => {
      this.show = true;
      this.msg = data;
      setTimeout(() => {
        this.show = false;
      }, 3000);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
