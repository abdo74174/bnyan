import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="onboarding-page">
      <div class="onboarding-container">
        <div class="onboarding-card">
          <div class="onboarding-header">
            <div class="onboarding-logo">
              <img src="assets/images/logo.png" alt="Logo">
            </div>
            <h1>أهلاً بك في بنيان، {{auth.currentUser?.fullName}}</h1>
            <p>أنت على بعد خطوات بسيطة من بدء استثمارك العقاري الأول</p>
          </div>

          <div class="onboarding-steps">
            <div class="onboarding-step active">
              <div class="step-num">1</div>
              <div class="step-info">
                <h3>إنشاء الحساب</h3>
                <p>تم إكمال هذه الخطوة بنجاح</p>
              </div>
              <div class="step-status">✓</div>
            </div>

            <div class="onboarding-step">
              <div class="step-num">2</div>
              <div class="step-info">
                <h3>التحقق من الهوية (KYC)</h3>
                <p>مطلوب للامتثال للوائح الاستثمار في المملكة</p>
              </div>
            </div>

            <div class="onboarding-step">
              <div class="step-num">3</div>
              <div class="step-info">
                <h3>ابدأ الاستثمار</h3>
                <p>استكشف المشاريع المتاحة وابدأ في جني الأرباح</p>
              </div>
            </div>
          </div>

          <div class="onboarding-footer">
            <button (click)="startKyc()" class="btn btn-primary btn-lg" style="width: 100%;">
              ابدأ التحقق من الهوية
            </button>
            <p class="compliance-note">يتم التحقق آلياً عبر نفاذ الوطني لضمان أقصى درجات الأمان</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class OnboardingComponent {
  constructor(public auth: AuthService, private router: Router) {}

  startKyc() {
    this.auth.updateUser({ onboardingDone: true });
    this.router.navigate(['/kyc']);
  }
}
