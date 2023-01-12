import { Component } from '@angular/core';
import { allInternalLinks } from 'src/app/app.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent {
  public logInPageLink = allInternalLinks['bearbeiten/anmelden'];
}
