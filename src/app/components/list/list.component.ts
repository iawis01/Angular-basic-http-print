import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ConfiguracionItem } from 'src/app/classes/Configuration-item';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() datos: any[] = [];
  @Input() configuracion: ConfiguracionItem[] = [];
  @Output() changePage = new EventEmitter<any>(true);

  @Input() totalPages!: number;
  @Input() listName!: string;

  pageNumber = 1;
  loading = true;
  //img = 'assets/loading-yellow2.gif';

  constructor() { }

  ngOnInit(): void {

  }

  cambiarPagina(page: number){
    this.pageNumber = page;
    this.changePage.emit(this.pageNumber);
  }




}
