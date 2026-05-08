import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <section class="hero">
      <div class="hero-inner">
        <div>
          <div class="hero-tag">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" fill="#2ecc87" />
              <path d="M3.5 6l1.8 1.8L8.5 4.5" stroke="#fff" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
            منصة عقارية موثوقة ومرخصة
          </div>
          <h1 class="hero-title">استثمر في العقارات<br>بسهولة و<span>أمان تام</span></h1>
          <p class="hero-desc">بنيان تربطك بأفضل مشاريع التطوير العقاري في المملكة العربية السعودية — كل مشروع مُدقَّق
            وموثوق، وكل ريال تستثمره بإشراف كامل وشفافية مطلقة.</p>
          <div class="hero-actions">
            <a routerLink="/projects" class="btn btn-accent btn-lg">استعرض المشاريع ←</a>
            <a routerLink="/" fragment="how-section" class="btn btn-lg" style="color:#fff;background:transparent;border:2px solid rgba(255,255,255,.3);text-decoration:none;display:inline-flex;align-items:center;justify-content:center">كيف يعمل؟</a>
          </div>
          <p class="hero-note">✓ مرخصة ومنظمة &nbsp;·&nbsp; ✓ حساب ضماني &nbsp;·&nbsp; ✓ تقارير شهرية</p>
        </div>
        <!-- Hero Card -->
        <div class="hero-card" routerLink="/detail" style="cursor: pointer;">
          <div class="hero-proj-label">فرصة مميزة اليوم</div>
          <div class="hero-proj-name">🏢 أبراج الرقي التجاري — الرياض</div>
          <div class="hero-kpi-row">
            <div class="hero-kpi">
              <div class="hero-kpi-val">20%</div>
              <div class="hero-kpi-lbl">عائد سنوي</div>
            </div>
            <div class="hero-kpi">
              <div class="hero-kpi-val">24</div>
              <div class="hero-kpi-lbl">شهراً</div>
            </div>
            <div class="hero-kpi">
              <div class="hero-kpi-val">10K</div>
              <div class="hero-kpi-lbl">أدنى ر.س</div>
            </div>
          </div>
          <div class="hero-fund-lbl"><span>التمويل المُجمَّع</span><span>73%</span></div>
          <div class="hero-fund-bar">
            <div class="hero-fund-fill"></div>
          </div>
          <div style="font-size:11px;color:rgba(255,255,255,.4);text-align:left;margin-top:5px">متبقي: 810,000 ر.س</div>
          <div style="margin-top:16px;display:flex;gap:8px;flex-wrap:wrap">
            <span class="badge badge-green">مخاطرة منخفضة</span>
            <span class="badge" style="background:rgba(255,255,255,.1);color:rgba(255,255,255,.8)">سكني راقٍ</span>
          </div>
          <a routerLink="/detail" class="btn btn-accent" style="width:100%;margin-top:18px;text-decoration:none">عرض
            تفاصيل المشروع ←</a>
        </div>
      </div>
    </section>

    <!-- STATS STRIP -->
    <div class="stats-strip">
      <div class="container stats-grid">
        <div class="stat-item">
          <div class="stat-val">+42م</div>
          <div class="stat-lbl">ريال إجمالي التمويل</div>
        </div>
        <div class="stat-item">
          <div class="stat-val">17</div>
          <div class="stat-lbl">مشروعاً منتهياً بنجاح</div>
        </div>
        <div class="stat-item">
          <div class="stat-val">18.4%</div>
          <div class="stat-lbl">متوسط العائد السنوي</div>
        </div>
        <div class="stat-item">
          <div class="stat-val">2,400+</div>
          <div class="stat-lbl">مستثمر نشط</div>
        </div>
      </div>
    </div>

    <!-- FEATURED PROJECTS -->
    <section class="section" id="projects-section">
      <div class="container">
        <div class="section-header" style="display:flex;justify-content:space-between;align-items:flex-end">
          <div>
            <div class="tag">فرص مميزة</div>
            <h2 class="section-title">مشاريع متاحة الآن</h2>
            <p class="section-sub">مدروسة وموثقة — كل ما تحتاجه أمامك قبل أي قرار</p>
          </div>
          <a routerLink="/projects" class="btn btn-outline">عرض الكل ←</a>
        </div>
        <div class="grid-3">
          <!-- Card 1 -->
          <div class="proj-card" routerLink="/detail">
            <div class="proj-card-img">
              <img src="assets/images/OIP.jpeg" alt="Project">
              <div class="proj-card-img-overlay"></div>
              <div class="proj-card-badges"><span class="badge badge-blue">تجاري</span><span
                  class="badge badge-green">منخفضة</span></div>
            </div>
            <div class="proj-card-body">
              <div class="proj-card-type">تطوير تجاري</div>
              <div class="proj-card-name">أبراج الرقي التجاري</div>
              <div class="proj-card-loc">📍 الرياض، حي النزهة</div>
              <div class="proj-metrics">
                <div class="proj-metric">
                  <div class="proj-metric-val green">20%</div>
                  <div class="proj-metric-lbl">عائد سنوي</div>
                </div>
                <div class="proj-metric">
                  <div class="proj-metric-val">24 شهراً</div>
                  <div class="proj-metric-lbl">المدة</div>
                </div>
              </div>
              <div class="prog-wrap">
                <div class="prog-header"><span class="fw-700" style="color:var(--text1)">73% مُموَّل</span><span
                    class="text-muted">متبقي 810,000 ر.س</span></div>
                <div class="prog-bar">
                  <div class="prog-fill" style="width:73%"></div>
                </div>
              </div>
              <div class="proj-card-footer">
                <div class="proj-min">حد أدنى <strong>10,000 ر.س</strong></div>
                <a routerLink="/detail" class="btn btn-primary btn-sm">التفاصيل ←</a>
              </div>
            </div>
          </div>
          <!-- Card 2 -->
          <div class="proj-card" routerLink="/detail">
            <div class="proj-card-img">
              <img src="assets/images/OIP (1).jpeg" alt="Project">
              <div class="proj-card-img-overlay"></div>
              <div class="proj-card-badges"><span class="badge badge-gold"
                  style="background:#fdf3dc;color:#a07820">فندقي</span><span class="badge badge-green">متوسطة</span></div>
            </div>
            <div class="proj-card-body">
              <div class="proj-card-type">شقق فندقية مُدرّة للدخل</div>
              <div class="proj-card-name">مشروع بوابة جدة</div>
              <div class="proj-card-loc">📍 جدة، الكورنيش الشمالي</div>
              <div class="proj-metrics">
                <div class="proj-metric">
                  <div class="proj-metric-val green">17%</div>
                  <div class="proj-metric-lbl">عائد سنوي</div>
                </div>
                <div class="proj-metric">
                  <div class="proj-metric-val">18 شهراً</div>
                  <div class="proj-metric-lbl">المدة</div>
                </div>
              </div>
              <div class="prog-wrap">
                <div class="prog-header"><span class="fw-700" style="color:var(--text1)">45% مُموَّل</span><span
                    class="text-muted">متبقي 1.65م ر.س</span></div>
                <div class="prog-bar">
                  <div class="prog-fill" style="width:45%"></div>
                </div>
              </div>
              <div class="proj-card-footer">
                <div class="proj-min">حد أدنى <strong>25,000 ر.س</strong></div>
                <a routerLink="/detail" class="btn btn-primary btn-sm">التفاصيل ←</a>
              </div>
            </div>
          </div>
          <!-- Card 3 -->
          <div class="proj-card" routerLink="/detail">
            <div class="proj-card-img">
              <img src="assets/images/OIP (2).jpeg" alt="Project">
              <div class="proj-card-img-overlay"></div>
              <div class="proj-card-badges"><span class="badge badge-blue">سكني</span><span
                  class="badge badge-green">منخفضة</span></div>
            </div>
            <div class="proj-card-body">
              <div class="proj-card-type">تطوير سكني راقٍ</div>
              <div class="proj-card-name">مجمع النخيل السكني</div>
              <div class="proj-card-loc">📍 الدمام، حي الشاطئ</div>
              <div class="proj-metrics">
                <div class="proj-metric">
                  <div class="proj-metric-val green">16%</div>
                  <div class="proj-metric-lbl">عائد سنوي</div>
                </div>
                <div class="proj-metric">
                  <div class="proj-metric-val">30 شهراً</div>
                  <div class="proj-metric-lbl">المدة</div>
                </div>
              </div>
              <div class="prog-wrap">
                <div class="prog-header"><span class="fw-700" style="color:var(--text1)">88% مُموَّل</span><span
                    class="text-muted">متبقي 360,000 ر.س</span></div>
                <div class="prog-bar">
                  <div class="prog-fill" style="width:88%"></div>
                </div>
              </div>
              <div class="proj-card-footer">
                <div class="proj-min">حد أدنى <strong>10,000 ر.س</strong></div>
                <a routerLink="/detail" class="btn btn-primary btn-sm">التفاصيل ←</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="divider"></div>

    <!-- HOW IT WORKS -->
    <section class="section" id="how-section">
      <div class="container">
        <div class="section-header text-center">
          <div class="tag">كيف يعمل</div>
          <h2 class="section-title">أربع خطوات للاستثمار</h2>
          <p class="section-sub" style="margin:0 auto">من اختيار المشروع إلى استلام عوائدك — كل شيء واضح وميسّر</p>
        </div>
        <div class="grid-4">
          <div class="card" style="padding:24px;text-align:center">
            <div
              style="width:48px;height:48px;border-radius:50%;background:var(--bg2);color:var(--primary);font-size:20px;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 14px">
              ١</div>
            <div style="font-size:16px;font-weight:800;margin-bottom:8px">اختر مشروعك</div>
            <div style="font-size:13px;color:var(--text3);line-height:1.65">استعرض الفرص المتاحة مع التفاصيل المالية
              الكاملة</div>
          </div>
          <div class="card" style="padding:24px;text-align:center">
            <div
              style="width:48px;height:48px;border-radius:50%;background:var(--bg2);color:var(--primary);font-size:20px;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 14px">
              ٢</div>
            <div style="font-size:16px;font-weight:800;margin-bottom:8px">راجع التفاصيل</div>
            <div style="font-size:13px;color:var(--text3);line-height:1.65">اطلع على الأرقام والمستندات قبل أي قرار</div>
          </div>
          <div class="card" style="padding:24px;text-align:center">
            <div
              style="width:48px;height:48px;border-radius:50%;background:var(--bg2);color:var(--primary);font-size:20px;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 14px">
              ٣</div>
            <div style="font-size:16px;font-weight:800;margin-bottom:8px">استثمر بثقة</div>
            <div style="font-size:13px;color:var(--text3);line-height:1.65">حدد مبلغك وأكّد الاستثمار بخطوات بسيطة</div>
          </div>
          <div class="card" style="padding:24px;text-align:center">
            <div
              style="width:48px;height:48px;border-radius:50%;background:var(--bg2);color:var(--primary);font-size:20px;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 14px">
              ٤</div>
            <div style="font-size:16px;font-weight:800;margin-bottom:8px">تابع عوائدك</div>
            <div style="font-size:13px;color:var(--text3);line-height:1.65">تقارير دورية وتحديثات مستمرة من لوحة تحكمك
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="divider"></div>

    <!-- WHY BANIYAN -->
    <section class="section" id="why-section">
      <div class="container">
        <div class="section-header">
          <div class="tag">لماذا بنيان؟</div>
          <h2 class="section-title">منصة بُنيت على الثقة</h2>
          <p class="section-sub">لا وعود مبهمة — كل معلومة موجودة قبل قرارك</p>
        </div>
        <div class="grid-3">
          <div class="why-card">
            <div class="why-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div class="why-title">شفافية كاملة</div>
            <div class="why-desc">كل مستند متاح قبل الاستثمار — دراسة الجدوى، العقود، التراخيص، وتقييمات مستقلة.</div>
          </div>
          <div class="why-card">
            <div class="why-icon" style="background:var(--accent-dark)">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2">
                <path d="M9 12l2 2 4-4" />
                <path d="M21 12c0 4.97-4.03 9-9 9S3 16.97 3 12 7.03 3 12 3s9 4.03 9 9z" />
              </svg>
            </div>
            <div class="why-title">مشاريع مُدقَّقة</div>
            <div class="why-desc">كل مشروع يمر بتدقيق قانوني ومالي صارم قبل عرضه على المنصة.</div>
          </div>
          <div class="why-card">
            <div class="why-icon" style="background:var(--gold)">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <div class="why-title">متابعة مستمرة</div>
            <div class="why-desc">تقارير شهرية وتحديثات فورية على كل مرحلة من مراحل المشروع.</div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ SECTION -->
    <section class="faq-section" id="faq-section">
      <div class="container">
        <div class="faq-header">
          <img src="assets/images/logo.png" alt="Logo" style="height: 60px; margin-bottom: 10px;">
          <div style="font-size: 16px; color: var(--gold); font-weight: 700;">منصة استثمار عقاري ذكية وآمنة</div>
          <div class="faq-title-box">الأسئلة الشائعة للمستثمر</div>
        </div>

        <div style="display: flex; justify-content: center; gap: 40px; margin-bottom: 50px; flex-wrap: wrap;">
          <div style="text-align: center;">
            <div
              style="width: 50px; height: 50px; background: #f0f4f8; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px;">
              💰
            </div>
            <div style="font-weight: 700; font-size: 14px;">رسوم بسيطة جداً</div>
            <div style="font-size: 11px; color: #777;">شفافة وواضحة لا تؤثر على عائدك</div>
          </div>
          <div style="text-align: center;">
            <div
              style="width: 50px; height: 50px; background: #fff8eb; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px;">
              📈
            </div>
            <div style="font-weight: 700; font-size: 14px;">عوائد تنافسية</div>
            <div style="font-size: 11px; color: #777;">من 8% إلى 15% سنوياً</div>
          </div>
          <div style="text-align: center;">
            <div
              style="width: 50px; height: 50px; background: #eefdf5; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px;">
              🛡️
            </div>
            <div style="font-weight: 700; font-size: 14px;">حماية أموالك أولويتنا</div>
            <div style="font-size: 11px; color: #777;">صرف مرحلي + تحقق + رهن الأرض</div>
          </div>
        </div>

        <div class="faq-grid">
          <!-- FAQ Items -->
          @for (faq of faqs; track faq.id) {
            <div class="faq-card">
              <div class="faq-num">{{faq.id}}</div>
              <div class="faq-content">
                <h3>{{faq.question}}</h3>
                <p [innerHTML]="faq.answer"></p>
              </div>
              <div class="faq-icon-box">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" [attr.stroke]="faq.iconColor || 'var(--primary)'" stroke-width="1.8"
                  stroke-linecap="round" stroke-linejoin="round">
                  <ng-container [ngSwitch]="faq.icon">
                    <ng-container *ngSwitchCase="'help'">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </ng-container>
                    <ng-container *ngSwitchCase="'shield'">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="M9 12l2 2 4-4" />
                    </ng-container>
                    <ng-container *ngSwitchCase="'lock'">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </ng-container>
                    <ng-container *ngSwitchCase="'dollar'">
                      <line x1="12" y1="1" x2="12" y2="23" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </ng-container>
                    <ng-container *ngSwitchCase="'clock'">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </ng-container>
                    <ng-container *ngSwitchCase="'bell-off'">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </ng-container>
                    <ng-container *ngSwitchCase="'file-text'">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </ng-container>
                    <ng-container *ngSwitchCase="'credit-card'">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                      <line x1="1" y1="10" x2="23" y2="10" />
                    </ng-container>
                    <ng-container *ngSwitchCase="'trending-up'">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                      <polyline points="17 6 23 6 23 12" />
                    </ng-container>
                    <ng-container *ngSwitchCase="'user-plus'">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <line x1="20" y1="8" x2="20" y2="14" />
                      <line x1="23" y1="11" x2="17" y2="11" />
                    </ng-container>
                    <ng-container *ngSwitchCase="'users'">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </ng-container>
                    <ng-container *ngSwitchCase="'star'">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </ng-container>
                  </ng-container>
                </svg>
              </div>
            </div>
          }
        </div>

        <div class="faq-footer-banner">
          <div
            style="background: #fff; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; color: #0f3360; font-size: 20px;">
            ✓
          </div>
          <h4>لا يتم صرف أي مبلغ للمطور إلا بعد التحقق من إنجاز المرحلة، مع وجود رهن على أصل المشروع (الأرض) لحماية
            المستثمر.</h4>
        </div>
      </div>
    </section>

    <section class="section" style="background: #fdfdfd;">
      <div class="container">
        <div style="display: flex; justify-content: center; gap: 30px; flex-wrap: wrap;">
          <div style="display: flex; align-items: center; gap: 10px; font-size: 13px; color: #666;">
            <span>🤝</span> فرص استثمارية حقيقية
          </div>
          <div style="display: flex; align-items: center; gap: 10px; font-size: 13px; color: #666;">
            <span>🛡️</span> حماية قوية لأموالك
          </div>
          <div style="display: flex; align-items: center; gap: 10px; font-size: 13px; color: #666;">
            <span>📊</span> عوائد تنافسية
          </div>
          <div style="display: flex; align-items: center; gap: 10px; font-size: 13px; color: #666;">
            <span>💰</span> رسوم بسيطة وشفافة
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class HomeComponent {
  faqs = [
    { id: '01', question: 'كيف تعمل منصة بنيان؟', answer: 'تمكنك بنيان من الاستثمار في مشاريع عقارية عبر تمويل مرحلي، حيث يتم صرف الأموال للمطور تدريجياً بعد التحقق من إنجاز كل مرحلة.', icon: 'help' },
    { id: '02', question: 'كيف يتم حماية أموالي؟', answer: 'نعتمد على ثلاث طبقات حماية:<br>• صرف مرحلي حسب الإنجاز<br>• التحقق من تقدم المشروع قبل الصرف<br>• رهن أرض المشروع كضمان للمستثمرين', icon: 'shield' },
    { id: '03', question: 'ماذا يعني رهن الأرض؟', answer: 'رهن الارض لصالح المنصة وهي تقوم بدورها بمراقبة المشروع لكل مرحلة', icon: 'lock', iconColor: 'var(--accent-dark)' },
    { id: '04', question: 'ما هو العائد المتوقع؟', answer: 'يتراوح العائد المتوقع عادة بين 8% إلى 15% سنوياً حسب نوع المشروع ومستوى المخاطر.', icon: 'dollar', iconColor: 'var(--gold)' },
    { id: '05', question: 'متى أستلم أرباحي؟', answer: 'تختلف حسب المشروع، إما عند اكتمال المشروع أو وفق جدول توزيعات محدد يتم توضيحه مسبقاً.', icon: 'clock' },
    { id: '06', question: 'هل يمكن الخروج قبل نهاية المشروع؟', answer: 'بعض المشاريع تتيح خيارات خروج مبكر، وسيتم توضيح ذلك ضمن تفاصيل كل مشروع قبل الاستثمار.', icon: 'bell-off' },
    { id: '07', question: 'من يتحقق من تقدم المشروع؟', answer: 'يتم التحقق من تقدم المشروع من خلال تقارير فنية وجهات مختصة، ولا يتم صرف أي دفعة إلا بعد التأكد من تنفيذ المرحلة.', icon: 'file-text' },
    { id: '08', question: 'هل توجد رسوم؟', answer: 'نعم، توجد رسوم بسيطة جداً ومحدودة، يتم توضيحها بشكل كامل قبل تنفيذ أي استثمار.', icon: 'credit-card', iconColor: 'var(--gold)' },
    { id: '09', question: 'كيف تربح المنصة؟', answer: 'تعتمد بنيان على رسوم تشغيل وإدارة بسيطة على الاستثمارات والمطورين، بدون أي تكاليف مخفية، وبشفافية كاملة.', icon: 'trending-up', iconColor: 'var(--accent-dark)' },
    { id: '10', question: 'كيف أبدأ الاستثمار؟', answer: '1. إنشاء حساب<br>2. تصفح المشاريع المتاحة<br>3. اختيار المشروع المناسب<br>4. تحديد مبلغ الاستثمار<br>5. تأكيد العملية', icon: 'user-plus' },
    { id: '11', question: 'لماذا تركز بنيان على المطورين الصغار والمتوسطين؟', answer: 'يوجد فجوة تمويلية في السوق، حيث يواجه المطورون الصغار والمتوسطون صعوبة في الحصول على التمويل من الجهات التقليدية رغم وجود مشاريع واعدة. بنيان تسد هذه الفجوة عبر ربطهم بالمستثمرين وتوفير تمويل منظم وتقليل المخاطر.', icon: 'users' },
    { id: '12', question: 'كيف تستفيد كمستثمر من هذه الفجوة؟', answer: 'تتيح هذه الفجوة فرص استثمارية بعوائد أعلى نسبياً ودخول مبكر في مشاريع واعدة لم تحصل على تمويل كافٍ من القنوات التقليدية، مع حماية عالية عبر رهن الأرض، الصرف المرحلي، التحقق قبل الصرف.', icon: 'star', iconColor: 'var(--accent-dark)' }
  ];

}
