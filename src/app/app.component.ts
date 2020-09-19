import { Component, ViewChild} from '@angular/core';
import { DisplayTextModel } from '@syncfusion/ej2-angular-barcode-generator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('barcode')
  @ViewChild('displayText')
  public displayText: DisplayTextModel;

  title = 'Tour of Heroes';

  ngOnInit(): void {  
    this.displayText = {
      text:' '
    }
  }
}
