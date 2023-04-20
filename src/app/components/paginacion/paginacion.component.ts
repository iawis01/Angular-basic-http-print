import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  OnInit,
} from '@angular/core';

// Autor: https://jasonwatmore.com/post/2022/12/13/angular-14-paging-and-sorting-table-data-example-tutorial

@Component({
  selector: 'app-paginacion',
  templateUrl: 'paginacion.component.html',
})
export class PaginacionComponent implements OnChanges, OnInit {
  @Input() items!: Array<any>;
  @Output() changePage = new EventEmitter<any>(true);
  @Input() initialPage = 1;
  @Input() pageSize = 10;
  @Input() maxPages = 10;

  @Input() nombreListado!: string;

  @Input() totalPaginas!: number;

  pager?: Pager;

  pageNumberLocalStorageString: any;
  pageNumberLocalStorageObject: any;

  constructor() {}

  ngOnInit(): void {
    if (this.pageNumberLocalStorageObject !== undefined) {
      this.setPage(this.pageNumberLocalStorageObject.numeroPagina);
    } else {
      this.setPage(this.initialPage);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.pageNumberLocalStorageObject !== undefined) {
      this.initialPage = this.pageNumberLocalStorageObject.numeroPagina;
    }

    //this.setPage(this.initialPage);
  }

  setPage(page: number) {
    let listPage = { listado: this.nombreListado, numeroPagina: page };
    localStorage.setItem('ListPage', JSON.stringify(listPage));
    this.pageNumberLocalStorageString = localStorage.getItem('ListPage');
    this.pageNumberLocalStorageObject = JSON.parse(
      this.pageNumberLocalStorageString
    );
    if (!this.items?.length) {
      //page = 1;
      // return;
    }

    // get new pager object for specified page
    this.pager = this.paginate(
      this.items.length,
      page,
      this.pageSize,
      this.maxPages
    );

    if (this.pageNumberLocalStorageObject.listado === this.nombreListado) {
      this.initialPage = this.pageNumberLocalStorageObject.numeroPagina;
      this.changePage.emit(this.pageNumberLocalStorageObject.numeroPagina);
    } else {
      //set the active page
      this.initialPage = page;

      // call change page function in parent component
      this.changePage.emit(page);
    }
  }

  paginate(
    totalItems: number,
    currentPage: number = 1,
    pageSize: number = 10,
    maxPages: number = 10
  ): Pager {
    // calculate total pages
    //let totalPages = 28;
    let totalPages = this.totalPaginas > 0 ? this.totalPaginas : 28;

    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= maxPages) {
      // total pages less than max so show all pages
      startPage = 1;
      endPage = totalPages;
    } else {
      // total pages more than max so calculate start and end pages
      let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
      let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
      if (currentPage <= maxPagesBeforeCurrentPage) {
        // current page near the start
        startPage = 1;
        endPage = maxPages;
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
        // current page near the end
        startPage = totalPages - maxPages + 1;
        endPage = totalPages;
      } else {
        // current page somewhere in the middle
        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array(endPage + 1 - startPage).keys()).map(
      (i) => startPage + i
    );

    // return object with all pager properties required by the view
    return {
      totalItems,
      currentPage,
      pageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages,
    };
  }
}

export interface Pager {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  startPage: number;
  endPage: number;
  startIndex: number;
  endIndex: number;
  pages: number[];
}
