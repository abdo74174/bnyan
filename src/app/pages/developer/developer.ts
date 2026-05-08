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
          <div class="dev-info-text">
            <div class="dev-name">شركة الإعمار للتطوير العقاري</div>
            <div class="dev-meta">مطور عقاري معتمد · خبرة 15 عاماً · الرياض، المملكة العربية السعودية</div>
          </div>
        </div>
        <div class="dev-kpis">
          <div class="dev-kpi">
            <div class="dev-kpi-val">3,200,000</div>
            <div class="dev-kpi-lbl">إجمالي التمويل (ر.س)</div>
          </div>
          <div class="dev-kpi">
            <div class="dev-kpi-val">147</div>
            <div class="dev-kpi-lbl">عدد المستثمرين</div>
          </div>
          <div class="dev-kpi">
            <div class="dev-kpi-val">24</div>
            <div class="dev-kpi-lbl">مشاريع منجزة</div>
          </div>
          <div class="dev-kpi">
            <div class="dev-kpi-val">4.8 / 5</div>
            <div class="dev-kpi-lbl">تقييم المنصة</div>
          </div>
        </div>
      </div>
    </div>

    <section class="section-sm">
      <div class="container">
        <div class="grid-dashboard">
          <!-- Main Column -->
          <div class="dev-main-col">
            <!-- Active Project Stats -->
            <div class="card premium-card">
              <div class="card-header-border">
                <span class="icon">📊</span>
                <span class="text">المشروع الحالي — أبراج الرقي التجاري</span>
              </div>
              <div class="card-body">
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
            </div>

            <!-- Post Update Form -->
            <div class="card premium-card">
              <div class="card-header-border">
                <span class="icon">📣</span>
                <span class="text">إضافة تحديث للمستثمرين</span>
              </div>
              <div class="card-body">
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
          </div>

          <!-- Side Column -->
          <div class="dev-side-col">
            <!-- Investors Table -->
            <div class="card premium-card no-padding overflow-hidden">
              <div class="card-header-simple">
                <span class="icon">👥</span>
                <span class="text">أحدث المستثمرين</span>
              </div>
              <div class="table-responsive">
                <table class="modern-table">
                  <thead>
                    <tr>
                      <th class="text-right">المستثمر</th>
                      <th class="text-center">المبلغ</th>
                      <th class="text-left">التاريخ</th>
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
                        <td class="amount text-center">{{inv.amount | number}} ر.س</td>
                        <td class="date text-left">{{inv.date}}</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Developer Info -->
            <div class="card premium-card">
              <div class="card-header-border">
                <span class="icon">🏢</span>
                <span class="text">معلومات الشركة</span>
              </div>
              <div class="card-body">
                <div class="info-list-compact">
                  <div class="info-row">
                    <span class="info-label">تأسست</span>
                    <span class="info-value">2010</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">التخصص</span>
                    <span class="info-value">تطوير تجاري وسكني</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">المدن</span>
                    <span class="info-value">الرياض، جدة، الدمام</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">المشاريع المنتهية</span>
                    <span class="info-value">24 مشروعاً</span>
                  </div>
                  <div class="info-row">
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
                  <button class="btn btn-ghost btn-sm">تعديل الملف</button>
                  <button class="btn btn-ghost btn-sm">تقارير المشاريع</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; background: #f4f7f9; min-height: 100vh; }
    
    .grid-dashboard {
      display: grid;
      grid-template-columns: 1fr 400px;
      gap: 30px;
      align-items: start;
    }

    .premium-card {
      background: white;
      border-radius: 16px;
      border: 1px solid rgba(0, 0, 0, 0.05);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
      margin-bottom: 30px;
      overflow: hidden;
    }
    
    .card-header-border {
      padding: 16px 24px;
      border-bottom: 1px solid #f0f0f0;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .card-header-border .text {
      font-size: 16px;
      font-weight: 800;
      color: var(--text1);
    }

    .card-header-simple {
      padding: 16px 24px;
      background: #fcfcfc;
      border-bottom: 1px solid #f0f0f0;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .card-header-simple .text {
      font-size: 16px;
      font-weight: 800;
      color: var(--text1);
    }

    .card-body { padding: 30px; }
    .no-padding { padding: 0 !important; }
    .overflow-hidden { overflow: hidden; }

    /* KPI Header */
    .dev-header {
      background: white;
      padding: 40px 0;
      border-bottom: 1px solid #eee;
      margin-bottom: 40px;
    }
    
    .dev-logo-wrap {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 30px;
    }
    
    .dev-logo-box {
      width: 80px;
      height: 80px;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid #eee;
      background: #f8fafc;
    }
    
    .dev-logo-box img { width: 100%; height: 100%; object-fit: contain; }
    
    .dev-name { font-size: 24px; font-weight: 900; color: var(--primary); margin-bottom: 4px; }
    .dev-meta { font-size: 14px; color: var(--text3); }
    
    .dev-kpis {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
    }
    
    .dev-kpi {
      padding: 20px;
      background: #f8fafc;
      border-radius: 16px;
      border: 1px solid #f0f0f0;
      text-align: center;
    }
    
    .dev-kpi-val { font-size: 24px; font-weight: 900; color: var(--primary); margin-bottom: 5px; }
    .dev-kpi-lbl { font-size: 13px; color: var(--text3); font-weight: 600; }

    /* Stats Grid */
    .stats-mini-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-bottom: 30px;
    }
    
    .stat-mini-card {
      background: #f8fafc;
      border-radius: 12px;
      padding: 20px 10px;
      text-align: center;
      border: 1px solid #f0f0f0;
    }
    
    .stat-highlight {
      background: rgba(46, 204, 113, 0.05);
      border-color: rgba(46, 204, 113, 0.2);
    }
    
    .stat-mini-val { font-size: 22px; font-weight: 900; color: var(--primary); margin-bottom: 4px; }
    .stat-highlight .stat-mini-val { color: #27ae60; }
    .stat-mini-lbl { font-size: 12px; color: var(--text3); font-weight: 600; }

    /* Progress Section */
    .progress-section { margin-top: 20px; }
    .progress-labels { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 14px; }
    .prog-bar-container { height: 12px; background: #eee; border-radius: 6px; overflow: hidden; margin-bottom: 15px; }
    .prog-fill { height: 100%; background: linear-gradient(90deg, var(--primary), var(--accent)); border-radius: 6px; }
    .progress-footer { display: flex; justify-content: space-between; font-size: 13px; color: var(--text3); }

    /* Tables */
    .modern-table { width: 100%; border-collapse: collapse; }
    .modern-table th {
      padding: 18px 24px;
      background: #fcfcfc;
      font-size: 12px;
      font-weight: 700;
      color: var(--text3);
      text-transform: uppercase;
      border-bottom: 1px solid #f0f0f0;
    }
    .modern-table td { padding: 18px 24px; border-bottom: 1px solid #f9f9f9; font-size: 14px; vertical-align: middle; }
    
    .text-right { text-align: right !important; }
    .text-left { text-align: left !important; }
    .text-center { text-align: center !important; }

    .user-cell { display: flex; align-items: center; gap: 12px; }
    .avatar-sm {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 13px;
      font-weight: 800;
    }
    .amount { font-weight: 800; color: var(--text1); }
    .date { color: var(--text3); }

    /* Info List Compact */
    .info-list-compact { display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px; }
    .info-row { 
      display: flex; 
      justify-content: space-between; 
      align-items: center; 
      padding-bottom: 12px;
      border-bottom: 1px solid #f8fafc;
    }
    .info-row:last-child { border-bottom: none; }
    .info-label { font-size: 14px; color: var(--text3); font-weight: 600; }
    .info-value { font-size: 14px; font-weight: 800; color: var(--text1); text-align: left; }
    .info-value.highlight { color: #27ae60; background: #e8f8f0; padding: 2px 8px; border-radius: 6px; }

    /* Forms */
    .form-grid { display: flex; flex-direction: column; gap: 24px; }
    .field-lbl { display: block; margin-bottom: 10px; font-size: 14px; font-weight: 700; color: var(--text2); }
    .field-input, .field-select {
      width: 100%;
      padding: 12px 16px;
      border-radius: 12px;
      border: 1.5px solid #eef2f6;
      background: #fcfdfe;
      font-family: inherit;
      font-size: 14px;
      color: var(--text1);
      transition: all 0.2s;
    }
    .field-input:focus, .field-select:focus {
      outline: none;
      border-color: var(--primary);
      background: white;
      box-shadow: 0 0 0 4px rgba(26, 79, 138, 0.05);
    }
    textarea.field-input { line-height: 1.6; resize: vertical; }

    .upload-dropzone {
      border: 2px dashed #eef2f6;
      border-radius: 16px;
      padding: 40px 20px;
      text-align: center;
      background: #fcfdfe;
      cursor: pointer;
      transition: all 0.2s;
      color: var(--text3);
    }
    .upload-dropzone:hover { border-color: var(--primary); background: white; color: var(--primary); }
    .upload-dropzone .icon { display: block; font-size: 32px; margin-bottom: 12px; opacity: 0.5; }

    .certifications-box {
      background: #f8fafc;
      border-radius: 12px;
      padding: 16px;
      border: 1px solid #f0f0f0;
      margin-bottom: 24px;
    }
    .box-title { font-size: 12px; font-weight: 800; color: var(--text3); margin-bottom: 12px; text-transform: uppercase; }
    .badge-row { display: flex; gap: 8px; flex-wrap: wrap; }
    
    .action-row { display: flex; gap: 12px; }
    .btn-sm { padding: 10px 15px; font-size: 13px; flex: 1; }

    @media (max-width: 1100px) {
      .grid-dashboard { grid-template-columns: 1fr; }
    }
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
