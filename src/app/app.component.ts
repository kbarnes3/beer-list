import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { versionInfo } from './version-info';

type ThemeMode = 'light' | 'dark' | 'auto';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [RouterOutlet, NgbDropdownModule, NgClass]
})
export class AppComponent implements OnInit {
  title = 'Beer';
  gitVersion: string = versionInfo.hash;
  currentTheme: ThemeMode = 'auto';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme') as ThemeMode;
      if (savedTheme) {
        this.currentTheme = savedTheme;
      }
      this.applyTheme(this.currentTheme);
    }
  }

  setTheme(theme: ThemeMode) {
    this.currentTheme = theme;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', theme);
      this.applyTheme(theme);
    }
  }

  private applyTheme(theme: ThemeMode) {
    if (theme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-bs-theme', prefersDark ? 'dark' : 'light');
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme);
    }
  }

  getThemeIcon(): string {
    switch (this.currentTheme) {
      case 'light': return 'bi-sun-fill';
      case 'dark': return 'bi-moon-fill';
      case 'auto': return 'bi-circle-half';
    }
  }
}
