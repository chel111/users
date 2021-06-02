import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Filter } from '../../entities/filter';
import { User } from '../../entities/user';
import { VirtualTable } from '../../entities/virtual.table';
import { TableService } from '../../services/table.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  tableName: string = "Users";
  users: User[];
  virtualTables: VirtualTable[];
  creatingNewTable: boolean = false;
  filters: Filter[] = new Array()
  availableFields: string[] = new Array();
  addBranch: boolean = false;

  @ViewChild("tableNameInput") tableNameInput: ElementRef;

  constructor(private tableService: TableService) {
    tableService.getUsers().subscribe(users => this.users = users);
    this.getVirtualTables();
    for (let field in new User()) {
      this.availableFields.push(field);
    }
  }

  ngOnInit(): void {
  }

  getVirtualTables(): void {
    this.tableService.getVirtualTables().subscribe(tables => this.virtualTables = tables);
  }

  deleteVirtualTable(id: number) {
    this.tableService.deleteVirtualTable(id).subscribe(_ => this.getVirtualTables());
  }

  selectVirtualTable(table: VirtualTable) {
    this.tableService.getVirtualTable(table.id).subscribe(users => this.users = users);
    this.tableName = table.name;
  }

  addNewFilter() {
    this.filters.push(new Filter('', ''));
  }

  saveVirtualTable() {
    let tableName = this.tableNameInput?.nativeElement.value;
    if (!tableName) {
      alert("Table name can't be empty");
      this.tableNameInput.nativeElement.focus();
      return;
    }

    let selectedFilials = ["main"];
    if (this.addBranch) {
      selectedFilials.push("branch1")
    }

    this.tableService.saveNewTable(tableName, this.filters, selectedFilials);
  }
}
