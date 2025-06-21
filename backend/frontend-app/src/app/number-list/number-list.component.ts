import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NumberService, PhoneNumber } from '../number.service';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-number-list',
  standalone: true,
  imports: [CommonModule, FilterComponent],
  templateUrl: './number-list.component.html',
  styleUrl: './number-list.component.css'
})
export class NumberListComponent implements OnInit {
  numbers: PhoneNumber[] = [];
  filteredNumbers: PhoneNumber[] = [];
  loading = false;
  error = '';

  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;

  sortField: keyof PhoneNumber = 'phoneNumber';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(
    private numberService: NumberService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadNumbers();
  }

  loadNumbers() {
    this.loading = true;
    this.error = '';
    
    this.numberService.getNumbers().subscribe({
      next: (data) => {
        this.numbers = data;
        this.filteredNumbers = data;
        this.updatePagination();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load numbers. Please try again.';
        this.loading = false;
        console.error('Error loading numbers:', err);
      }
    });
  }

  onStatusFilterChange(status: string) {
    if (status === 'all') {
      this.filteredNumbers = this.numbers;
    } else {
      this.filteredNumbers = this.numbers.filter(num => num.status === status);
    }
    this.currentPage = 1;
    this.updatePagination();
  }

  toggleStatus(number: PhoneNumber) {
    this.numberService.toggleStatus(number).subscribe({
      next: (updatedNumber) => {
        const index = this.numbers.findIndex(n => n.id === number.id);
        if (index !== -1) {
          this.numbers[index] = updatedNumber;
          this.onStatusFilterChange('all');
        }
      },
      error: (err) => {
        console.error('Error toggling status:', err);
      }
    });
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredNumbers.length / this.itemsPerPage);
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages || 1;
    }
  }

  get paginatedNumbers(): PhoneNumber[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.getSortedNumbers().slice(startIndex, endIndex);
  }

  getEndIndex(): number {
    const endIndex = this.currentPage * this.itemsPerPage;
    return Math.min(endIndex, this.filteredNumbers.length);
  }

  getSortedNumbers(): PhoneNumber[] {
    return [...this.filteredNumbers].sort((a, b) => {
      const aValue = a[this.sortField];
      const bValue = b[this.sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return this.sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return this.sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  sort(field: keyof PhoneNumber) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
  }

  getSortIcon(field: keyof PhoneNumber): string {
    if (this.sortField !== field) return '↕️';
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

  getCurrentUser() {
    return { username: 'Admin' };
  }

  logout() {
  }
}
