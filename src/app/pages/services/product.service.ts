import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from 'src/app/models/product';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/product`;

  constructor(private httpClient: HttpClient) {}

  registerProduct(formData: FormData): Observable<Product> {
    return this.httpClient.post<Product>(this.apiUrl, formData);
  }
}
