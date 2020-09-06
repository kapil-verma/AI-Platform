import { Component } from '@angular/core';//importing the members that we need from the specified path

@Component({//Component decorator(@component, it's a function): defines the matadata that include the template that lays out the view managed by this component
  selector: 'app-root',//directive name(app-root) used in HTML, whenever it'll be used, angular will render the component's template
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { //Class: allows us to create a type with properties(that defines the data elements) and methods(that provide functionality needed by our view(template))
  title: string = 'AIEP - Virtusa';//property name with its data type
  
  constructor() { }

}

