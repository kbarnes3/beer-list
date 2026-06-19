import { Component, ViewChild, OnInit, AfterViewInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { BEER_DATA, Beer, EVENT_NAME, EVENT_URL, DATA_SOURCE_URL } from './beer-constants';
import { BeerDetailsDialogComponent } from './beer-details-dialog.component';

@Component({
  selector: 'app-beer-table',
  imports: [MatTableModule, MatSortModule, MatIconModule],
  templateUrl: './beer-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './beer-table.component.scss',
})
export class BeerTableComponent implements OnInit, AfterViewInit {
  private dialog = inject(MatDialog);

  event_name = EVENT_NAME;
  event_url = EVENT_URL;
  data_source_url = DATA_SOURCE_URL;
  displayedColumns: string[] = ['status', 'brewery', 'name', 'abv', 'style'];
  dataSource = new MatTableDataSource(BEER_DATA);
  private readonly STORAGE_KEY = 'beer-status-data';

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.loadBeerStatuses();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (beer: Beer, sortHeaderId: string) => {
      if (sortHeaderId === 'status') {
        return this.getStatusSortValue(beer.status || 'default');
      }
      return (beer as unknown as Record<string, string | number>)[sortHeaderId];
    };
  }

  openBeerDetails(beer: Beer) {
    this.dialog.open(BeerDetailsDialogComponent, {
      data: { name: beer.name, description: beer.description },
      width: '420px',
    });
  }

  getStatusIcon(status: string | undefined): string {
    switch (status) {
      case 'want': return 'favorite_border';
      case 'liked': return 'favorite';
      case 'disliked': return 'heart_broken';
      default: return 'check_box_outline_blank';
    }
  }

  private getStatusSortValue(status: string): number {
    // Sort order: want (1), liked (2), disliked (3), default (4)
    switch (status) {
      case 'want': return 1;
      case 'liked': return 2;
      case 'disliked': return 3;
      default: return 4;
    }
  }

  cycleStatus(beer: Beer) {
    const statusOrder: ('default' | 'want' | 'liked' | 'disliked')[] = ['default', 'want', 'liked', 'disliked'];
    const currentIndex = statusOrder.indexOf(beer.status || 'default');
    const nextIndex = (currentIndex + 1) % statusOrder.length;
    beer.status = statusOrder[nextIndex];
    this.saveBeerStatuses();
  }

  private loadBeerStatuses() {
    try {
      const savedData = localStorage.getItem(this.STORAGE_KEY);
      if (savedData) {
        const statusMap: Record<string, 'default' | 'want' | 'liked' | 'disliked'> = JSON.parse(savedData);
        this.dataSource.data.forEach(beer => {
          const key = `${beer.brewery}-${beer.name}`;
          if (statusMap[key]) {
            beer.status = statusMap[key];
          }
        });
      }
    } catch (error) {
      console.error('Error loading beer statuses:', error);
    }
  }

  private saveBeerStatuses() {
    try {
      const statusMap: Record<string, 'default' | 'want' | 'liked' | 'disliked'> = {};
      this.dataSource.data.forEach(beer => {
        const key = `${beer.brewery}-${beer.name}`;
        if (beer.status && beer.status !== 'default') {
          statusMap[key] = beer.status;
        }
      });
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(statusMap));
    } catch (error) {
      console.error('Error saving beer statuses:', error);
    }
  }

  clearBeerStatuses() {
    if (confirm('Are you sure you want to clear all saved beer statuses?')) {
      localStorage.removeItem(this.STORAGE_KEY);
      this.dataSource.data.forEach(beer => {
        beer.status = 'default';
      });
    }
  }
}
