import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Profile Header -->
    <div class="profile-header">
      <div class="profile-cover">
        <div class="profile-avatar-large">
          <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="Profile" />
          <div class="status-indicator online"></div>
        </div>
      </div>
      <div class="profile-info-header">
        <h1>Admin User</h1>
        <p class="profile-title">Senior Administrator</p>
        <p class="profile-location">📍 New York, NY</p>
      </div>
    </div>

    <!-- Profile Content -->
    <div class="profile-container">
      <div class="profile-grid">
        <!-- Personal Information -->
        <div class="profile-card">
          <div class="card-header">
            <h3>👤 Personal Information</h3>
            <button class="edit-btn">✏️ Edit</button>
          </div>
          <div class="card-content">
            <div class="info-row">
              <span class="info-label">Full Name:</span>
              <span class="info-value">Admin User</span>
            </div>
            <div class="info-row">
              <span class="info-label">Email:</span>
              <span class="info-value">admin&#64;phonemanager.com</span>
            </div>
            <div class="info-row">
              <span class="info-label">Phone:</span>
              <span class="info-value">+1 (555) 123-4567</span>
            </div>
            <div class="info-row">
              <span class="info-label">Department:</span>
              <span class="info-value">IT Administration</span>
            </div>
            <div class="info-row">
              <span class="info-label">Employee ID:</span>
              <span class="info-value">ADM-001</span>
            </div>
          </div>
        </div>

        <!-- Account Statistics -->
        <div class="profile-card">
          <div class="card-header">
            <h3>📊 Account Statistics</h3>
          </div>
          <div class="card-content">
            <div class="stat-grid">
              <div class="stat-item">
                <div class="stat-number">156</div>
                <div class="stat-label">Phone Numbers Managed</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">2,847</div>
                <div class="stat-label">Total Messages</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">98%</div>
                <div class="stat-label">Uptime Rate</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">45</div>
                <div class="stat-label">Days Active</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="profile-card">
          <div class="card-header">
            <h3>🕒 Recent Activity</h3>
          </div>
          <div class="card-content">
            <div class="activity-list">
              <div class="activity-item">
                <div class="activity-icon">📱</div>
                <div class="activity-content">
                  <div class="activity-title">Activated phone number +1-555-0123</div>
                  <div class="activity-time">2 hours ago</div>
                </div>
              </div>
              <div class="activity-item">
                <div class="activity-icon">📊</div>
                <div class="activity-content">
                  <div class="activity-title">Generated monthly report</div>
                  <div class="activity-time">1 day ago</div>
                </div>
              </div>
              <div class="activity-item">
                <div class="activity-icon">⚙️</div>
                <div class="activity-content">
                  <div class="activity-title">Updated system settings</div>
                  <div class="activity-time">3 days ago</div>
                </div>
              </div>
              <div class="activity-item">
                <div class="activity-icon">👥</div>
                <div class="activity-content">
                  <div class="activity-title">Added new team member</div>
                  <div class="activity-time">1 week ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Security Settings -->
        <div class="profile-card">
          <div class="card-header">
            <h3>🔒 Security Settings</h3>
          </div>
          <div class="card-content">
            <div class="security-item">
              <div class="security-info">
                <span class="security-label">Two-Factor Authentication</span>
                <span class="security-status enabled">Enabled</span>
              </div>
              <button class="security-btn">Configure</button>
            </div>
            <div class="security-item">
              <div class="security-info">
                <span class="security-label">Password</span>
                <span class="security-status">Last changed 30 days ago</span>
              </div>
              <button class="security-btn">Change</button>
            </div>
            <div class="security-item">
              <div class="security-info">
                <span class="security-label">Login Sessions</span>
                <span class="security-status">3 active sessions</span>
              </div>
              <button class="security-btn">Manage</button>
            </div>
          </div>
        </div>

        <!-- Preferences -->
        <div class="profile-card">
          <div class="card-header">
            <h3>⚙️ Preferences</h3>
          </div>
          <div class="card-content">
            <div class="preference-item">
              <span class="preference-label">Email Notifications</span>
              <label class="toggle-switch">
                <input type="checkbox" checked>
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="preference-item">
              <span class="preference-label">SMS Alerts</span>
              <label class="toggle-switch">
                <input type="checkbox">
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="preference-item">
              <span class="preference-label">Dark Mode</span>
              <label class="toggle-switch">
                <input type="checkbox">
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="profile-card">
          <div class="card-header">
            <h3>🚀 Quick Actions</h3>
          </div>
          <div class="card-content">
            <div class="action-grid">
              <button class="action-btn" routerLink="/dashboard">
                <span class="action-icon">📱</span>
                <span>Add Number</span>
              </button>
              <button class="action-btn">
                <span class="action-icon">📊</span>
                <span>View Reports</span>
              </button>
              <button class="action-btn">
                <span class="action-icon">👥</span>
                <span>Team Management</span>
              </button>
              <button class="action-btn">
                <span class="action-icon">📧</span>
                <span>Contact Support</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private router: Router) {}
} 