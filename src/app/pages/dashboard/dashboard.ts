import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <!-- Header -->
    <div class="dash-header">
      <div class="container">
        <div class="dash-welcome">مرحباً بك،</div>
        <div class="dash-name">أحمد الحربي</div>
        <div class="dash-kpis">
          <div class="dash-kpi"><div class="dash-kpi-val">385,000</div><div class="dash-kpi-lbl">إجمالي المحفظة (ر.س)</div><div class="dash-kpi-change">↑ +50,000 هذا الشهر</div></div>
          <div class="dash-kpi"><div class="dash-kpi-val">69,300</div><div class="dash-kpi-lbl">العوائد المتوقعة (ر.س)</div></div>
          <div class="dash-kpi"><div class="dash-kpi-val">4</div><div class="dash-kpi-lbl">مشاريع نشطة</div></div>
          <div class="dash-kpi"><div class="dash-kpi-val">18%</div><div class="dash-kpi-lbl">متوسط العائد</div><div class="dash-kpi-change">↑ +2% عن الهدف</div></div>
        </div>
      </div>
    </div>

    <section class="section-sm">
      <div class="container">
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

  investments = [
    { id: 1, name: 'أبراج الرقي التجاري', type: 'تجاري', location: 'الرياض', amount: 50000, expectedReturn: 20000, remainingMonths: 14, progress: 42, status: 'نشط', statusBadgeClass: 'badge-green', img: 'assets/images/OIP (1).jpeg' },
    { id: 2, name: 'بوابة جدة', type: 'فندقي', location: 'جدة', amount: 100000, expectedReturn: 34000, remainingMonths: 8, progress: 70, status: 'نشط', statusBadgeClass: 'badge-green', img: 'assets/images/OIP (4).jpeg' },
    { id: 3, name: 'النخيل السكني', type: 'سكني', location: 'الدمام', amount: 75000, expectedReturn: 18000, remainingMonths: 22, progress: 15, status: 'جديد', statusBadgeClass: 'badge-blue', img: 'assets/images/OIP (5).jpeg' },
    { id: 4, name: 'واجهة الخبر', type: 'مختلط', location: 'الخبر', amount: 160000, expectedReturn: 48640, remainingMonths: 16, progress: 25, status: 'نشط', statusBadgeClass: 'badge-green', img: 'assets/images/OIP (6).jpeg' }
  ];
}
