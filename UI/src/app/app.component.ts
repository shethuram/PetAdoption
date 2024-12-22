import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';    // for router outlet



@Component({
  selector: 'app-root',
  imports:[RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'UI';
}
