import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WalletService } from '../../services/wallet.service';
import { InvestmentService, Investment } from '../../services/investment.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="dash-header">
      <div class="container">
        <div class="dash-welcome">مرحباً بك،</div>
        <div class="dash-name">أحمد الحربي</div>
        <div class="dash-kpis" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
          <div class="dash-kpi" style="border-bottom: 3px solid #2ecc87"><div class="dash-kpi-val" style="color:#2ecc87">{{ wallet.balance$ | async | number }}</div><div class="dash-kpi-lbl">الرصيد النقدي المتاح (ر.س)</div><div class="dash-kpi-change" style="color:var(--text3)">جاهز للاستثمار بالمحفظة</div></div>
          <div class="dash-kpi"><div class="dash-kpi-val">{{ totalInvestment | number }}</div><div class="dash-kpi-lbl">إجمالي الاستثمارات (ر.س)</div></div>
          <div class="dash-kpi"><div class="dash-kpi-val">{{ totalEscrow | number }}</div><div class="dash-kpi-lbl">رصيد حساب الضمان (ر.س)</div><div class="dash-kpi-change" style="color:var(--text3)">أموال محتجزة وآمنة</div></div>
          <div class="dash-kpi"><div class="dash-kpi-val">69,300</div><div class="dash-kpi-lbl">العوائد المتوقعة (ر.س)</div></div>
        </div>
      </div>
    </div>

    <section class="section-sm">
      <div class="container">
        <!-- Escrow Wallet Card -->
        <div class="card" style="padding:24px;margin-bottom:24px;background: linear-gradient(135deg, #1a4f8a 0%, #113661 100%); color: white;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px">
            <div>
              <div style="font-size:14px;color:rgba(255,255,255,0.7)">رصيد حساب الضمان (Escrow Balance)</div>
              <div style="font-size:32px;font-weight:800;margin-top:4px">{{ totalEscrow | number }} <span style="font-size:16px;font-weight:400">ر.س</span></div>
            </div>
            <div style="text-align:left">
              <div style="font-size:14px;color:rgba(255,255,255,0.7)">الأموال المصروفة للمشاريع</div>
              <div style="font-size:20px;font-weight:700;margin-top:4px;color:#2ecc87">{{ totalDrawn | number }} <span style="font-size:14px;font-weight:400">ر.س</span></div>
            </div>
          </div>
          
          <!-- Escrow Progress Bar -->
          <div style="margin-bottom:12px">
            <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:8px;color:rgba(255,255,255,0.8)">
              <span>نسبة الصرف التراكمي: {{ escrowDrawnPercentage | number:'1.0-1' }}%</span>
              <span>إجمالي الاستثمار: {{ totalInvestment | number }} ر.س</span>
            </div>
            <div style="height:10px;background:rgba(255,255,255,0.2);border-radius:10px;overflow:hidden">
              <div [style.width.%]="escrowDrawnPercentage" style="height:100%;background:#2ecc87;border-radius:10px;transition:width 1s ease"></div>
            </div>
          </div>
          <div style="font-size:12px;color:rgba(255,255,255,0.6);display:flex;align-items:center;gap:6px;margin-top:16px">
            <span style="display:inline-block;width:14px;height:14px;background:#2ecc87;border-radius:50%"></span> الأموال المصروفة 
            <span style="display:inline-block;width:14px;height:14px;background:rgba(255,255,255,0.2);border-radius:50%;margin-right:12px"></span> الرصيد المحتجز (الضمان)
          </div>
        </div>

        <!-- Chart Card -->
        <div class="card" style="padding:24px;margin-bottom:24px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
            <div style="font-size:16px;font-weight:800">أداء المحفظة</div>
            <div style="display:flex;gap:6px">
              @for (chip of chips; track chip) {
                <button class="filter-chip" [class.active]="activeChip === chip" (click)="activeChip = chip">{{chip}}</button>
              }
            </div>
          </div>
          <!-- SVG Chart -->
          <svg width="100%" height="110" viewBox="0 0 800 110" preserveAspectRatio="none" style="display:block">
            <defs>
              <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#1a4f8a" stop-opacity=".18"/>
                <stop offset="100%" stop-color="#1a4f8a" stop-opacity="0"/>
              </linearGradient>
            </defs>
            <path d="M0,100 L130,87 L260,73 L390,79 L520,57 L650,43 L800,20 L800,110 L0,110 Z" fill="url(#cg)"/>
            <path d="M0,100 L130,87 L260,73 L390,79 L520,57 L650,43 L800,20" fill="none" stroke="#1a4f8a" stroke-width="2.5" stroke-linecap="round"/>
            <!-- Data points -->
            <circle cx="130" cy="87" r="4" fill="#1a4f8a"/>
            <circle cx="260" cy="73" r="4" fill="#1a4f8a"/>
            <circle cx="390" cy="79" r="4" fill="#1a4f8a"/>
            <circle cx="520" cy="57" r="4" fill="#1a4f8a"/>
            <circle cx="650" cy="43" r="4" fill="#1a4f8a"/>
            <circle cx="800" cy="20" r="4" fill="#2ecc87"/>
          </svg>
          <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text3);margin-top:6px;padding:0 2px">
            <span>نوفمبر</span><span>ديسمبر</span><span>يناير</span><span>فبراير</span><span>مارس</span><span>أبريل</span>
          </div>
          <!-- Summary Row -->
          <div style="display:flex;gap:28px;margin-top:20px;padding-top:16px;border-top:1px solid var(--border)">
            <div><div style="font-size:11px;color:var(--text3)">بداية الفترة</div><div style="font-size:15px;font-weight:800;color:var(--text1)">290,000 ر.س</div></div>
            <div><div style="font-size:11px;color:var(--text3)">الآن</div><div style="font-size:15px;font-weight:800;color:var(--text1)">385,000 ر.س</div></div>
            <div><div style="font-size:11px;color:var(--text3)">النمو</div><div style="font-size:15px;font-weight:800;color:var(--accent-dark)">+32.7%</div></div>
          </div>
        </div>

        <!-- Investments Table -->
        <div class="card" style="overflow:hidden">
          <div style="padding:16px 20px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center">
            <div style="font-size:16px;font-weight:800">استثماراتي</div>
            <a routerLink="/projects" class="btn btn-primary btn-sm">+ استثمار جديد</a>
          </div>
          <div style="overflow-x:auto">
            <table>
              <thead>
                <tr>
                  <th>المشروع</th>
                  <th>المبلغ</th>
                  <th>العائد المتوقع</th>
                  <th>المتبقي</th>
                  <th>الإنجاز</th>
                  <th>الحالة</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                @for (inv of investments; track inv.id) {
                  <tr>
                    <td>
                      <div class="td-proj">
                        <div class="td-proj-ico"><img [src]="inv.img"></div>
                        <div>
                          <div class="td-proj-name">{{inv.name}}</div>
                          <div class="td-proj-type">{{inv.type}} · {{inv.location}}</div>
                        </div>
                      </div>
                    </td>
                    <td><strong>{{inv.amount | number}} ر.س</strong></td>
                    <td style="color:var(--accent-dark);font-weight:700">+{{inv.expectedReturn | number}} ر.س</td>
                    <td style="color:var(--text3)">{{inv.remainingMonths}} شهراً</td>
                    <td>
                      <div style="font-size:12px;font-weight:700">{{inv.progress}}%</div>
                      <div class="mini-bar"><div class="mini-fill" [style.width.%]="inv.progress"></div></div>
                    </td>
                    <td><span class="badge" [ngClass]="inv.statusBadgeClass">{{inv.status}}</span></td>
                    <td><a routerLink="/detail" class="btn btn-ghost btn-sm">تفاصيل</a></td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class DashboardComponent {
  chips = ['6 أشهر', 'سنة', 'كل الوقت'];
  activeChip = '6 أشهر';

  investments: Investment[] = [];

  constructor(public wallet: WalletService, public invService: InvestmentService) {
    this.invService.investments$.subscribe(data => {
      this.investments = data;
    });
  }

  get totalInvestment() {
    return this.investments.reduce((sum, inv) => sum + inv.amount, 0);
  }

  get totalDrawn() {
    return this.investments.reduce((sum, inv) => sum + (inv.amount * (inv.progress / 100)), 0);
  }

  get totalEscrow() {
    return this.totalInvestment - this.totalDrawn;
  }

  get escrowDrawnPercentage() {
    return this.totalInvestment === 0 ? 0 : (this.totalDrawn / this.totalInvestment) * 100;
  }
}
