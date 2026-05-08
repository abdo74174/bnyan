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
          <div class="kyc-status-msg" *ngIf="(kyc.kycStatus$ | async) === 'pending'" class="animate-fade-in">
            <div class="status-icon loading">⏳</div>
            <h3>جاري معالجة طلبك</h3>
            <p>نقوم حالياً بالتحقق من بياناتك. سيتم إخطارك بمجرد الانتهاء.</p>
            <div class="progress-bar">
              <div class="progress-fill" style="width: 65%"></div>
            </div>
          </div>

          <!-- Approved Status -->
          <div class="kyc-status-msg success-view" *ngIf="(kyc.kycStatus$ | async) === 'approved'">
            <div class="status-icon success">✓</div>
            <h3>تم التحقق بنجاح</h3>
            <p>حسابك الآن موثق وجاهز للاستثمار في جميع المشاريع.</p>
            <button (click)="goDashboard()" class="btn btn-primary" style="margin-top: 20px;">انتقل للوحة التحكم</button>
          </div>

          <!-- Form Step -->
          <div class="kyc-form" *ngIf="(kyc.kycStatus$ | async) === 'none'">
            <div class="upload-grid">
              <div class="upload-box" [class.loading]="isLoading.front" [class.has-file]="files.front" (click)="upload('front')">
                <div class="upload-icon" *ngIf="!files.front && !isLoading.front">🆔</div>
                <div class="upload-label" *ngIf="!files.front && !isLoading.front">صورة الهوية (الأمام)</div>
                
                <div class="loading-spinner-v2" *ngIf="isLoading.front"></div>
                
                <div class="upload-preview" *ngIf="files.front" [style.backgroundImage]="'url('+files.front+')'">
                   <div class="file-overlay">
                     <span class="check-icon">✓</span>
                   </div>
                </div>
              </div>

              <div class="upload-box" [class.loading]="isLoading.back" [class.has-file]="files.back" (click)="upload('back')">
                <div class="upload-icon" *ngIf="!files.back && !isLoading.back">🆔</div>
                <div class="upload-label" *ngIf="!files.back && !isLoading.back">صورة الهوية (الخلف)</div>
                
                <div class="loading-spinner-v2" *ngIf="isLoading.back"></div>

                <div class="upload-preview" *ngIf="files.back" [style.backgroundImage]="'url('+files.back+')'">
                  <div class="file-overlay">
                    <span class="check-icon">✓</span>
                  </div>
                </div>
              </div>

              <div class="upload-box full" [class.loading]="isLoading.selfie" [class.has-file]="files.selfie" (click)="upload('selfie')">
                <div class="upload-icon" *ngIf="!files.selfie && !isLoading.selfie">📸</div>
                <div class="upload-label" *ngIf="!files.selfie && !isLoading.selfie">صورة شخصية (Selfie) مع الهوية</div>
                
                <div class="loading-spinner-v2" *ngIf="isLoading.selfie"></div>

                <div class="upload-preview" *ngIf="files.selfie" [style.backgroundImage]="'url('+files.selfie+')'">
                  <div class="file-overlay">
                    <span class="check-icon">✓</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="kyc-compliance" style="display:flex; justify-content:space-between; align-items:center;">
              <p>📍 ملاحظة: يجب أن تكون الصور واضحة وجميع البيانات مقروءة.</p>
              <button (click)="quickFill()" class="btn btn-ghost btn-sm demo-btn" [disabled]="isSubmitting">
                <span class="sparkle">✨</span> تعبئة سريعة (ديمو)
              </button>
            </div>

            <button (click)="submit()" class="btn btn-primary btn-lg submit-btn" [disabled]="!canSubmit()" [class.is-loading]="isSubmitting" style="width: 100%; margin-top: 30px;">
              <span *ngIf="!isSubmitting">إرسال للتحقق</span>
              <div class="loading-dots" *ngIf="isSubmitting">
                <span>.</span><span>.</span><span>.</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    
    .kyc-page {
      padding: 60px 20px;
      min-height: calc(100vh - 70px);
      background: #f4f7f9;
    }

    .kyc-container {
      max-width: 700px;
      margin: 0 auto;
    }

    .kyc-card {
      background: #fff;
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 10px 30px rgba(26, 79, 138, 0.08);
      border: 1px solid rgba(0,0,0,0.03);
    }

    .kyc-header {
      text-align: center;
      margin-bottom: 40px;
    }

    .kyc-badge {
      display: inline-block;
      padding: 6px 16px;
      background: rgba(26, 79, 138, 0.1);
      color: #1a4f8a;
      border-radius: 30px;
      font-weight: 700;
      font-size: 13px;
      margin-bottom: 15px;
    }

    .kyc-header h1 {
      font-size: 28px;
      font-weight: 800;
      color: #0f1f35;
      margin-bottom: 10px;
    }

    .kyc-header p {
      color: #6b82a0;
      font-size: 15px;
    }

    .upload-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 25px;
    }

    .upload-box {
      border: 2px dashed #d4dde8;
      border-radius: 16px;
      height: 160px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      background: #fafbfc;
    }

    .upload-box:hover {
      border-color: #1a4f8a;
      background: rgba(26, 79, 138, 0.02);
    }

    .upload-box.has-file {
      border-style: solid;
      border-color: #2ecc87;
    }

    .upload-box.loading {
      border-color: #c8a84b;
      cursor: wait;
    }

    .upload-box.full {
      grid-column: span 2;
    }

    .upload-icon {
      font-size: 32px;
      margin-bottom: 10px;
    }

    .upload-label {
      font-weight: 700;
      font-size: 14px;
      color: #3a4f6a;
    }

    .upload-preview {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
      animation: scaleIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .file-overlay {
      position: absolute;
      inset: 0;
      background: rgba(46, 204, 135, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(2px);
    }

    .check-icon {
      width: 40px;
      height: 40px;
      background: #2ecc87;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      box-shadow: 0 4px 10px rgba(46, 204, 135, 0.4);
      animation: bounceIn 0.5s;
    }

    .kyc-status-msg {
      text-align: center;
      padding: 40px 0;
    }

    .status-icon {
      font-size: 50px;
      margin-bottom: 20px;
    }

    .status-icon.loading { animation: rotate 2s linear infinite; }
    
    .loading-spinner-v2 {
      width: 40px;
      height: 40px;
      border: 3px solid rgba(26, 79, 138, 0.1);
      border-top-color: #1a4f8a;
      border-radius: 50%;
      animation: rotate 0.8s linear infinite;
    }

    .submit-btn {
      position: relative;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;
    }

    .submit-btn.is-loading {
      background: #0f3360 !important;
      transform: scale(0.98);
      pointer-events: none;
    }

    .loading-dots span {
      display: inline-block;
      animation: dotPulse 1.4s infinite;
      font-size: 24px;
      line-height: 0;
      vertical-align: middle;
    }
    .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
    .loading-dots span:nth-child(3) { animation-delay: 0.4s; }

    .demo-btn {
      font-size: 12px !important;
      font-weight: 700;
      color: #c8a84b !important;
      border-color: #c8a84b !important;
      background: rgba(200, 168, 75, 0.05) !important;
    }

    .demo-btn:hover {
      background: #c8a84b !important;
      color: #fff !important;
    }

    @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    
    .animate-fade-in {
      animation: fadeIn 0.6s ease forwards;
    }

    @keyframes bounceIn {
      0% { transform: scale(0.3); opacity: 0; }
      50% { transform: scale(1.05); opacity: 1; }
      70% { transform: scale(0.9); }
      100% { transform: scale(1); }
    }
    @keyframes dotPulse {
      0%, 100% { opacity: 0.2; transform: translateY(0); }
      50% { opacity: 1; transform: translateY(-5px); }
    }
  `]
})
export class KycComponent {
  files: any = {
    front: null,
    back: null,
    selfie: null
  };

  isLoading: any = {
    front: false,
    back: false,
    selfie: false
  };

  isSubmitting = false;

  constructor(public kyc: KycService, private auth: AuthService, private router: Router) {
    this.kyc.kycStatus$.subscribe(status => {
      if (status === 'approved' && this.auth.currentUser?.kycStatus === 'approved') {
        // Already approved
      }
    });
  }

  upload(type: string) {
    if (this.isLoading[type]) return;
    
    this.isLoading[type] = true;
    // Simulate file upload
    setTimeout(() => {
      this.files[type] = 'assets/images/placeholder.jpg';
      this.isLoading[type] = false;
    }, 1200);
  }

  async quickFill() {
    const types = ['front', 'back', 'selfie'];
    const images = [
      'assets/images/OIP (1).jpeg',
      'assets/images/OIP (2).jpeg',
      'assets/images/OIP (3).jpeg'
    ];

    for (let i = 0; i < types.length; i++) {
      const type = types[i];
      if (this.files[type]) continue;
      
      this.isLoading[type] = true;
      await new Promise(resolve => setTimeout(resolve, 10)); // Ultra-fast fill
      this.files[type] = images[i];
      this.isLoading[type] = false;
    }

    // Auto-trigger submission instantly
    if (this.canSubmit()) {
      setTimeout(() => this.submit(), 10);
    }
  }

  canSubmit() {
    return this.files.front && this.files.back && this.files.selfie && !this.isSubmitting;
  }

  submit() {
    this.isSubmitting = true;
    
    // Aesthetic delay for the "wow" factor
    setTimeout(() => {
      this.kyc.submitKyc(this.files.front, this.files.back, this.files.selfie);
      // The kycStatus will change to 'pending' which hides this form
    }, 2000);
  }

  goDashboard() {
    if (this.auth.currentUser?.userType === 'developer') {
      this.router.navigate(['/developer']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }
}
