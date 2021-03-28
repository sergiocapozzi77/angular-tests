import { LoggerService } from './logger.service';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let httpTestingController: HttpTestingController;

  const loggerService: Partial<LoggerService> = {
    log: (mess) => {
      console.log(`ciao ttttttt`);
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: LoggerService, useValue: loggerService }]
    });
    service = TestBed.inject(DataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get heroes', () => {
    const heroes = ['Boothstomper', 'Drogfisher'];
    service.getHeroes().subscribe({
      next: (hero) => {
        expect(hero.length).toBe(2);
      },
      error: () => { }
    });
    const req = httpTestingController.expectOne('api/heroes');
    expect(req.request.method).toEqual('GET');
    req.flush(heroes);
  });

  it('should add a hero', () => {
    service.addHero('Bloodyllips').subscribe({
      next: () => { },
      error: () => { }
    });
    const req = httpTestingController.expectOne('api/heroes');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({ hero: 'Bloodyllips' });
    req.flush('');
  });

  it('should add a hero and log', () => {
    const loggerServiceSpy = TestBed.inject(LoggerService);
    spyOn(loggerServiceSpy, 'log');
    service.addHero('Bloodyllips').subscribe({
      next: () => { },
      error: () => { },
      complete: () => { }
    });

    expect(loggerService.log).toHaveBeenCalledOnceWith('adding hero');
  });
});
