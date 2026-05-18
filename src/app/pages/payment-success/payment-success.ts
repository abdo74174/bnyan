import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface PaymentState {
  projectName: string;
  amount: number;
  totalReturn: number;
  maturityValue: number;
  duration: number;
  method: string;
  roi: number;
  txRef: string;
}

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="success-page">
      <!-- Animated BG -->
      <div class="success-bg">
        <div class="success-circle c1"></div>
        <div class="success-circle c2"></div>
        <div class="success-circle c3"></div>
      </div>

      <div class="container" style="position:relative;z-index:1;padding-top:60px;padding-bottom:80px">
        <!-- Top: Checkmark -->
        <div style="text-align:center;margin-bottom:40px">
          <div class="success-icon-wrap">
            <div class="success-check">✓</div>
          </div>
          <h1 style="font-size:28px;font-weight:900;margin-top:20px;margin-bottom:8px">تهانينا! تم تأكيد استثمارك</h1>
          <p style="color:var(--text3);font-size:15px">استثمارك في مشروع <strong>{{state.projectName}}</strong> تم بنجاح تام</p>
        </div>

        <!-- Receipt Card -->
        <div class="receipt-card">
          <!-- Receipt Header -->
          <div class="receipt-header">
            <div>
              <div style="font-size:13px;color:rgba(255,255,255,.6);margin-bottom:4px">رقم المعاملة</div>
              <div style="font-size:18px;font-weight:800;letter-spacing:.05em">#{{state.txRef}}</div>
            </div>
            <div style="text-align:left">
              <div style="font-size:13px;color:rgba(255,255,255,.6);margin-bottom:4px">التاريخ</div>
              <div style="font-size:14px;font-weight:700">{{today}}</div>
            </div>
          </div>

          <!-- Main Amount -->
          <div class="receipt-amount">
            <div style="font-size:12px;color:var(--text3);margin-bottom:4px">المبلغ المستثمر</div>
            <div style="font-size:38px;font-weight:900;color:var(--text1)">{{state.amount | number}}</div>
            <div style="font-size:16px;font-weight:700;color:var(--text3)">ريال سعودي</div>
          </div>

          <!-- Details Grid -->
          <div class="receipt-grid">
            <div class="receipt-item">
              <div class="receipt-item-label">المشروع</div>
              <div class="receipt-item-value">{{state.projectName}}</div>
            </div>
            <div class="receipt-item">
              <div class="receipt-item-label">مدة الاستثمار</div>
              <div class="receipt-item-value">{{state.duration}} شهراً</div>
            </div>
            <div class="receipt-item">
              <div class="receipt-item-label">العائد السنوي</div>
              <div class="receipt-item-value accent">{{state.roi}}%</div>
            </div>
            <div class="receipt-item">
              <div class="receipt-item-label">طريقة الدفع</div>
              <div class="receipt-item-value">{{state.method}}</div>
            </div>
            <div class="receipt-item">
              <div class="receipt-item-label">إجمالي العائد المتوقع</div>
              <div class="receipt-item-value">{{state.totalReturn | number}} ر.س</div>
            </div>
            <div class="receipt-item">
              <div class="receipt-item-label">حالة المعاملة</div>
              <div class="receipt-item-value">
                <span style="display:inline-flex;align-items:center;gap:5px;color:#2ecc87">
                  <span style="width:8px;height:8px;border-radius:50%;background:currentColor;display:inline-block"></span>مؤكّدة
                </span>
              </div>
            </div>
          </div>

          <!-- Divider -->
          <div style="border-top:2px dashed var(--border);margin:20px 0;position:relative">
            <div style="position:absolute;top:-9px;right:-24px;width:18px;height:18px;border-radius:50%;background:var(--bg)"></div>
            <div style="position:absolute;top:-9px;left:-24px;width:18px;height:18px;border-radius:50%;background:var(--bg)"></div>
          </div>

          <!-- Maturity Box -->
          <div class="maturity-box">
            <div>
              <div style="font-size:13px;color:rgba(255,255,255,.65)">المبلغ المتوقع عند الاستحقاق</div>
              <div style="font-size:10px;color:rgba(255,255,255,.4);margin-top:2px">بعد {{state.duration}} شهراً</div>
            </div>
            <div style="text-align:left">
              <div style="font-size:26px;font-weight:900;color:#4eedb3">{{state.maturityValue | number}}</div>
              <div style="font-size:13px;color:rgba(255,255,255,.6)">ريال سعودي</div>
            </div>
          </div>

          <!-- Escrow Notice -->
          <div style="background:rgba(46,204,135,.1);border:1px solid rgba(46,204,135,.2);border-radius:10px;padding:14px;margin-top:16px;display:flex;gap:12px;align-items:flex-start">
            <div style="font-size:20px;flex-shrink:0">🔒</div>
            <div>
              <div style="font-size:13px;font-weight:700;color:var(--text1);margin-bottom:3px">أموالك في أمان تام</div>
              <div style="font-size:12px;color:var(--text3);line-height:1.6">تم تحويل مبلغ استثمارك إلى حساب ضماني مستقل خاضع للرقابة التنظيمية. ستصلك تقارير شهرية على بريدك الإلكتروني.</div>
            </div>
          </div>
        </div>

        <!-- Next Steps -->
        <div class="next-steps-grid">
          <div class="next-step-card">
            <div style="font-size:28px;margin-bottom:10px">📊</div>
            <div style="font-weight:700;margin-bottom:4px">تابع استثمارك</div>
            <div style="font-size:12px;color:var(--text3)">تقارير شهرية مفصلة عن أداء مشروعك</div>
          </div>
          <div class="next-step-card">
            <div style="font-size:28px;margin-bottom:10px">📧</div>
            <div style="font-weight:700;margin-bottom:4px">تأكيد بالبريد</div>
            <div style="font-size:12px;color:var(--text3)">ستصلك وثيقة الاستثمار خلال 24 ساعة</div>
          </div>
          <div class="next-step-card">
            <div style="font-size:28px;margin-bottom:10px">📞</div>
            <div style="font-weight:700;margin-bottom:4px">دعم مستمر</div>
            <div style="font-size:12px;color:var(--text3)">فريقنا متاح للإجابة على استفساراتك</div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
          <a routerLink="/dashboard" class="btn btn-primary btn-lg" style="text-decoration:none;min-width:200px;justify-content:center">
            📈 عرض محفظتي
          </a>
          <button class="btn btn-ghost btn-lg" (click)="downloadReceipt()" style="min-width:180px">
            ⬇️ تحميل الإيصال
          </button>
          <a routerLink="/projects" class="btn btn-ghost btn-lg" style="text-decoration:none;min-width:180px;justify-content:center">
            استعرض فرصاً أخرى
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .success-page { min-height: 100vh; background: var(--bg); position: relative; overflow: hidden; }
    .success-bg { position: fixed; inset: 0; pointer-events: none; }
    .success-circle {
      position: absolute; border-radius: 50%;
      background: radial-gradient(circle, rgba(46,204,135,.12), transparent 70%);
    }
    .c1 { width: 600px; height: 600px; top: -200px; right: -200px; }
    .c2 { width: 400px; height: 400px; bottom: -150px; left: -100px; background: radial-gradient(circle, rgba(0,82,136,.1), transparent 70%); }
    .c3 { width: 300px; height: 300px; top: 40%; left: 40%; background: radial-gradient(circle, rgba(255,184,0,.07), transparent 70%); }
    .success-icon-wrap {
      width: 90px; height: 90px; border-radius: 50%;
      background: linear-gradient(135deg, #2ecc87, #00c36b);
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto;
      box-shadow: 0 0 0 16px rgba(46,204,135,.12), 0 0 0 32px rgba(46,204,135,.06);
      animation: pop .5s cubic-bezier(.175,.885,.32,1.275);
    }
    .success-check { font-size: 42px; color: #fff; }
    @keyframes pop { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }
    .receipt-card {
      background: #fff;
      border-radius: 20px;
      box-shadow: 0 8px 40px rgba(0,0,0,.1);
      overflow: hidden;
      max-width: 640px;
      margin: 0 auto 32px;
    }
    .receipt-header {
      background: linear-gradient(135deg, var(--primary-dark), var(--primary));
      padding: 24px 28px;
      display: flex; justify-content: space-between; align-items: flex-start;
      color: #fff;
    }
    .receipt-amount { padding: 28px 28px 20px; text-align: center; border-bottom: 1px solid var(--border); }
    .receipt-grid {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 0; padding: 4px 0;
    }
    .receipt-item {
      padding: 14px 28px;
      border-bottom: 1px solid var(--bg);
    }
    .receipt-item-label { font-size: 11px; color: var(--text3); margin-bottom: 3px; }
    .receipt-item-value { font-size: 14px; font-weight: 700; }
    .receipt-item-value.accent { color: var(--accent-dark); }
    .maturity-box {
      background: linear-gradient(135deg, var(--primary-dark), #1a3a5c);
      border-radius: 12px;
      padding: 18px 22px;
      display: flex; justify-content: space-between; align-items: center;
      margin: 0 20px;
    }
    .next-steps-grid {
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: 16px; max-width: 640px; margin: 0 auto 28px;
    }
    .next-step-card {
      background: #fff;
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 20px;
      text-align: center;
      box-shadow: var(--shadow);
    }
    @media(max-width: 600px) {
      .receipt-grid { grid-template-columns: 1fr; }
      .next-steps-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class PaymentSuccessComponent implements OnInit {
  state!: PaymentState;
  today = new Date().toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });

  constructor(private router: Router) {}

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    const s = nav?.extras?.state || history.state;
    if (s?.projectName) {
      this.state = s as PaymentState;
    } else {
      this.state = {
        projectName: 'مشروع بنيان',
        amount: 50000,
        totalReturn: 20000,
        maturityValue: 70000,
        duration: 24,
        method: 'محفظة بنيان',
        roi: 20,
        txRef: 'BNY-' + Date.now().toString().slice(-8)
      };
    }
  }

  downloadReceipt() {
    alert('سيتم تحميل الإيصال قريباً — الميزة قيد التطوير');
  }
}
