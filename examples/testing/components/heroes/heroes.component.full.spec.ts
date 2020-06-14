import { NO_ERRORS_SCHEMA, Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { HeroesComponent } from './heroes.component';
import { By } from '@angular/platform-browser';

describe('HeroesComponent', () => {

  let HEROES: Hero[];
  let mockHeroService;
  let fixture: ComponentFixture<HeroesComponent>;

  @Component({
    selector: 'app-hero',
    template: '<div></div>'
  })
  class FakeHeroComponent {
    @Input() hero: Hero;
  }

  beforeEach(() => {
    HEROES = [
      { id: 1, name: 'Ajith', strength: 80 },
      { id: 2, name: 'Vijay', strength: 70 },
      { id: 3, name: 'Rajini', strength: 60 }
    ];
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        FakeHeroComponent
      ],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ],
    });
    fixture = TestBed.createComponent(HeroesComponent);
  });

  describe('ngOnInit', () => {
    it('should call getHeroes from the service once', () => {
      mockHeroService.getHeroes.and.returnValue(of(HEROES));
      fixture.detectChanges();

      expect(mockHeroService.getHeroes).toHaveBeenCalledTimes(1);
    });

    it('should set heros correctly from the service', () => {
      mockHeroService.getHeroes.and.returnValue(of(HEROES));
      fixture.detectChanges();

      expect(fixture.componentInstance.heroes).toEqual(HEROES);
    });

    it('should create one li for each hero', () => {
      mockHeroService.getHeroes.and.returnValue(of(HEROES));
      fixture.detectChanges();

      expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(HEROES.length);
    });
  });

  describe('delete', () => {
    it('should delete hero from the list', () => {
      // Arrange
      mockHeroService.deleteHero.and.returnValue(of(true));
      fixture.componentInstance.heroes = HEROES;
      // Act
      fixture.componentInstance.delete(HEROES[2]);
      // Assert
      expect(fixture.componentInstance.heroes.length).toEqual(2);
    });

    it('should call heroService with selected hero', () => {
      // Arrange
      mockHeroService.deleteHero.and.returnValue(of(true));
      fixture.componentInstance.heroes = HEROES;
      // Act
      fixture.componentInstance.delete(HEROES[2]);
      // Assert
      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
    });
  });
});
