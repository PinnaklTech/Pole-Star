import { config } from '../config/env';
import type { 
  LoginCredentials, 
  SignupData, 
  AuthResponse, 
  User,
  ForgotPasswordData,
  ResetPasswordData,
  MessageResponse
} from '@/types/auth';

const API_BASE_URL = config.apiBaseUrl;

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  setToken(token: string) {
    this.token = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
      throw new Error(error.detail || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Auth endpoints
  async signup(data: SignupData): Promise<AuthResponse> {
    return this.request<AuthResponse>('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return this.request<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async logout(): Promise<MessageResponse> {
    return this.request<MessageResponse>('/api/auth/logout', {
      method: 'POST',
    });
  }

  async getCurrentUser(): Promise<User> {
    return this.request<User>('/api/auth/me');
  }

  async forgotPassword(data: ForgotPasswordData): Promise<MessageResponse> {
    return this.request<MessageResponse>('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async resetPassword(data: ResetPasswordData): Promise<MessageResponse> {
    return this.request<MessageResponse>('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async verifyToken(): Promise<MessageResponse> {
    return this.request<MessageResponse>('/api/auth/verify', {
      method: 'POST',
    });
  }

  // Project endpoints
  async getProjects() {
    return this.request('/api/projects/');
  }

  async createProject(project: any) {
    return this.request('/api/projects/', {
      method: 'POST',
      body: JSON.stringify(project),
    });
  }

  async getProject(id: string) {
    return this.request(`/api/projects/${id}`);
  }

  async updateProject(id: string, project: any) {
    return this.request(`/api/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(project),
    });
  }

  async deleteProject(id: string) {
    return this.request(`/api/projects/${id}`, {
      method: 'DELETE',
    });
  }

  // Calculation endpoints
  async calculateWindLoad(input: any) {
    return this.request('/api/calculations/wind-load', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  }

  async calculateIceLoad(input: any) {
    return this.request('/api/calculations/ice-load', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  }

  async performStructuralAnalysis(input: any) {
    return this.request('/api/calculations/structural-analysis', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  }

  async getMaterialProperties() {
    return this.request('/api/calculations/materials');
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
