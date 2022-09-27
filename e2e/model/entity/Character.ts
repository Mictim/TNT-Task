export class Character {
  name: string;
  gender: string;
  birthYear: string;
  eyeColor: string;
  skinColor: string;

  withName(name: string) {
    this.name = name;
    return this;
  }

  withGender(gender: string) {
    this.gender = gender;
    return this;
  }

  withBirthYear(birthYear: string) {
    this.birthYear = birthYear;
    return this;
  }

  withEyeColor(eyeColor: string) {
    this.eyeColor = eyeColor;
    return this;
  }

  withSkinColor(skinColor: string) {
    this.skinColor = skinColor;
    return this;
  }
}
