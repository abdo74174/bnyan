import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Investment {
  id: number;
  name: string;
  type: string;
  location: string;
  amount: number;
  expectedReturn: number;
  remainingMonths: number;
  progress: number;
  status: string;
  statusBadgeClass: string;
  img: string;
}

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {
  private initialInvestments: Investment[] = [
    { id: 1, name: 'أبراج الرقي التجاري', type: 'تجاري', location: 'الرياض', amount: 50000, expectedReturn: 20000, remainingMonths: 14, progress: 25, status: 'نشط', statusBadgeClass: 'badge-green', img: 'assets/images/OIP (1).jpeg' },
    { id: 2, name: 'بوابة جدة', type: 'فندقي', location: 'جدة', amount: 100000, expectedReturn: 34000, remainingMonths: 8, progress: 50, status: 'نشط', statusBadgeClass: 'badge-green', img: 'assets/images/OIP (4).jpeg' },
    { id: 3, name: 'النخيل السكني', type: 'سكني', location: 'الدمام', amount: 75000, expectedReturn: 18000, remainingMonths: 22, progress: 0, status: 'جديد', statusBadgeClass: 'badge-blue', img: 'assets/images/OIP (5).jpeg' },
    { id: 4, name: 'واجهة الخبر', type: 'مختلط', location: 'الخبر', amount: 160000, expectedReturn: 48640, remainingMonths: 16, progress: 25, status: 'نشط', statusBadgeClass: 'badge-green', img: 'assets/images/OIP (6).jpeg' }
  ];

  private investmentsSubject = new BehaviorSubject<Investment[]>(this.loadFromStorage());
  investments$ = this.investmentsSubject.asObservable();

  constructor() {
    window.addEventListener('storage', (event) => {
      if (event.key === 'bnyan_investments_v2') {
        this.investmentsSubject.next(this.loadFromStorage());
      }
    });
  }

  private loadFromStorage(): Investment[] {
    const stored = localStorage.getItem('bnyan_investments_v2');
    return stored ? JSON.parse(stored) : this.initialInvestments;
  }

  private saveToStorage(data: Investment[]) {
    localStorage.setItem('bnyan_investments_v2', JSON.stringify(data));
    this.investmentsSubject.next(data);
  }

  get investments(): Investment[] {
    return this.investmentsSubject.value;
  }

  addInvestment(inv: Omit<Investment, 'id'>) {
    const current = this.investments;
    const newId = current.length > 0 ? Math.max(...current.map(i => i.id)) + 1 : 1;
    const newInvestment = { ...inv, id: newId };
    this.saveToStorage([newInvestment, ...current]);
  }

  updateProgress(id: number, newProgress: number) {
    const current = this.investments;
    const updated = current.map(inv => inv.id === id ? { ...inv, progress: newProgress } : inv);
    this.saveToStorage(updated);
  }
}
