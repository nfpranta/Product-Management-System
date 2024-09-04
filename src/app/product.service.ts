import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
export interface ProductRecord {
  id: number;
  name: string;
  category: string;
  description: string;
  count: number;
  createdDate: string;
  price: number;
}
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private localStorageKey = 'productRecords';

  private productRecords = new BehaviorSubject<ProductRecord[]>([]);
  productRecords$ = this.productRecords.asObservable();
  private idCounter = 1;
  private totalSlots = 100;
  constructor() {
    const storedRecords = JSON.parse(
      localStorage.getItem(this.localStorageKey) || '[]'
    );
    this.productRecords = new BehaviorSubject<ProductRecord[]>(storedRecords);
    this.idCounter =
      storedRecords.length > 0
        ? Math.max(...storedRecords.map((record: { id: any }) => record.id)) + 1
        : 1;
  }
  private saveToLocalStorage() {
    localStorage.setItem(
      this.localStorageKey,
      JSON.stringify(this.productRecords.value)
    );
  }
  private deleteFromLocalStorage(id: number) {
    const storedRecords = JSON.parse(
      localStorage.getItem(this.localStorageKey) || '[]'
    );
    const updatedRecords = storedRecords.filter(
      (record: any) => record.id !== id
    );
    localStorage.setItem(this.localStorageKey, JSON.stringify(updatedRecords));
  }
  getProductRecords() {
    return this.productRecords.asObservable();
  }
  getInChunk(pageIndex: number, pageSize: number) {
    return this.productRecords.asObservable().pipe(
      map((allData: any[]) => {
        const startIndex = pageIndex * pageSize;
        const endIndex = startIndex + pageSize;
        return allData.slice(startIndex, endIndex);
      })
    );
  }

  addProductRecord(record: Omit<ProductRecord, 'id'>) {
    const newRecord = { ...record, id: this.idCounter++ };
    const currentRecords = this.productRecords.value;
    this.productRecords.next([...currentRecords, newRecord]);
    this.saveToLocalStorage();
  }
  editProductRecord(updatedRecord: ProductRecord) {
    const currentRecords = this.productRecords.value;
    const index = currentRecords.findIndex(
      (record) => record.id === updatedRecord.id
    );
    if (index !== -1) {
      currentRecords[index] = updatedRecord;
      this.productRecords.next([...currentRecords]);
    }
    this.saveToLocalStorage();
  }
  deleteProductRecord(id: number) {
    const currentRecords = this.productRecords.value;
    this.deleteFromLocalStorage(id);
    const index = currentRecords.findIndex((record) => record.id === id);
    if (index !== -1) {
      currentRecords.splice(index, 1);
      this.productRecords.next([...currentRecords]);
    }
    this.saveToLocalStorage();
  }
}
