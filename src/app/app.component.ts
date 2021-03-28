import { DataService } from './data.service';
import { Component } from '@angular/core';
import { LoggerService } from './logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-tests-1';
  heroes: string[] = [];

  constructor(logger: LoggerService, private dataService: DataService) {
    logger.log('ciao');
  }

  load() {
    this.dataService.getHeroes().subscribe((h) => this.heroes = h);
  }
}
