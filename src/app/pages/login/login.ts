import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-page">
      <div class="auth-bg-shapes">
        <div class="auth-shape auth-shape-1"></div>
        <div class="auth-shape auth-shape-2"></div>
        <div class="auth-shape auth-shape-3"></div>
      </div>

      <div class="auth-container">
        <!-- Left Branding Panel -->
        <div class="auth-brand">
          <div class="auth-brand-content">
            <div class="auth-brand-logo">
              <img src="assets/images/logo.png" alt="بنيان" style="width:60px;height:60px;object-fit:contain">
            </div>
            <h1 class="auth-brand-title">بنيان</h1>
            <p class="auth-brand-subtitle">منصة الاستثمار العقاري الموثوقة</p>
            <div class="auth-brand-features">
              <div class="auth-feature">
                <div class="auth-feature-icon">🛡️</div>
                <div>
                  <div class="auth-feature-title">استثمار آمن ومرخص</div>
                  <div class="auth-feature-desc">مرخصة من هيئة السوق المالية</div>
                </div>
              </div>
              <div class="auth-feature">
                <div class="auth-feature-icon">📊</div>
                <div>
                  <div class="auth-feature-title">عوائد تنافسية</div>
                  <div class="auth-feature-desc">عوائد سنوية تصل إلى 20%</div>
                </div>
              </div>
              <div class="auth-feature">
                <div class="auth-feature-icon">🏗️</div>
                <div>
                  <div class="auth-feature-title">مشاريع مدققة</div>
                  <div class="auth-feature-desc">تدقيق مالي وقانوني صارم</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Form Panel -->
        <div class="auth-form-panel">
          <div class="auth-form-inner">
            <div class="auth-form-header">
              <h2>تسجيل الدخول</h2>
              <p>أدخل بياناتك للوصول إلى حسابك الاستثماري</p>
            </div>

            <div class="auth-alert auth-alert-error" *ngIf="errorMsg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
              {{errorMsg}}
            </div>

            <form [formGroup]="form" (ngSubmit)="onSubmit()" class="auth-form">
              <div class="auth-field">
                <label class="auth-label">البريد الإلكتروني أو رقم الجوال</label>
                <div class="auth-input-wrap">
                  <svg class="auth-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <input type="text" formControlName="emailOrPhone" class="auth-input" placeholder="example&#64;email.com أو 05XXXXXXXX">
                </div>
                <div class="auth-error" *ngIf="form.get('emailOrPhone')?.touched && form.get('emailOrPhone')?.invalid">
                  هذا الحقل مطلوب
                </div>
              </div>

              <div class="auth-field">
                <div style="display:flex;justify-content:space-between;align-items:center">
                  <label class="auth-label">كلمة المرور</label>
                  <a routerLink="/forgot-password" class="auth-link-small">نسيت كلمة المرور؟</a>
                </div>
                <div class="auth-input-wrap">
                  <svg class="auth-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                  <input [type]="showPassword ? 'text' : 'password'" formControlName="password" class="auth-input" placeholder="أدخل كلمة المرور">
                  <button type="button" class="auth-toggle-pw" (click)="showPassword = !showPassword">
                    {{showPassword ? '🙈' : '👁️'}}
                  </button>
                </div>
                <div class="auth-error" *ngIf="form.get('password')?.touched && form.get('password')?.invalid">
                  كلمة المرور مطلوبة
                </div>
              </div>

              <div class="auth-remember">
                <label class="auth-checkbox-wrap">
                  <input type="checkbox" formControlName="remember">
                  <span class="auth-checkbox-label">تذكرني</span>
                </label>
              </div>

              <button type="submit" class="auth-btn auth-btn-primary" [disabled]="loading">
                <span *ngIf="!loading">تسجيل الدخول</span>
                <span *ngIf="loading" class="auth-spinner"></span>
              </button>
            </form>

            <div class="auth-divider">
              <span>أو</span>
            </div>

            <div class="auth-alt-actions">
              <p>ليس لديك حساب؟ <a routerLink="/register" class="auth-link">إنشاء حساب جديد</a></p>
            </div>

            <div class="auth-demo-box" style="margin-top: 24px; padding: 16px; background: #f0f7ff; border-radius: 12px; border: 1px dashed #1a4f8a;">
              <p style="font-size: 13px; font-weight: 700; color: #1a4f8a; margin-bottom: 12px; text-align: center;">جرب النسخة التجريبية (ديمو)</p>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <button type="button" class="btn btn-ghost btn-sm" (click)="loginAsDemo('investor')" style="font-size: 11px; background: white;">👤 مستثمر</button>
                <button type="button" class="btn btn-ghost btn-sm" (click)="loginAsDemo('developer')" style="font-size: 11px; background: white;">🏗️ مطور عقاري</button>
              </div>
              <p style="font-size: 10px; color: #6b82a0; margin-top: 8px; text-align: center;">أو استخدم: <b>admin</b> / <b>admin</b></p>
            </div>

            <div class="auth-compliance">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              يتم حفظ البيانات وفق أعلى معايير الأمان والحوكمة المالية
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class LoginComponent {
  form: FormGroup;
  loading = false;
  errorMsg = '';
  showPassword = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    if (this.auth.isLoggedIn) {
      this.redirectByRole();
    }
    this.form = this.fb.group({
      emailOrPhone: ['', Validators.required],
      password: ['', Validators.required],
      remember: [false]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMsg = '';

    setTimeout(() => {
      const { emailOrPhone, password } = this.form.value;
      const result = this.auth.login(emailOrPhone, password);

      if (result.success) {
        this.redirectByRole();
      } else {
        this.errorMsg = result.message;
      }
      this.loading = false;
    }, 800);
  }

  loginAsDemo(role: 'investor' | 'developer'): void {
    const email = role === 'investor' ? 'investor@bnyan.com' : 'developer@bnyan.com';
    this.form.patchValue({
      emailOrPhone: email,
      password: 'password'
    });
    this.onSubmit();
  }

  private redirectByRole(): void {
    const user = this.auth.currentUser;
    if (!user) return;

    if (!user.onboardingDone) {
      this.router.navigate(['/onboarding']);
    } else if (user.kycStatus !== 'approved') {
      this.router.navigate(['/kyc']);
    } else if (user.userType === 'developer') {
      this.router.navigate(['/developer']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }
}
