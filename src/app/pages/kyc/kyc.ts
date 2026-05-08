import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { KycService } from '../../services/kyc.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-kyc',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="kyc-page">
      <div class="kyc-container">
        <div class="kyc-card">
          <div class="kyc-header">
            <div class="kyc-badge">التحقق من الهوية</div>
            <h1>توثيق الحساب الاستثماري</h1>
            <p>التحقق من الهوية مطلوب للامتثال للوائح هيئة السوق المالية في المملكة العربية السعودية</p>
          </div>

          <!-- Pending Status -->
          <div class="kyc-status-msg" *ngIf="(kyc.kycStatus$ | async) === 'pending'">
            <div class="status-icon loading">⏳</div>
            <h3>جاري معالجة طلبك</h3>
            <p>نقوم حالياً بالتحقق من بياناتك. سيتم إخطارك بمجرد الانتهاء.</p>
            <div class="progress-bar">
              <div class="progress-fill" style="width: 65%"></div>
            </div>
          </div>

          <!-- Approved Status -->
          <div class="kyc-status-msg" *ngIf="(kyc.kycStatus$ | async) === 'approved'">
            <div class="status-icon success">✓</div>
            <h3>تم التحقق بنجاح</h3>
            <p>حسابك الآن موثق وجاهز للاستثمار في جميع المشاريع.</p>
            <button (click)="goDashboard()" class="btn btn-primary" style="margin-top: 20px;">انتقل للوحة التحكم</button>
          </div>

          <!-- Form Step -->
          <div class="kyc-form" *ngIf="(kyc.kycStatus$ | async) === 'none'">
            <div class="upload-grid">
              <div class="upload-box" (click)="upload('front')">
                <div class="upload-icon">🆔</div>
                <div class="upload-label">صورة الهوية (الأمام)</div>
                <div class="upload-preview" *ngIf="files.front" [style.backgroundImage]="'url('+files.front+')'"></div>
              </div>
              <div class="upload-box" (click)="upload('back')">
                <div class="upload-icon">🆔</div>
                <div class="upload-label">صورة الهوية (الخلف)</div>
                <div class="upload-preview" *ngIf="files.back" [style.backgroundImage]="'url('+files.back+')'"></div>
              </div>
              <div class="upload-box full" (click)="upload('selfie')">
                <div class="upload-icon">📸</div>
                <div class="upload-label">صورة شخصية (Selfie) مع الهوية</div>
                <div class="upload-preview" *ngIf="files.selfie" [style.backgroundImage]="'url('+files.selfie+')'"></div>
              </div>
            </div>

            <div class="kyc-compliance" style="display:flex; justify-content:space-between; align-items:center;">
              <p>📍 ملاحظة: يجب أن تكون الصور واضحة وجميع البيانات مقروءة.</p>
              <button (click)="quickFill()" class="btn btn-ghost btn-sm" style="font-size: 11px;">تعبئة سريعة (ديمو)</button>
            </div>

            <button (click)="submit()" class="btn btn-primary btn-lg" [disabled]="!canSubmit()" style="width: 100%; margin-top: 30px;">
              إرسال للتحقق
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class KycComponent {
  files: any = {
    front: null,
    back: null,
    selfie: null
  };

  constructor(public kyc: KycService, private auth: AuthService, private router: Router) {
    this.kyc.kycStatus$.subscribe(status => {
      if (status === 'approved' && this.auth.currentUser?.kycStatus === 'approved') {
        // Already approved
      }
    });
  }

  upload(type: string) {
    // Simulate file upload
    this.files[type] = 'assets/images/placeholder.jpg';
  }

  quickFill() {
    this.files.front = 'assets/images/OIP (1).jpeg';
    this.files.back = 'assets/images/OIP (2).jpeg';
    this.files.selfie = 'assets/images/OIP (3).jpeg';
  }

  canSubmit() {
    return this.files.front && this.files.back && this.files.selfie;
  }

  submit() {
    this.kyc.submitKyc(this.files.front, this.files.back, this.files.selfie);
  }

  goDashboard() {
    if (this.auth.currentUser?.userType === 'developer') {
      this.router.navigate(['/developer']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }
}
