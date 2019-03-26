import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + window.localStorage.getItem('token')})
};

const apiUrl = "http://10.0.0.229:3000/api/v1";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  	constructor(private http: HttpClient){}

  	private handleError<T> (operation = 'operation', result?: T) {
	    return (error: any): Observable<T> => {

	      	// TODO: send the error to remote logging infrastructure
	      	console.error(error); // log to console instead

	      	// Let the app keep running by returning an empty result.
	      	return of(result as T);
	    };
	}

	getAll(schema): Observable<any[]>{
		const url = `${apiUrl}/${schema}`;
		return this.http.get<any[]>(url).pipe(
			tap(objects => console.log(`fetched ${schema}`)),
			catchError(this.handleError(`get ${schema}`,[]))
		);
	};

	get(schema, id): Observable<any>{
		const url = `${apiUrl}/${schema}/${id}`;

		return this.http.get<any>(url).pipe(
			tap(object => console.log(`fetched ${schema} w/ id=${id}`)),
			catchError(this.handleError<any>(`get ${schema} w/ id=${id}`))
		);
	}

	add(schema, object): Observable<any>{
		const url = `${apiUrl}/${schema}`;
		return this.http.post<any>(url, object, httpOptions).pipe(
			tap((object: any) => console.log(`inserted ${schema} w/ id=${object._id}`)),
			catchError(this.handleError<any>(`add ${schema}`))
		);
	}

	update(schema, id, object): Observable<any>{
		const url = `${apiUrl}/${schema}/${id}`;

		return this.http.put(url, object, httpOptions).pipe(
			tap(object => console.log(`updated ${schema} w/ id=${id}`)),
			catchError(this.handleError<any>(`update ${schema} w/ id=${id}`))
		);
	}

	delete(schema, id): Observable<any>{
		const url = `${apiUrl}/${schema}/${id}`;

		return this.http.delete<any>(url, httpOptions).pipe(
			tap(object => console.log(`deleted ${schema} w/ id=${id}`)),
			catchError(this.handleError<any>(`delete ${schema} w/ id=${id}`))
		);
	}

	check(schema): Observable<any>{
		const url = `${apiUrl}/${schema}/check`;

		return this.http.get<any>(url, httpOptions).pipe(
			tap(object => console.log(`checked ${schema}`)),
			catchError(this.handleError<any>(`check ${schema}`))
		);
	}

	login(user): Observable<any>{
		const url = `${apiUrl}/users/login`;

		return this.http.post<any>(url, user, httpOptions).pipe(
			tap(object => console.log(`${user.email} logged`)),
			catchError(this.handleError<any>(`${user.email} during login`))
		);
	}
}
