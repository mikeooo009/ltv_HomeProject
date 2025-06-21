import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  @Output() statusFilterChange = new EventEmitter<string>();
  @Output() sortChange = new EventEmitter<string>();
  
  selectedStatus: string = 'all';

  onStatusChange(status: string) {
    this.selectedStatus = status;
    this.statusFilterChange.emit(status);
  }

  onSortChange(event: any) {
    const sortBy = event.target.value;
    this.sortChange.emit(sortBy);
  }
}
