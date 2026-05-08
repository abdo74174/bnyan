import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';

export interface User {
  id: string;
  fullName: string;
  nationalId: string;
  phone: string;
  email: string;
  password: string;
  userType: 'investor' | 'developer';
  kycStatus: 'none' | 'pending' | 'approved' | 'rejected';
  onboardingDone: boolean;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly USERS_KEY = 'bnyan_users';
  private readonly SESSION_KEY = 'bnyan_session';

  currentUser$ = new BehaviorSubject<User | null>(null);

  constructor(private storage: StorageService, private router: Router) {
    this.loadSession();
  }

  private loadSession(): void {
    const session = this.storage.get(this.SESSION_KEY);
    if (session) {
      const users = this.getUsers();
      const user = users.find((u: User) => u.id === session.userId);
      if (user) {
        this.currentUser$.next(user);
      }
    }
  }

  private getUsers(): User[] {
    return this.storage.get(this.USERS_KEY) || [];
  }

  private saveUsers(users: User[]): void {
    this.storage.set(this.USERS_KEY, users);
  }

  get isLoggedIn(): boolean {
    return !!this.currentUser$.value;
  }

  get currentUser(): User | null {
    return this.currentUser$.value;
  }

  register(data: {
    fullName: string;
    nationalId: string;
    phone: string;
    email: string;
    password: string;
    userType: 'investor' | 'developer';
  }): { success: boolean; message: string } {
    const users = this.getUsers();

    if (users.find((u: User) => u.email === data.email)) {
      return { success: false, message: 'البريد الإلكتروني مسجل مسبقاً' };
    }
    if (users.find((u: User) => u.nationalId === data.nationalId)) {
      return { success: false, message: 'رقم الهوية مسجل مسبقاً' };
    }
    if (users.find((u: User) => u.phone === data.phone)) {
      return { success: false, message: 'رقم الجوال مسجل مسبقاً' };
    }

    const newUser: User = {
      id: 'usr_' + Date.now(),
      fullName: data.fullName,
      nationalId: data.nationalId,
      phone: data.phone,
      email: data.email,
      password: data.password,
      userType: data.userType,
      kycStatus: 'none',
      onboardingDone: false,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    this.saveUsers(users);
    this.setSession(newUser);

    return { success: true, message: 'تم إنشاء الحساب بنجاح' };
  }

  login(emailOrPhone: string, password: string): { success: boolean; message: string } {
    const users = this.getUsers();
    const user = users.find(
      (u: User) => (u.email === emailOrPhone || u.phone === emailOrPhone) && u.password === password
    );

    if (!user) {
      return { success: false, message: 'بيانات الدخول غير صحيحة' };
    }

    this.setSession(user);
    return { success: true, message: 'تم تسجيل الدخول بنجاح' };
  }

  private setSession(user: User): void {
    this.storage.set(this.SESSION_KEY, { userId: user.id });
    this.currentUser$.next(user);
  }

  logout(): void {
    this.storage.remove(this.SESSION_KEY);
    this.currentUser$.next(null);
    this.router.navigate(['/login']);
  }

  updateUser(updates: Partial<User>): void {
    const user = this.currentUser;
    if (!user) return;

    const users = this.getUsers();
    const idx = users.findIndex((u: User) => u.id === user.id);
    if (idx === -1) return;

    users[idx] = { ...users[idx], ...updates };
    this.saveUsers(users);
    this.currentUser$.next(users[idx]);
  }

  resetPassword(email: string, newPassword: string): { success: boolean; message: string } {
    const users = this.getUsers();
    const idx = users.findIndex((u: User) => u.email === email);
    if (idx === -1) {
      return { success: false, message: 'البريد الإلكتروني غير مسجل' };
    }
    users[idx].password = newPassword;
    this.saveUsers(users);
    return { success: true, message: 'تم تغيير كلمة المرور بنجاح' };
  }

  findByEmail(email: string): boolean {
    const users = this.getUsers();
    return !!users.find((u: User) => u.email === email);
  }
}
