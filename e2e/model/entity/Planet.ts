export class Planet {
  name: string;
  population: string;
  climate: string;
  gravity: string;

  withName(value: string) {
    this.name = value;
    return this;
  }

  withPopulation(value: string) {
    this.population = value;
    return this;
  }

  withClimate(value: string) {
    this.climate = value;
    return this;
  }

  withGravity(value: string) {
    this.gravity = value;
    return this;
  }
}
