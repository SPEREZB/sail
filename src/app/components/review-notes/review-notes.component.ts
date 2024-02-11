import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-notes',
  templateUrl: './review-notes.component.html',
  styleUrls: ['./review-notes.component.css']
})
export class ReviewNotesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  expandRectangle(id: string): void {
    const rectangle = document.getElementById(id);
  
    if (rectangle instanceof HTMLElement) {
      rectangle.classList.toggle('expanded');
  
      const content = rectangle.querySelector('.content');
  
      if (content instanceof HTMLElement) {
        if (rectangle.classList.contains('expanded')) {
          content.style.display = 'block';
        } else {
          content.style.display = 'none';
        }
      }
    }
  }

}
