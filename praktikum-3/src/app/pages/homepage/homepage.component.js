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
var SpeicherService_service_1 = require("../../services/SpeicherService.service");
var HomepageComponent = (function () {
    function HomepageComponent(speicherService) {
        this.speicherService = speicherService;
        this.fehlermeldung = '';
        this.cancelLogin = function () {
            jQuery("#loginDialog").modal("hide");
            this.fehlermeldung = "";
        };
        this.me = this.speicherService.ladePerson();
        this.lastBirthdate = this.me.birthdate;
        this.username = "";
        this.password = "";
        this.fehlermeldung = "";
        this.steckBriefGesperrt = true;
        this.aendernButtonLabel = "ändern";
    }
    HomepageComponent.prototype.login = function () {
        this.fehlermeldung = "";
        if (this.username === "Hugo" && this.password === "123") {
            this.steckBriefAendern();
            jQuery("#loginDialog").modal("hide");
        }
        else {
            this.fehlermeldung = "Fehlerhafte Login-Daten!";
        }
    };
    ;
    HomepageComponent.prototype.steckBriefAendern = function () {
        // birthdate überprüfen
        if (this.me.birthdate === null || this.me.birthdate === "") {
            this.me.birthdate = this.lastBirthdate; // gültigen Wert herstellen
        }
        else {
            this.lastBirthdate = this.me.birthdate;
        }
        if (!this.steckBriefGesperrt) {
            this.aendernButtonLabel = "ändern";
            this.steckBriefGesperrt = true;
            this.speicherService.speicherePerson(this.me);
        }
        else {
            this.aendernButtonLabel = "ok";
            this.steckBriefGesperrt = false;
        }
    };
    HomepageComponent.prototype.ngOnInit = function () {
    };
    return HomepageComponent;
}());
HomepageComponent = __decorate([
    core_1.Component({
        selector: 'homepage',
        templateUrl: './homepage.component.html',
        styleUrls: ['./homepage.component.css']
    }),
    __metadata("design:paramtypes", [SpeicherService_service_1.SpeicherService])
], HomepageComponent);
exports.HomepageComponent = HomepageComponent;
//# sourceMappingURL=homepage.component.js.map
