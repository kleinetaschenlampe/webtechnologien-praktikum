import { Injectable } from '@angular/core';
import { Person } from '../models/Person';

@Injectable()
export class SpeicherService {
  private imgPath = '/assets/img/';

  public constructor() {
  }

  // Lädt die Personendaten aus dem localStorage
  public ladePerson(): Person {
    let person: Person = JSON.parse(localStorage.getItem("person"));
    if (!person) {
      person = new Person('', '', '', '', '', '', '');
    }
    return person;
  }

  // Speichert die übergebenen Personendaten im localStorage
  public speicherePerson(person: Person): void {
    try {
      /* hier Code ergänzen */
      localStorage.setItem("person", JSON.stringify(person));
    } catch (e) {
      console.error("SpeicherService.speicherePerson: error: " + e);
    }
  }
}
