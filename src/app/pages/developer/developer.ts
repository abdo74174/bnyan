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
        <div class="grid-2">
          <!-- Main Column -->
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
  `,
  styles: [`
    :host { display: block; }
    
    .premium-card {
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(26, 79, 138, 0.1);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
      transition: transform 0.3s ease;
      margin-bottom: 24px;
    }
    
    .no-padding { padding: 0 !important; }
    
    .stats-mini-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-bottom: 24px;
    }
    
    .stat-mini-card {
      background: #f8fafc;
      border-radius: 12px;
      padding: 16px 12px;
      text-align: center;
      border: 1px solid var(--border);
    }
    
    .stat-highlight {
      background: rgba(46, 204, 113, 0.05);
      border-color: rgba(46, 204, 113, 0.2);
    }
    
    .stat-highlight .stat-mini-val { color: var(--accent-dark); }
    
    .stat-mini-val {
      font-size: 20px;
      font-weight: 800;
      color: var(--primary);
      margin-bottom: 4px;
    }
    
    .stat-mini-lbl {
      font-size: 11px;
      color: var(--text3);
      font-weight: 600;
    }
    
    .progress-section { margin-bottom: 8px; }
    
    .progress-labels {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      margin-bottom: 10px;
    }
    
    .lbl-main { color: var(--text2); font-weight: 700; }
    .lbl-vals { color: var(--text3); }
    .lbl-vals strong { color: var(--text1); }
    
    .prog-bar-container {
      height: 10px;
      background: #eee;
      border-radius: 5px;
      overflow: hidden;
      margin-bottom: 12px;
    }
    
    .prog-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--primary), var(--accent));
      border-radius: 5px;
    }
    
    .progress-footer {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: var(--text3);
    }
    
    .form-grid {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .upload-dropzone {
      border: 2px dashed var(--border);
      border-radius: var(--r);
      padding: 24px;
      text-align: center;
      color: var(--text3);
      font-size: 14px;
      cursor: pointer;
      background: #f8fafc;
      transition: all 0.2s;
    }
    
    .upload-dropzone:hover {
      border-color: var(--primary);
      background: white;
    }
    
    .upload-dropzone .icon {
      display: block;
      font-size: 24px;
      margin-bottom: 8px;
    }
    
    .btn-lg {
      padding: 14px;
      font-size: 16px;
      font-weight: 800;
    }
    
    .btn-primary.success {
      background: var(--accent-dark) !important;
      cursor: default;
    }
    
    .card-header-simple {
      padding: 16px 20px;
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .card-header-simple .text {
      font-size: 16px;
      font-weight: 800;
      color: var(--text1);
    }
    
    .modern-table {
      width: 100%;
      border-collapse: collapse;
    }
    
    .modern-table th {
      text-align: right;
      padding: 12px 20px;
      font-size: 12px;
      text-transform: uppercase;
      color: var(--text3);
      font-weight: 700;
      background: #fcfcfc;
    }
    
    .modern-table td {
      padding: 14px 20px;
      border-bottom: 1px solid #f0f0f0;
      font-size: 14px;
    }
    
    .user-cell {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .avatar-sm {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 12px;
      font-weight: 800;
    }
    
    .amount { font-weight: 700; color: var(--text1); }
    .date { color: var(--text3); font-size: 12px; }
    
    .info-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 20px;
    }
    
    .info-item {
      display: grid;
      grid-template-columns: 120px 1fr;
      align-items: center;
      gap: 10px;
    }
    
    .info-label {
      font-size: 13px;
      color: var(--text3);
    }
    
    .info-value {
      font-size: 14px;
      font-weight: 700;
      color: var(--text1);
    }
    
    .info-value.highlight { color: var(--accent-dark); }
    
    .certifications-box {
      background: #f8fafc;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 20px;
      border: 1px solid var(--border);
    }
    
    .box-title {
      font-size: 12px;
      font-weight: 800;
      color: var(--text2);
      margin-bottom: 10px;
    }
    
    .badge-row {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    
    .action-row {
      display: flex;
      gap: 10px;
    }
    
    .action-row .btn { flex: 1; }
    
    @media (max-width: 900px) {
      .grid-2 { grid-template-columns: 1fr; }
      .dev-main-col { order: 2; }
      .dev-side-col { order: 1; }
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
