"use strict";

var adressenDAO = AdressenDAO.gibAdresseDAO();

window.onfocus = function (evt) {
	var table = document.getElementById("adressenTabelle");
	
	console.log("table = " + table);
	if (table == null) { // passiert nur, wenn wir in anderem Tab sind...
		return;
	}
	
	if (evt.type == 'focus') {		
		console.log('focus');
		belegeAdressenTabelle();
	}			
};

/*
 * Handler für Suchdialog
 */
function neueAdresseAnlegen() { 
	window.open("NeueAdresse.html?mode=new");
}

function bearbeiteAdresse(button) { 
	var url = "NeueAdresse.html?mode=edit";
	
	try {
		var row = button.parentNode.parentNode;
		
		url += "&id=" + row.cells[0].innerHTML;
		url += "&name=" + row.cells[1].innerHTML;
		url += "&email=" + row.cells[2].innerHTML;
		url += "&ort=" + row.cells[3].innerHTML;
		url += "&plz=" + row.cells[4].innerHTML;
		url += "&strasse=" + row.cells[5].innerHTML;
	    window.open(encodeURI(url));
 	} catch (error) {
 		alert(error);
 	}
}

function loescheAdresse(buttonWidget) {
    var index = buttonWidget.parentNode.parentNode.rowIndex;
	var id = Number(buttonWidget.parentNode.parentNode.cells[0].innerHTML);

    adressenDAO.loescheAdresse(id);
    document.getElementById('adressenTabelle').deleteRow(index);
}

/*
 * Hilfsfunktionen für Suchdialog
 */
function belegeZeile(table, adresse) {
	console.log("belegeZeile: adresse = " + adresse.toString());

	var tr = table.insertRow(1); // Überschrift überspringen	
	var td  = tr.insertCell(0);
	
   	var inhalt  = document.createTextNode(adresse.id);
   	td.appendChild(inhalt);
   	td.hidden = "true";
   	
	td  = tr.insertCell(1);
   	inhalt = document.createTextNode(adresse.name);
   	td.appendChild(inhalt);

	// *** (5) ***

	// edit button
	var button = document.createElement('button');
	button.onclick = function() {
		bearbeiteAdresse(this);
	};
	var image = document.createElement('img');
	image.src = "images/editIcon.jpg";
	image.width = "15";
	image.height = "15";
	button.appendChild(image);
	td.appendChild(button);
	// delete button

	// *** (6) ***

}

function belegeAdressenTabelle() {
	try {
		console.log("belegeAdressenTabelle");
	
		var table = document.getElementById("adressenTabelle");
		var adressen = adressenDAO.findeZuFilterUndSortiere(
			document.getElementById('nameID').value,
			document.getElementById('ortID').value,
			document.getElementById('sortierungID').value);
		var i;

		while (table.rows.length > 1) {
			table.deleteRow(1);
		}
		for (i = 0; i < adressen.length; ++i) {
			belegeZeile(table, adressen[i]);
		}
	} catch (error) {
		console.log(error);
		alert(error);
	}
}

/*
 * Handler für Dialog zum Anlegen/Bearbeiten von Adressen
 */
function adresseBearbeitenAbbrechen() {
	window.close();
}

function speichereAdresse() {
	var id = document.getElementById("idID").value;
	var adresse = new AdresseDTO(id,
			document.getElementById("nameID").value,
			document.getElementById("emailID").value,
			document.getElementById("ortID").value,
			document.getElementById("plzID").value,
			document.getElementById("strasseID").value);
    
    try {
    	adresse.pruefe();
    	if (id == -1) {
    		adressenDAO.neueAdresse(adresse);    		
    	} else {
    		adressenDAO.aktualisiereAdresse(adresse);    		
    	}    	
    	window.close();
    } catch (errorMsg) {
        alert(errorMsg);
    }
}

/*
 * Hilfsfunktionen für Dialog zum Bearbeiten/Neuanlegen
 */
function initialisiereSeite() {
	var url = decodeURI(window.location.href);
    var urlParts = url.split("?");
    var modeParts = urlParts[1].split("&");
    var newText = "Neue Adresse anlegen";
    var bearbeitenText = "Adresse bearbeiten";
    
    if (modeParts[0] == "mode=new") {
        document.getElementById("titleID").innerHTML = newText;
        document.getElementById("ueberschriftID").innerHTML = newText;
        document.getElementById("idID").value="-1";
    } else {
        document.getElementById("titleID").innerHTML = bearbeitenText;
        document.getElementById("ueberschriftID").innerHTML = bearbeitenText;
        document.getElementById("idID").value = modeParts[1].split("=")[1];
        document.getElementById("nameID").readonly = true;
        document.getElementById("nameID").disabled = true;
        document.getElementById("nameID").value = modeParts[2].split("=")[1];
        document.getElementById("emailID").value = modeParts[3].split("=")[1];
        document.getElementById("ortID").value = modeParts[4].split("=")[1];
        document.getElementById("plzID").value = modeParts[5].split("=")[1];
        document.getElementById("strasseID").value = modeParts[6].split("=")[1];
    }
}

