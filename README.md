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

4.Navodila za nameščanje in zagon:

4.1 Predpogoji
Za pravilno delovanje projekta potrebujemo:
*Java JDK 21
*Node.js in npm
*PostgreSQL
*Visual Studio Code ali drugo razvojno okolje
*Git

4.2 Nastavitev podatkovne baze
Namestimo PostgreSQL.
Zaženemo PostgreSQL strežnik.
Ustvarimo podatkovno bazo z imenom stroski_db.
Pripravimo uporabniško ime in geslo za dostop do podatkovne baze.

4.3 Konfiguracija backenda
V datoteki backend/src/main/resources/application.properties nastavimo:

spring.application.name=stroski
spring.datasource.url=jdbc:postgresql://localhost:5432/stroski_db
spring.datasource.driver-class-name=org.postgresql.Driver
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.open-in-view=false

Okoljski spremenljivki nastavimo v PowerShellu:

$env:DB_USERNAME = "postgres"
$env:DB_PASSWORD = "poljubno_geslo"

4.4 Zagon backenda
V PowerShellu odpremo mapo backend:

cd backend

Nato zaženemo aplikacijo:

.\mvnw.cmd spring-boot:run

Backend je privzeto dostopen na naslovu http://localhost:8080

4.5 Namestitev in zagon frontenda

Odpremo nov terminal in vstopimo v mapo frontend:

cd frontend

Namestimo potrebne pakete:

npm install

Zaženemo frontend aplikacijo:

npm run dev

Frontend je običajno dostopen na naslovu http://localhost:5173

5.Navodila za razvijalce:
Projekt uporablja Git in GitHub za upravljanje izvorne kode ter sodelovanje med razvijalci.

Pridobitev projekta

git clone https://github.com/NopeepoN/AplikacijaZaSpremljanjeStroskov.git

Delo na projektu

Pred začetkom dela pridobimo zadnje spremembe:

git pull

Izvedemo želene spremembe v kodi.
Preverimo delovanje aplikacije.
Dodamo spremenjene datoteke:

git add .

Ustvarimo commit z opisnim sporočilom:

git commit -m "Opis spremembe"

Spremembe prenesemo na GitHub:

git push

6.Standardi kodiranja.
Pri razvoju projekta upoštevamo naslednje standarde:
*Imena spremenljivk, metod in razredov naj bodo smiselna in razumljiva.
*Uporabljamo enotno oblikovanje in zamikanje kode.
*Kodo razdelimo na manjše in pregledne funkcije oziroma metode.
*Za imena Java razredov uporabljamo zapis PascalCase.
*Za imena Java metod in spremenljivk uporabljamo zapis camelCase.
*Za React komponente uporabljamo zapis PascalCase.
*CSS razrede poimenujemo opisno.
*Komentarje uporabljamo tam, kjer pomagajo razumeti zahtevnejše dele kode.
*Gesel in drugih občutljivih podatkov ne objavljamo v GitHub repozitoriju.
*Pred oddajo sprememb preverimo, ali aplikacija pravilno deluje.
