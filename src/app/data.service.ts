import { LoggerService } from './logger.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private http: HttpClient, private loggerService: LoggerService) { }

  getHeroes(): Observable<string[]> {
    return this.http.get<string[]>('api/heroes');
  }

  addHero(name: string): Observable<string> {
    this.loggerService.log('adding hero');
    return this.http.post<string>('api/heroes', { hero: name });
  }
}
