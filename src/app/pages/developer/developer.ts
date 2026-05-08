import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-developer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Dev Header -->
    <div class="dev-header">
      <div class="container">
        <div class="dev-logo-wrap">
          <div class="dev-logo-box"><img src="assets/images/OIP.jpeg"></div>
          <div>
            <div class="dev-name">شركة الإعمار للتطوير العقاري</div>
            <div class="dev-meta">مطور عقاري معتمد · خبرة 15 عاماً · الرياض، المملكة العربية السعودية</div>
          </div>
        </div>
        <div class="dev-kpis">
          <div class="dev-kpi"><div class="dev-kpi-val">3,200,000</div><div class="dev-kpi-lbl">إجمالي التمويل (ر.س)</div></div>
          <div class="dev-kpi"><div class="dev-kpi-val">147</div><div class="dev-kpi-lbl">عدد المستثمرين</div></div>
          <div class="dev-kpi"><div class="dev-kpi-val">24</div><div class="dev-kpi-lbl">مشاريع منجزة</div></div>
          <div class="dev-kpi"><div class="dev-kpi-val">4.8 / 5</div><div class="dev-kpi-lbl">تقييم المنصة</div></div>
        </div>
      </div>
    </div>

    <section class="section-sm">
      <div class="container">
    <section class="section-sm">
      <div class="container">
        <div class="grid-2">
          <!-- Right Column (Desktop) / Top Column (Mobile) -->
          <div class="dev-main-col">
            <!-- Active Project Stats -->
            <div class="card premium-card">
              <div class="card-title">📊 المشروع الحالي — أبراج الرقي التجاري</div>
              <div class="stats-mini-grid">
                <div class="stat-mini-card">
                  <div class="stat-mini-val">3,000,000</div>
                  <div class="stat-mini-lbl">حجم التمويل (ر.س)</div>
                </div>
                <div class="stat-mini-card stat-highlight">
                  <div class="stat-mini-val">73%</div>
                  <div class="stat-mini-lbl">نسبة التمويل</div>
                </div>
                <div class="stat-mini-card">
                  <div class="stat-mini-val">147</div>
                  <div class="stat-mini-lbl">مستثمر</div>
                </div>
              </div>
              <div class="progress-section">
                <div class="progress-labels">
                  <span class="lbl-main">التمويل المُجمَّع</span>
                  <span class="lbl-vals"><strong>2,190,000</strong> / 3,000,000 ر.س</span>
                </div>
                <div class="prog-bar-container">
                  <div class="prog-bar"><div class="prog-fill" style="width:73%"></div></div>
                </div>
                <div class="progress-footer">
                  <span>متبقي: <strong>810,000 ر.س</strong></span>
                  <span>ينتهي التمويل: <strong>30 يونيو 2025</strong></span>
                </div>
              </div>
            </div>

            <!-- Post Update Form -->
            <div class="card premium-card">
              <div class="card-title">📣 إضافة تحديث للمستثمرين</div>
              <div class="form-grid">
                <div class="form-group">
                  <label class="field-lbl">عنوان التحديث</label>
                  <input type="text" class="field-input" placeholder="مثال: اكتمال الطابق العاشر">
                </div>
                <div class="form-group">
                  <label class="field-lbl">تفاصيل التحديث</label>
                  <textarea class="field-input" rows="4" placeholder="اكتب تفاصيل التحديث للمستثمرين..."></textarea>
                </div>
                <div class="form-group">
                  <label class="field-lbl">المرحلة</label>
                  <select class="field-select">
                    <option>إعداد الموقع</option>
                    <option selected>الهيكل الإنشائي</option>
                    <option>التشطيبات</option>
                    <option>التسليم</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="field-lbl">إرفاق صور (اختياري)</label>
                  <div class="upload-dropzone">
                    <span class="icon">📎</span>
                    <span>اسحب الصور هنا أو انقر للاختيار</span>
                  </div>
                </div>
                <button class="btn btn-primary btn-lg" (click)="publishUpdate()" [class.success]="publishSuccess">
                  {{publishSuccess ? '✓ تم إرسال التحديث للمستثمرين' : 'نشر التحديث ←'}}
                </button>
              </div>
            </div>
          </div>

          <!-- Side Column -->
          <div class="dev-side-col">
            <!-- Investors Table -->
            <div class="card premium-card no-padding">
              <div class="card-header-simple">
                <span class="icon">👥</span>
                <span class="text">أحدث المستثمرين</span>
              </div>
              <div class="table-responsive">
                <table class="modern-table">
                  <thead>
                    <tr>
                      <th>المستثمر</th>
                      <th>المبلغ</th>
                      <th>التاريخ</th>
                    </tr>
                  </thead>
                  <tbody>
                    @for (inv of latestInvestors; track inv.name) {
                      <tr>
                        <td>
                          <div class="user-cell">
                            <div class="avatar-sm" [style.background]="inv.avatarBg">{{inv.avatar}}</div>
                            <span class="name">{{inv.name}}</span>
                          </div>
                        </td>
                        <td class="amount">{{inv.amount | number}} ر.س</td>
                        <td class="date">{{inv.date}}</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Developer Info -->
            <div class="card premium-card">
              <div class="card-title">🏢 معلومات الشركة</div>
              <div class="info-list">
                <div class="info-item">
                  <span class="info-label">تأسست</span>
                  <span class="info-value">2010</span>
                </div>
                <div class="info-item">
                  <span class="info-label">التخصص</span>
                  <span class="info-value">تطوير تجاري وسكني</span>
                </div>
                <div class="info-item">
                  <span class="info-label">المدن</span>
                  <span class="info-value">الرياض، جدة، الدمام</span>
                </div>
                <div class="info-item">
                  <span class="info-label">المشاريع المنتهية</span>
                  <span class="info-value">24 مشروعاً</span>
                </div>
                <div class="info-item">
                  <span class="info-label">متوسط التأخر</span>
                  <span class="info-value highlight">0 أيام</span>
                </div>
              </div>

              <div class="certifications-box">
                <div class="box-title">الشهادات والتراخيص</div>
                <div class="badge-row">
                  <span class="badge badge-green">✓ مرخص هيئة الاستثمار</span>
                  <span class="badge badge-blue">✓ عضو اتحاد المطورين</span>
                </div>
              </div>

              <div class="action-row">
                <button class="btn btn-ghost">تعديل الملف</button>
                <button class="btn btn-ghost">تقارير المشاريع</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class DeveloperComponent {
  publishSuccess = false;

  latestInvestors = [
    { name: 'أحمد العلي', avatar: 'أح', avatarBg: 'var(--primary)', amount: 50000, date: '15 أبريل' },
    { name: 'سمر الغامدي', avatar: 'سم', avatarBg: 'var(--accent-dark)', amount: 100000, date: '12 أبريل' },
    { name: 'فهد المنصور', avatar: 'فه', avatarBg: 'var(--gold)', amount: 75000, date: '10 أبريل' },
    { name: 'نورة القحطاني', avatar: 'نو', avatarBg: '#c0392b', amount: 25000, date: '08 أبريل' },
    { name: 'كاملة السبيعي', avatar: 'كا', avatarBg: '#8e44ad', amount: 150000, date: '05 أبريل' }
  ];

  publishUpdate() {
    if (this.publishSuccess) return;
    this.publishSuccess = true;
    setTimeout(() => {
      this.publishSuccess = false;
    }, 3000);
  }
}
