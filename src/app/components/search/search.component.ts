import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Output() searchString: string = "";
  @Output() filteredData: Array<any> = [];
  // Emit search information to parent container
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void { }

  filterData() {
    this.search.emit(this.searchString);
  }
}
