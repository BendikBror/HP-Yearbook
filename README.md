# HP-Yearbook
Dette er et JavaScript system for håndtering av Hogwarts-elever. Den henter data fra en ekstern API (https://hp-api.onrender.com/api/characters) og viser den på en nettside. Den tillater så filtrering og søk etter ulike elever, og tillater å legge til nye elever i systemet også.

Variabler
API: Denne variabelen inneholder URL-en til API-en som inneholder dataene for Hogwarts-elevene.

houseImages: Denne variabelen velger alle husbilder på nettsiden.

studentList: Denne variabelen velger HTML-elementet der elevtabellen vil bli vist.

allStudents: Denne variabelen er en tom array som vil inneholde alle elevene som er hentet fra API-en.

btn_randomStudent: Denne variabelen velger HTML-knappen som viser en tilfeldig elevs informasjon i et kortformat.

form: Denne variabelen velger HTML-skjemaet for å legge til en ny elev.

result: Denne variabelen velger HTML-elementet der søkeresultatene vil bli vist.

studentCard: Denne variabelen velger HTML-elementet der det tilfeldige elevkortet vil bli vist.

Funksjoner
fetch(): Denne funksjonen henter data fra API-en og returnerer den som JSON-data.

displayStudents(students): Denne funksjonen tar et array av elever og viser deres informasjon i en tabell på nettsiden.

img.addEventListener(): Denne funksjonen filtrerer elevene etter hus og sender den filtrerte informasjonen til displayStudents()-funksjonen.

form.addEventListener(): Denne funksjonen legger til en ny elev i allStudents-arrayen og sender den til displayStudents()-funksjonen.

btn_randomStudent.addEventListener(): Denne funksjonen viser informasjonen til en tilfeldig elev i et kortformat.

searchStudent(): Denne funksjonen søker etter en elev etter navn og viser deres informasjon i en liste.

Hovedkode
Hovedkoden starter med å hente data fra API-en ved hjelp av fetch()-funksjonen. Deretter konverterer den responsen til JSON-data og lagrer den i allStudents-arrayet.

Deretter kaller den displayStudents()-funksjonen med data som parameter, som viser alle elevene på nettsiden.

Den legger deretter til en hendelseslytter til hvert husbilde, som filtrerer elevene etter hus og kaller displayStudents()-funksjonen med den filtrerte dataen som parameter.

Koden legger også til en hendelseslytter til knappen for å sende inn skjemaet, som legger til en ny elev i allStudents-arrayet og kaller displayStudents()-funksjonen med den oppdaterte dataen som parameter.

Til slutt legger den til en hendelseslytter til knappen som viser informasjonen til en tilfeldig elev i et kortformat.

Konklusjon
Denne JavaScript-filen gir et velfungerende funksjonelt system for håndtering av Hogwarts-elever som tillater brukere å se, filtrere, søke og legge til nye elever.