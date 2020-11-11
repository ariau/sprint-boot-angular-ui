import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json',
                            'Accept' : 'application/json',
                            'Access-Control-Allow-Origin' : '*',
                            'Access-Control-Allow-Methods' : 'DELETE, POST, GET, OPTIONS',
                            'Access-Control-Allow-Headers' : '*'})
};

@Injectable({
  providedIn: 'root'
})
export class BikeService {

  baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }

  getBikes() {
    return this.http.get(this.baseUrl + 'api/v1/bikes', httpOptions);
  }

  getBike(id: number){
    return this.http.get(this.baseUrl + 'api/v1/bikes/' + id, httpOptions);
  }

  createBikeRegistration(bike){
    let body = JSON.stringify(bike);
    return this.http.post(this.baseUrl + 'api/v1/bikes', body, httpOptions);
  }

}
