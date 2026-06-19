import { Component, OnInit, PLATFORM_ID, inject, ChangeDetectionStrategy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { versionInfo } from './version-info';

type ThemeMode = 'light' | 'dark' | 'auto';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule]
})
export class AppComponent implements OnInit {
  private platformId = inject<object>(PLATFORM_ID);

  title = 'Beer';
  gitVersion: string = versionInfo.hash;
  currentTheme: ThemeMode = 'auto';

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
    const effectiveTheme = theme === 'auto'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme;
    const root = document.documentElement;
    if (effectiveTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    root.style.colorScheme = effectiveTheme;
  }

  getThemeIcon(): string {
    switch (this.currentTheme) {
      case 'light': return 'light_mode';
      case 'dark': return 'dark_mode';
      case 'auto': return 'contrast';
    }
  }
}
