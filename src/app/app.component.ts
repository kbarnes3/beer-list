import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { versionInfo } from './version-info';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [RouterOutlet]
})
export class AppComponent {
  title = 'Beer';
  gitVersion: string = versionInfo.hash;
}
