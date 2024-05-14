import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = "http://localhost:8080/"

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private http: HttpClient) { }

  postIncome(incomeDto:any): Observable<any> {
    return this.http.post(BASIC_URL + "api/income", incomeDto);
  }

  getAllIncomes(): Observable<any> {
    return this.http.get(BASIC_URL + "api/income/all");
  }

  deleteIncome(incomeId:number): Observable<any> {
    return this.http.delete(BASIC_URL + "api/income/" + incomeId);
  }
}
