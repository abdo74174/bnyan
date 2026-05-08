import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-invest',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  template: `
    <section class="section-sm">
      <div class="container">
        <div class="invest-wrap">
          <div class="tag">تأكيد الاستثمار</div>
          <h1 class="section-title" style="margin-bottom:8px">حدد مبلغ استثمارك</h1>
          <p style="color:var(--text3);margin-bottom:24px">راجع التفاصيل وأدخل المبلغ — العائد يُحسب فوراً</p>

          <!-- Project Bar -->
          <div style="background:var(--primary-dark);border-radius:var(--r-lg);padding:16px 20px;display:flex;align-items:center;gap:14px;margin-bottom:24px">
            <div style="width:48px;height:48px;border-radius:10px;background:var(--white);display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0"><img src="assets/images/OIP (3).jpeg" style="width:100%;height:100%;object-fit:cover"></div>
            <div style="flex:1">
              <div style="font-size:15px;font-weight:800;color:#fff">أبراج الرقي التجاري</div>
              <div style="font-size:12px;color:rgba(255,255,255,.6);margin-top:3px">الرياض &nbsp;·&nbsp; 20% عائد سنوي &nbsp;·&nbsp; 24 شهراً</div>
            </div>
            <span class="badge badge-green">منخفضة</span>
          </div>

          <div class="two-col">
            <div>
              <!-- Amount -->
              <div class="card" style="padding:24px;margin-bottom:18px">
                <div style="font-size:14px;font-weight:700;color:var(--text2);margin-bottom:12px">مبلغ الاستثمار</div>
                <div style="position:relative">
                  <input type="number" [(ngModel)]="amount" (ngModelChange)="calculate()" class="amount-field" min="10000" max="500000" step="5000">
                  <span style="position:absolute;left:18px;top:50%;transform:translateY(-50%);font-size:13px;font-weight:700;color:var(--text3)">ر.س</span>
                </div>
                <div class="hint-chips">
                  @for (hint of hints; track hint) {
                    <button class="hint-chip" (click)="setAmount(hint)">{{hint | number}}</button>
                  }
                </div>
                <div style="font-size:12px;color:var(--text3);margin-top:8px">الحد الأدنى: 10,000 ر.س &nbsp;·&nbsp; الحد الأقصى: 500,000 ر.س</div>
              </div>

              <!-- Calculator -->
              <div class="calc-box">
                <div style="font-size:12px;font-weight:700;color:rgba(255,255,255,.55);letter-spacing:.05em;margin-bottom:14px">العائد المتوقع على استثمارك</div>
                <div class="calc-row"><span class="calc-row-lbl">مبلغ الاستثمار</span><span class="calc-row-val">{{amount | number}} ر.س</span></div>
                <div class="calc-div"></div>
                <div class="calc-row"><span class="calc-row-lbl">العائد السنوي (20%)</span><span class="calc-row-val">{{annualReturn | number}} ر.س</span></div>
                <div class="calc-row"><span class="calc-row-lbl">إجمالي العائد (24 شهر)</span><span class="calc-row-val">{{totalReturn | number}} ر.س</span></div>
                <div class="calc-div"></div>
                <div class="calc-row"><span class="calc-row-lbl">المبلغ عند الاستحقاق</span><span class="calc-row-val highlight">{{maturityValue | number}} ر.س</span></div>
                <div style="font-size:11px;color:rgba(255,255,255,.3);margin-top:10px">* الأرقام تقديرية تعتمد على أداء المشروع الفعلي</div>
              </div>

              <!-- Consent -->
              <div class="card" style="padding:24px">
                <div style="font-size:14px;font-weight:700;color:var(--text1);margin-bottom:14px">الإقرار والموافقة</div>
                <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:20px">
                  <label style="display:flex;align-items:flex-start;gap:10px;font-size:13px;color:var(--text2);cursor:pointer"><input type="checkbox" checked style="margin-top:2px"> اطلعت على تفاصيل المشروع، المخاطر المرتبطة به، وجميع المستندات المرفقة</label>
                  <label style="display:flex;align-items:flex-start;gap:10px;font-size:13px;color:var(--text2);cursor:pointer"><input type="checkbox" checked style="margin-top:2px"> أوافق على الشروط والأحكام ووثيقة الإفصاح الكامل لهذا الاستثمار</label>
                  <label style="display:flex;align-items:flex-start;gap:10px;font-size:13px;color:var(--text2);cursor:pointer"><input type="checkbox" checked style="margin-top:2px"> أدرك أن الاستثمار غير قابل للسحب خلال مدة المشروع البالغة 24 شهراً</label>
                </div>
                <div style="display:flex;gap:12px">
                  <button class="btn btn-accent btn-lg" style="flex:1" (click)="confirmInvest()">تأكيد الاستثمار ←</button>
                  <a routerLink="/detail" class="btn btn-ghost btn-lg" style="flex:1;justify-content:center">مراجعة المشروع</a>
                </div>
                <div style="font-size:12px;color:var(--text3);text-align:center;margin-top:10px">🔒 أموالك تُحوَّل إلى حساب ضماني مستقل فور التأكيد</div>
              </div>
            </div>

            <!-- Summary Sidebar -->
            <div>
              <div class="card" style="padding:20px;position:sticky;top:84px">
                <div style="font-size:14px;font-weight:800;margin-bottom:14px;padding-bottom:12px;border-bottom:1px solid var(--border)">ملخص العملية</div>
                <div style="display:flex;flex-direction:column;gap:9px;margin-bottom:12px">
                  <div style="display:flex;justify-content:space-between"><span style="font-size:12px;color:var(--text3)">المشروع</span><span style="font-size:13px;font-weight:700">أبراج الرقي</span></div>
                  <div style="display:flex;justify-content:space-between"><span style="font-size:12px;color:var(--text3)">الموقع</span><span style="font-size:13px;font-weight:700">الرياض</span></div>
                  <div style="display:flex;justify-content:space-between"><span style="font-size:12px;color:var(--text3)">المدة</span><span style="font-size:13px;font-weight:700">24 شهراً</span></div>
                  <div style="display:flex;justify-content:space-between"><span style="font-size:12px;color:var(--text3)">نوع العائد</span><span style="font-size:13px;font-weight:700">رأسمالي</span></div>
                </div>
                <div style="height:1px;background:var(--border);margin-bottom:12px"></div>
                <div style="display:flex;justify-content:space-between;margin-bottom:8px"><span style="font-size:12px;color:var(--text3)">مبلغ الاستثمار</span><span style="font-size:13px;font-weight:700">{{amount | number}} ر.س</span></div>
                <div style="display:flex;justify-content:space-between;margin-bottom:8px"><span style="font-size:12px;color:var(--text3)">العائد المتوقع</span><span style="font-size:13px;font-weight:700;color:var(--accent-dark)">{{totalReturn | number}} ر.س</span></div>
                <div style="height:1px;background:var(--border);margin-bottom:12px"></div>
                <div style="display:flex;justify-content:space-between"><span style="font-size:14px;font-weight:800">عند الاستحقاق</span><span style="font-size:17px;font-weight:800;color:var(--primary)">{{maturityValue | number}} ر.س</span></div>
                <div style="margin-top:14px;background:var(--bg);border-radius:8px;padding:10px;font-size:12px;color:var(--text3);line-height:1.7">✓ حساب ضماني مستقل<br>✓ تقارير شهرية<br>✓ عقد موثق ومُحكم</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Success Modal -->
    <div class="success-overlay" [class.show]="showSuccess" (click)="showSuccess = false">
      <div class="success-modal" (click)="$event.stopPropagation()">
        <div style="font-size:56px;margin-bottom:16px">✅</div>
        <div style="font-size:22px;font-weight:800;margin-bottom:8px">تم تأكيد استثمارك بنجاح!</div>
        <div style="font-size:14px;color:var(--text3);line-height:1.7;margin-bottom:28px">استثمرت في مشروع أبراج الرقي التجاري. يمكنك متابعة استثمارك من لوحة التحكم في أي وقت.</div>
        <div style="background:var(--bg);border-radius:var(--r-lg);padding:16px;margin-bottom:20px;text-align:right">
          <div style="display:flex;justify-content:space-between;padding:4px 0;font-size:13px"><span style="color:var(--text3)">المشروع</span><span style="font-weight:700">أبراج الرقي</span></div>
          <div style="display:flex;justify-content:space-between;padding:4px 0;font-size:13px"><span style="color:var(--text3)">المبلغ</span><span style="font-weight:700">{{amount | number}} ر.س</span></div>
          <div style="display:flex;justify-content:space-between;padding:4px 0;font-size:13px"><span style="color:var(--text3)">رقم العملية</span><span style="font-weight:700">#BNY-2025-4182</span></div>
        </div>
        <a routerLink="/dashboard" class="btn btn-primary btn-lg" style="width:100%;margin-bottom:10px;text-decoration:none;display:flex;justify-content:center">عرض محفظتي ←</a>
        <a routerLink="/projects" class="btn btn-ghost" style="width:100%;text-decoration:none;display:flex;justify-content:center">استعرض فرصاً أخرى</a>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class InvestComponent {
  amount: number = 50000;
  annualReturn: number = 0;
  totalReturn: number = 0;
  maturityValue: number = 0;
  hints = [25000, 50000, 100000, 250000];
  showSuccess: boolean = false;

  constructor() {
    this.calculate();
  }

  setAmount(v: number) {
    this.amount = v;
    this.calculate();
  }

  calculate() {
    const n = this.amount || 0;
    this.annualReturn = Math.round(n * 0.2);
    this.totalReturn = this.annualReturn * 2;
    this.maturityValue = n + this.totalReturn;
  }

  confirmInvest() {
    this.showSuccess = true;
  }
}
