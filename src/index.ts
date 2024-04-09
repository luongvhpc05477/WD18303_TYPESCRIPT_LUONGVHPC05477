// bắt lỗi form người dùng

import 'reflect-metadata';
import {  IsNotEmpty, Matches,Length } from 'class-validator';
import { validate } from 'class-validator';


class User {
  @Length(2, undefined, { message: 'Tên người chơi không được chứa 1 kí tự' })
  @Matches(/^[^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/, { message: 'Tên người chơi  được chứa  ký tự đặc biệt' })
  @IsNotEmpty({ message: 'Vui lòng nhập vào tên người chơi' })
  name: string;

}

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('myForm') as HTMLFormElement;
  const nameInput = document.getElementById('name') as HTMLInputElement;
  const errorName = document.getElementById('errorMessages');

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const UserData = new User();

     UserData.name  = nameInput.value;

    const errors  = await validate(UserData);

  

    if (errors.length > 0) {
      errorName.innerHTML = '';

      errors.forEach(error => {
        const errorElement = document.createElement('div');
        const errorMessages = error.constraints[Object.keys(error.constraints!)[0]];
        errorElement.textContent = errorMessages;
        errorName.appendChild(errorElement);
      });
    } else {
      form.submit();  
    }
  });
});



const pokemon: number = 12;

async function callApi(url: string): Promise<any> {
  const data: Response = await fetch(url);
  return await data.json();
}

const APP_pokemon: HTMLElement | null = document.getElementById("app");
let html: string = "";

console.log(Math.floor(Math.random() * 100) + 1);


// trộn id
const doubleData: number[] = [];
for (let index = 0; index < pokemon; index++) {
  doubleData.push(index + 1);
  doubleData.push(index + 1);
}
const shuffledData = shuffleArray(doubleData);
function shuffleArray(array: any[]): any[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}


for (let index = 0; index < shuffledData.length; index++) {
  const data: Promise<any> = callApi(
    `https://pokeapi.co/api/v2/pokemon/${shuffledData[index]}/`
  );

  data.then(function (response: any) {
    console.log(response.name);
    html += `
    <div class="col-2">
      <div class="card shadow mb-3" id="pokemon-card-${response.id}">
        <span class="position-absolute top-0">${response.id}</span>
        <img src="${response.sprites.front_default}" style="width: 200px; height: 150px;" alt="${response.name}">
      </div>
    </div>`;
    APP_pokemon!.innerHTML = html;
    img();
  });
}

let countdownInterval: any;

const start =  document.getElementById("start");
if (start) {
  start.addEventListener('click', (event) => {
    event.preventDefault();
    let timeleft: number = 120;
    countdownInterval = setInterval(() => {
      let minutes: number = Math.floor(timeleft / 60);
      let seconds: number = timeleft % 60;
  
      if (timeleft <= 0) {
        clearInterval(countdownInterval);
        document.getElementById("countdown")!.innerHTML = "";
        document.getElementById("popup")!.style.display = "block";
        document.getElementById("popup-overlay")!.style.display = "block";
      } else {
        document.getElementById("countdown")!.innerHTML =
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
  })
}


const  resetCountdown = document.getElementById("reset");
if(resetCountdown){
  resetCountdown.addEventListener( 'click' , ()=>{
    window.location.reload();
  })
}

function win() {
    window.location.reload();
}




function img() {
  let diem: number = 0;
  let selectedImages: string[] = [];
  let matchedCards: string[] = [];
  const cardElements: NodeListOf<Element> = document.querySelectorAll('[id^="pokemon-card-"]');

  cardElements.forEach((cardElement) => {
    cardElement.addEventListener("click", cardClick);
  });

  const Diem: HTMLElement | null = document.getElementById("diem");

  async function cardClick(event: any) {
    const cardElement: HTMLElement |  null = event.currentTarget as HTMLElement;
    const img: HTMLImageElement | null = cardElement.querySelector("img");
    const idPokemon: string = cardElement.id;
  
    if (img && img.style && !matchedCards.includes(idPokemon)) {
      img.style.opacity = "1";
      selectedImages.push(idPokemon);
  
      if (selectedImages.length === 2) {
        const imageId1: string = selectedImages[0];
        const imageId2: string = selectedImages[1];
  
        if (imageId1 !== imageId2) {
          const image1 = document.getElementById(imageId1)?.querySelector("img");
          const image2 = document.getElementById(imageId2)?.querySelector("img");
  
          if (image1 && image2) {
            await new Promise((resolve) => setTimeout(resolve, 100));
            image1.style.opacity = "0";
            image2.style.opacity = "0";
          }
        } else {
          
          const matchedImages = document.querySelectorAll(`[id="${imageId1}"]`);
           matchedImages.forEach((matchedImage) => {
            matchedImage.remove();
           })
  
          diem++;
          Diem!.innerHTML = `<h3 class="shadow text-center" style="color: red;">Điểm Của Bạn:  ${diem}</h3>`;
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
  }
}




if (window.location.pathname.includes("game.html")) {
  const urlParams: URLSearchParams = new URLSearchParams(
    window.location.search
  );
  const username: string | null = urlParams.get("name");

  const usernameHeading: HTMLHeadingElement = document.createElement("h1");
  usernameHeading.textContent = `Xin chào người chơi ${username}`;

  const body: HTMLBodyElement | null = document.querySelector("body");
  body!.insertBefore(usernameHeading, body!.firstChild);
}
