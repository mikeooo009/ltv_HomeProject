import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NumberService, PhoneNumber } from '../number.service';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-number-list',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterComponent],
  templateUrl: './number-list.component.html',
  styleUrl: './number-list.component.css'
})
export class NumberListComponent implements OnInit {
  numbers: PhoneNumber[] = [];
  filteredNumbers: PhoneNumber[] = [];
  loading = false;
  error = '';
  currentUser: any = null;

  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;

  sortField: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(
    private numberService: NumberService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadNumbers();
    this.currentUser = this.getCurrentUser();
  }

  loadNumbers(): void {
    this.loading = true;
    this.error = '';

    this.numberService.getNumbers().subscribe({
      next: (data) => {
        this.numbers = data;
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load numbers. Please try again.';
        this.loading = false;
        console.error('Error loading numbers:', err);
      }
    });
  }

  onStatusFilterChange(status: string): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  onSearchChange(searchTerm: string): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  private applyFilters(): void {
    let filtered = [...this.numbers];

    if (this.sortField) {
      filtered.sort((a, b) => {
        const aValue = (a as any)[this.sortField];
        const bValue = (b as any)[this.sortField];
        
        if (aValue < bValue) return this.sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    this.filteredNumbers = filtered;
    this.calculatePagination();
  }

  toggleStatus(number: PhoneNumber): void {
    const newStatus = number.status === 'active' ? 'inactive' : 'active';
    
    this.numberService.updateNumberStatus(number.id, newStatus).subscribe({
      next: (success) => {
        if (success) {
          number.status = newStatus;
          this.onStatusFilterChange('all');
        }
      },
      error: (err) => {
        console.error('Error updating status:', err);
      }
    });
  }

  sort(field: string): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.applyFilters();
  }

  getCurrentPageNumbers(): PhoneNumber[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredNumbers.slice(startIndex, endIndex);
  }

  calculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredNumbers.length / this.itemsPerPage);
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages || 1;
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  getCurrentUser(): any {
    return { username: 'Admin' };
  }

  logout(): void {
    this.numberService.logout();
    this.router.navigate(['/login']);
  }
}
