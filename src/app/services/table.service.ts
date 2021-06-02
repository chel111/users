import { Injectable } from '@angular/core';
import { Filter } from '../entities/filter';
import { User } from '../entities/user';
import { VirtualTable } from '../entities/virtual.table';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor() { }

  getUsers(): User[] {
    return [
      //new User(1, "Alex", "Bulkin", 23, "bulkin@urk.net", false),
      //new User(2, "John", "Cooper", 23, "Cooper@urk.net", false),
      //new User(3, "Cody", "Williams", 23, "Williams@urk.net", false),
      //new User(4, "Lauren", "Brown", 23, "Brown@urk.net", false),
      //new User(5, "Gregory", "Buxton", 23, "Buxton@urk.net", false),
      //new User(6, "Liza", "Mansel", 23, "Mansel@urk.net", false),
      //new User(7, "Sheldon", "Prost", 23, "Prost@urk.net", false),
      //new User(8, "Melissa", "Hammilton", 23, "Hammilton@urk.net", true),
      //new User(9, "George", "Rosberg", 23, "Rosberg@urk.net", true),
      //new User(10, "Mary", "Vettel", 23, "Vettel@urk.net", true),
    ]
  }

  getVirtualTables(): VirtualTable[] {
    return [
      new VirtualTable(1, "testTable1"),
      new VirtualTable(2, "testTable2"),
      new VirtualTable(3, "testTable3")
    ]
  }

  selectVirtualTable(name: string): User[] {
    console.log("selecting virtual table")
    return [
      new User(),
      new User(),
      new User(),
    ]
  }

  saveNewTable(name: string, filters: Filter[], selectedFilials: string[]): VirtualTable {
    var json = this.generateJson(name, filters, selectedFilials)
    return new VirtualTable(0, '');
  }

  private generateJson(name: string, filters: Filter[], selectedFilials: string[]): string {
    var table = {
      tableName: name,
      filters: JSON.stringify(filters),
      filials: selectedFilials
    }
    console.log(JSON.stringify(table));
    return "";
  }
}
