import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';

export interface Beer {
  brewery: string;
  name: string;
  abv: number;
  style: string;
  description: string;
}

const BEER_DATA: Beer[] = [
  {
    brewery: 'Sierra Nevada',
    name: 'Pale Ale',
    abv: 5.6,
    style: 'American Pale Ale',
    description: 'A classic American pale ale with bold hops and a crisp finish.'
  },
  {
    brewery: 'Guinness',
    name: 'Draught',
    abv: 4.2,
    style: 'Irish Dry Stout',
    description: 'Rich, creamy, and smooth with roasted barley flavors.'
  },
  {
    brewery: 'Dogfish Head',
    name: '60 Minute IPA',
    abv: 6.0,
    style: 'IPA',
    description: 'Continually hopped for 60 minutes, balanced with a sweet malty backbone.'
  },
  {
    brewery: 'Bell\'s Brewery',
    name: 'Two Hearted Ale',
    abv: 7.0,
    style: 'American IPA',
    description: 'An American IPA bursting with hop aromas of grapefruit and pine.'
  },
  {
    brewery: 'Weihenstephaner',
    name: 'Hefeweissbier',
    abv: 5.4,
    style: 'Hefeweizen',
    description: 'A Bavarian wheat beer with notes of banana and clove.'
  },
  {
    brewery: 'Founders Brewing',
    name: 'All Day IPA',
    abv: 4.7,
    style: 'Session IPA',
    description: 'A sessionable IPA with citrus and pine hop character.'
  }
];

@Component({
  selector: 'app-beer-table',
  imports: [MatTableModule, MatSortModule],
  templateUrl: './beer-table.component.html',
  styleUrl: './beer-table.component.scss',
})
export class BeerTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['brewery', 'name', 'abv', 'style', 'description'];
  dataSource = new MatTableDataSource(BEER_DATA);

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
