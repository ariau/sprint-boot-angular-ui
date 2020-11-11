import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment.prod";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class BikeService {

  baseUrl = environment.baseUrl

  constructor(private http:HttpClient) { }

  getBikes() {
    return this.http.get(this.baseUrl + '/api/v1/bikes');
  }

  getBike(id: number){
    return this.http.get(this.baseUrl + '/api/v1/bikes/' + id);
  }

  createBikeRegistration(bike){
    let body = JSON.stringify(bike);
    return this.http.post(this.baseUrl + '/api/v1/bikes', body, httpOptions);
  }


}
