import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { KycService } from '../../services/kyc.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-kyc',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="kyc-page">
      <div class="kyc-container">

        <!-- Top Trust Banner -->
        <div class="demo-banner">
          <span class="demo-dot"></span>
          بيئة آمنة ومشفرة — يتم التعامل مع جميع البيانات بأعلى معايير الأمن السيبراني
        </div>

        <div class="kyc-card">

          <!-- Header -->
          <div class="kyc-header">
            <div class="shield-icon">🛡️</div>
            <h1>التحقق من الهوية</h1>
            <p class="subtitle">
              نظام آمن ومشفر للتحقق من الهوية لضمان حماية بياناتك والالتزام بالمعايير الرقابية
            </p>
          </div>

          <!-- Step Indicator - Hide if already approved -->
          <div class="steps" *ngIf="(kyc.kycStatus$ | async) !== 'approved' || currentStep === 3">
            <div class="step" [class.active]="currentStep >= 1" [class.done]="currentStep > 1">
              <div class="step-circle">
                <span *ngIf="currentStep <= 1">1</span>
                <span *ngIf="currentStep > 1">✓</span>
              </div>
              <div class="step-label">إدخال الهوية</div>
            </div>
            <div class="step-line" [class.active]="currentStep > 1"></div>
            <div class="step" [class.active]="currentStep >= 2" [class.done]="currentStep > 2">
              <div class="step-circle">
                <span *ngIf="currentStep <= 2">2</span>
                <span *ngIf="currentStep > 2">✓</span>
              </div>
              <div class="step-label">التحقق</div>
            </div>
            <div class="step-line" [class.active]="currentStep > 2"></div>
            <div class="step" [class.active]="currentStep >= 3" [class.done]="currentStep === 3">
              <div class="step-circle">
                <span *ngIf="currentStep < 3">3</span>
                <span *ngIf="currentStep === 3">✓</span>
              </div>
              <div class="step-label">اكتمال التحقق</div>
            </div>
          </div>

          <!-- ── STEP 1: Input ── -->
          <div class="form-section" *ngIf="currentStep === 1 && (kyc.kycStatus$ | async) !== 'approved'">
            <div class="field-group">
              <label class="field-label">رقم الهوية الوطنية / الإقامة</label>
              <div class="input-wrapper">
                <span class="input-icon">🪪</span>
                <input
                  type="text"
                  class="id-input"
                  [(ngModel)]="nationalId"
                  placeholder="أدخل رقم الهوية (10 أرقام)"
                  maxlength="10"
                  dir="ltr"
                />
              </div>
              <div class="field-hint">مثال: 1234567890 — يتم تشفير البيانات وحمايتها وفق أعلى المعايير</div>
            </div>

            <button class="btn-primary" (click)="startVerification()" [disabled]="!nationalId || nationalId.length < 7">
              <span class="btn-icon">🔍</span>
              التحقق من الهوية
            </button>

            <div class="trust-row">
              <div class="trust-item"><span>🔒</span> بيئة مشفرة</div>
              <div class="trust-item"><span>🔒</span> حماية البيانات</div>
              <div class="trust-item"><span>🛡️</span> توثيق معتمد</div>
            </div>
          </div>

          <!-- ── STEP 2: Loading ── -->
          <div class="loading-section" *ngIf="currentStep === 2">
            <div class="loading-ring">
              <div class="ring"></div>
              <div class="ring-inner">🛡️</div>
            </div>
            <h3>جاري التحقق من الهوية...</h3>
            <p class="loading-sub">يتم معالجة البيانات عبر قنوات آمنة ومشفرة</p>
            <div class="progress-track">
              <div class="progress-fill" [style.width]="loadingProgress + '%'"></div>
            </div>
            <div class="loading-steps-list">
              <div class="ls-item" [class.done]="loadingProgress >= 30">
                <span class="ls-dot"></span> التحقق من صحة الرقم
              </div>
              <div class="ls-item" [class.done]="loadingProgress >= 60">
                <span class="ls-dot"></span> مطابقة السجلات الوطنية الموحدة
              </div>
              <div class="ls-item" [class.done]="loadingProgress >= 90">
                <span class="ls-dot"></span> توثيق الهوية الرقمية (Auth Verified)
              </div>
            </div>
          </div>

          <!-- ── STEP 3 SUCCESS ── -->
          <div class="result-section success-result" *ngIf="currentStep === 3 && verificationResult === 'success'">
            <div class="result-icon success-icon">✓</div>
            <div class="result-badge success-badge">تم التحقق والتوثيق (Auth Verified)</div>
            <h3>تم التحقق من الهوية</h3>
            <p>تم التحقق من هويتك بنجاح عبر النظام الموحد. يمكنك الآن البدء في الاستثمار.</p>
            <div class="result-details">
              <div class="detail-row">
                <span class="detail-label">رقم الهوية</span>
                <span class="detail-val">{{ maskedId }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">الحالة</span>
                <span class="detail-val success-text">محقق وموثق</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">تاريخ التحقق</span>
                <span class="detail-val">اليوم، 15:36</span>
              </div>
            </div>
            <button class="btn-primary" (click)="goDashboard()">
              <span class="btn-icon">🚀</span> متابعة إلى لوحة التحكم
            </button>
          </div>

          <!-- ── STEP 3 FAILURE ── -->
          <div class="result-section fail-result" *ngIf="currentStep === 3 && verificationResult === 'fail'">
            <div class="result-icon fail-icon">✕</div>
            <div class="result-badge fail-badge">فشل التحقق</div>
            <h3>تعذر التحقق من الهوية</h3>
            <p>لم نتمكن من مطابقة بياناتك مع السجلات الرسمية. يرجى التأكد من الرقم والمحاولة مرة أخرى.</p>
            <button class="btn-retry" (click)="retry()">
              <span class="btn-icon">🔄</span> إعادة المحاولة
            </button>
          </div>

          <!-- Approved Status (from service) - Only show if not currently in step 3 result -->
          <div class="result-section success-result" *ngIf="(kyc.kycStatus$ | async) === 'approved' && currentStep !== 3">
            <div class="result-icon success-icon">✓</div>
            <h3>تم التحقق من حسابك</h3>
            <p>حسابك موثق وجاهز للاستثمار.</p>
            <button class="btn-primary" (click)="goDashboard()">
              <span class="btn-icon">🚀</span> متابعة إلى لوحة التحكم
            </button>
          </div>

          <!-- Footer Permits -->
          <div class="permits-footer">
            <div class="permit-item">
              <div class="permit-label">مصرح من</div>
              <div class="permit-value">هيئة سوق المال</div>
            </div>
            <div class="permit-divider"></div>
            <div class="permit-item">
              <div class="permit-label">مصرح من</div>
              <div class="permit-value">البنك المركزي (SAMA)</div>
            </div>
          </div>

        </div>

        <div class="kyc-footnote">
          🔐 جميع البيانات مشفرة بالكامل (256-bit SSL) وتخضع لسياسة الخصوصية الصارمة
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: 'IBM Plex Sans Arabic', sans-serif; }

    /* ── Page ── */
    .kyc-page {
      min-height: 100vh;
      background: linear-gradient(135deg, #f0f4ff 0%, #e8f5f0 100%);
      padding: 40px 20px 60px;
      display: flex;
      align-items: flex-start;
      justify-content: center;
    }

    .kyc-container {
      width: 100%;
      max-width: 560px;
    }

    /* ── Demo Banner ── */
    .demo-banner {
      background: linear-gradient(135deg, #1a4f8a, #0e9f6e);
      color: #fff;
      text-align: center;
      padding: 10px 20px;
      border-radius: 12px;
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      letter-spacing: 0.2px;
    }

    .demo-dot {
      width: 8px; height: 8px;
      background: #6ee7b7;
      border-radius: 50%;
      animation: pulse 1.5s infinite;
      flex-shrink: 0;
    }

    /* ── Card ── */
    .kyc-card {
      background: #ffffff;
      border-radius: 24px;
      padding: 40px 36px;
      box-shadow: 0 20px 60px rgba(26, 79, 138, 0.10), 0 4px 16px rgba(0,0,0,0.04);
      border: 1px solid rgba(26, 79, 138, 0.07);
    }

    /* ── Header ── */
    .kyc-header {
      text-align: center;
      margin-bottom: 32px;
    }

    .shield-icon {
      font-size: 44px;
      margin-bottom: 12px;
      display: block;
      filter: drop-shadow(0 4px 8px rgba(26,79,138,0.2));
    }

    .kyc-header h1 {
      font-size: 26px;
      font-weight: 800;
      color: #0f1f35;
      margin: 0 0 10px;
    }

    .subtitle {
      font-size: 13.5px;
      color: #6b82a0;
      line-height: 1.7;
      max-width: 400px;
      margin: 0 auto;
    }

    /* ── Steps ── */
    .steps {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0;
      margin-bottom: 36px;
    }

    .step {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
    }

    .step-circle {
      width: 38px; height: 38px;
      border-radius: 50%;
      border: 2px solid #d4dde8;
      display: flex; align-items: center; justify-content: center;
      font-weight: 700; font-size: 14px;
      color: #aab4c2;
      background: #f8f9fc;
      transition: all 0.4s ease;
    }

    .step.active .step-circle {
      border-color: #1a4f8a;
      background: #1a4f8a;
      color: #fff;
      box-shadow: 0 4px 14px rgba(26,79,138,0.35);
    }

    .step.done .step-circle {
      border-color: #0e9f6e;
      background: #0e9f6e;
      color: #fff;
    }

    .step-label {
      font-size: 11px;
      color: #aab4c2;
      font-weight: 600;
      white-space: nowrap;
    }

    .step.active .step-label { color: #1a4f8a; }
    .step.done .step-label { color: #0e9f6e; }

    .step-line {
      flex: 1;
      height: 2px;
      background: #e0e6ef;
      margin: 0 8px;
      margin-bottom: 22px;
      transition: background 0.4s;
    }

    .step-line.active { background: #1a4f8a; }

    /* ── Form ── */
    .form-section {
      animation: fadeUp 0.5s ease;
    }

    .field-group { margin-bottom: 24px; }

    .field-label {
      display: block;
      font-size: 14px;
      font-weight: 700;
      color: #2c3e50;
      margin-bottom: 10px;
    }

    .input-wrapper {
      display: flex;
      align-items: center;
      border: 2px solid #e0e6ef;
      border-radius: 14px;
      background: #fafbfc;
      transition: all 0.3s;
      overflow: hidden;
    }

    .input-wrapper:focus-within {
      border-color: #1a4f8a;
      background: #fff;
      box-shadow: 0 0 0 4px rgba(26,79,138,0.08);
    }

    .input-icon {
      padding: 0 14px;
      font-size: 20px;
      flex-shrink: 0;
    }

    .id-input {
      flex: 1;
      border: none;
      outline: none;
      background: transparent;
      font-size: 16px;
      font-family: 'IBM Plex Sans Arabic', sans-serif;
      padding: 14px 0 14px 14px;
      color: #0f1f35;
      font-weight: 600;
      letter-spacing: 2px;
    }

    .field-hint {
      font-size: 12px;
      color: #a0aab4;
      margin-top: 8px;
    }

    /* ── Buttons ── */
    .btn-primary {
      width: 100%;
      padding: 15px;
      background: linear-gradient(135deg, #1a4f8a, #1565c0);
      color: #fff;
      border: none;
      border-radius: 14px;
      font-size: 16px;
      font-weight: 700;
      font-family: inherit;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      transition: all 0.3s ease;
      box-shadow: 0 6px 20px rgba(26,79,138,0.30);
    }

    .btn-primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 10px 28px rgba(26,79,138,0.40);
    }

    .btn-primary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }

    .btn-retry {
      width: 100%;
      padding: 14px;
      background: transparent;
      color: #e53e3e;
      border: 2px solid #e53e3e;
      border-radius: 14px;
      font-size: 15px;
      font-weight: 700;
      font-family: inherit;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      transition: all 0.3s;
      margin-top: 20px;
    }

    .btn-retry:hover {
      background: #e53e3e;
      color: #fff;
    }

    .btn-icon { font-size: 18px; }

    /* ── Trust Row ── */
    .trust-row {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-top: 20px;
    }

    .trust-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: #7a8fa8;
      font-weight: 600;
    }

    /* ── Loading Section ── */
    .loading-section {
      text-align: center;
      padding: 20px 0;
      animation: fadeUp 0.5s ease;
    }

    .loading-ring {
      position: relative;
      width: 90px; height: 90px;
      margin: 0 auto 24px;
    }

    .ring {
      position: absolute; inset: 0;
      border: 4px solid #e0e6ef;
      border-top-color: #1a4f8a;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    .ring-inner {
      position: absolute; inset: 12px;
      background: #f0f4ff;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 28px;
    }

    .loading-section h3 {
      font-size: 18px;
      font-weight: 700;
      color: #0f1f35;
      margin: 0 0 8px;
    }

    .loading-sub {
      font-size: 13px;
      color: #7a8fa8;
      margin-bottom: 20px;
    }

    .progress-track {
      height: 6px;
      background: #e0e6ef;
      border-radius: 99px;
      overflow: hidden;
      margin-bottom: 20px;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #1a4f8a, #0e9f6e);
      border-radius: 99px;
      transition: width 0.4s ease;
    }

    .loading-steps-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      text-align: right;
    }

    .ls-item {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 13px;
      color: #aab4c2;
      font-weight: 600;
      transition: color 0.3s;
    }

    .ls-item.done { color: #0e9f6e; }

    .ls-dot {
      width: 10px; height: 10px;
      border-radius: 50%;
      background: #d4dde8;
      flex-shrink: 0;
      transition: background 0.3s;
    }

    .ls-item.done .ls-dot { background: #0e9f6e; }

    /* ── Result Section ── */
    .result-section {
      text-align: center;
      padding: 10px 0 20px;
      animation: fadeUp 0.5s ease;
    }

    .result-icon {
      width: 72px; height: 72px;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 28px;
      font-weight: 900;
      margin: 0 auto 16px;
    }

    .success-icon {
      background: linear-gradient(135deg, #0e9f6e, #06b06a);
      color: #fff;
      box-shadow: 0 8px 24px rgba(14,159,110,0.35);
      animation: bounceIn 0.6s;
    }

    .fail-icon {
      background: linear-gradient(135deg, #e53e3e, #c53030);
      color: #fff;
      box-shadow: 0 8px 24px rgba(229,62,62,0.35);
    }

    .result-badge {
      display: inline-block;
      padding: 4px 14px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 700;
      margin-bottom: 14px;
    }

    .success-badge { background: #d1fae5; color: #065f46; }
    .fail-badge { background: #fee2e2; color: #991b1b; }

    .result-section h3 {
      font-size: 20px;
      font-weight: 800;
      color: #0f1f35;
      margin: 0 0 10px;
    }

    .result-section p {
      font-size: 14px;
      color: #6b82a0;
      margin-bottom: 20px;
    }

    .result-details {
      background: #f8f9fc;
      border-radius: 14px;
      padding: 16px 20px;
      margin-bottom: 24px;
      text-align: right;
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      border-bottom: 1px solid #edf0f5;
      font-size: 13px;
    }

    .detail-row:last-child { border: none; }

    .detail-label { color: #7a8fa8; font-weight: 600; }
    .detail-val { color: #0f1f35; font-weight: 700; }
    .success-text { color: #0e9f6e; }

    /* ── Permits Footer ── */
    .permits-footer {
      margin-top: 32px;
      padding-top: 20px;
      border-top: 1px solid #edf0f5;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0;
    }

    .permit-item {
      text-align: center;
      flex: 1;
    }

    .permit-label {
      font-size: 10px;
      color: #a0aab4;
      margin-bottom: 4px;
      font-weight: 500;
    }

    .permit-value {
      font-size: 13px;
      font-weight: 800;
      color: #1a4f8a;
    }

    .permit-divider {
      width: 1px;
      height: 36px;
      background: #edf0f5;
      margin: 0 16px;
    }

    /* ── Footnote ── */
    .kyc-footnote {
      text-align: center;
      font-size: 12px;
      color: #7a8fa8;
      margin-top: 20px;
      font-weight: 500;
    }

    /* ── Animations ── */
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(1.4); }
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes bounceIn {
      0% { transform: scale(0.3); opacity: 0; }
      50% { transform: scale(1.1); opacity: 1; }
      70% { transform: scale(0.95); }
      100% { transform: scale(1); }
    }

    /* ── Mobile ── */
    @media (max-width: 480px) {
      .kyc-card { padding: 28px 20px; }
      .kyc-header h1 { font-size: 22px; }
      .trust-row { gap: 12px; }
      .trust-item { font-size: 11px; }
    }
  `]
})
export class KycComponent {
  nationalId = '';
  currentStep = 1;
  verificationResult: 'success' | 'fail' | null = null;
  loadingProgress = 0;

  get maskedId() {
    if (!this.nationalId) return '—';
    return this.nationalId.slice(0, 3) + '****' + this.nationalId.slice(-2);
  }

  constructor(public kyc: KycService, private auth: AuthService, private router: Router) { }

  startVerification() {
    this.currentStep = 2;
    this.loadingProgress = 0;
    this.animateLoading();
  }

  private animateLoading() {
    this.loadingProgress = 0;

    // Step 1: 30% after 0.8s
    setTimeout(() => { this.loadingProgress = 30; }, 800);

    // Step 2: 65% after 1.6s
    setTimeout(() => { this.loadingProgress = 65; }, 1600);

    // Step 3: 90% after 2.3s
    setTimeout(() => { this.loadingProgress = 90; }, 2300);

    // Step 4: 100% after 2.7s
    setTimeout(() => { this.loadingProgress = 100; }, 2700);

    // Final Step: Show Result after 3.0s total
    setTimeout(() => {
      try {
        this.showResult();
      } catch (e) {
        console.error('KYC Error:', e);
        this.currentStep = 3;
        this.verificationResult = 'fail';
      }
    }, 3000);
  }

  private showResult() {
    // Demo simulation: IDs starting with '1' succeed, others fail
    const succeeds = this.nationalId.startsWith('1') || this.nationalId.length === 10;
    this.verificationResult = succeeds ? 'success' : 'fail';
    this.currentStep = 3;

    if (succeeds) {
      this.kyc.submitKyc('demo', 'demo', 'demo');

      // Auto-navigate to dashboard after 3 seconds of showing success
      setTimeout(() => {
        if (this.currentStep === 3 && this.verificationResult === 'success') {
          this.goDashboard();
        }
      }, 3000);
    }
  }

  retry() {
    this.currentStep = 1;
    this.nationalId = '';
    this.verificationResult = null;
    this.loadingProgress = 0;
  }

  goDashboard() {
    if (this.auth.currentUser?.userType === 'developer') {
      this.router.navigate(['/developer']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }
}
