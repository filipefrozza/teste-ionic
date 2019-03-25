import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Produto } from './model/produto';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiUrl = "http://localhost:3000/api/v1/produtos";

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

	getProdutos(): Observable<Produto[]>{
		return this.http.get<Produto[]>(apiUrl).pipe(
			tap(produtos => console.log('fetched produtos')),
			catchError(this.handleError('getProdutos',[]))
		);
	};

	getProduto(id): Observable<Produto>{
		const url = `${apiUrl}/${id}`;

		return this.http.get<Produto>(url).pipe(
			tap(produto => console.log('fetched produto w/ id='+id)),
			catchError(this.handleError<Produto>('getProduto w/ id='+id))
		);
	}

	addProduto(produto): Observable<Produto>{
		return this.http.post<Produto>(apiUrl, produto, httpOptions).pipe(
			tap((produto: Produto) => console.log('inserted produto w/ id='+produto._id)),
			catchError(this.handleError<Produto>('addProduto'))
		);
	}

	updateProduto(id, produto): Observable<any>{
		const url = `${apiUrl}/${id}`;

		return this.http.put(url, produto, httpOptions).pipe(
			tap(produto => console.log('updated produto w/ id='+id)),
			catchError(this.handleError<any>('updateProduto w/ id='+id))
		);
	}

	deleteProduto(id): Observable<Produto>{
		const url = `${apiUrl}/${id}`;

		return this.http.delete<Produto>(url, httpOptions).pipe(
			tap(produto => console.log('deleted produto w/ id='+id)),
			catchError(this.handleError<Produto>('deleteProduto w/ id='+id))
		);
	}
}
