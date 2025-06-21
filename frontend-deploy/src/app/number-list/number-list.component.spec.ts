import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { NumberListComponent } from './number-list.component';
import { NumberService } from '../number.service';
import { FilterComponent } from '../filter/filter.component';
import { Router } from '@angular/router';

describe('NumberListComponent', () => {
  let component: NumberListComponent;
  let fixture: ComponentFixture<NumberListComponent>;
  let numberService: jasmine.SpyObj<NumberService>;

  const mockNumbers = [
    {
      id: '1',
      phoneNumber: '+1234567890',
      status: 'active' as const,
      messageCount: 15,
      lastMessage: 'Test message',
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      phoneNumber: '+0987654321',
      status: 'inactive' as const,
      messageCount: 8,
      lastMessage: 'Another message',
      createdAt: '2024-01-02'
    }
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('NumberService', ['getNumbers', 'updateNumberStatus', 'logout']);
    spy.getNumbers.and.returnValue(of(mockNumbers));
    spy.updateNumberStatus.and.returnValue(of(true));
    spy.logout.and.returnValue();

    await TestBed.configureTestingModule({
      imports: [
        NumberListComponent,
        HttpClientTestingModule,
        RouterTestingModule
      ],
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
    
    expect(numberService.updateNumberStatus).toHaveBeenCalledWith(number.id, 'inactive');
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
    component.applyFilters();
    
    expect(component.totalPages).toBe(2);
    expect(component.getCurrentPageNumbers().length).toBe(1);
  });

  it('should navigate to different pages', () => {
    fixture.detectChanges();
    component.itemsPerPage = 1;
    component.applyFilters();
    
    component.goToPage(2);
    expect(component.currentPage).toBe(2);
    
    component.goToPage(1);
    expect(component.currentPage).toBe(1);
  });

  it('should get current user', () => {
    const user = component.getCurrentUser();
    expect(user.username).toBe('Admin');
  });

  it('should logout and navigate', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    
    component.logout();
    
    expect(numberService.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should filter numbers by status', () => {
    fixture.detectChanges();
    
    component.onStatusFilterChange('active');
    expect(component.currentPage).toBe(1);
  });

  it('should handle search changes', () => {
    fixture.detectChanges();
    
    component.onSearchChange('test');
    expect(component.currentPage).toBe(1);
  });
});
