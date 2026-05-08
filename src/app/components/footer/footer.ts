import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <div class="footer-logo">
              <div class="footer-logo-ico">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f3360" stroke-width="2.5">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>
              </div>
              <div class="footer-logo-txt">بنيان</div>
            </div>
            <p class="footer-desc">منصة استثمار عقاري تربط المستثمرين بمشاريع تطوير عقاري مختارة بعناية وشفافية كاملة.</p>
          </div>
          <div>
            <div class="footer-col-ttl">المنصة</div>
            <div class="footer-links">
              <a routerLink="/projects">المشاريع</a>
              <a href="#how-section">كيف يعمل</a>
              <a routerLink="/developer">للمطورين</a>
            </div>
          </div>
          <div>
            <div class="footer-col-ttl">المستثمر</div>
            <div class="footer-links">
              <a routerLink="/dashboard">لوحة التحكم</a>
              <a href="#faq-section">سؤال وجواب</a>
              <a>الدعم</a>
            </div>
          </div>
          <div>
            <div class="footer-col-ttl">قانوني</div>
            <div class="footer-links">
              <a>شروط الاستخدام</a>
              <a>الخصوصية</a>
              <a>الإفصاح والمخاطر</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <div class="footer-copy">© 2025 بنيان. جميع الحقوق محفوظة.</div>
          <div class="footer-legal">
            <a>الشروط</a>
            <a>الخصوصية</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class FooterComponent {}
