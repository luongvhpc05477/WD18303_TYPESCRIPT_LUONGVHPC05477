"use strict";
// bắt lỗi form người dùng
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const class_validator_1 = require("class-validator");
const class_validator_2 = require("class-validator");
class User {
}
__decorate([
    (0, class_validator_1.Length)(2, undefined, { message: 'Tên người chơi không được chứa 1 kí tự' }),
    (0, class_validator_1.Matches)(/^[^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/, { message: 'Tên người chơi  được chứa  ký tự đặc biệt' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Vui lòng nhập vào tên người chơi' }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('myForm');
    const nameInput = document.getElementById('name');
    const errorName = document.getElementById('errorMessages');
    form.addEventListener('submit', function (event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            const UserData = new User();
            UserData.name = nameInput.value;
            const errors = yield (0, class_validator_2.validate)(UserData);
            if (errors.length > 0) {
                errorName.innerHTML = '';
                errors.forEach(error => {
                    const errorElement = document.createElement('div');
                    const errorMessages = error.constraints[Object.keys(error.constraints)[0]];
                    errorElement.textContent = errorMessages;
                    errorName.appendChild(errorElement);
                });
            }
            else {
                form.submit();
            }
        });
    });
});
const pokemon = 12;
function callApi(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield fetch(url);
        return yield data.json();
    });
}
const APP_pokemon = document.getElementById("app");
let html = "";
console.log(Math.floor(Math.random() * 100) + 1);
// trộn id
const doubleData = [];
for (let index = 0; index < pokemon; index++) {
    doubleData.push(index + 1);
    doubleData.push(index + 1);
}
const shuffledData = shuffleArray(doubleData);
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}
for (let index = 0; index < shuffledData.length; index++) {
    const data = callApi(`https://pokeapi.co/api/v2/pokemon/${shuffledData[index]}/`);
    data.then(function (response) {
        console.log(response.name);
        html += `
    <div class="col-2">
      <div class="card shadow mb-3" id="pokemon-card-${response.id}">
        <span class="position-absolute top-0">${response.id}</span>
        <img src="${response.sprites.front_default}" style="width: 200px; height: 150px;" alt="${response.name}">
      </div>
    </div>`;
        APP_pokemon.innerHTML = html;
        img();
    });
}
let countdownInterval;
const start = document.getElementById("start");
if (start) {
    start.addEventListener('click', (event) => {
        event.preventDefault();
        let timeleft = 120;
        countdownInterval = setInterval(() => {
            let minutes = Math.floor(timeleft / 60);
            let seconds = timeleft % 60;
            if (timeleft <= 0) {
                clearInterval(countdownInterval);
                document.getElementById("countdown").innerHTML = "";
                document.getElementById("popup").style.display = "block";
                document.getElementById("popup-overlay").style.display = "block";
            }
            else {
                document.getElementById("countdown").innerHTML =
                    "<center>" +
                        "<h2> Trò chơi sẽ kết thúc sau " +
                        "<h3>" +
                        minutes +
                        " phút " +
                        seconds +
                        " giây" +
                        "<h3>" +
                        "</h2>" +
                        "</center>";
            }
            timeleft -= 1;
        }, 1000);
    });
}
const resetCountdown = document.getElementById("reset");
if (resetCountdown) {
    resetCountdown.addEventListener('click', () => {
        window.location.reload();
    });
}
function win() {
    window.location.reload();
}
function img() {
    let diem = 0;
    let selectedImages = [];
    let matchedCards = [];
    const cardElements = document.querySelectorAll('[id^="pokemon-card-"]');
    cardElements.forEach((cardElement) => {
        cardElement.addEventListener("click", cardClick);
    });
    const Diem = document.getElementById("diem");
    function cardClick(event) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const cardElement = event.currentTarget;
            const img = cardElement.querySelector("img");
            const idPokemon = cardElement.id;
            if (img && img.style && !matchedCards.includes(idPokemon)) {
                img.style.opacity = "1";
                selectedImages.push(idPokemon);
                if (selectedImages.length === 2) {
                    const imageId1 = selectedImages[0];
                    const imageId2 = selectedImages[1];
                    if (imageId1 !== imageId2) {
                        const image1 = (_a = document.getElementById(imageId1)) === null || _a === void 0 ? void 0 : _a.querySelector("img");
                        const image2 = (_b = document.getElementById(imageId2)) === null || _b === void 0 ? void 0 : _b.querySelector("img");
                        if (image1 && image2) {
                            yield new Promise((resolve) => setTimeout(resolve, 100));
                            image1.style.opacity = "0";
                            image2.style.opacity = "0";
                        }
                    }
                    else {
                        const matchedImages = document.querySelectorAll(`[id="${imageId1}"]`);
                        matchedImages.forEach((matchedImage) => {
                            matchedImage.remove();
                        });
                        diem++;
                        Diem.innerHTML = `<h3 class="shadow text-center" style="color: red;">Điểm Của Bạn:  ${diem}</h3>`;
                        matchedCards.push(imageId1, imageId2);
                        if (matchedCards.length === pokemon * 2) {
                            const confirmation = confirm("Chúc mừng! Bạn đã hoàn thành xuất sắc trò chơi.");
                            if (confirmation) {
                                win();
                            }
                        }
                    }
                    const matchedImages = document.querySelectorAll(`[id="${imageId1}"]`);
                    matchedImages.forEach((matchedImage) => {
                        const img = matchedImage.querySelector("img");
                        if (img) {
                            img.style.opacity = "0";
                        }
                    });
                    selectedImages = [];
                }
            }
        });
    }
}
if (window.location.pathname.includes("game.html")) {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get("name");
    const usernameHeading = document.createElement("h1");
    usernameHeading.textContent = `Xin chào người chơi ${username}`;
    const body = document.querySelector("body");
    body.insertBefore(usernameHeading, body.firstChild);
}
