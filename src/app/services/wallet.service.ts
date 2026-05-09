import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  // Start with a virtual balance of 1,000,000 SAR
  private balanceSubject = new BehaviorSubject<number>(1000000);
  balance$ = this.balanceSubject.asObservable();

  get balance(): number {
    return this.balanceSubject.value;
  }

  deduct(amount: number): boolean {
    if (this.balance >= amount) {
      this.balanceSubject.next(this.balance - amount);
      return true;
    }
    return false;
  }

  add(amount: number): void {
    this.balanceSubject.next(this.balance + amount);
  }
}
