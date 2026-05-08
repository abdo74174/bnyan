import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <nav class="navbar">
      <div class="nav-inner">
        <a routerLink="/" class="nav-logo" style="text-decoration:none">
          <div class="nav-logo-icon" style="background:transparent">
            <img src="assets/images/logo.png" alt="Bnyan" style="width:100%;height:100%;object-fit:contain">
          </div>
          بنيان
        </a>
        <div class="nav-links">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">الرئيسية</a>
          <a routerLink="/projects" routerLinkActive="active">المشاريع</a>
          <a routerLink="/developer" routerLinkActive="active">للمطورين</a>
          <a routerLink="/" fragment="how-section">كيف يعمل</a>
        </div>
        <div class="nav-actions">
          <a routerLink="/login" class="btn btn-ghost btn-sm">تسجيل الدخول</a>
          <a routerLink="/projects" class="btn btn-primary btn-sm">ابدأ الاستثمار</a>
        </div>
        <button class="hamburger" [class.active]="isMenuOpen" (click)="toggleMenu()" aria-label="القائمة">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <div class="mobile-overlay" [class.open]="isMenuOpen" (click)="closeMenu()"></div>
    <div class="mobile-menu" [class.open]="isMenuOpen">
      <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">الرئيسية</a>
      <a routerLink="/projects" routerLinkActive="active">المشاريع</a>
      <a routerLink="/developer" routerLinkActive="active">للمطورين</a>
      <a routerLink="/" fragment="how-section">كيف يعمل</a>
      <div class="mobile-menu-divider"></div>
      <div class="mobile-menu-actions">
        <a routerLink="/login" class="btn btn-ghost">تسجيل الدخول</a>
        <a routerLink="/projects" class="btn btn-primary">ابدأ الاستثمار</a>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class NavbarComponent {
  isMenuOpen = false;

  constructor(private router: Router) {
    // Automatically close menu on navigation
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.closeMenu();
    });
  }

  toggleMenu() {
    this.isMenuOpen ? this.closeMenu() : this.openMenu();
  }

  openMenu() {
    this.isMenuOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeMenu() {
    this.isMenuOpen = false;
    document.body.style.overflow = '';
  }
}
