import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { NumberListComponent } from './number-list.component';
import { NumberService } from '../number.service';
import { FilterComponent } from '../filter/filter.component';

describe('NumberListComponent', () => {
  let component: NumberListComponent;
  let fixture: ComponentFixture<NumberListComponent>;
  let numberService: jasmine.SpyObj<NumberService>;

  const mockNumbers = [
    {
      id: 1,
      phoneNumber: '+1234567890',
      status: 'active' as const,
      messageCount: 15
    },
    {
      id: 2,
      phoneNumber: '+0987654321',
      status: 'inactive' as const,
      messageCount: 8
    },
    {
      id: 3,
      phoneNumber: '+5555555555',
      status: 'active' as const,
      messageCount: 25
    }
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('NumberService', ['getNumbers', 'toggleStatus']);
    spy.getNumbers.and.returnValue(of(mockNumbers));
    spy.toggleStatus.and.returnValue(of(mockNumbers[0]));

    await TestBed.configureTestingModule({
      imports: [NumberListComponent],
      providers: [
        { provide: NumberService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NumberListComponent);
    component = fixture.componentInstance;
    numberService = TestBed.inject(NumberService) as jasmine.SpyObj<NumberService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load numbers on init', () => {
    fixture.detectChanges();
    expect(numberService.getNumbers).toHaveBeenCalled();
    expect(component.numbers).toEqual(mockNumbers);
    expect(component.filteredNumbers).toEqual(mockNumbers);
  });

  it('should handle loading state', () => {
    expect(component.loading).toBe(false);
    component.loadNumbers();
    expect(component.loading).toBe(true);
  });

  it('should handle error state', () => {
    const error = new Error('Network error');
    numberService.getNumbers.and.returnValue(of([]));
    
    component.loadNumbers();
    fixture.detectChanges();
    
    expect(component.error).toBe('');
  });

  it('should toggle number status', () => {
    fixture.detectChanges();
    const number = mockNumbers[0];
    
    component.toggleStatus(number);
    
    expect(numberService.toggleStatus).toHaveBeenCalledWith(number);
  });

  it('should sort numbers', () => {
    fixture.detectChanges();
    
    component.sort('phoneNumber');
    expect(component.sortField).toBe('phoneNumber');
    expect(component.sortDirection).toBe('asc');
    
    component.sort('phoneNumber');
    expect(component.sortDirection).toBe('desc');
  });

  it('should calculate pagination correctly', () => {
    fixture.detectChanges();
    component.itemsPerPage = 1;
    component.updatePagination();
    
    expect(component.totalPages).toBe(3);
    expect(component.paginatedNumbers.length).toBe(1);
  });

  it('should navigate to different pages', () => {
    fixture.detectChanges();
    component.itemsPerPage = 1;
    component.updatePagination();
    
    component.changePage(2);
    expect(component.currentPage).toBe(2);
    
    component.changePage(1);
    expect(component.currentPage).toBe(1);
  });

  it('should get current user', () => {
    const user = component.getCurrentUser();
    expect(user.username).toBe('Admin');
  });

  it('should filter numbers by status', () => {
    fixture.detectChanges();
    
    component.onStatusFilterChange('active');
    expect(component.currentPage).toBe(1);
  });

  it('should get sorted numbers', () => {
    fixture.detectChanges();
    
    const sorted = component.getSortedNumbers();
    expect(sorted[0].phoneNumber).toBe('+0987654321');
    expect(sorted[1].phoneNumber).toBe('+1234567890');
    expect(sorted[2].phoneNumber).toBe('+5555555555');
  });

  it('should get sort icon', () => {
    fixture.detectChanges();
    
    expect(component.getSortIcon('phoneNumber')).toBe('↑');
    
    component.sort('phoneNumber');
    expect(component.getSortIcon('phoneNumber')).toBe('↓');
    
    expect(component.getSortIcon('status')).toBe('↕️');
  });
});
