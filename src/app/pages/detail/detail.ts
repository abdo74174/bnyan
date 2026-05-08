import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <!-- Detail Hero -->
    <div class="detail-hero">
      <div class="container">
        <div style="font-size:12px;color:rgba(255,255,255,.45);margin-bottom:14px">المشاريع <span style="color:rgba(255,255,255,.7)">/ أبراج الرقي التجاري</span></div>
        <div style="display:flex;gap:10px;margin-bottom:12px;flex-wrap:wrap">
          <span class="badge badge-green">نشط — قيد التمويل</span>
          <span class="badge badge-gold">مخاطرة منخفضة</span>
          <span class="badge badge-blue">تجاري</span>
        </div>
        <h1 class="detail-title">أبراج الرقي التجاري</h1>
        <div class="detail-meta">
          <span class="detail-meta-item">📍 الرياض، حي النزهة</span>
          <span class="detail-meta-item">🏢 برج تجاري — 18 طابقاً</span>
          <span class="detail-meta-item">📅 نُشر مارس 2025</span>
        </div>
      </div>
    </div>

    <!-- KPI Bar -->
    <div class="detail-kpi-bar">
      <div class="detail-kpi-inner">
        <div class="detail-kpi"><div class="detail-kpi-val">20%</div><div class="detail-kpi-lbl">العائد السنوي</div></div>
        <div class="detail-kpi"><div class="detail-kpi-val">24 شهراً</div><div class="detail-kpi-lbl">مدة الاستثمار</div></div>
        <div class="detail-kpi"><div class="detail-kpi-val">3,000,000</div><div class="detail-kpi-lbl">حجم التمويل (ر.س)</div></div>
        <div class="detail-kpi"><div class="detail-kpi-val">10,000</div><div class="detail-kpi-lbl">الحد الأدنى (ر.س)</div></div>
      </div>
    </div>

    <div class="detail-body">
      <div class="detail-grid">
        <!-- Main Column -->
        <div>
          <div class="img-gallery">
            <div class="img-main"><img src="assets/images/OIP (1).jpeg" alt="Main"></div>
            <div class="img-side">
              <div class="img-thumb"><img src="assets/images/OIP (2).jpeg" alt="Side 1"></div>
              <div class="img-thumb"><img src="assets/images/OIP (3).jpeg" alt="Side 2"></div>
            </div>
          </div>
          <!-- Summary -->
          <div class="detail-card">
            <div class="detail-card-title">📋 نبذة عن المشروع</div>
            <p style="font-size:14px;color:var(--text2);line-height:1.8">مشروع أبراج الرقي التجاري برج تجاري من الدرجة الأولى في حي النزهة بالرياض — أحد أكثر المواقع طلباً. يضم 18 طابقاً من المساحات المكتبية الفاخرة، وطابقين تجاريين. يستهدف الشركات الكبرى والمتوسطة بعقود إيجار طويلة الأمد لضمان دخل إيجاري ثابت ومنتظم.</p>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:16px">
              <div style="background:var(--bg);border-radius:8px;padding:12px"><div style="font-size:11px;color:var(--text3);margin-bottom:3px">حالة المشروع</div><div style="font-size:14px;font-weight:800">قيد الإنشاء — مرحلة الهيكل</div></div>
              <div style="background:var(--bg);border-radius:8px;padding:12px"><div style="font-size:11px;color:var(--text3);margin-bottom:3px">نوع العائد</div><div style="font-size:14px;font-weight:800">رأسمالي + إيجاري</div></div>
            </div>
          </div>
          <!-- Allocation -->
          <div class="detail-card">
            <div class="detail-card-title">💰 استخدام أموال الاستثمار</div>
            <div class="alloc-row"><div class="alloc-lbl">البناء والإنشاء</div><div class="alloc-bar-wrap"><div class="alloc-bar" style="width:65%;background:var(--primary)"></div></div><div class="alloc-pct">65%</div></div>
            <div class="alloc-row"><div class="alloc-lbl">التشطيبات والتجهيزات</div><div class="alloc-bar-wrap"><div class="alloc-bar" style="width:20%;background:var(--gold)"></div></div><div class="alloc-pct">20%</div></div>
            <div class="alloc-row"><div class="alloc-lbl">التسويق والإشغال</div><div class="alloc-bar-wrap"><div class="alloc-bar" style="width:10%;background:var(--accent)"></div></div><div class="alloc-pct">10%</div></div>
            <div class="alloc-row"><div class="alloc-lbl">احتياطي تشغيلي</div><div class="alloc-bar-wrap"><div class="alloc-bar" style="width:5%;background:#aaa"></div></div><div class="alloc-pct">5%</div></div>
          </div>
          <!-- Timeline -->
          <div class="detail-card">
            <div class="detail-card-title">📅 مراحل التنفيذ</div>
            <div class="tl">
              <div class="tl-item"><div class="tl-dot-wrap"><div class="tl-dot done"></div></div><div class="tl-content"><div class="tl-lbl">إعداد الموقع والتأسيس</div><div class="tl-date">يناير — مارس 2025</div><div class="tl-status"><span class="badge badge-green">✓ مكتملة</span></div></div></div>
              <div class="tl-item"><div class="tl-dot-wrap"><div class="tl-dot active"></div></div><div class="tl-content"><div class="tl-lbl">الهيكل الإنشائي والخرسانة</div><div class="tl-date">أبريل — أغسطس 2025</div><div class="tl-status"><span class="badge badge-blue">⟳ جارية — 60%</span></div></div></div>
              <div class="tl-item"><div class="tl-dot-wrap"><div class="tl-dot"></div></div><div class="tl-content"><div class="tl-lbl">التشطيبات والأنظمة الكهربائية</div><div class="tl-date">سبتمبر — ديسمبر 2025</div><div class="tl-status"><span class="badge" style="background:var(--bg2);color:var(--text3)">قادمة</span></div></div></div>
              <div class="tl-item"><div class="tl-dot-wrap"><div class="tl-dot"></div></div><div class="tl-content"><div class="tl-lbl">التسليم والإشغال</div><div class="tl-date">يناير — مارس 2026</div><div class="tl-status"><span class="badge" style="background:var(--bg2);color:var(--text3)">قادمة</span></div></div></div>
            </div>
          </div>
          <!-- Updates -->
          <div class="detail-card">
            <div class="detail-card-title">📣 آخر التحديثات</div>
            <div class="update-item"><div class="update-date">15 أبريل 2025</div><div class="update-text">اكتمل صب خرسانة الطابق السابع وفق الجدول الزمني المحدد. الصور والتقارير متاحة للمستثمرين.</div></div>
            <div class="update-item"><div class="update-date">01 أبريل 2025</div><div class="update-text">بدء أعمال الهيكل الإنشائي للمبنى الرئيسي — التقدم بلغ 30% من المرحلة الثانية.</div></div>
            <div class="update-item"><div class="update-date">15 مارس 2025</div><div class="update-text">اكتمال مرحلة التأسيس والصرف الصحي بنجاح تام وفق المواصفات الهندسية.</div></div>
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
            <div class="detail-card-title">📁 المستندات</div>
            <div class="doc-row"><div class="doc-info"><span style="font-size:18px">📊</span><div><div class="doc-name">دراسة الجدوى المالية</div><div class="doc-date">مارس 2025</div></div></div><button class="btn btn-ghost btn-sm">تحميل</button></div>
            <div class="doc-row"><div class="doc-info"><span style="font-size:18px">📋</span><div><div class="doc-name">عقد التطوير العقاري</div><div class="doc-date">فبراير 2025</div></div></div><button class="btn btn-ghost btn-sm">تحميل</button></div>
            <div class="doc-row"><div class="doc-info"><span style="font-size:18px">🏛</span><div><div class="doc-name">تقرير التقييم المستقل</div><div class="doc-date">يناير 2025</div></div></div><button class="btn btn-ghost btn-sm">تحميل</button></div>
          </div>
        </div>
        <!-- Sidebar -->
        <div>
          <div class="invest-sidebar">
            <div style="font-size:16px;font-weight:800;margin-bottom:16px">الاستثمار في هذا المشروع</div>
            <div style="margin-bottom:16px">
              <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px"><span style="color:var(--text3)">التمويل المُجمَّع</span><strong>73%</strong></div>
              <div class="prog-bar" style="height:8px"><div class="prog-fill" style="width:73%"></div></div>
              <div style="font-size:12px;color:var(--text3);margin-top:5px">متبقي: 810,000 ر.س</div>
            </div>
            <div style="background:var(--bg);border-radius:var(--r);padding:14px;margin-bottom:16px">
              <div class="sidebar-row"><span class="sidebar-row-lbl">العائد السنوي</span><span class="sidebar-row-val accent">20%</span></div>
              <div class="sidebar-row"><span class="sidebar-row-lbl">مدة الاستثمار</span><span class="sidebar-row-val">24 شهراً</span></div>
              <div class="sidebar-row"><span class="sidebar-row-lbl">الحد الأدنى</span><span class="sidebar-row-val">10,000 ر.س</span></div>
              <div class="sidebar-row" style="margin-bottom:0"><span class="sidebar-row-lbl">نوع العائد</span><span class="sidebar-row-val">رأسمالي + إيجاري</span></div>
            </div>
            <a routerLink="/invest" class="btn btn-accent" style="width:100%;margin-bottom:10px;text-decoration:none;display:flex;justify-content:center">استثمر الآن ←</a>
            <div style="font-size:11px;color:var(--text3);text-align:center">أموالك محفوظة في حساب ضماني مستقل</div>
          </div>
          <div style="background:#fff;border:1px solid var(--border);border-radius:var(--r-lg);padding:20px;margin-top:16px;box-shadow:var(--shadow)">
            <div style="font-size:13px;font-weight:700;color:var(--text2);margin-bottom:12px">الجهة المطورة</div>
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
              <div style="width:44px;height:44px;border-radius:10px;background:var(--bg2);display:flex;align-items:center;justify-content:center;overflow:hidden"><img src="assets/images/OIP.jpeg" style="width:100%;height:100%;object-fit:cover"></div>
              <div><div style="font-size:14px;font-weight:800">شركة الإعمار للتطوير</div><div style="font-size:12px;color:var(--text3)">15 عاماً من الخبرة</div></div>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
              <div style="background:var(--bg);border-radius:8px;padding:10px;text-align:center"><div style="font-size:18px;font-weight:800;color:var(--primary)">24</div><div style="font-size:11px;color:var(--text3)">مشروع منجز</div></div>
              <div style="background:var(--bg);border-radius:8px;padding:10px;text-align:center"><div style="font-size:18px;font-weight:800;color:var(--primary)">4.8</div><div style="font-size:11px;color:var(--text3)">التقييم / 5</div></div>
            </div>
            <a routerLink="/developer" class="btn btn-ghost btn-sm" style="width:100%;margin-top:12px">عرض ملف المطور ←</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Sticky CTA -->
    <div class="sticky-cta">
      <div style="display:flex;align-items:center;gap:20px">
        <div><div style="font-size:22px;font-weight:800;color:var(--accent-dark)">73%</div><div style="font-size:11px;color:var(--text3)">مُموَّل</div></div>
        <div style="width:140px;height:6px;background:var(--bg2);border-radius:3px;overflow:hidden"><div style="width:73%;height:100%;background:linear-gradient(90deg,var(--primary),var(--primary-light));border-radius:3px"></div></div>
        <span style="font-size:13px;color:var(--text3)">متبقي 810,000 ر.س</span>
      </div>
      <div style="display:flex;align-items:center;gap:16px">
        <div style="text-align:center"><div style="font-size:20px;font-weight:800;color:var(--accent-dark)">20%</div><div style="font-size:11px;color:var(--text3)">عائد سنوي</div></div>
        <a routerLink="/invest" class="btn btn-accent btn-lg" style="text-decoration:none">استثمر الآن ←</a>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class DetailComponent {}
