"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Person_1 = require("../models/Person");
var SpeicherService = (function () {
    function SpeicherService() {
        this.imgPath = '/assets/img/';
    }
    SpeicherService.prototype.ladePerson = function () {
        var personStr = localStorage.getItem('daten');
        var person = null;
        if (personStr === null || personStr === "") {
            person = new Person_1.Person('Bart Simpson', this.imgPath + 'bart.jpeg', '2003-12-24', 'Hollywood', 'Sohn');
            localStorage.setItem('daten', JSON.stringify(person));
            console.debug("SpeicherService.ladeDaten: localStorage empty, person = " + JSON.stringify(person));
            return person;
        }
        else {
            try {
                person = JSON.parse(personStr);
                console.debug("SpeicherService.ladeDaten: person from localStorage = " + JSON.stringify(person));
                return person;
            }
            catch (e) {
                console.error("SpeicherService.ladePerson: error: " + e);
            }
        }
    };
    SpeicherService.prototype.speicherePerson = function (person) {
        try {
            localStorage.setItem('daten', JSON.stringify(person));
            console.debug("SpeicherService.speicherePerson: writing to localStorage: "
                + JSON.stringify(person));
        }
        catch (e) {
            console.error("SpeicherService.speicherePerson: error: " + e);
        }
    };
    return SpeicherService;
}());
SpeicherService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], SpeicherService);
exports.SpeicherService = SpeicherService;
//# sourceMappingURL=SpeicherService.service.js.map