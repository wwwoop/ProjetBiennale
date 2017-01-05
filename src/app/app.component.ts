import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  nbGal: number;
  x: Array<string>;
  y: Array<string>;


  constructor(private http: Http) {
    let self = this;

    this.x = ["200px", "100px"];
    this.nbGal = 0;

    this.http.get('https://dweet.io/dweet/for/test?nbGal=3&x=200px&x=400px&x=1000px&y=100px&y=500px&y=300px').subscribe(function(res) {
      self.nbGal = res.json().with.content.nbGal;
      self.x = res.json().with.content.x;
      self.y = res.json().with.content.y;
    });
  }
}
