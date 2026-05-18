import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService, Project } from '../../services/project.service';
import { WalletService } from '../../services/wallet.service';
import { InvestmentService } from '../../services/investment.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  template: `
    <section class="section-sm">
      <div class="container">
        @if (project) {
          <!-- Breadcrumb -->
          <div style="font-size:12px;color:var(--text3);margin-bottom:24px">
            <a routerLink="/projects" style="color:var(--text3);text-decoration:none">المشاريع</a>
            <span> / </span>
            <a [routerLink]="['/project', project.id]" style="color:var(--text3);text-decoration:none">{{project.name}}</a>
            <span style="color:var(--text1)"> / الدفع</span>
          </div>

          <div class="tag" style="margin-bottom:10px">إتمام الاستثمار</div>
          <h1 class="section-title" style="margin-bottom:6px">صفحة الدفع والتأكيد</h1>
          <p style="color:var(--text3);margin-bottom:32px">راجع تفاصيل الاستثمار، اختر طريقة الدفع، ثم أكّد عمليتك</p>

          <div class="two-col">
            <!-- LEFT: Steps -->
            <div>
              <!-- Step 1: Project Summary -->
              <div class="pay-step-card">
                <div class="pay-step-header">
                  <div class="pay-step-num">1</div>
                  <div class="pay-step-title">المشروع المختار</div>
                </div>
                <div style="display:flex;align-items:center;gap:14px;margin-top:14px;background:var(--bg);border-radius:var(--r);padding:14px">
                  <img [src]="project.img" style="width:64px;height:64px;border-radius:10px;object-fit:cover;flex-shrink:0">
                  <div style="flex:1">
                    <div style="font-size:15px;font-weight:800">{{project.name}}</div>
                    <div style="font-size:12px;color:var(--text3);margin-top:3px">📍 {{project.location}} &nbsp;·&nbsp; {{project.roi}}% عائد سنوي &nbsp;·&nbsp; {{project.duration}} شهراً</div>
                  </div>
                  <span class="badge badge-green">{{project.risk}}</span>
                </div>
              </div>

              <!-- Step 2: Amount -->
              <div class="pay-step-card">
                <div class="pay-step-header">
                  <div class="pay-step-num">2</div>
                  <div class="pay-step-title">مبلغ الاستثمار</div>
                </div>

                <!-- Wallet Balance -->
                <div style="display:flex;justify-content:space-between;align-items:center;background:rgba(46,204,135,0.07);border:1px solid rgba(46,204,135,0.25);border-radius:var(--r);padding:12px 16px;margin:14px 0">
                  <div style="display:flex;align-items:center;gap:10px">
                    <div style="width:34px;height:34px;border-radius:50%;background:rgba(46,204,135,0.15);display:flex;align-items:center;justify-content:center;color:#2ecc87">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"/></svg>
                    </div>
                    <div>
                      <div style="font-size:11px;color:var(--text3)">الرصيد المتاح في المحفظة</div>
                      <div style="font-size:15px;font-weight:700;color:var(--text1)">{{ wallet.balance$ | async | number }} ر.س</div>
                    </div>
                  </div>
                  @if (errorMsg) {
                    <div style="color:var(--red);font-size:12px;font-weight:700">{{errorMsg}}</div>
                  }
                </div>

                <!-- Amount Input -->
                <div style="position:relative;margin-bottom:12px">
                  <input type="number" [(ngModel)]="amount" (ngModelChange)="calculate()" class="amount-field" [min]="project.minInvest" max="500000" step="5000">
                  <span style="position:absolute;left:18px;top:50%;transform:translateY(-50%);font-size:13px;font-weight:700;color:var(--text3)">ر.س</span>
                </div>
                <div class="hint-chips">
                  @for (h of hints; track h) {
                    <button class="hint-chip" (click)="setAmount(h)">{{h | number}}</button>
                  }
                </div>
                <div style="font-size:12px;color:var(--text3);margin-top:8px">
                  الحد الأدنى: {{project.minInvest | number}} ر.س &nbsp;·&nbsp; الحد الأقصى: 500,000 ر.س
                </div>

                <!-- ROI Calculator -->
                <div class="calc-box" style="margin-top:16px">
                  <div style="font-size:12px;font-weight:700;color:rgba(255,255,255,.55);letter-spacing:.05em;margin-bottom:14px">العائد المتوقع على استثمارك</div>
                  <div class="calc-row"><span class="calc-row-lbl">مبلغ الاستثمار</span><span class="calc-row-val">{{amount | number}} ر.س</span></div>
                  <div class="calc-div"></div>
                  <div class="calc-row"><span class="calc-row-lbl">العائد السنوي ({{project.roi}}%)</span><span class="calc-row-val">{{annualReturn | number}} ر.س</span></div>
                  <div class="calc-row"><span class="calc-row-lbl">إجمالي العائد ({{project.duration}} شهر)</span><span class="calc-row-val">{{totalReturn | number}} ر.س</span></div>
                  <div class="calc-div"></div>
                  <div class="calc-row"><span class="calc-row-lbl">المبلغ عند الاستحقاق</span><span class="calc-row-val highlight">{{maturityValue | number}} ر.س</span></div>
                  <div style="font-size:11px;color:rgba(255,255,255,.3);margin-top:10px">* الأرقام تقديرية تعتمد على أداء المشروع الفعلي</div>
                </div>
              </div>

              <!-- Step 3: Payment Method -->
              <div class="pay-step-card">
                <div class="pay-step-header">
                  <div class="pay-step-num">3</div>
                  <div class="pay-step-title">طريقة الدفع</div>
                </div>
                <div style="display:flex;flex-direction:column;gap:10px;margin-top:14px">
                  @for (method of paymentMethods; track method.id) {
                    <label class="pay-method-card" [class.selected]="selectedMethod === method.id" (click)="selectedMethod = method.id">
                      <div style="display:flex;align-items:center;gap:14px;flex:1">
                        <div class="pay-method-icon">{{method.icon}}</div>
                        <div>
                          <div style="font-size:14px;font-weight:700">{{method.name}}</div>
                          <div style="font-size:12px;color:var(--text3)">{{method.desc}}</div>
                        </div>
                      </div>
                      <div class="pay-radio" [class.checked]="selectedMethod === method.id"></div>
                    </label>
                  }
                </div>

                <!-- Bank Transfer Details (conditional) -->
                @if (selectedMethod === 'bank') {
                  <div style="background:var(--bg);border-radius:var(--r);padding:16px;margin-top:14px;border:1px solid var(--border)">
                    <div style="font-size:13px;font-weight:700;margin-bottom:12px;color:var(--text2)">بيانات التحويل البنكي</div>
                    <div style="display:flex;flex-direction:column;gap:8px">
                      <div style="display:flex;justify-content:space-between;font-size:13px"><span style="color:var(--text3)">اسم الحساب</span><span style="font-weight:700">بنيان للاستثمار العقاري</span></div>
                      <div style="display:flex;justify-content:space-between;font-size:13px"><span style="color:var(--text3)">رقم الحساب</span><span style="font-weight:700;direction:ltr">SA29 8000 0001 6080 1016 7519</span></div>
                      <div style="display:flex;justify-content:space-between;font-size:13px"><span style="color:var(--text3)">البنك</span><span style="font-weight:700">بنك الراجحي</span></div>
                    </div>
                  </div>
                }

                <!-- Card Details (conditional) -->
                @if (selectedMethod === 'card') {
                  <div style="margin-top:14px;display:flex;flex-direction:column;gap:12px">
                    <div>
                      <label class="field-label">رقم البطاقة</label>
                      <input type="text" class="field-input" placeholder="0000  0000  0000  0000" maxlength="19">
                    </div>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
                      <div>
                        <label class="field-label">تاريخ الانتهاء</label>
                        <input type="text" class="field-input" placeholder="MM / YY">
                      </div>
                      <div>
                        <label class="field-label">CVV</label>
                        <input type="text" class="field-input" placeholder="***" maxlength="4">
                      </div>
                    </div>
                    <div>
                      <label class="field-label">اسم حامل البطاقة</label>
                      <input type="text" class="field-input" placeholder="الاسم كما يظهر على البطاقة">
                    </div>
                  </div>
                }
              </div>

              <!-- Step 4: Consent -->
              <div class="pay-step-card">
                <div class="pay-step-header">
                  <div class="pay-step-num">4</div>
                  <div class="pay-step-title">الإقرار والموافقة</div>
                </div>
                <div style="display:flex;flex-direction:column;gap:10px;margin-top:14px">
                  <label class="consent-row">
                    <input type="checkbox" [(ngModel)]="consent1">
                    <span>اطلعت على تفاصيل المشروع، المخاطر المرتبطة به، وجميع المستندات المرفقة</span>
                  </label>
                  <label class="consent-row">
                    <input type="checkbox" [(ngModel)]="consent2">
                    <span>أوافق على الشروط والأحكام ووثيقة الإفصاح الكامل لهذا الاستثمار</span>
                  </label>
                  <label class="consent-row">
                    <input type="checkbox" [(ngModel)]="consent3">
                    <span>أدرك أن الاستثمار غير قابل للسحب خلال مدة المشروع البالغة {{project.duration}} شهراً</span>
                  </label>
                </div>
                <button class="btn btn-accent btn-lg" style="width:100%;margin-top:20px"
                  [disabled]="!canSubmit"
                  [class.disabled]="!canSubmit"
                  (click)="confirmInvest()">
                  <span>🔒</span> تأكيد الاستثمار — {{amount | number}} ر.س
                </button>
                <div style="font-size:12px;color:var(--text3);text-align:center;margin-top:10px">أموالك تُحوَّل إلى حساب ضماني مستقل فور التأكيد</div>
              </div>
            </div>

            <!-- RIGHT: Summary Sidebar -->
            <div>
              <div class="card" style="padding:22px;position:sticky;top:84px">
                <div style="font-size:15px;font-weight:800;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid var(--border)">ملخص العملية</div>
                <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:16px">
                  <div style="display:flex;justify-content:space-between"><span style="font-size:12px;color:var(--text3)">المشروع</span><span style="font-size:13px;font-weight:700;max-width:150px;text-align:left">{{project.name}}</span></div>
                  <div style="display:flex;justify-content:space-between"><span style="font-size:12px;color:var(--text3)">الموقع</span><span style="font-size:13px;font-weight:700">{{project.location}}</span></div>
                  <div style="display:flex;justify-content:space-between"><span style="font-size:12px;color:var(--text3)">المدة</span><span style="font-size:13px;font-weight:700">{{project.duration}} شهراً</span></div>
                  <div style="display:flex;justify-content:space-between"><span style="font-size:12px;color:var(--text3)">العائد السنوي</span><span style="font-size:13px;font-weight:700;color:var(--accent-dark)">{{project.roi}}%</span></div>
                  <div style="display:flex;justify-content:space-between"><span style="font-size:12px;color:var(--text3)">نوع العائد</span><span style="font-size:13px;font-weight:700">{{project.returnType}}</span></div>
                  <div style="display:flex;justify-content:space-between"><span style="font-size:12px;color:var(--text3)">طريقة الدفع</span><span style="font-size:13px;font-weight:700">{{getMethodName()}}</span></div>
                </div>
                <div style="height:1px;background:var(--border);margin-bottom:14px"></div>
                <div style="display:flex;justify-content:space-between;margin-bottom:8px"><span style="font-size:12px;color:var(--text3)">مبلغ الاستثمار</span><span style="font-size:13px;font-weight:700">{{amount | number}} ر.س</span></div>
                <div style="display:flex;justify-content:space-between;margin-bottom:8px"><span style="font-size:12px;color:var(--text3)">إجمالي العائد</span><span style="font-size:13px;font-weight:700;color:var(--accent-dark)">{{totalReturn | number}} ر.س</span></div>
                <div style="height:1px;background:var(--border);margin-bottom:14px"></div>
                <div style="display:flex;justify-content:space-between;margin-bottom:20px">
                  <span style="font-size:14px;font-weight:800">عند الاستحقاق</span>
                  <span style="font-size:18px;font-weight:800;color:var(--primary)">{{maturityValue | number}} ر.س</span>
                </div>

                <!-- Badges -->
                <div style="background:var(--bg);border-radius:var(--r);padding:12px;font-size:12px;color:var(--text3);line-height:2">
                  ✓ حساب ضماني مستقل &nbsp;&nbsp; ✓ تقارير شهرية<br>
                  ✓ عقد موثق ومُحكم &nbsp;&nbsp; ✓ رقابة تنظيمية
                </div>

                <!-- Secure Logos -->
                <div style="display:flex;justify-content:center;gap:12px;margin-top:16px;opacity:.5">
                  <div style="font-size:11px;background:var(--bg2);border-radius:6px;padding:5px 10px">Visa</div>
                  <div style="font-size:11px;background:var(--bg2);border-radius:6px;padding:5px 10px">Mastercard</div>
                  <div style="font-size:11px;background:var(--bg2);border-radius:6px;padding:5px 10px">مدى</div>
                  <div style="font-size:11px;background:var(--bg2);border-radius:6px;padding:5px 10px">STC Pay</div>
                </div>
              </div>
            </div>
          </div>
        } @else {
          <div style="text-align:center;padding:80px">
            <div style="font-size:48px">❌</div>
            <h2 style="margin-top:16px">المشروع غير موجود</h2>
            <a routerLink="/projects" class="btn btn-primary" style="margin-top:20px">العودة للمشاريع</a>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
    .pay-step-card {
      background: #fff;
      border: 1px solid var(--border);
      border-radius: var(--r-lg);
      padding: 22px;
      margin-bottom: 18px;
      box-shadow: var(--shadow);
    }
    .pay-step-header { display: flex; align-items: center; gap: 12px; }
    .pay-step-num {
      width: 30px; height: 30px; border-radius: 50%;
      background: var(--primary); color: #fff;
      display: flex; align-items: center; justify-content: center;
      font-size: 14px; font-weight: 800; flex-shrink: 0;
    }
    .pay-step-title { font-size: 15px; font-weight: 800; }
    .pay-method-card {
      display: flex; align-items: center; gap: 12px;
      border: 2px solid var(--border); border-radius: var(--r);
      padding: 14px 16px; cursor: pointer;
      transition: all .2s; background: #fff;
    }
    .pay-method-card.selected { border-color: var(--primary); background: rgba(var(--primary-rgb, 0,82,136),.04); }
    .pay-method-icon { font-size: 22px; width: 40px; text-align: center; }
    .pay-radio {
      width: 18px; height: 18px; border-radius: 50%;
      border: 2px solid var(--border); flex-shrink: 0; margin-right: auto;
      transition: all .2s;
    }
    .pay-radio.checked { border-color: var(--primary); background: var(--primary); box-shadow: inset 0 0 0 3px #fff; }
    .consent-row { display: flex; align-items: flex-start; gap: 10px; font-size: 13px; color: var(--text2); cursor: pointer; }
    .consent-row input { margin-top: 2px; flex-shrink: 0; }
    .field-label { display: block; font-size: 12px; font-weight: 700; color: var(--text3); margin-bottom: 6px; }
    .field-input { width: 100%; padding: 11px 14px; border: 1px solid var(--border); border-radius: var(--r); font-size: 14px; outline: none; }
    .field-input:focus { border-color: var(--primary); }
    .btn.disabled { opacity: .5; cursor: not-allowed; pointer-events: none; }
  `]
})
export class PaymentComponent implements OnInit {
  project: Project | undefined;
  amount = 50000;
  annualReturn = 0;
  totalReturn = 0;
  maturityValue = 0;
  errorMsg = '';
  selectedMethod = 'wallet';
  consent1 = false;
  consent2 = false;
  consent3 = false;

  hints = [25000, 50000, 100000, 250000];

  paymentMethods = [
    { id: 'wallet', name: 'محفظة بنيان', desc: 'خصم فوري من رصيدك الاستثماري', icon: '💼' },
    { id: 'card',   name: 'بطاقة بنكية', desc: 'Visa / Mastercard / مدى', icon: '💳' },
    { id: 'bank',   name: 'تحويل بنكي', desc: 'تحويل مباشر لحساب الضمان', icon: '🏦' },
    { id: 'stc',    name: 'STC Pay',     desc: 'ادفع برقم جوالك', icon: '📱' },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    public wallet: WalletService,
    private invService: InvestmentService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.project = this.projectService.getById(id);
      if (this.project) {
        this.amount = this.project.minInvest;
        this.calculate();
      }
    });
  }

  setAmount(v: number) { this.amount = v; this.calculate(); }

  calculate() {
    const n = this.amount || 0;
    const months = this.project?.duration || 24;
    this.annualReturn = Math.round(n * (this.project?.roi || 20) / 100);
    this.totalReturn = Math.round(this.annualReturn * months / 12);
    this.maturityValue = n + this.totalReturn;
    this.errorMsg = '';
  }

  get canSubmit(): boolean {
    return this.consent1 && this.consent2 && this.consent3 && this.amount > 0;
  }

  getMethodName(): string {
    return this.paymentMethods.find(m => m.id === this.selectedMethod)?.name || '';
  }

  confirmInvest() {
    if (this.selectedMethod === 'wallet' && !this.wallet.deduct(this.amount)) {
      this.errorMsg = 'الرصيد المتاح غير كافٍ للاستثمار';
      return;
    }
    if (!this.project) return;

    this.invService.addInvestment({
      name: this.project.name,
      type: this.project.type,
      location: this.project.location,
      amount: this.amount,
      expectedReturn: this.totalReturn,
      remainingMonths: this.project.duration,
      progress: this.project.progress,
      status: 'جديد',
      statusBadgeClass: 'badge-blue',
      img: this.project.img
    });

    // Navigate to success page
    this.router.navigate(['/payment-success'], {
      state: {
        projectName: this.project.name,
        amount: this.amount,
        totalReturn: this.totalReturn,
        maturityValue: this.maturityValue,
        duration: this.project.duration,
        method: this.getMethodName(),
        roi: this.project.roi,
        txRef: 'BNY-' + Date.now().toString().slice(-8)
      }
    });
  }
}
