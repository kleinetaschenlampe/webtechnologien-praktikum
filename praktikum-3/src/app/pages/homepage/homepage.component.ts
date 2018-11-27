import { Component, OnInit } from '@angular/core';
import { SpeicherService } from '../../services/SpeicherService.service';
import { Person } from './../../models/Person';

declare var jQuery: any;

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit {
  public me: Person;
  public steckBriefGesperrt: boolean;
  public lastBirthdate: string;
  public aendernButtonLabel: string;
  public fehlermeldung: string = '';

  // Dialog-Attribute
  public username: string;
  public password: string;

  public constructor(public speicherService: SpeicherService) {
    // Componenten-Daten initialisieren

    /* a) bitte Code hier einfügen... */
    this.me = speicherService.ladePerson();
    this.steckBriefGesperrt = true;
  }


  // prueft die eingegebenen Daten (username/password) auf Korrektheit (Hugo/123)
  // und schliesst den Login-Dialog und ruft steckBriefAendern() auf, falls die Daten korrekt sind.
  // Andernfalls wird eine Fehlermeldung angezeigt.
  public login(): void {

    /* b) bitte Code hier einfügen... */
    if (this.username == this.me.username
      && this.password == this.me.password) {
      this.lastBirthdate = this.me.birthdate;
      this.steckBriefAendern();
      this.cancelLogin();
      console.log(this.me);
    } else {
      this.fehlermeldung = 'Ungültiger Login!';
    }
  };

  // der Login-Dialog wird geschlossen, die Fehlermeldung wird gelöscht.
  public cancelLogin(): void {
    /*
     * Login-Dialog verbergen mit jQuery-Aufruf:
     * es wird das Element mit id 'loginDialog' gesucht und 
     * darauf die Methode 'modal' aufgerufen
     */
    jQuery('#loginDialog').modal('hide');
    this.fehlermeldung = '';
  }

  // prüft zunächst das eingegebene 'birthdate'. Falls ein ungültiger oder leerer Wert vorliegt,
  // wird 'birthdate' aus dem letzten gültigen Wert wiederhergestellt.
  // Abhängig vom aktuellen Modus (nur lesen oder bearbeiten) werden nun entweder die geänderten Daten gespeichert
  // und der Bearbeitungsmodus wird verlassen oder es wird vom Lesemodus in den Bearbeitungsmodus gewechselt.
  public steckBriefAendern(): void {

    /* c) bitte Code hier einfügen... */
    let re = /\d{4}-\d{2}-\d{2}/;
    if (!this.me.birthdate.match(re)) {
      console.log(this.me.birthdate);
      this.me.birthdate = this.lastBirthdate;
    }
    if (this.steckBriefGesperrt) {
      this.steckBriefGesperrt = false;
    } else {
      this.speicherService.speicherePerson(this.me);
      this.steckBriefGesperrt = true;
    }

  }

  ngOnInit(): void {
  }
}
