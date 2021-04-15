# Human Centered Design

## test 1 

### Prototype
https://samslotemaker.github.io/human-centered-design-2021/table-prototype1/


### Belangrijkste Testresultaten
Het uitgebreide testverslag kun je [hier]() vinden.
Vandaag hebben we getest met Roger, Roger was duidelijk aangeslagen over wat hem overkomt en het lijkt er op dat Roger nog niet volledig wil overstappen op de hulpmiddelen die er beschikbaar zijn voor hem, bepaalde inzichten hierin waren:
* Roger probeert de website nog steeds met zicht te scannen
* Roger probeert nog steeds met de muis te navigeren
* Roger is zeker nog geen expert als het om de screenreader (SuperNova) gaat

Het is voor mij zaak om iets te ontwikkelen waar Roger daadwerkelijk iets aan heeft. Daarbij is het een exlusive design, dus kan het volledig worden ingericht op zijn preferenties. 
- Roger is slechtzien, niet blind, zijn zicht is verdweren in het midden van zijn gezichtsveld, de zijkanten zijn nog beperkt in stand. 
- Roger wordt verblind door wit/fel licht en gebruikt daarom graag darkmode
- Roger houdt van beeldhouden
- Roger heeft een marathon gelopen en loopt dus hard
- Roger maakt ook veel gebruik van zijn telefoon (iOS)

### Eerste idee concept
Allereerst leek het mij een goed idee om grafieken/tabellen toegankelijk te maken voor Roger, echter vertelde hij dat hij sinds enkele weken officieel werk ongeschikt is verklaard, dus ik denk dat dit niet genoeg toegevoegde waarde zou leveren in zijn toekomstige levensloop. Daarom kwam ik op hetvolgende: 

Een website die aangeeft of het droogblijft, wanneer Roger zou willen hardlopen. De applicatie zal in ieder geval het volgende moeten bevatten om testbaar te zijn wanneer we Roger weer ontmoeten:
* Een duidelijke manier van tonen of het droog blijft
* Hoog contrast met een donker thema
* Grote letters / knoppen

Dingen om te proberen zijn:
* Geluid afspelen zodat er wellicht nieteens naar het scherm gekeken hoeft te worden
* Elementen aan de zijkant positioneren, om het zoveel mogelijk gebruik te maken van Roger zijn restvisus. 

De volledige uitwerking van mijn eerste idee kun je [hier](https://github.com/SamSlotemaker/human-centered-design-2021/wiki/Uitwerken-concept) vinden. 

![Schermopname (155)](https://user-images.githubusercontent.com/60625329/114717419-4fa56900-9d35-11eb-9f37-399c4de3f888.png)


## test 2

### Prototype
https://samslotemaker.github.io/human-centered-design-2021/prototype-2/

### Belangrijkste Testresultaten
Wegens ziekte heeft Inju de tweede test in mijn plaats afgenomen, erg veel dank naar Inju hiervoor. Inju heeft mijn prototype met Roger doorlopen om bepaalde inzichten te verkrijgen en heeft hierbij sterk doorgevraagd naar bepaalde zaken. Inju heeft precies die punten aangekaart die ook in mijn hoofd opkwamen, de belangrijkste inzichten hieruit zijn: 

* Tekst valt buitenbeeld door inzoomen van browser (na vergelijken lijkt dit een zoom van 200% te zijn).
* Geluid is een leuke toevoeging (werking zal nog uitgelegd moeten worden), werkt nu alleen wanneer er op de pagina geklikt wordt. 
* Cursor is duidelijk door extra vergroting, wel is deze bij roger zwart geworden, waarschijnlijk door een darkmode instelling/plugin.
* Belangrijkste elementen moeten links geplaatst worden, Roger zijn linker oog is aanzienlijk beter dan zijn rechter oog (vrijwel niets).
* Roger geeft aan voor alsnog zo min mogelijk met zijn ogen te doen, omdat dit erg vermoeiend is.

### Aankopingspunten
Uit deze feedback haal ik belangrijke aanknopingspunten die mijn concept zouden kunnen verbeteren, enkele punten zouden zijn:
* Ontwerp met een 200% ingezoomde browser, ik wil rekening gaan houden met 100% tot 300% zicht, zodat hierin nog gewisseld kan worden (zo niet perongeluk)
* Het geluid wordt nu enkel afgespeeld op klik, dit kan niet anders omdat javascript geen geluid mag afspelen zonder dat er interactie met een pagina heeft plaatsgevonden (om spam te voorkomen). Echter, wellicht is dit nu wel mogelijk omdat ik een introductie scherm toon waar op geklikt dient te worden.
* Maak extra cursor een fellere/andere kleur, zodat de chrome extentie deze niet zwart maakt. 
* Laat de vertrektijd (keuze optie) wellicht met spraak bediend worden, belangrijk daarin is: 
   * Geef juiste feedback 
   * Niet te specifiek
   * Wellicht toesenbord bedienbaar aan en uit zetten
* Geef de mogelijkheid om de pagina voor te laten lezen, misschien is dit prettiger dat de screenreader.