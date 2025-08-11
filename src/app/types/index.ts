/**
 * File này chứa các định nghĩa kiểu dữ liệu TypeScript dùng chung
 * cho toàn bộ ứng dụng frontend.
 */

// Dành cho Owner (người dùng platform)
export interface Owner {
  id: number;
  fullName: string;
  email: string;
  role: string;
  emailVerified: boolean;
  locked: boolean;
}

export interface Project {
  id: number;
  name: string;
  apiKey: string;
  allowedOrigins: string[];
}

export interface ProjectRole {
  id: number;
  name: string;
  level: number;
}

export interface EndUser {
  id: number;
  fullName: string;
  email: string;
  emailVerified: boolean;
  locked: boolean;
  roles: string[];
}