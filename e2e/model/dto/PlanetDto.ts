import { Planet } from "../entity/Planet";

export class PlanetDto {
  name?: string;
  population?: string;
  climate?: string;
  gravity?: string;

  fromModel(planet: Planet) {
    this.name = planet.name;
    this.population = planet.population;
    this.climate = planet.climate;
    this.gravity = planet.gravity;
  }

  toModel(): Planet {
    let planet: Planet = new Planet();
    planet.name = this.name;
    planet.population = this.population;
    planet.climate = this.climate;
    planet.gravity = this.gravity;
    return planet;
  }
}
