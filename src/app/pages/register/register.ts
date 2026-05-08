import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
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
            <h1 class="auth-brand-title">انضم إلى بنيان</h1>
            <p class="auth-brand-subtitle">ابدأ رحلتك في الاستثمار العقاري الرقمي اليوم</p>
            <div class="auth-brand-features">
              <div class="auth-feature">
                <div class="auth-feature-icon">👤</div>
                <div>
                  <div class="auth-feature-title">حساب موثق</div>
                  <div class="auth-feature-desc">ربط مباشر مع منصة أبشر للتحقق</div>
                </div>
              </div>
              <div class="auth-feature">
                <div class="auth-feature-icon">💎</div>
                <div>
                  <div class="auth-feature-title">فرص حصرية</div>
                  <div class="auth-feature-desc">وصول لأفضل المشاريع العقارية</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Form Panel -->
        <div class="auth-form-panel">
          <div class="auth-form-inner">
            <div class="auth-form-header">
              <h2>إنشاء حساب جديد</h2>
              <p>قم بتعبئة البيانات التالية لفتح حسابك الاستثماري</p>
            </div>

            <div class="auth-alert auth-alert-error" *ngIf="errorMsg">
              {{errorMsg}}
            </div>

            <form [formGroup]="form" (ngSubmit)="onSubmit()" class="auth-form">
              <div class="grid-2" style="gap: 12px; margin-bottom: 0;">
                <div class="auth-field">
                  <label class="auth-label">الاسم الكامل (كما في الهوية)</label>
                  <input type="text" formControlName="fullName" class="auth-input" placeholder="أدخل اسمك الثلاثي">
                  <div class="auth-error" *ngIf="isInvalid('fullName')">الاسم مطلوب</div>
                </div>
                <div class="auth-field">
                  <label class="auth-label">رقم الهوية / الإقامة</label>
                  <input type="text" formControlName="nationalId" class="auth-input" placeholder="1XXXXXXXXX">
                  <div class="auth-error" *ngIf="isInvalid('nationalId')">رقم هوية غير صحيح</div>
                </div>
              </div>

              <div class="grid-2" style="gap: 12px; margin-bottom: 0;">
                <div class="auth-field">
                  <label class="auth-label">رقم الجوال</label>
                  <input type="text" formControlName="phone" class="auth-input" placeholder="05XXXXXXXX">
                  <div class="auth-error" *ngIf="isInvalid('phone')">رقم جوال غير صحيح</div>
                </div>
                <div class="auth-field">
                  <label class="auth-label">البريد الإلكتروني</label>
                  <input type="email" formControlName="email" class="auth-input" placeholder="example@mail.com">
                  <div class="auth-error" *ngIf="isInvalid('email')">بريد إلكتروني غير صحيح</div>
                </div>
              </div>

              <div class="auth-field">
                <label class="auth-label">نوع الحساب</label>
                <div class="auth-role-toggle">
                  <button type="button" [class.active]="form.get('userType')?.value === 'investor'" (click)="form.patchValue({userType: 'investor'})">مستثمر فردي</button>
                  <button type="button" [class.active]="form.get('userType')?.value === 'developer'" (click)="form.patchValue({userType: 'developer'})">مطور عقاري</button>
                </div>
              </div>

              <div class="grid-2" style="gap: 12px; margin-bottom: 0;">
                <div class="auth-field">
                  <label class="auth-label">كلمة المرور</label>
                  <input type="password" formControlName="password" class="auth-input" placeholder="••••••••">
                  <div class="auth-error" *ngIf="isInvalid('password')">كلمة المرور ضعيفة</div>
                </div>
                <div class="auth-field">
                  <label class="auth-label">تأكيد كلمة المرور</label>
                  <input type="password" formControlName="confirmPassword" class="auth-input" placeholder="••••••••">
                  <div class="auth-error" *ngIf="isInvalid('confirmPassword')">كلمات المرور غير متطابقة</div>
                </div>
              </div>

              <div class="auth-remember" style="margin-top: 8px;">
                <label class="auth-checkbox-wrap">
                  <input type="checkbox" formControlName="terms">
                  <span class="auth-checkbox-label">أوافق على <a href="#" class="auth-link">الشروط والأحكام</a> و <a href="#" class="auth-link">سياسة الخصوصية</a></span>
                </label>
                <div class="auth-error" *ngIf="isInvalid('terms')">يجب الموافقة على الشروط</div>
              </div>

              <button type="submit" class="auth-btn auth-btn-primary" [disabled]="loading">
                <span *ngIf="!loading">إنشاء الحساب</span>
                <span *ngIf="loading" class="auth-spinner"></span>
              </button>
            </form>

            <div class="auth-alt-actions" style="margin-top: 20px;">
              <p>لديك حساب بالفعل؟ <a routerLink="/login" class="auth-link">تسجيل الدخول</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class RegisterComponent {
  form: FormGroup;
  loading = false;
  errorMsg = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      nationalId: ['', [Validators.required, Validators.pattern(/^[12]\d{9}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^05\d{8}$/)]],
      email: ['', [Validators.required, Validators.email]],
      userType: ['investor', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value ? { passwordMismatch: true } : null;
  }

  isInvalid(field: string): boolean {
    const control = this.form.get(field);
    if (field === 'confirmPassword') {
      return (control?.touched || this.form.touched) && (control?.invalid || this.form.hasError('passwordMismatch'));
    }
    return !!(control?.touched && control?.invalid);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMsg = '';

    setTimeout(() => {
      const result = this.auth.register(this.form.value);
      if (result.success) {
        this.router.navigate(['/kyc']);
      } else {
        this.errorMsg = result.message;
      }
      this.loading = false;
    }, 1000);
  }
}
