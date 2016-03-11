import {Component} from 'angular2/core';


interface TWTool {
  id: number;
  name: String;
}



@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}} Cipher</h1>
    <h2>{{tool.name}} detail {{tools.length}} {{tools[2].name}}</h2>
    <div><label>id: </label>{{tool.id}}</div>
      <div><label>name: </label>{{tool.name}}</div>
  `
})
  
export class AppComponent {

  public title = 'TLS tests';
  public tool: TWTool = {
    id: 1,
    name: 'RSA-2048'
  };
  public tools: TWTool[];


  ngOnInit() {
    // OK, this is bad using global Javascript variable 
    // included in the main page.
    this.tools = toto;
   }
}

