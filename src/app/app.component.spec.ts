import { DataService } from './data.service';
import { LoggerService } from './logger.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { from } from 'rxjs';

describe('AppComponent', () => {
  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     imports: [
  //       RouterTestingModule
  //     ],
  //     declarations: [
  //       AppComponent
  //     ],
  //     providers: [
  //       { provide: LoggerService, useValue: loggerStub }
  //     ]
  //   }).compileComponents();
  // });
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let msgDisplay: HTMLElement;
  let service: LoggerService;
  let dataService: jasmine.SpyObj<DataService>;
  const loggerStub: Partial<LoggerService> = {
    log: (mess) => {
      console.log(`ciao pippo`);
    }
  };

  beforeEach(async () => {
    dataService = jasmine.createSpyObj('DataService', ['getHeroes']);
    dataService.getHeroes.and.callFake(() => from([['hero1', 'hero2']]));

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: LoggerService, useValue: loggerStub },
      { provide: DataService, useValue: dataService }]
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    msgDisplay = fixture.nativeElement.querySelector('span');
    service = TestBed.inject(LoggerService);
  });

  it('should load heroes', () => {
    const app = fixture.componentInstance;
    app.load();
    expect(app.heroes.length).toBe(2);
    expect(app.heroes[0]).toBe('hero1');
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-tests'`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-tests-1');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain(
      'angular-tests-1 app is running!'
    );
  });
});
