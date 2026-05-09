import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';
import { AuthService } from './auth.service';

export interface KycData {
  userId: string;
  frontId: string | null;
  backId: string | null;
  selfie: string | null;
  status: 'none' | 'pending' | 'approved' | 'rejected';
  submittedAt: string | null;
  reviewedAt: string | null;
}

@Injectable({ providedIn: 'root' })
export class KycService {
  private readonly KYC_KEY = 'bnyan_kyc';

  kycStatus$ = new BehaviorSubject<string>('none');

  constructor(private storage: StorageService, private auth: AuthService) {
    this.auth.currentUser$.subscribe(user => {
      if (user) {
        const kyc = this.getKyc(user.id);
        this.kycStatus$.next(kyc?.status || 'none');
      } else {
        this.kycStatus$.next('none');
      }
    });
  }

  private getAllKyc(): KycData[] {
    return this.storage.get(this.KYC_KEY) || [];
  }

  private saveAllKyc(data: KycData[]): void {
    this.storage.set(this.KYC_KEY, data);
  }

  getKyc(userId: string): KycData | null {
    const all = this.getAllKyc();
    return all.find(k => k.userId === userId) || null;
  }

  submitKyc(frontId: string, backId: string, selfie: string): { success: boolean; message: string } {
    const user = this.auth.currentUser;
    if (!user) return { success: false, message: 'يجب تسجيل الدخول أولاً' };

    const all = this.getAllKyc();
    const existing = all.findIndex(k => k.userId === user.id);

    const kycData: KycData = {
      userId: user.id,
      frontId,
      backId,
      selfie,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      reviewedAt: null
    };

    if (existing !== -1) {
      all[existing] = kycData;
    } else {
      all.push(kycData);
    }

    this.saveAllKyc(all);
    this.auth.updateUser({ kycStatus: 'pending' });
    this.kycStatus$.next('pending');

    // Simulate auto-approval after 5 seconds
    setTimeout(() => {
      this.approveKyc(user.id);
    }, 5000);

    return { success: true, message: 'تم إرسال طلب التحقق بنجاح' };
  }

  directApprove(): void {
    const user = this.auth.currentUser;
    if (!user) return;

    const all = this.getAllKyc();
    const existing = all.findIndex(k => k.userId === user.id);
    const kycData: KycData = {
      userId: user.id,
      frontId: null,
      backId: null,
      selfie: null,
      status: 'approved',
      submittedAt: new Date().toISOString(),
      reviewedAt: new Date().toISOString()
    };

    if (existing !== -1) {
      all[existing] = kycData;
    } else {
      all.push(kycData);
    }

    this.saveAllKyc(all);
    this.auth.updateUser({ kycStatus: 'approved' });
    this.kycStatus$.next('approved');
  }

  private approveKyc(userId: string): void {
    const all = this.getAllKyc();
    const idx = all.findIndex(k => k.userId === userId);
    if (idx === -1) return;

    all[idx].status = 'approved';
    all[idx].reviewedAt = new Date().toISOString();
    this.saveAllKyc(all);

    const currentUser = this.auth.currentUser;
    if (currentUser && currentUser.id === userId) {
      this.auth.updateUser({ kycStatus: 'approved' });
      this.kycStatus$.next('approved');
    }
  }

  resetKyc(userId: string): void {
    const all = this.getAllKyc();
    const filtered = all.filter(k => k.userId !== userId);
    this.saveAllKyc(filtered);
    this.kycStatus$.next('none');
  }
}
