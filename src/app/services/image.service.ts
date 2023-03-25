import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private error$ = new Subject<string>();
  private wordSearch$ = new Subject<string>();

  constructor(private http: HttpClient) {}

  setError(msg: string) {
    this.error$.next(msg);
  }

  getError(): Observable<string> {
    return this.error$.asObservable();
  }

  sendWordSearch(word: string) {
    this.wordSearch$.next(word);
  }
  getWordSearch(): Observable<string> {
    return this.wordSearch$.asObservable();
  }

  getImages(
    word: string,
    imagePerPage: number,
    actualPage: number
  ): Observable<any> {
    const API_URL = environment.apiUrl;
    const API_KEY = environment.apiKey;

    const url = `${
      API_URL + API_KEY
    }&q=${word}&per_page${imagePerPage}&page=${actualPage}`;

    return this.http.get(url);
  }
}
