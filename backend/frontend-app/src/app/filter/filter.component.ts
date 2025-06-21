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
  
  selectedStatus: string = 'all';

  onStatusChange() {
    this.statusFilterChange.emit(this.selectedStatus);
  }
}
