import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService, Project } from '../../services/project.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
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
          <select class="filter-select" [(ngModel)]="filterCity" (ngModelChange)="applyFilter()">
            <option value="">كل المدن</option>
            <option value="الرياض">الرياض</option>
            <option value="جدة">جدة</option>
            <option value="الدمام">الدمام</option>
            <option value="الخبر">الخبر</option>
            <option value="المدينة">المدينة المنورة</option>
          </select>
          <select class="filter-select" [(ngModel)]="filterRoi" (ngModelChange)="applyFilter()">
            <option value="">كل العوائد</option>
            <option value="low">أقل من 17%</option>
            <option value="mid">17% – 20%</option>
            <option value="high">أكثر من 20%</option>
          </select>
          <select class="filter-select" [(ngModel)]="filterRisk" (ngModelChange)="applyFilter()">
            <option value="">كل المخاطر</option>
            <option value="منخفضة">منخفضة</option>
            <option value="متوسطة">متوسطة</option>
          </select>
          <span style="height:24px;width:1px;background:var(--border)"></span>
          @for (chip of chips; track chip) {
            <button class="filter-chip" [class.active]="activeChip === chip" (click)="setChip(chip)">{{chip}}</button>
          }
        </div>

        <!-- Results Count -->
        <div style="font-size:13px;color:var(--text3);margin-bottom:20px">
          عرض <strong>{{filtered.length}}</strong> مشروع من أصل {{allProjects.length}}
        </div>

        <!-- Cards -->
        <div class="grid-3">
          @for (project of filtered; track project.id) {
            <div class="proj-card" [routerLink]="['/project', project.id]">
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
                  <div class="proj-metric">
                    <div class="proj-metric-val">{{project.minInvest | number}}</div>
                    <div class="proj-metric-lbl">حد أدنى ر.س</div>
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
                  <div class="proj-min">حد أدنى <strong>{{project.minInvest | number}} ر.س</strong></div>
                  <div style="display:flex;gap:8px">
                    <a [routerLink]="['/payment', project.id]" class="btn btn-accent btn-sm" (click)="$event.stopPropagation()">استثمر ←</a>
                    <a [routerLink]="['/project', project.id]" class="btn btn-primary btn-sm" (click)="$event.stopPropagation()">التفاصيل</a>
                  </div>
                </div>
              </div>
            </div>
          }

          @if (filtered.length === 0) {
            <div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--text3)">
              <div style="font-size:48px;margin-bottom:12px">🔍</div>
              <div style="font-size:16px;font-weight:700">لا توجد مشاريع تطابق الفلترة المحددة</div>
              <button class="btn btn-ghost" style="margin-top:16px" (click)="resetFilters()">إعادة ضبط الفلاتر</button>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`:host { display: block; }`]
})
export class ProjectsComponent {
  chips = ['الكل', 'سكني', 'تجاري', 'فندقي', 'مختلط', 'ضيافة'];
  activeChip = 'الكل';
  filterCity = '';
  filterRoi = '';
  filterRisk = '';

  allProjects: Project[];
  filtered: Project[];

  constructor(private projectService: ProjectService) {
    this.allProjects = this.projectService.getAll();
    this.filtered = [...this.allProjects];
  }

  setChip(chip: string) {
    this.activeChip = chip;
    this.applyFilter();
  }

  applyFilter() {
    this.filtered = this.allProjects.filter(p => {
      const chipMatch = this.activeChip === 'الكل' || p.type === this.activeChip;
      const cityMatch = !this.filterCity || p.location.includes(this.filterCity);
      const riskMatch = !this.filterRisk || p.risk === this.filterRisk;
      let roiMatch = true;
      if (this.filterRoi === 'low') roiMatch = p.roi < 17;
      else if (this.filterRoi === 'mid') roiMatch = p.roi >= 17 && p.roi <= 20;
      else if (this.filterRoi === 'high') roiMatch = p.roi > 20;
      return chipMatch && cityMatch && riskMatch && roiMatch;
    });
  }

  resetFilters() {
    this.activeChip = 'الكل';
    this.filterCity = '';
    this.filterRoi = '';
    this.filterRisk = '';
    this.filtered = [...this.allProjects];
  }
}
