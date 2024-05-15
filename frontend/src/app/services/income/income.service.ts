import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = "http://localhost:8080/"

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private http: HttpClient) { }

  getIncomeById(id:number): Observable<any> {
    return this.http.get(BASIC_URL + "api/income/" + id);
  }

  getAllIncomes(): Observable<any> {
    return this.http.get(BASIC_URL + "api/income/all");
  }

  postIncome(incomeDto:any): Observable<any> {
    return this.http.post(BASIC_URL + "api/income", incomeDto);
  }

  updateIncome(id:number, incomeDto:any): Observable<any> {
    return this.http.put(BASIC_URL + "api/income/" + id, incomeDto);
  }

  deleteIncome(incomeId:number): Observable<any> {
    return this.http.delete(BASIC_URL + "api/income/" + incomeId);
  }
}
