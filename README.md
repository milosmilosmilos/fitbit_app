# Fitbit Web API – Aplikacija za istraživačke svrhe

## Opis
Ovaj repozitorijum sadrži demonstracionu veb aplikaciju razvijenu u okviru akademskog seminarskog rada, sa ciljem istraživanja pristupa i obrade podataka sa Fitbit nosivih uređaja putem zvaničnog Fitbit Web API-ja. Projekat je namenjen isključivo edukativnim i istraživačkim svrhama.

## Ciljevi
- demonstracija OAuth 2.0 autorizacije korisnika  
- komunikacija sa Fitbit Web API-jem  
- preuzimanje osnovnih i detaljnih podataka o aktivnosti korisnika

## Tehnologije
- Node.js  
- Express.js  
- node-fetch  
- OAuth 2.0  
- Fitbit Web API  

## Funkcionalnosti
- OAuth 2.0 prijava korisnika  
- preuzimanje podataka (srčani ritam, faze sna, SpO2, ECG – u zavisnosti od dostupnosti)  
- osnovni prikaz i obrada podataka  

## Bezbednost i privatnost
Aplikacija koristi HTTPS komunikaciju, ne čuva trajno poverljive podatke i poštuje osnovne principe GDPR-a i Zakona o zaštiti podataka o ličnosti Republike Srbije.

## Pokretanje
```bash
npm install
node index.js
