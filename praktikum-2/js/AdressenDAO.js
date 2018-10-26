/*
 * Data Access Object (Datenzugriff) für adresseen-Fachobjekte  ------
 */

class AdressenDAO {
    constructor() {
	// this._adressenArray = [];
	this._adressenArray = [
	    {
		"_id": -1,
		"_name": "name",
		"_email": "top@test.de",
		"_ort": "hausen",
		"_plz": "1",
		"_strasse": "asd"
	    },
	    {
		"_id": 1,
		"_name": "AName",
		"_email": "amail@test.de",
		"_ort": "AHausen",
		"_plz": "1",
		"_strasse": "AStrasse"
	    },
	    {
		"_id": "2",
		"_name": "BName",
		"_email": "BMail@test.de",
		"_ort": "DHausen",
		"_plz": "2",
		"_strasse": "BStrasse"
	    },
	    {
		"_id": 3,
		"_name": "CName",
		"_email": "CMail@test.de",
		"_ort": "CHausen",
		"_plz": "0",
		"_strasse": "CStrasse"
	    }
	];

    }

    /* 
     * laden und speichern in local storage
     */
    speichern() {
	localStorage.setItem('adressenDAO', JSON.stringify(this));
    }

    laden() {
	let i;
	let gespeichertesDAO = JSON.parse(localStorage.getItem('adressenDAO'));
	
	if (gespeichertesDAO != null)
	    this._adressenArray = gespeichertesDAO._adressenArray;
	
	for (i = 0; i < this._adressenArray.length; ++i) {
	    this._adressenArray[i] = new AdresseDTO(
		this._adressenArray[i]._id,
		this._adressenArray[i]._name,
		this._adressenArray[i]._email,
		this._adressenArray[i]._ort,
		this._adressenArray[i]._plz,
		this._adressenArray[i]._strasse);
	}
	
	console.log('gespeichertesDAO: ', gespeichertesDAO);
    }

    /*
     * Hilfsfunktionen
     */

    /**
     * Liefert true, wenn die übergebene Adresse dem Namensfilter und/oder dem Adressfilter entspricht.
     * Beide Filter sind Präfixfilter, d.h. sie sind dann true, wenn 'name' oder 'ort' ein Präfix des
     * entsprechenden Attributs der Adresse ist. Leere Filterwerte werden dabei ignoriert, d.h. der Filter 
     * wird nicht geprüft.
     * Beispiele: 
     * 		name='P' und ort='Ing', adresse.name='Peter' und adresse.ort='Ingolstadt': Ergebnis = true
     * 		('P'' ist Präfix von 'Peter', 'Ing'' ist Präfix von 'Ingolstadt'') 
     * 		name='' und ort='I', adresse.name='Peter' und adresse.ort='ngolstadt': Ergebnis = false 
     * 		(der Namensfilter wird nicht evaluiert, 'I'' ist nicht Präfix von 'ngolstadt'')
     */
    filter(adresse, name, ort) {
	// *** (2) ***
	return (adresse.ort.toLowerCase().startsWith(ort.toLowerCase()) &&
		adresse.name.toLowerCase().startsWith(name.toLowerCase())) ? true : false;
    };	
    
    /**
     * Gibt das übergebene AdresseDTO-Array 'liste'' sortiert nach 'sortierung' (= string-Wert 
     * Name, Ort oder PLZ) zurück. Abhängig vom Wert von 'sortierung' wird eine passende sortierFunktion
     * definiert, die dann für die Sortierung mit "sort" genutzt wird.
     */
    sortiereAdressenListe(liste, sortierung) {
	// *** (3) ***
	switch (sortierung) {
	case("Name"):
	    liste.sort(function(a, b) {
		return b._name.localeCompare(a._name);
	    });
	    break;
	case("Ort"):
	    liste.sort(function (a, b) {
		return b._ort.localeCompare(a._ort);
	    });
	    break;
	case("PLZ"):
	    liste.sort(function (a, b) {
		console.log(parseInt(b._plz) - parseInt(a._plz));
		return parseInt(b._plz) - parseInt(a._plz);
	    });
	    break;
	}
    }

    /*
     * Methoden zum Zugriff auf die adresseenliste
     */
    findeAdresseZuId(id) {
	this.laden();
	let p = this._adressenArray[id];
	
	return p;
    }
    
    findeAlle() {
	this.laden();
	let ergebnis = [];
	let i, j = 0;
	
	for (i = 0; i < this._adressenArray.length; ++i) {
	    if (this._adressenArray[i].id != -1) {
		ergebnis[j++] = this._adressenArray[i];
	    }
	}
	
	ergebnis.sort(
	    function(p1, p2) { 
		return p1.id - p2.id;
	    }
	);

	return ergebnis;
    }

    findeZuFilterUndSortiere(name, ort, sortierung) {
	this.laden();
	let ergebnis = [];
	let i, j = 0;
	
	for (i = 0; i < this._adressenArray.length; ++i) {
	    if (this._adressenArray[i].id != -1) {
		if (this.filter(this._adressenArray[i], name, ort)) { 
		    ergebnis[j++] = this._adressenArray[i];
		}
	    }
	}
	
	this.sortiereAdressenListe(ergebnis, sortierung);
	return ergebnis;
    }

    neueAdresse(adresse) {
	this.laden();
	let i;
	
	for (i = 0; i < this._adressenArray.length; ++i) {
	    if (this._adressenArray[i].id == -1) {
		break;
	    }
	}
	adresse.id = i;
	this._adressenArray[adresse.id] = adresse;
	this.speichern();
    }

    aktualisiereAdresse(adresse) {
	this.laden();
	if (this.findeAdresseZuId(adresse.id) !== "undefined") {
	    this._adressenArray[adresse.id] = adresse;
	    this.speichern();
	}
    };

    /**
     * Löscht das Adressobjekt mit der übergebenen ID.
     * Es wird nur "logisch" gelöscht, indem die id auf den Wert -1 gesetzt wird.
     */
    loescheAdresse(id) {
	// *** (4) ***
	this.laden();
	if (this.findeAdresseZuId(id) !== "undefined") {
	    this._adressenArray[id].id = -1;
	    this.speichern();
	}
	this.laden();
    }

    /*
     * Getter für adresseDAO ---------------------------------------------
     */
    static gibAdresseDAO() {
	let dao = "undefined";
	
	if (typeof(Storage) !== "undefined") {
	    dao = new AdressenDAO();		
	    if (localStorage['adressenDAO']) {
		try {
		    let i;
		    
		    dao.laden();
		    for (i = 0; i < dao._adressenArray.length; ++i) {
			let p = dao._adressenArray[i]; 
			console.log(p.toString());
		    }

		} catch (error) {
		    alert(error);
		}
	    }
	} else {
	    alert("Sorry, your browser does not support web storage…");
	}	
	
	return dao;
    }
}
