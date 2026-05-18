import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  template: `
    <section class="section-sm">
      <div class="container" style="max-width:820px">

        <!-- Header -->
        <div style="margin-bottom:28px">
          <a routerLink="/developer" style="font-size:13px;color:var(--text3);text-decoration:none;display:inline-flex;align-items:center;gap:6px;margin-bottom:16px">
            ← العودة لبوابة المطور
          </a>
          <div class="tag" style="margin-bottom:10px">بوابة المطور</div>
          <h1 class="section-title" style="margin-bottom:6px">إضافة مشروع استثماري جديد</h1>
          <p style="color:var(--text3)">أدخل تفاصيل مشروعك ليظهر فوراً في صفحة المشاريع للمستثمرين</p>
        </div>

        <!-- Success Banner -->
        @if (saved) {
          <div style="background:rgba(46,204,135,.12);border:1px solid rgba(46,204,135,.3);border-radius:var(--r-lg);padding:16px 20px;margin-bottom:24px;display:flex;align-items:center;gap:12px">
            <span style="font-size:24px">✅</span>
            <div>
              <div style="font-weight:800;color:var(--text1)">تم إضافة المشروع بنجاح!</div>
              <div style="font-size:13px;color:var(--text3)">المشروع «{{form.name}}» متاح الآن للمستثمرين</div>
            </div>
            <a routerLink="/projects" class="btn btn-primary btn-sm" style="margin-right:auto;text-decoration:none">عرض المشاريع ←</a>
          </div>
        }

        <div style="display:flex;flex-direction:column;gap:20px">

          <!-- Section 1: Basic Info -->
          <div class="add-card">
            <div class="add-card-title">📋 المعلومات الأساسية</div>
            <div class="form-grid-2">
              <div class="form-group">
                <label class="field-lbl">اسم المشروع <span class="req">*</span></label>
                <input type="text" class="field-input" [(ngModel)]="form.name" placeholder="مثال: أبراج النهضة التجاري">
              </div>
              <div class="form-group">
                <label class="field-lbl">الاسم بالإنجليزية</label>
                <input type="text" class="field-input" [(ngModel)]="form.nameEn" placeholder="Example: Al-Nahda Towers" dir="ltr">
              </div>
              <div class="form-group">
                <label class="field-lbl">الموقع <span class="req">*</span></label>
                <input type="text" class="field-input" [(ngModel)]="form.location" placeholder="مثال: الرياض، حي النزهة">
              </div>
              <div class="form-group">
                <label class="field-lbl">نوع المشروع <span class="req">*</span></label>
                <select class="field-input" [(ngModel)]="form.type" (ngModelChange)="onTypeChange()">
                  <option value="">اختر النوع</option>
                  <option value="تجاري">تجاري</option>
                  <option value="سكني">سكني</option>
                  <option value="فندقي">فندقي</option>
                  <option value="مختلط">مختلط</option>
                  <option value="ضيافة">ضيافة</option>
                </select>
              </div>
              <div class="form-group" style="grid-column:1/-1">
                <label class="field-lbl">التصنيف التفصيلي</label>
                <input type="text" class="field-input" [(ngModel)]="form.category" placeholder="مثال: تطوير تجاري فاخر">
              </div>
              <div class="form-group" style="grid-column:1/-1">
                <label class="field-lbl">وصف المشروع <span class="req">*</span></label>
                <textarea class="field-input" rows="4" [(ngModel)]="form.description"
                  placeholder="اكتب وصفاً تفصيلياً للمشروع يوضح طبيعته وموقعه ومستهدفاته..."></textarea>
              </div>
            </div>
          </div>

          <!-- Section 2: Financial Info -->
          <div class="add-card">
            <div class="add-card-title">💰 التفاصيل المالية</div>
            <div class="form-grid-2">
              <div class="form-group">
                <label class="field-lbl">حجم التمويل المطلوب (ر.س) <span class="req">*</span></label>
                <input type="number" class="field-input" [(ngModel)]="form.totalFunding" placeholder="3000000" min="100000" step="50000">
              </div>
              <div class="form-group">
                <label class="field-lbl">الحد الأدنى للاستثمار (ر.س) <span class="req">*</span></label>
                <input type="number" class="field-input" [(ngModel)]="form.minInvest" placeholder="10000" min="1000" step="1000">
              </div>
              <div class="form-group">
                <label class="field-lbl">العائد السنوي (%) <span class="req">*</span></label>
                <input type="number" class="field-input" [(ngModel)]="form.roi" placeholder="20" min="1" max="50" step="0.5">
              </div>
              <div class="form-group">
                <label class="field-lbl">مدة الاستثمار (بالأشهر) <span class="req">*</span></label>
                <input type="number" class="field-input" [(ngModel)]="form.duration" placeholder="24" min="3" max="120" step="1">
              </div>
              <div class="form-group">
                <label class="field-lbl">نوع العائد</label>
                <select class="field-input" [(ngModel)]="form.returnType">
                  <option value="رأسمالي">رأسمالي</option>
                  <option value="إيجاري">إيجاري</option>
                  <option value="رأسمالي + إيجاري">رأسمالي + إيجاري</option>
                </select>
              </div>
              <div class="form-group">
                <label class="field-lbl">مستوى المخاطرة</label>
                <select class="field-input" [(ngModel)]="form.risk" (ngModelChange)="onRiskChange()">
                  <option value="منخفضة">منخفضة</option>
                  <option value="متوسطة">متوسطة</option>
                  <option value="مرتفعة">مرتفعة</option>
                </select>
              </div>

              <!-- ROI Preview -->
              @if (form.roi && form.duration) {
                <div class="roi-preview" style="grid-column:1/-1">
                  <div style="font-size:12px;color:rgba(255,255,255,.55);margin-bottom:12px;font-weight:700">معاينة العائد — مثال على استثمار {{form.minInvest | number}} ر.س</div>
                  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">
                    <div style="text-align:center">
                      <div style="font-size:18px;font-weight:800;color:#4eedb3">{{form.roi}}%</div>
                      <div style="font-size:11px;color:rgba(255,255,255,.5)">عائد سنوي</div>
                    </div>
                    <div style="text-align:center">
                      <div style="font-size:18px;font-weight:800;color:#fff">{{calcReturn() | number}}</div>
                      <div style="font-size:11px;color:rgba(255,255,255,.5)">إجمالي العائد ر.س</div>
                    </div>
                    <div style="text-align:center">
                      <div style="font-size:18px;font-weight:800;color:#4eedb3">{{calcMaturity() | number}}</div>
                      <div style="font-size:11px;color:rgba(255,255,255,.5)">عند الاستحقاق ر.س</div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- Section 3: Developer Info -->
          <div class="add-card">
            <div class="add-card-title">🏢 معلومات المطور</div>
            <div class="form-grid-2">
              <div class="form-group">
                <label class="field-lbl">اسم شركة التطوير <span class="req">*</span></label>
                <input type="text" class="field-input" [(ngModel)]="form.developer" placeholder="مثال: شركة الإعمار للتطوير">
              </div>
              <div class="form-group">
                <label class="field-lbl">سنوات الخبرة</label>
                <input type="number" class="field-input" [(ngModel)]="form.developerExp" placeholder="10" min="1">
              </div>
              <div class="form-group">
                <label class="field-lbl">عدد المشاريع المنجزة</label>
                <input type="number" class="field-input" [(ngModel)]="form.developerProjects" placeholder="15" min="0">
              </div>
              <div class="form-group">
                <label class="field-lbl">التقييم (من 5)</label>
                <input type="number" class="field-input" [(ngModel)]="form.developerRating" placeholder="4.5" min="1" max="5" step="0.1">
              </div>
            </div>
          </div>

          <!-- Section 4: Project Image -->
          <div class="add-card">
            <div class="add-card-title">🖼️ صورة المشروع</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;align-items:start">
              <div>
                <label class="field-lbl">رابط الصورة الرئيسية</label>
                <input type="text" class="field-input" [(ngModel)]="form.img" placeholder="https://..." dir="ltr" style="margin-bottom:10px">
                <div style="display:flex;gap:8px;flex-wrap:wrap">
                  @for (img of availableImgs; track img.src) {
                    <div class="img-thumb-pick" [class.selected]="form.img === img.src" (click)="selectImg(img.src)">
                      <img [src]="img.src" [alt]="img.label">
                    </div>
                  }
                </div>
                <div style="font-size:11px;color:var(--text3);margin-top:8px">اختر من الصور المتاحة أو أدخل رابطاً خارجياً</div>
              </div>
              <div>
                @if (form.img) {
                  <img [src]="form.img" alt="Preview" style="width:100%;height:160px;object-fit:cover;border-radius:var(--r);border:1px solid var(--border)">
                } @else {
                  <div style="width:100%;height:160px;border:2px dashed var(--border);border-radius:var(--r);display:flex;align-items:center;justify-content:center;color:var(--text3);font-size:13px">
                    معاينة الصورة
                  </div>
                }
              </div>
            </div>
          </div>

          <!-- Section 5: Status -->
          <div class="add-card">
            <div class="add-card-title">📊 حالة المشروع</div>
            <div class="form-grid-2">
              <div class="form-group">
                <label class="field-lbl">حالة التمويل</label>
                <select class="field-input" [(ngModel)]="form.status">
                  <option value="نشط — قيد التمويل">نشط — قيد التمويل</option>
                  <option value="مكتمل جزئياً">مكتمل جزئياً</option>
                  <option value="اكتمل التمويل تقريباً">اكتمل التمويل تقريباً</option>
                  <option value="قريباً">قريباً</option>
                </select>
              </div>
              <div class="form-group">
                <label class="field-lbl">نسبة التمويل المُجمَّع (%)</label>
                <input type="number" class="field-input" [(ngModel)]="form.progress" min="0" max="100" placeholder="0">
              </div>
            </div>
          </div>

          <!-- Error -->
          @if (errorMsg) {
            <div style="background:rgba(231,76,60,.1);border:1px solid rgba(231,76,60,.3);border-radius:var(--r);padding:14px 18px;color:var(--red);font-size:13px;font-weight:700">
              ⚠️ {{errorMsg}}
            </div>
          }

          <!-- Actions -->
          <div style="display:flex;gap:12px;padding-bottom:40px">
            <button class="btn btn-accent btn-lg" style="flex:1" (click)="submit()">
              ✅ إضافة المشروع ونشره للمستثمرين
            </button>
            <button class="btn btn-ghost btn-lg" (click)="reset()">إعادة ضبط</button>
            <a routerLink="/developer" class="btn btn-ghost btn-lg" style="text-decoration:none">إلغاء</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
    .add-card {
      background: #fff;
      border: 1px solid var(--border);
      border-radius: var(--r-lg);
      padding: 24px;
      box-shadow: var(--shadow);
    }
    .add-card-title {
      font-size: 15px; font-weight: 800;
      margin-bottom: 20px; padding-bottom: 12px;
      border-bottom: 1px solid var(--border);
    }
    .form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .form-group { display: flex; flex-direction: column; }
    .field-lbl { font-size: 12px; font-weight: 700; color: var(--text2); margin-bottom: 6px; }
    .req { color: var(--red); }
    .field-input {
      padding: 11px 14px; border: 1.5px solid var(--border);
      border-radius: var(--r); font-size: 14px; font-family: inherit;
      background: var(--bg); outline: none; transition: border .2s;
    }
    .field-input:focus { border-color: var(--primary); background: #fff; }
    textarea.field-input { resize: vertical; line-height: 1.6; }
    .roi-preview {
      background: linear-gradient(135deg, var(--primary-dark), var(--primary));
      border-radius: var(--r); padding: 18px 22px;
    }
    .img-thumb-pick {
      width: 54px; height: 54px; border-radius: 8px; overflow: hidden;
      border: 2px solid var(--border); cursor: pointer; transition: all .2s;
    }
    .img-thumb-pick.selected { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(0,82,136,.15); }
    .img-thumb-pick img { width: 100%; height: 100%; object-fit: cover; }
    .img-thumb-pick:hover { border-color: var(--primary); }
    @media(max-width:640px) { .form-grid-2 { grid-template-columns: 1fr; } }
  `]
})
export class AddProjectComponent {
  saved = false;
  errorMsg = '';

  form = this.blank();

  availableImgs = [
    { src: 'assets/images/OIP (1).jpeg', label: '1' },
    { src: 'assets/images/OIP (2).jpeg', label: '2' },
    { src: 'assets/images/OIP (3).jpeg', label: '3' },
    { src: 'assets/images/OIP (4).jpeg', label: '4' },
    { src: 'assets/images/OIP (5).jpeg', label: '5' },
    { src: 'assets/images/OIP (6).jpeg', label: '6' },
    { src: 'assets/images/OIP (7).jpeg', label: '7' },
    { src: 'assets/images/OIP (8).jpeg', label: '8' },
  ];

  constructor(private projectService: ProjectService, private router: Router) {}

  blank() {
    return {
      name: '', nameEn: '', location: '', type: '', category: '',
      description: '', img: '', totalFunding: 3000000, minInvest: 10000,
      roi: 20, duration: 24, returnType: 'رأسمالي + إيجاري',
      risk: 'منخفضة', riskLevel: 'low' as 'low' | 'medium' | 'high',
      developer: '', developerExp: 10, developerProjects: 10, developerRating: 4.5,
      status: 'نشط — قيد التمويل', progress: 0,
      typeBadgeClass: 'badge-blue',
    };
  }

  onTypeChange() {
    const map: Record<string, string> = {
      'تجاري': 'badge-blue', 'سكني': 'badge-blue',
      'فندقي': 'badge-gold', 'مختلط': 'badge-blue', 'ضيافة': 'badge-gold'
    };
    this.form.typeBadgeClass = map[this.form.type] || 'badge-blue';
    if (!this.form.category) this.form.category = this.form.type;
  }

  onRiskChange() {
    const map: Record<string, 'low' | 'medium' | 'high'> = {
      'منخفضة': 'low', 'متوسطة': 'medium', 'مرتفعة': 'high'
    };
    this.form.riskLevel = map[this.form.risk] || 'low';
  }

  selectImg(src: string) { this.form.img = src; }

  calcReturn() {
    return Math.round(this.form.minInvest * (this.form.roi / 100) * (this.form.duration / 12));
  }
  calcMaturity() { return this.form.minInvest + this.calcReturn(); }

  validate(): string {
    if (!this.form.name.trim()) return 'يرجى إدخال اسم المشروع';
    if (!this.form.location.trim()) return 'يرجى إدخال موقع المشروع';
    if (!this.form.type) return 'يرجى اختيار نوع المشروع';
    if (!this.form.description.trim()) return 'يرجى كتابة وصف المشروع';
    if (!this.form.totalFunding || this.form.totalFunding < 100000) return 'حجم التمويل يجب أن يكون 100,000 ر.س على الأقل';
    if (!this.form.minInvest || this.form.minInvest < 1000) return 'الحد الأدنى للاستثمار 1,000 ر.س';
    if (!this.form.roi || this.form.roi <= 0) return 'يرجى إدخال العائد السنوي';
    if (!this.form.duration || this.form.duration < 3) return 'المدة يجب أن تكون 3 أشهر على الأقل';
    if (!this.form.developer.trim()) return 'يرجى إدخال اسم شركة التطوير';
    return '';
  }

  submit() {
    const err = this.validate();
    if (err) { this.errorMsg = err; return; }
    this.errorMsg = '';

    const remainingRaw = Math.round(this.form.totalFunding * (1 - this.form.progress / 100));
    const imgs = this.form.img
      ? [this.form.img, 'assets/images/OIP (1).jpeg', 'assets/images/OIP (2).jpeg']
      : ['assets/images/OIP (1).jpeg', 'assets/images/OIP (2).jpeg', 'assets/images/OIP (3).jpeg'];

    this.projectService.addProject({
      ...this.form,
      imgs,
      remaining: remainingRaw.toLocaleString('ar'),
      remainingRaw,
      stages: [
        { name: 'مرحلة التأسيس', period: '2025', status: 'active', percent: this.form.progress }
      ],
      updates: [
        { date: new Date().toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' }), text: 'تم نشر المشروع على منصة بنيان.' }
      ],
      allocation: [
        { label: 'البناء والإنشاء', pct: 65, color: 'var(--primary)' },
        { label: 'التشطيبات', pct: 20, color: 'var(--gold)' },
        { label: 'التسويق', pct: 10, color: 'var(--accent)' },
        { label: 'احتياطي', pct: 5, color: '#aaa' },
      ]
    });

    this.saved = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  reset() {
    this.form = this.blank();
    this.errorMsg = '';
    this.saved = false;
  }
}
