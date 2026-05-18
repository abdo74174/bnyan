import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectService, Project } from '../../services/project.service';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    @if (project) {
      <!-- Hero -->
      <div class="detail-hero">
        <div class="container">
          <div style="font-size:12px;color:rgba(255,255,255,.45);margin-bottom:14px">
            <a routerLink="/projects" style="color:rgba(255,255,255,.5);text-decoration:none">المشاريع</a>
            <span style="color:rgba(255,255,255,.7)"> / {{project.name}}</span>
          </div>
          <div style="display:flex;gap:10px;margin-bottom:12px;flex-wrap:wrap">
            <span class="badge badge-green">{{project.status}}</span>
            <span class="badge badge-gold">مخاطرة {{project.risk}}</span>
            <span class="badge" [ngClass]="project.typeBadgeClass">{{project.type}}</span>
          </div>
          <h1 class="detail-title">{{project.name}}</h1>
          <div class="detail-meta">
            <span class="detail-meta-item">📍 {{project.location}}</span>
            <span class="detail-meta-item">🏢 {{project.category}}</span>
            <span class="detail-meta-item">📅 مدة {{project.duration}} شهراً</span>
          </div>
        </div>
      </div>

      <!-- KPI Bar -->
      <div class="detail-kpi-bar">
        <div class="detail-kpi-inner">
          <div class="detail-kpi">
            <div class="detail-kpi-val">{{project.roi}}%</div>
            <div class="detail-kpi-lbl">العائد السنوي</div>
          </div>
          <div class="detail-kpi">
            <div class="detail-kpi-val">{{project.duration}} شهراً</div>
            <div class="detail-kpi-lbl">مدة الاستثمار</div>
          </div>
          <div class="detail-kpi">
            <div class="detail-kpi-val">{{project.totalFunding | number}}</div>
            <div class="detail-kpi-lbl">حجم التمويل (ر.س)</div>
          </div>
          <div class="detail-kpi">
            <div class="detail-kpi-val">{{project.minInvest | number}}</div>
            <div class="detail-kpi-lbl">الحد الأدنى (ر.س)</div>
          </div>
        </div>
      </div>

      <!-- Body -->
      <div class="detail-body">
        <div class="detail-grid">
          <!-- Main Column -->
          <div>
            <!-- Gallery -->
            <div class="img-gallery">
              <div class="img-main"><img [src]="project.imgs[0]" alt="Main"></div>
              <div class="img-side">
                <div class="img-thumb"><img [src]="project.imgs[1]" alt="Side 1"></div>
                <div class="img-thumb"><img [src]="project.imgs[2]" alt="Side 2"></div>
              </div>
            </div>

            <!-- Description -->
            <div class="detail-card">
              <div class="detail-card-title">📋 نبذة عن المشروع</div>
              <p style="font-size:14px;color:var(--text2);line-height:1.85">{{project.description}}</p>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:16px">
                <div style="background:var(--bg);border-radius:8px;padding:12px">
                  <div style="font-size:11px;color:var(--text3);margin-bottom:3px">نوع العائد</div>
                  <div style="font-size:14px;font-weight:800">{{project.returnType}}</div>
                </div>
                <div style="background:var(--bg);border-radius:8px;padding:12px">
                  <div style="font-size:11px;color:var(--text3);margin-bottom:3px">مستوى المخاطرة</div>
                  <div style="font-size:14px;font-weight:800">
                    <span [class]="'risk-dot risk-' + project.riskLevel"></span>
                    {{project.risk}}
                  </div>
                </div>
              </div>
            </div>

            <!-- Allocation -->
            <div class="detail-card">
              <div class="detail-card-title">💰 استخدام أموال الاستثمار</div>
              @for (alloc of project.allocation; track alloc.label) {
                <div class="alloc-row">
                  <div class="alloc-lbl">{{alloc.label}}</div>
                  <div class="alloc-bar-wrap">
                    <div class="alloc-bar" [style.width.%]="alloc.pct" [style.background]="alloc.color"></div>
                  </div>
                  <div class="alloc-pct">{{alloc.pct}}%</div>
                </div>
              }
            </div>

            <!-- Timeline -->
            <div class="detail-card">
              <div class="detail-card-title">📅 مراحل التنفيذ</div>
              <div class="tl">
                @for (stage of project.stages; track stage.name) {
                  <div class="tl-item">
                    <div class="tl-dot-wrap">
                      <div class="tl-dot" [class.done]="stage.status==='done'" [class.active]="stage.status==='active'"></div>
                    </div>
                    <div class="tl-content">
                      <div class="tl-lbl">{{stage.name}}</div>
                      <div class="tl-date">{{stage.period}}</div>
                      <div class="tl-status">
                        @if (stage.status === 'done') {
                          <span class="badge badge-green">✓ مكتملة</span>
                        } @else if (stage.status === 'active') {
                          <span class="badge badge-blue">⟳ جارية — {{stage.percent}}%</span>
                        } @else {
                          <span class="badge" style="background:var(--bg2);color:var(--text3)">قادمة</span>
                        }
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>

            <!-- Updates -->
            <div class="detail-card">
              <div class="detail-card-title">📣 آخر التحديثات</div>
              @for (upd of project.updates; track upd.date) {
                <div class="update-item">
                  <div class="update-date">{{upd.date}}</div>
                  <div class="update-text">{{upd.text}}</div>
                </div>
              }
            </div>

            <!-- Risk -->
            <div class="risk-box">
              <div class="risk-title">⚠️ الإفصاح عن المخاطر</div>
              <div class="risk-item"><span>•</span>الاستثمار العقاري ينطوي على مخاطر — العائد المذكور تقديري وليس مضموناً.</div>
              <div class="risk-item"><span>•</span>تأخر في التسليم ممكن نتيجة ظروف الإنشاء — يُعالَج بصندوق الاحتياطي.</div>
              <div class="risk-item"><span>•</span>السيولة محدودة — الاستثمار غير قابل للسحب خلال مدة المشروع.</div>
            </div>

            <!-- Documents -->
            <div class="detail-card">
              <div class="detail-card-title">📁 المستندات القانونية</div>
              <div class="doc-row">
                <div class="doc-info"><span style="font-size:18px">📊</span><div><div class="doc-name">دراسة الجدوى المالية</div><div class="doc-date">مارس 2025</div></div></div>
                <button class="btn btn-ghost btn-sm">تحميل</button>
              </div>
              <div class="doc-row">
                <div class="doc-info"><span style="font-size:18px">📋</span><div><div class="doc-name">عقد التطوير العقاري</div><div class="doc-date">فبراير 2025</div></div></div>
                <button class="btn btn-ghost btn-sm">تحميل</button>
              </div>
              <div class="doc-row">
                <div class="doc-info"><span style="font-size:18px">🏛</span><div><div class="doc-name">تقرير التقييم المستقل</div><div class="doc-date">يناير 2025</div></div></div>
                <button class="btn btn-ghost btn-sm">تحميل</button>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div>
            <div class="invest-sidebar" style="position:sticky;top:84px">
              <div style="font-size:16px;font-weight:800;margin-bottom:16px">الاستثمار في هذا المشروع</div>

              <!-- Progress -->
              <div style="margin-bottom:18px">
                <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px">
                  <span style="color:var(--text3)">التمويل المُجمَّع</span>
                  <strong>{{project.progress}}%</strong>
                </div>
                <div class="prog-bar" style="height:10px;border-radius:6px">
                  <div class="prog-fill" [style.width.%]="project.progress"></div>
                </div>
                <div style="display:flex;justify-content:space-between;font-size:12px;margin-top:6px">
                  <span style="color:var(--text3)">متبقي: {{project.remaining}} ر.س</span>
                  <span style="color:var(--text3)">{{project.totalFunding | number}} ر.س</span>
                </div>
              </div>

              <!-- Metrics -->
              <div style="background:var(--bg);border-radius:var(--r);padding:14px;margin-bottom:16px">
                <div class="sidebar-row"><span class="sidebar-row-lbl">العائد السنوي</span><span class="sidebar-row-val accent">{{project.roi}}%</span></div>
                <div class="sidebar-row"><span class="sidebar-row-lbl">مدة الاستثمار</span><span class="sidebar-row-val">{{project.duration}} شهراً</span></div>
                <div class="sidebar-row"><span class="sidebar-row-lbl">الحد الأدنى</span><span class="sidebar-row-val">{{project.minInvest | number}} ر.س</span></div>
                <div class="sidebar-row" style="margin-bottom:0"><span class="sidebar-row-lbl">نوع العائد</span><span class="sidebar-row-val">{{project.returnType}}</span></div>
              </div>

              <!-- ROI Preview -->
              <div style="background:linear-gradient(135deg,var(--primary-dark),var(--primary));border-radius:var(--r);padding:16px;margin-bottom:16px">
                <div style="font-size:11px;color:rgba(255,255,255,.6);margin-bottom:8px">مثال: استثمار 50,000 ر.س</div>
                <div style="display:flex;justify-content:space-between;margin-bottom:6px">
                  <span style="font-size:12px;color:rgba(255,255,255,.7)">العائد السنوي</span>
                  <span style="font-size:13px;font-weight:700;color:#fff">{{(50000 * project.roi / 100) | number}} ر.س</span>
                </div>
                <div style="display:flex;justify-content:space-between">
                  <span style="font-size:12px;color:rgba(255,255,255,.7)">عند الاستحقاق</span>
                  <span style="font-size:15px;font-weight:800;color:#4eedb3">{{(50000 + (50000 * project.roi / 100) * (project.duration / 12)) | number}} ر.س</span>
                </div>
              </div>

              <a [routerLink]="['/payment', project.id]" class="btn btn-accent" style="width:100%;margin-bottom:10px;text-decoration:none;display:flex;justify-content:center;font-size:15px;padding:14px">
                استثمر الآن ←
              </a>
              <div style="font-size:11px;color:var(--text3);text-align:center;margin-bottom:16px">🔒 أموالك محفوظة في حساب ضماني مستقل</div>

              <!-- Guarantees -->
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
                <div style="background:var(--bg);border-radius:8px;padding:10px;text-align:center">
                  <div style="font-size:18px">🔒</div>
                  <div style="font-size:10px;color:var(--text3);margin-top:4px">حساب ضماني</div>
                </div>
                <div style="background:var(--bg);border-radius:8px;padding:10px;text-align:center">
                  <div style="font-size:18px">📊</div>
                  <div style="font-size:10px;color:var(--text3);margin-top:4px">تقارير شهرية</div>
                </div>
                <div style="background:var(--bg);border-radius:8px;padding:10px;text-align:center">
                  <div style="font-size:18px">📜</div>
                  <div style="font-size:10px;color:var(--text3);margin-top:4px">عقد موثق</div>
                </div>
                <div style="background:var(--bg);border-radius:8px;padding:10px;text-align:center">
                  <div style="font-size:18px">🏛</div>
                  <div style="font-size:10px;color:var(--text3);margin-top:4px">رقابة تنظيمية</div>
                </div>
              </div>
            </div>

            <!-- Developer Card -->
            <div style="background:#fff;border:1px solid var(--border);border-radius:var(--r-lg);padding:20px;margin-top:16px;box-shadow:var(--shadow)">
              <div style="font-size:13px;font-weight:700;color:var(--text2);margin-bottom:12px">الجهة المطورة</div>
              <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
                <div style="width:44px;height:44px;border-radius:10px;background:var(--primary-dark);display:flex;align-items:center;justify-content:center;font-size:18px;color:#fff;font-weight:800">
                  {{project.developer.charAt(0)}}
                </div>
                <div>
                  <div style="font-size:14px;font-weight:800">{{project.developer}}</div>
                  <div style="font-size:12px;color:var(--text3)">{{project.developerExp}} عاماً من الخبرة</div>
                </div>
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
                <div style="background:var(--bg);border-radius:8px;padding:10px;text-align:center">
                  <div style="font-size:18px;font-weight:800;color:var(--primary)">{{project.developerProjects}}</div>
                  <div style="font-size:11px;color:var(--text3)">مشروع منجز</div>
                </div>
                <div style="background:var(--bg);border-radius:8px;padding:10px;text-align:center">
                  <div style="font-size:18px;font-weight:800;color:var(--primary)">{{project.developerRating}}</div>
                  <div style="font-size:11px;color:var(--text3)">التقييم / 5</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sticky CTA -->
      <div class="sticky-cta">
        <div style="display:flex;align-items:center;gap:20px">
          <div>
            <div style="font-size:22px;font-weight:800;color:var(--accent-dark)">{{project.progress}}%</div>
            <div style="font-size:11px;color:var(--text3)">مُموَّل</div>
          </div>
          <div style="width:140px;height:6px;background:var(--bg2);border-radius:3px;overflow:hidden">
            <div [style.width.%]="project.progress" style="height:100%;background:linear-gradient(90deg,var(--primary),var(--primary-light));border-radius:3px"></div>
          </div>
          <span style="font-size:13px;color:var(--text3)">متبقي {{project.remaining}} ر.س</span>
        </div>
        <div style="display:flex;align-items:center;gap:16px">
          <div style="text-align:center">
            <div style="font-size:20px;font-weight:800;color:var(--accent-dark)">{{project.roi}}%</div>
            <div style="font-size:11px;color:var(--text3)">عائد سنوي</div>
          </div>
          <a [routerLink]="['/payment', project.id]" class="btn btn-accent btn-lg" style="text-decoration:none">استثمر الآن ←</a>
        </div>
      </div>

    } @else {
      <div style="text-align:center;padding:100px 20px">
        <div style="font-size:48px;margin-bottom:16px">🔍</div>
        <h2>المشروع غير موجود</h2>
        <a routerLink="/projects" class="btn btn-primary" style="margin-top:20px">العودة للمشاريع</a>
      </div>
    }
  `,
  styles: [`
    :host { display: block; }
    .risk-dot {
      display: inline-block; width: 8px; height: 8px;
      border-radius: 50%; margin-left: 4px;
    }
    .risk-dot.risk-low { background: var(--accent); }
    .risk-dot.risk-medium { background: var(--gold); }
    .risk-dot.risk-high { background: var(--red); }
  `]
})
export class ProjectDetailComponent implements OnInit {
  project: Project | undefined;

  constructor(private route: ActivatedRoute, private projectService: ProjectService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.project = this.projectService.getById(id);
    });
  }
}
