import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(component, 'ngOnInit');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize currentCard as 0', () => {
    expect(component.currentCard).toEqual(0);
  });

  it('should increment currentCard when nextCard() is called', () => {
    component.currentCard = 0;
    component.nextCard();
    expect(component.currentCard).toEqual(1);
  });

  it('should not increment currentCard beyond items length', () => {
    component.currentCard = component.items.length - 1;
    component.nextCard();
    expect(component.currentCard).toEqual(component.items.length - 1);
  });

  it('should decrement currentCard when prevCard() is called', () => {
    component.currentCard = 1;
    component.prevCard();
    expect(component.currentCard).toEqual(0);
  });

  it('should not decrement currentCard below 0', () => {
    component.currentCard = 0;
    component.prevCard();
    expect(component.currentCard).toEqual(0);
  });

  it('should navigate to "/cadastro" when navigateToCadastro() is called', () => {
    const routerSpy = spyOn(router, 'navigate');
    component.navigateToCadastro();
    expect(routerSpy).toHaveBeenCalledWith(['/cadastro']);
  });

  it('should have items defined', () => {
    expect(component.items).toBeDefined();
    expect(component.items.length).toBeGreaterThan(0);
  });
});
