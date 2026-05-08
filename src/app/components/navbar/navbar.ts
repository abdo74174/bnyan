import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

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
          <ng-container *ngIf="!(auth.currentUser$ | async)">
            <a routerLink="/login" class="btn btn-ghost btn-sm">تسجيل الدخول</a>
            <a routerLink="/projects" class="btn btn-primary btn-sm">ابدأ الاستثمار</a>
          </ng-container>
          <ng-container *ngIf="auth.currentUser$ | async as user">
            <span class="nav-user-name" style="font-size: 13px; font-weight: 600; color: var(--text2); margin-left: 10px;">أهلاً، {{user.fullName.split(' ')[0]}}</span>
            <a [routerLink]="user.userType === 'developer' ? '/developer' : '/dashboard'" class="btn btn-ghost btn-sm">حسابي</a>
            <button (click)="logout()" class="btn btn-outline btn-sm">خروج</button>
          </ng-container>
        </div>
        <button class="hamburger" [class.active]="isMenuOpen" (click)="toggleMenu()" aria-label="القائمة">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <div class="mobile-overlay" [class.open]="isMenuOpen" (click)="closeMenu()"></div>
    <div class="mobile-menu" [class.open]="isMenuOpen">
      <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="closeMenu()">الرئيسية</a>
      <a routerLink="/projects" routerLinkActive="active" (click)="closeMenu()">المشاريع</a>
      <a routerLink="/developer" routerLinkActive="active" (click)="closeMenu()">للمطورين</a>
      <a routerLink="/" fragment="how-section" (click)="closeMenu()">كيف يعمل</a>
      <div class="mobile-menu-divider"></div>
      <div class="mobile-menu-actions">
        <ng-container *ngIf="!(auth.currentUser$ | async)">
          <a routerLink="/login" class="btn btn-ghost" (click)="closeMenu()">تسجيل الدخول</a>
          <a routerLink="/projects" class="btn btn-primary" (click)="closeMenu()">ابدأ الاستثمار</a>
        </ng-container>
        <ng-container *ngIf="auth.currentUser$ | async as user">
          <div style="padding: 0 16px 12px; font-weight: 700; color: var(--primary);">أهلاً، {{user.fullName}}</div>
          <a [routerLink]="user.userType === 'developer' ? '/developer' : '/dashboard'" class="btn btn-ghost" (click)="closeMenu()">لوحة التحكم</a>
          <button (click)="logout()" class="btn btn-outline" style="width:100%">تسجيل الخروج</button>
        </ng-container>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class NavbarComponent {
  isMenuOpen = false;

  constructor(private router: Router, public auth: AuthService) {
    // Automatically close menu on navigation
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.closeMenu();
    });
  }

  logout() {
    this.auth.logout();
    this.closeMenu();
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
