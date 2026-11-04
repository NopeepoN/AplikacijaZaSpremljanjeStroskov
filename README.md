NopeepoN in TeemoPlayer sta ista oseba, TeemoPlayer je se shranjen od praktikuma zato so vsi commiti vezani na njega 

1.O projektu:
Aplikacija za spremljanje stroškov je spletna aplikacija,namenjena enostavnemu beleženju in pregledovanju osebnih stroškov.
Glaven cilj projekta je uporabniku omogočiti boljši pregled nad porabo denarja ter lažje spremljanje posameznih stroškov.

Aplikacija omogoča:
*Funkcije CRUD
*Filtriranje stroškov po kategorijah
*Razvrščanje stroškov po datumu in znesku

2.Uporabljene tehnologije: 
Projekt je razdeljen na backend in frontend.

Backend:
*Java 21 - programski jezik
*Spring Boot - ogrodje za razvoj backend aplikacije
*Spring Data JPA - povezava in delo s podatkovno bazo
*Maven - upravljanje odvisnosti in gradnja projekta

Frontend:
*JavaScript - programski jezik
*React - knjižnica za izdelavo uporabniškega vmesnika
*Vite - ogrodje za razvoj in zaganjanje frontend aplikacije
*HTML in CSS - struktura in oblikovanje uporabniškega vmesnika
*Node.js - izvajanje in upravljanje paketov

Podatkovna baza
*PostgreSQL - relacijska podatkovna baza

3.Struktura projekta: 
Urisek_RIS/
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/example/stroski/
│   │   │   │   ├── controller/
│   │   │   │   ├── repository/
│   │   │   │   ├── Strosek.java
│   │   │   │   └── StroskiApplication.java
│   │   │   │
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   │
│   │   └── test/
│   ├── pom.xml
│   └── mvnw
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── slike/
├── .gitignore
└── README.md

Opis map in datotek:

Backend:
*controller/ – vsebuje kontrolerje, ki obdelujejo HTTP zahtevke.
*repository/ – vsebuje repozitorije za dostop do podatkovne baze.
*Strosek.java – predstavlja entiteto oziroma posamezen strošek.
*StroskiApplication.java – glavna zagonska datoteka Spring Boot aplikacije.
*application.properties – vsebuje konfiguracijo aplikacije in povezavo s podatkovno bazo.
*pom.xml – vsebuje odvisnosti in nastavitve Maven projekta.

Frontend:
*public/ – vsebuje javne datoteke.
*src/ – vsebuje izvorno kodo frontend aplikacije.
*assets/ – vsebuje slike in druge grafične datoteke.
*App.jsx – glavna komponenta uporabniškega vmesnika.
*App.css in index.css – vsebujeta CSS oblikovanje.
*main.jsx – začetna datoteka React aplikacije.
*package.json – vsebuje odvisnosti in ukaze za zagon.

Ostalo:
*slike/ – vsebuje slike zaslonskih prikazov aplikacije.
*.gitignore – določa datoteke, ki se ne vključujejo v Git repozitorij.
*README.md – vsebuje dokumentacijo projekta.

Navodila za nameščanje in zagon: 

Navodila za razvijalce:

Standardi kodiranja.
