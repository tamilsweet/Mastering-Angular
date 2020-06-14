import { HeroesComponent } from './heroes.component';
import { Hero } from '../hero';
import { of } from 'rxjs/internal/observable/of';

describe('HeroesComponent', () => {

  let component: HeroesComponent;
  let HEROES: Hero[];
  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: 'Ajith', strength: 80 },
      { id: 2, name: 'Vijay', strength: 70 },
      { id: 3, name: 'Rajini', strength: 60 }
    ];
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
    component = new HeroesComponent(mockHeroService);
  });

  describe('delete', () => {
    it('should delete hero from the list', () => {
      // Arrange
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;
      // Act
      component.delete(HEROES[2]);
      // Assert
      expect(component.heroes.length).toEqual(2);
    });

    it('should call heroService with selected hero', () => {
      // Arrange
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;
      // Act
      component.delete(HEROES[2]);
      // Assert
      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
    });
  });
});
