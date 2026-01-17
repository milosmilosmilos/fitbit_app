# Fitbit Web API – Aplikacija za istraživačke svrhe

## Opis
Ovaj repozitorijum sadrži pokaznu veb aplikaciju razvijenu u okviru akademskog seminarskog rada, sa ciljem istraživanja pristupa i obrade podataka sa Fitbit nosivih uređaja (testirano za Fitbit Charge 6) putem zvaničnog Fitbit Web API servisa. Projekat je namenjen isključivo u edukativne i istraživačke svrhe.

## Ciljevi
- demonstracija OAuth 2.0 autorizacije korisnika  
- komunikacija sa Fitbit Web API servisom  
- preuzimanje osnovnih i detaljnih podataka o aktivnosti korisnika

## Tehnologije
- Node.js  
- Express.js  
- node-fetch  
- OAuth 2.0  
- Fitbit Web API  

## Funkcionalnosti
- OAuth 2.0 prijava korisnika  
- preuzimanje podataka (podaci o srčanom ritmu, fazama sna, zasićenosti krvi kiseonikom - SpO2, elektrokardiogramu (ECG) – u zavisnosti od dostupnosti)  
- osnovni prikaz i obrada podataka  

## Bezbednost i privatnost
Aplikacija koristi HTTPS komunikaciju i ne čuva trajno poverljive podatke.

## Pokretanje
```bash
npm install
node index.js
