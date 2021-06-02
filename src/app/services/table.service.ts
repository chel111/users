import { Injectable } from '@angular/core';
import { Filter } from '../entities/filter';
import { User } from '../entities/user';
import { VirtualTable } from '../entities/virtual.table';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  hostUrl: string = 'https://localhost:4444/api/car'

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.hostUrl}`);
  }

  getVirtualTables(): Observable<VirtualTable[]> {
    return this.http.get<VirtualTable[]>(`${this.hostUrl}/virtualTables`);
  }

  getVirtualTable(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.hostUrl}/virtualTables/${id}`);
  }

  saveNewTable(name: string, filters: Filter[], selectedFilials: string[]): Observable<VirtualTable> {
    var json = this.generateJson(name, filters, selectedFilials);
    return this.http.post<VirtualTable>(`${this.hostUrl}/virtualTables`, json);
  }

  deleteVirtualTable(id: number): Observable<any> {
    return this.http.delete(`${this.hostUrl}/virtualTables/${id}`);
  }

  private generateJson(name: string, filters: Filter[], selectedFilials: string[]): string {
    var table = {
      tableName: name,
      filters: JSON.stringify(filters),
      filials: selectedFilials
    }
    return JSON.stringify(table);
  }
}
