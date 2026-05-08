import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <section class="section-sm">
      <div class="container">
        <div class="section-header">
          <div class="tag">الفرص الاستثمارية</div>
          <h1 class="section-title">المشاريع العقارية المتاحة</h1>
          <p class="section-sub">مشاريع مدروسة ومعروضة بشفافية كاملة</p>
        </div>
        <!-- Filters -->
        <div class="filters">
          <span class="filter-lbl">تصفية:</span>
          <select class="filter-select"><option>كل المدن</option><option>الرياض</option><option>جدة</option><option>الدمام</option><option>الخبر</option></select>
          <select class="filter-select"><option>كل الأسعار</option><option>أقل من 25,000</option><option>25,000 – 100,000</option><option>أكثر من 100,000</option></select>
          <select class="filter-select"><option>كل العوائد</option><option>أقل من 15%</option><option>15% – 20%</option><option>أكثر من 20%</option></select>
          <span style="height:24px;width:1px;background:var(--border)"></span>
          @for (chip of chips; track chip) {
            <button class="filter-chip" [class.active]="activeChip === chip" (click)="setChip(chip)">{{chip}}</button>
          }
        </div>
        <!-- Cards -->
        <div class="grid-3">
          @for (project of projects; track project.id) {
            <div class="proj-card" routerLink="/detail">
              <div class="proj-card-img">
                <img [src]="project.img" [alt]="project.name">
                <div class="proj-card-img-overlay"></div>
                <div class="proj-card-badges">
                  <span class="badge" [ngClass]="project.typeBadgeClass">{{project.type}}</span>
                  <span class="badge badge-green">{{project.risk}}</span>
                </div>
              </div>
              <div class="proj-card-body">
                <div class="proj-card-type">{{project.category}}</div>
                <div class="proj-card-name">{{project.name}}</div>
                <div class="proj-card-loc">📍 {{project.location}}</div>
                <div class="proj-metrics">
                  <div class="proj-metric">
                    <div class="proj-metric-val green">{{project.roi}}%</div>
                    <div class="proj-metric-lbl">عائد سنوي</div>
                  </div>
                  <div class="proj-metric">
                    <div class="proj-metric-val">{{project.duration}} شهراً</div>
                    <div class="proj-metric-lbl">المدة</div>
                  </div>
                </div>
                <div class="prog-wrap">
                  <div class="prog-header">
                    <span style="font-weight:700;color:var(--text1)">{{project.progress}}%</span>
                    <span style="color:var(--text3)">متبقي {{project.remaining}} ر.س</span>
                  </div>
                  <div class="prog-bar">
                    <div class="prog-fill" [style.width.%]="project.progress"></div>
                  </div>
                </div>
                <div class="proj-card-footer">
                  <div class="proj-min">حد أدنى <strong>{{project.minInvest}} ر.س</strong></div>
                  <a routerLink="/detail" class="btn btn-primary btn-sm">التفاصيل ←</a>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class ProjectsComponent {
  chips = ['الكل', 'سكني', 'تجاري', 'فندقي'];
  activeChip = 'الكل';

  projects = [
    { id: 1, name: 'أبراج الرقي التجاري', location: 'الرياض', type: 'تجاري', category: 'تطوير تجاري', img: 'assets/images/OIP (3).jpeg', roi: 20, duration: 24, progress: 73, remaining: '810,000', minInvest: '10,000', risk: 'منخفضة', typeBadgeClass: 'badge-blue' },
    { id: 2, name: 'بوابة جدة', location: 'جدة', type: 'فندقي', category: 'شقق فندقية', img: 'assets/images/OIP (4).jpeg', roi: 17, duration: 18, progress: 45, remaining: '1.65م', minInvest: '25,000', risk: 'متوسطة', typeBadgeClass: 'badge-gold' },
    { id: 3, name: 'النخيل السكني', location: 'الدمام', type: 'سكني', category: 'سكني راقٍ', img: 'assets/images/OIP (5).jpeg', roi: 16, duration: 30, progress: 88, remaining: '360,000', minInvest: '10,000', risk: 'منخفضة', typeBadgeClass: 'badge-blue' },
    { id: 4, name: 'واجهة الخبر', location: 'الخبر', type: 'مختلط', category: 'مختلط تجاري-سكني', img: 'assets/images/OIP (6).jpeg', roi: 19, duration: 20, progress: 31, remaining: '2.07م', minInvest: '15,000', risk: 'منخفضة', typeBadgeClass: 'badge-blue' },
    { id: 5, name: 'ريزيدنس العليا', location: 'الرياض', type: 'ضيافة', category: 'شقق ضيافة فاخرة', img: 'assets/images/OIP (7).jpeg', roi: 22, duration: 36, progress: 60, remaining: '1.2م', minInvest: '50,000', risk: 'متوسطة', typeBadgeClass: 'badge-gold' },
    { id: 6, name: 'الياسمين السكني', location: 'المدينة المنورة', type: 'سكني', category: 'مبنى سكني', img: 'assets/images/OIP (8).jpeg', roi: 15, duration: 24, progress: 95, remaining: '125,000', minInvest: '10,000', risk: 'منخفضة', typeBadgeClass: 'badge-blue' }
  ];

  setChip(chip: string) {
    this.activeChip = chip;
  }
}
