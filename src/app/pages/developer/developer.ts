import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-developer',
  standalone: true,
  imports: [RouterLink, CommonModule],
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
          <!-- Left Column -->
          <div>
            <!-- Active Project Stats -->
            <div class="card">
              <div class="card-title">📊 المشروع الحالي — أبراج الرقي التجاري</div>
              <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:18px">
                <div style="background:var(--bg);border-radius:8px;padding:12px;text-align:center"><div style="font-size:18px;font-weight:800;color:var(--primary)">3,000,000</div><div style="font-size:11px;color:var(--text3)">حجم التمويل (ر.س)</div></div>
                <div style="background:var(--bg);border-radius:8px;padding:12px;text-align:center"><div style="font-size:18px;font-weight:800;color:var(--accent-dark)">73%</div><div style="font-size:11px;color:var(--text3)">نسبة التمويل</div></div>
                <div style="background:var(--bg);border-radius:8px;padding:12px;text-align:center"><div style="font-size:18px;font-weight:800;color:var(--gold)">147</div><div style="font-size:11px;color:var(--text3)">مستثمر</div></div>
              </div>
              <div style="margin-bottom:10px">
                <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px"><span style="color:var(--text3)">التمويل المُجمَّع</span><strong>2,190,000 / 3,000,000 ر.س</strong></div>
                <div class="prog-bar"><div class="prog-fill" style="width:73%"></div></div>
              </div>
              <div style="font-size:12px;color:var(--text3)">متبقي: <strong style="color:var(--text1)">810,000 ر.س</strong> &nbsp;·&nbsp; ينتهي التمويل: 30 يونيو 2025</div>
            </div>

            <!-- Post Update Form -->
            <div class="card">
              <div class="card-title">📣 إضافة تحديث للمستثمرين</div>
              <div style="display:flex;flex-direction:column;gap:14px">
                <div>
                  <div class="field-lbl">عنوان التحديث</div>
                  <input type="text" class="field-input" placeholder="مثال: اكتمال الطابق العاشر">
                </div>
                <div>
                  <div class="field-lbl">تفاصيل التحديث</div>
                  <textarea class="field-input" rows="4" placeholder="اكتب تفاصيل التحديث للمستثمرين..."></textarea>
                </div>
                <div>
                  <div class="field-lbl">المرحلة</div>
                  <select class="field-select">
                    <option>إعداد الموقع</option>
                    <option selected>الهيكل الإنشائي</option>
                    <option>التشطيبات</option>
                    <option>التسليم</option>
                  </select>
                </div>
                <div>
                  <div class="field-lbl">إرفاق صور (اختياري)</div>
                  <div style="border:2px dashed var(--border);border-radius:var(--r);padding:20px;text-align:center;color:var(--text3);font-size:13px;cursor:pointer;background:var(--bg)">📎 اسحب الصور هنا أو انقر للاختيار</div>
                </div>
                <button class="btn btn-primary" (click)="publishUpdate()" [style.background]="publishSuccess ? 'var(--accent-dark)' : ''" [style.cursor]="publishSuccess ? 'default' : 'pointer'">
                  {{publishSuccess ? '✓ تم إرسال التحديث للمستثمرين' : 'نشر التحديث ←'}}
                </button>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div>
            <!-- Investors Table -->
            <div class="card" style="padding:0;overflow:hidden">
              <div style="padding:16px 20px;border-bottom:1px solid var(--border);font-size:15px;font-weight:800">👥 أحدث المستثمرين</div>
              <table>
                <thead><tr><th>المستثمر</th><th>المبلغ</th><th>التاريخ</th></tr></thead>
                <tbody>
                  @for (inv of latestInvestors; track inv.name) {
                    <tr>
                      <td><div style="display:flex;align-items:center;gap:8px"><div class="avatar" [style.background]="inv.avatarBg">{{inv.avatar}}</div>{{inv.name}}</div></td>
                      <td style="font-weight:700">{{inv.amount | number}} ر.س</td>
                      <td style="color:var(--text3);font-size:12px">{{inv.date}}</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>

            <!-- Developer Info -->
            <div class="card">
              <div class="card-title">🏢 معلومات الشركة</div>
              <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:14px">
                <div style="display:flex;justify-content:space-between"><span style="font-size:13px;color:var(--text3)">تأسست</span><span style="font-size:13px;font-weight:700">2010</span></div>
                <div style="display:flex;justify-content:space-between"><span style="font-size:13px;color:var(--text3)">التخصص</span><span style="font-size:13px;font-weight:700">تطوير تجاري وسكني</span></div>
                <div style="display:flex;justify-content:space-between"><span style="font-size:13px;color:var(--text3)">المدن</span><span style="font-size:13px;font-weight:700">الرياض، جدة، الدمام</span></div>
                <div style="display:flex;justify-content:space-between"><span style="font-size:13px;color:var(--text3)">المشاريع المنتهية</span><span style="font-size:13px;font-weight:700">24 مشروعاً</span></div>
                <div style="display:flex;justify-content:space-between"><span style="font-size:13px;color:var(--text3)">متوسط التأخر</span><span style="font-size:13px;font-weight:700;color:var(--accent-dark)">0 أيام</span></div>
              </div>
              <div style="background:var(--bg);border-radius:8px;padding:12px">
                <div style="font-size:12px;font-weight:700;color:var(--text2);margin-bottom:8px">الشهادات والتراخيص</div>
                <div style="display:flex;gap:8px;flex-wrap:wrap">
                  <span class="badge badge-green">✓ مرخص هيئة الاستثمار</span>
                  <span class="badge badge-blue">✓ عضو اتحاد المطورين</span>
                </div>
              </div>
              <div style="display:flex;gap:10px;margin-top:14px">
                <button class="btn btn-ghost btn-sm" style="flex:1">تعديل الملف</button>
                <button class="btn btn-ghost btn-sm" style="flex:1">تقارير المشاريع</button>
              </div>
            </div>
          </div>
        </div>
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
