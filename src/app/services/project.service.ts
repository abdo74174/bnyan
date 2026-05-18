import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Project {
  id: number;
  name: string;
  nameEn: string;
  location: string;
  type: string;
  category: string;
  img: string;
  imgs: string[];
  roi: number;
  duration: number;
  progress: number;
  remaining: string;
  remainingRaw: number;
  totalFunding: number;
  minInvest: number;
  risk: string;
  riskLevel: 'low' | 'medium' | 'high';
  typeBadgeClass: string;
  status: string;
  description: string;
  returnType: string;
  developer: string;
  developerExp: number;
  developerProjects: number;
  developerRating: number;
  stages: Stage[];
  updates: Update[];
  allocation: Allocation[];
}

export interface Stage {
  name: string;
  period: string;
  status: 'done' | 'active' | 'upcoming';
  percent?: number;
}

export interface Update {
  date: string;
  text: string;
}

export interface Allocation {
  label: string;
  pct: number;
  color: string;
}

const STORAGE_KEY = 'bnyan_projects_v1';

const DEFAULT_PROJECTS: Project[] = [
  {
    id: 1, name: 'أبراج الرقي التجاري', nameEn: 'Al-Ruqi Commercial Towers',
    location: 'الرياض، حي النزهة', type: 'تجاري', category: 'تطوير تجاري',
    img: 'assets/images/OIP (1).jpeg',
    imgs: ['assets/images/OIP (1).jpeg', 'assets/images/OIP (2).jpeg', 'assets/images/OIP (3).jpeg'],
    roi: 20, duration: 24, progress: 73, remaining: '810,000', remainingRaw: 810000,
    totalFunding: 3000000, minInvest: 10000, risk: 'منخفضة', riskLevel: 'low',
    typeBadgeClass: 'badge-blue', status: 'نشط — قيد التمويل',
    description: 'برج تجاري من الدرجة الأولى في حي النزهة بالرياض. يضم 18 طابقاً من المساحات المكتبية الفاخرة، وطابقين تجاريين. يستهدف الشركات الكبرى والمتوسطة بعقود إيجار طويلة الأمد.',
    returnType: 'رأسمالي + إيجاري', developer: 'شركة الإعمار للتطوير',
    developerExp: 15, developerProjects: 24, developerRating: 4.8,
    stages: [
      { name: 'إعداد الموقع والتأسيس', period: 'يناير — مارس 2025', status: 'done' },
      { name: 'الهيكل الإنشائي والخرسانة', period: 'أبريل — أغسطس 2025', status: 'active', percent: 60 },
      { name: 'التشطيبات والأنظمة الكهربائية', period: 'سبتمبر — ديسمبر 2025', status: 'upcoming' },
      { name: 'التسليم والإشغال', period: 'يناير — مارس 2026', status: 'upcoming' },
    ],
    updates: [
      { date: '15 أبريل 2025', text: 'اكتمل صب خرسانة الطابق السابع وفق الجدول الزمني المحدد.' },
      { date: '01 أبريل 2025', text: 'بدء أعمال الهيكل الإنشائي للمبنى الرئيسي — التقدم بلغ 30%.' },
    ],
    allocation: [
      { label: 'البناء والإنشاء', pct: 65, color: 'var(--primary)' },
      { label: 'التشطيبات والتجهيزات', pct: 20, color: 'var(--gold)' },
      { label: 'التسويق والإشغال', pct: 10, color: 'var(--accent)' },
      { label: 'احتياطي تشغيلي', pct: 5, color: '#aaa' },
    ]
  },
  {
    id: 2, name: 'بوابة جدة', nameEn: 'Jeddah Gateway',
    location: 'جدة، حي الشاطئ', type: 'فندقي', category: 'شقق فندقية',
    img: 'assets/images/OIP (4).jpeg',
    imgs: ['assets/images/OIP (4).jpeg', 'assets/images/OIP (5).jpeg', 'assets/images/OIP (6).jpeg'],
    roi: 17, duration: 18, progress: 45, remaining: '1,650,000', remainingRaw: 1650000,
    totalFunding: 3000000, minInvest: 25000, risk: 'متوسطة', riskLevel: 'medium',
    typeBadgeClass: 'badge-gold', status: 'نشط — قيد التمويل',
    description: 'مجمع شقق فندقية فاخرة على واجهة بحرية في جدة. يضم 120 وحدة مفروشة بالكامل تستهدف السياحة الداخلية والخارجية، مع عقود إدارة مع سلسلة فنادق عالمية.',
    returnType: 'إيجاري', developer: 'مجموعة البحر للاستثمار',
    developerExp: 10, developerProjects: 18, developerRating: 4.6,
    stages: [
      { name: 'الترخيص والتصاميم', period: 'أكتوبر — ديسمبر 2024', status: 'done' },
      { name: 'أعمال الأساسات', period: 'يناير — مارس 2025', status: 'done' },
      { name: 'بناء الطوابق', period: 'أبريل — سبتمبر 2025', status: 'active', percent: 45 },
      { name: 'التشطيبات والتأثيث', period: 'أكتوبر 2025 — فبراير 2026', status: 'upcoming' },
    ],
    updates: [
      { date: '10 أبريل 2025', text: 'اكتمل بناء 6 طوابق من أصل 14، والعمل مستمر وفق الجدول.' },
    ],
    allocation: [
      { label: 'البناء والإنشاء', pct: 55, color: 'var(--primary)' },
      { label: 'التأثيث والتجهيزات', pct: 25, color: 'var(--gold)' },
      { label: 'التسويق والترويج', pct: 12, color: 'var(--accent)' },
      { label: 'احتياطي', pct: 8, color: '#aaa' },
    ]
  },
  {
    id: 3, name: 'النخيل السكني', nameEn: 'Al-Nakheel Residential',
    location: 'الدمام، حي الفيصلية', type: 'سكني', category: 'سكني راقٍ',
    img: 'assets/images/OIP (5).jpeg',
    imgs: ['assets/images/OIP (5).jpeg', 'assets/images/OIP (6).jpeg', 'assets/images/OIP (7).jpeg'],
    roi: 16, duration: 30, progress: 88, remaining: '360,000', remainingRaw: 360000,
    totalFunding: 3000000, minInvest: 10000, risk: 'منخفضة', riskLevel: 'low',
    typeBadgeClass: 'badge-blue', status: 'مكتمل جزئياً',
    description: 'مجمع سكني راقٍ في الدمام يضم 80 وحدة سكنية متنوعة بين الشقق والفلل الصغيرة. يتميز بموقعه الاستراتيجي قرب المدارس والمرافق الصحية.',
    returnType: 'رأسمالي', developer: 'شركة الشرق للتطوير',
    developerExp: 12, developerProjects: 31, developerRating: 4.9,
    stages: [
      { name: 'التأسيس والبنية التحتية', period: 'يوليو — سبتمبر 2024', status: 'done' },
      { name: 'بناء الوحدات السكنية', period: 'أكتوبر 2024 — مارس 2025', status: 'done' },
      { name: 'التشطيبات الداخلية', period: 'أبريل — يوليو 2025', status: 'active', percent: 88 },
      { name: 'التسليم للملاك', period: 'أغسطس 2025', status: 'upcoming' },
    ],
    updates: [
      { date: '12 أبريل 2025', text: 'اكتملت التشطيبات في 70 وحدة من أصل 80، مع بدء تسليم أوائل الشقق.' },
    ],
    allocation: [
      { label: 'البناء والإنشاء', pct: 70, color: 'var(--primary)' },
      { label: 'التشطيبات', pct: 18, color: 'var(--gold)' },
      { label: 'البنية التحتية', pct: 7, color: 'var(--accent)' },
      { label: 'احتياطي', pct: 5, color: '#aaa' },
    ]
  },
  {
    id: 4, name: 'واجهة الخبر', nameEn: 'Al-Khobar Waterfront',
    location: 'الخبر، الواجهة البحرية', type: 'مختلط', category: 'مختلط تجاري-سكني',
    img: 'assets/images/OIP (6).jpeg',
    imgs: ['assets/images/OIP (6).jpeg', 'assets/images/OIP (7).jpeg', 'assets/images/OIP (8).jpeg'],
    roi: 19, duration: 20, progress: 31, remaining: '2,070,000', remainingRaw: 2070000,
    totalFunding: 3000000, minInvest: 15000, risk: 'منخفضة', riskLevel: 'low',
    typeBadgeClass: 'badge-blue', status: 'نشط — قيد التمويل',
    description: 'مشروع متكامل على الواجهة البحرية للخبر يجمع بين التجاري والسكني. يضم محلات تجارية في الطوابق السفلية وشققاً فاخرة في الأعلى، مع إطلالة بحرية.',
    returnType: 'رأسمالي + إيجاري', developer: 'مجموعة الخليج العقارية',
    developerExp: 20, developerProjects: 42, developerRating: 4.7,
    stages: [
      { name: 'الدراسات والتصاميم', period: 'أكتوبر — نوفمبر 2024', status: 'done' },
      { name: 'أعمال البنية التحتية', period: 'ديسمبر 2024 — فبراير 2025', status: 'done' },
      { name: 'بناء الهيكل الرئيسي', period: 'مارس — أكتوبر 2025', status: 'active', percent: 31 },
      { name: 'التشطيبات والإشغال', period: 'نوفمبر 2025 — مارس 2026', status: 'upcoming' },
    ],
    updates: [
      { date: '14 أبريل 2025', text: 'اكتمل وضع الهيكل الفولاذي للطوابق الأرضية حتى الطابق الثالث.' },
    ],
    allocation: [
      { label: 'الهيكل والإنشاء', pct: 60, color: 'var(--primary)' },
      { label: 'التشطيبات الداخلية', pct: 22, color: 'var(--gold)' },
      { label: 'الواجهات الخارجية', pct: 10, color: 'var(--accent)' },
      { label: 'احتياطي', pct: 8, color: '#aaa' },
    ]
  },
  {
    id: 5, name: 'ريزيدنس العليا', nameEn: 'Al-Olaya Residence',
    location: 'الرياض، حي العليا', type: 'ضيافة', category: 'شقق ضيافة فاخرة',
    img: 'assets/images/OIP (7).jpeg',
    imgs: ['assets/images/OIP (7).jpeg', 'assets/images/OIP (8).jpeg', 'assets/images/OIP (1).jpeg'],
    roi: 22, duration: 36, progress: 60, remaining: '1,200,000', remainingRaw: 1200000,
    totalFunding: 3000000, minInvest: 50000, risk: 'متوسطة', riskLevel: 'medium',
    typeBadgeClass: 'badge-gold', status: 'نشط — قيد التمويل',
    description: 'مجمع شقق ضيافة فاخرة في قلب حي العليا — أبرز الأحياء التجارية في الرياض. يستهدف رجال الأعمال والمسافرين بإقامة طويلة الأمد بخدمات فندقية كاملة.',
    returnType: 'إيجاري', developer: 'شركة الرقي للضيافة',
    developerExp: 8, developerProjects: 12, developerRating: 4.5,
    stages: [
      { name: 'الترخيص والتصاميم', period: 'يناير — مارس 2025', status: 'done' },
      { name: 'أعمال الأساسات والهيكل', period: 'أبريل — يونيو 2025', status: 'done' },
      { name: 'البناء التفصيلي', period: 'يوليو — ديسمبر 2025', status: 'active', percent: 60 },
      { name: 'التجهيز النهائي', period: 'يناير — مارس 2026', status: 'upcoming' },
    ],
    updates: [
      { date: '08 أبريل 2025', text: 'إنجاز 60% من أعمال البناء الرئيسية.' },
    ],
    allocation: [
      { label: 'البناء والإنشاء', pct: 58, color: 'var(--primary)' },
      { label: 'التأثيث والضيافة', pct: 28, color: 'var(--gold)' },
      { label: 'التشغيل والتسويق', pct: 9, color: 'var(--accent)' },
      { label: 'احتياطي', pct: 5, color: '#aaa' },
    ]
  },
  {
    id: 6, name: 'الياسمين السكني', nameEn: 'Al-Yasmine Residential',
    location: 'المدينة المنورة، حي العزيزية', type: 'سكني', category: 'مبنى سكني',
    img: 'assets/images/OIP (8).jpeg',
    imgs: ['assets/images/OIP (8).jpeg', 'assets/images/OIP (1).jpeg', 'assets/images/OIP (2).jpeg'],
    roi: 15, duration: 24, progress: 95, remaining: '125,000', remainingRaw: 125000,
    totalFunding: 2500000, minInvest: 10000, risk: 'منخفضة', riskLevel: 'low',
    typeBadgeClass: 'badge-blue', status: 'اكتمل التمويل تقريباً',
    description: 'مبنى سكني راقٍ في المدينة المنورة بالقرب من الحرم النبوي. يضم 60 وحدة سكنية متنوعة تستهدف العائلات والمقيمين الدائمين مع خدمات مجتمعية متكاملة.',
    returnType: 'رأسمالي', developer: 'شركة النور للتطوير',
    developerExp: 18, developerProjects: 35, developerRating: 4.9,
    stages: [
      { name: 'التأسيس والبنية التحتية', period: 'مارس — مايو 2024', status: 'done' },
      { name: 'بناء الوحدات السكنية', period: 'يونيو — نوفمبر 2024', status: 'done' },
      { name: 'التشطيبات الداخلية', period: 'ديسمبر 2024 — مارس 2025', status: 'done' },
      { name: 'التسليم للملاك', period: 'أبريل — مايو 2025', status: 'active', percent: 95 },
    ],
    updates: [
      { date: '20 أبريل 2025', text: 'تسليم 57 وحدة من أصل 60 بنجاح — المرحلة الأخيرة قيد الإنجاز.' },
    ],
    allocation: [
      { label: 'البناء والإنشاء', pct: 72, color: 'var(--primary)' },
      { label: 'التشطيبات', pct: 15, color: 'var(--gold)' },
      { label: 'الخدمات المجتمعية', pct: 8, color: 'var(--accent)' },
      { label: 'احتياطي', pct: 5, color: '#aaa' },
    ]
  }
];

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private projectsSubject = new BehaviorSubject<Project[]>(this.load());
  projects$ = this.projectsSubject.asObservable();

  private load(): Project[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_PROJECTS;
    } catch {
      return DEFAULT_PROJECTS;
    }
  }

  private save(data: Project[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    this.projectsSubject.next(data);
  }

  getAll(): Project[] {
    return this.projectsSubject.value;
  }

  getById(id: number): Project | undefined {
    return this.projectsSubject.value.find(p => p.id === id);
  }

  addProject(project: Omit<Project, 'id'>): Project {
    const current = this.projectsSubject.value;
    const newId = current.length > 0 ? Math.max(...current.map(p => p.id)) + 1 : 1;
    const newProject: Project = { ...project, id: newId };
    this.save([...current, newProject]);
    return newProject;
  }

  updateProject(id: number, updates: Partial<Project>) {
    const current = this.projectsSubject.value;
    const updated = current.map(p => p.id === id ? { ...p, ...updates } : p);
    this.save(updated);
  }

  deleteProject(id: number) {
    const current = this.projectsSubject.value;
    this.save(current.filter(p => p.id !== id));
  }

  resetToDefault() {
    this.save(DEFAULT_PROJECTS);
  }
}
