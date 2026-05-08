import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-page">
      <div class="auth-bg-shapes">
        <div class="auth-shape auth-shape-1"></div>
        <div class="auth-shape auth-shape-2"></div>
      </div>

      <div class="auth-container">
        <div class="auth-form-panel" style="width: 100%; max-width: 500px; margin: 0 auto; border-radius: var(--r-xl);">
          <div class="auth-form-inner">
            
            <!-- Step 1: Email Input -->
            <ng-container *ngIf="step === 1">
              <div class="auth-form-header">
                <div class="auth-icon-circle">🔑</div>
                <h2>نسيت كلمة المرور؟</h2>
                <p>أدخل بريدك الإلكتروني وسنرسل لك رمزاً لإعادة تعيين كلمة المرور</p>
              </div>

              <form [formGroup]="emailForm" (ngSubmit)="sendOtp()" class="auth-form">
                <div class="auth-field">
                  <label class="auth-label">البريد الإلكتروني</label>
                  <input type="email" formControlName="email" class="auth-input" placeholder="example@mail.com">
                </div>
                <button type="submit" class="auth-btn auth-btn-primary" [disabled]="loading">
                  إرسال الرمز
                </button>
              </form>
            </ng-container>

            <!-- Step 2: OTP Verification -->
            <ng-container *ngIf="step === 2">
              <div class="auth-form-header">
                <div class="auth-icon-circle">📱</div>
                <h2>رمز التحقق</h2>
                <p>تم إرسال رمز التحقق إلى {{emailForm.value.email}}</p>
              </div>

              <div class="auth-otp-grid">
                <input type="text" maxlength="1" class="otp-input" value="4">
                <input type="text" maxlength="1" class="otp-input" value="1">
                <input type="text" maxlength="1" class="otp-input" value="8">
                <input type="text" maxlength="1" class="otp-input" value="2">
              </div>

              <button (click)="verifyOtp()" class="auth-btn auth-btn-primary" style="margin-top: 24px;">
                تحقق من الرمز
              </button>
              <p style="text-align:center; font-size: 13px; color: var(--text3); margin-top: 16px;">
                لم يصلك الرمز؟ <a href="javascript:void(0)" class="auth-link">إعادة الإرسال</a>
              </p>
            </ng-container>

            <!-- Step 3: New Password -->
            <ng-container *ngIf="step === 3">
              <div class="auth-form-header">
                <div class="auth-icon-circle">🔒</div>
                <h2>كلمة مرور جديدة</h2>
                <p>قم بتعيين كلمة مرور قوية لحماية حسابك</p>
              </div>

              <form [formGroup]="resetForm" (ngSubmit)="resetPassword()" class="auth-form">
                <div class="auth-field">
                  <label class="auth-label">كلمة المرور الجديدة</label>
                  <input type="password" formControlName="password" class="auth-input" placeholder="••••••••">
                </div>
                <div class="auth-field">
                  <label class="auth-label">تأكيد كلمة المرور</label>
                  <input type="password" formControlName="confirmPassword" class="auth-input" placeholder="••••••••">
                </div>
                <button type="submit" class="auth-btn auth-btn-primary">
                  حفظ كلمة المرور
                </button>
              </form>
            </ng-container>

            <!-- Step 4: Success -->
            <ng-container *ngIf="step === 4">
              <div class="auth-form-header" style="text-align: center;">
                <div class="auth-icon-circle" style="background: var(--accent); color: white;">✓</div>
                <h2>تم التغيير بنجاح</h2>
                <p>يمكنك الآن تسجيل الدخول باستخدام كلمة المرور الجديدة</p>
                <button routerLink="/login" class="auth-btn auth-btn-primary" style="margin-top: 24px; width: 100%;">
                  العودة لتسجيل الدخول
                </button>
              </div>
            </ng-container>

            <div class="auth-alt-actions" *ngIf="step < 4">
              <a routerLink="/login" class="auth-link">العودة لتسجيل الدخول</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class ForgotPasswordComponent {
  step = 1;
  loading = false;
  emailForm: FormGroup;
  resetForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    });
  }

  sendOtp() {
    if (this.emailForm.invalid) return;
    this.loading = true;
    setTimeout(() => {
      this.step = 2;
      this.loading = false;
    }, 1000);
  }

  verifyOtp() {
    this.step = 3;
  }

  resetPassword() {
    if (this.resetForm.invalid) return;
    this.step = 4;
  }
}
