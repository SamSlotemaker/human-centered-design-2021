# Human Centered Design

[LIVE LINK](https://samslotemaker.github.io/human-centered-design-2021/concept)

## :memo:Table of Contents
* [Beschrijving](https://github.com/SamSlotemaker/human-centered-design-2021#clipboardbeschrijving)
* [Over roger](https://github.com/SamSlotemaker/human-centered-design-2021#man-over-roger)
   * [Belangijkste bevindingen](https://github.com/SamSlotemaker/human-centered-design-2021#exclamation-belangrijkste-test-informatie)
   * [Technische details](https://github.com/SamSlotemaker/human-centered-design-2021#computer-technische-details)
   * [Belangrijkste aanknopingspunten voor de applicatie](https://github.com/SamSlotemaker/human-centered-design-2021#bulb-belangrijkste-aanknopingspunten-voor-de-applicatie)
* [Concept](https://github.com/SamSlotemaker/human-centered-design-2021#pencil-concept)
   * [Realisatie](https://github.com/SamSlotemaker/human-centered-design-2021#:hammer:realisatie)
* [Belangrijkste testinformatie](https://github.com/SamSlotemaker/human-centered-design-2021#exclamation-belangrijkste-test-informatie)
   * [Test 1](https://github.com/SamSlotemaker/human-centered-design-2021#one-test-1)
   * [Test 2](https://github.com/SamSlotemaker/human-centered-design-2021#twotest-2)
   * [Test 3](https://github.com/SamSlotemaker/human-centered-design-2021#threetest-3)

## :clipboard:Beschrijving
Deze applicatie ontwikkel ik speciaal voor Roger Ravelli. De applicatie zal speciaal voor hem alleen gemaakt worden en zal in de loop van de weken 3 keer getest worden, zodat hij voor Roger zo goed mogelijk werkt. Het is de bedoeling dat ik rekening hou met de beperkingen die Roger met zich meedraagt en de applicatie hierop aanpas.

## :man: Over roger
Roger is een slechtziende man, die langzamerhand steeds blinder wordt. Hij houdt van beeldhouden, lezen, hardlopen en is kort geleden arbeidsongeschikt verklaard. Roger kan nog gebruikmaken van zijn restvisus maar dit is erg vermoeiend voor hem. 

### :question:Belangrijkste bevindingen
Onderstaande bevinden en details komen uit de tests die ik met Roger gedaan heb, die onderaan samengevat worden en [hier](https://github.com/SamSlotemaker/human-centered-design-2021/wiki) in detail beschreven worden.

* Roger ziet links meer dan rechts
* Roger wordt verblind door de felle witte kleuren op websites
* Roger valt gauw terug op zijn zicht
* Roger gebruikt zijn muis nog steeds het meest
* Roger heeft de sreenreader nog niet volledig onder controle en deze werkt hem vaak tegen. 
* Roger is niet volledig blind
* Supernova neemt bepaalde schermfuncties over (zoals toetsaanslagen)

### :computer: Technische details
* Roger gebruikt supernova als screenreader op windows
* Roger gebruikt de voorleesfunctie van de iPhone 11 
* Roger heeft een braillelezer maar beheert deze niet volledig
* Roger is ongeveer 250% ingezoomd in zijn browser

## :bulb: Belangrijkste aanknopingspunten voor de applicatie
Naar aanleiding van de bovenstaante bevindingen heb ik een aantal punten waar ik mijn concept ten alle tijden op zal testen

* Gebruik een darktheme (geen witte achtergrond)
* Positioneer elementen links op het scherm
* Wees niet afhankelijk van de screenreader
* Maak de applicatie niet te ingewikkeld
* Ga er vanuit dat Roger niet door de applicatie heen zal lopen zoals deze bedoeld is
* Hou rekening dat de site responsive is naar aanleiding van het inzoomen
* Zorg er voor dat Roger zo min mogelijk zijn ogen hoeft te focussen
* Geef Roger opties zodat hij niet vast zit aan 1 oplossing. 

## :pencil: Concept
Omdat Roger van hardlopen houdt, heb ik een applicatie ontwikkeld die hem verteld of het droogblijft binnen de tijd van zijn hardloop rondje. 
Ik heb geprobeerd de applicatie zo simpel mogelijk te houden en gericht om 1 specifieke taak.

De applicatie maakt gebruik van kleur en geluid als feedback, waarbij het geluid volledig los staat van zijn screenreader. Navigeren door de applicatie (het veranderen van tijd) kan Roger doen met zijn muiswiel. Bij iedere verandering wordt de nieuwe waarde opgelezen, waardoor er zo min mogelijk naar het scherm gekeken hoeft te worden. Wanneer het zou gaan regenen wordt het scherm rood, maar zal er ook regengeluid klinken op de achtergrond.

Op deze manier kan Roger in een paar seconden checken of dit het juiste moment is om te gaan hardlopen.

![Schermopname (162)](https://user-images.githubusercontent.com/60625329/116460243-21f90d80-a867-11eb-9e61-4c9048a91d95.png)
![Schermopname (163)](https://user-images.githubusercontent.com/60625329/116460246-2291a400-a867-11eb-9b94-090a7b066c20.png)


### :hammer:Realisatie 

#### Ophalen van regendata uit api
```js
//get data from API
async function getData(url) {
    const response = await fetch(url)
    const data = await response.json()
    return data
}
```

```js
const API_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${LAT}&lon=${LON}&appid=${API_KEY}`
getData(API_URL).then(data => {
    //...logic
}
```

#### Aantal droge minuten
uit de api kan ik een array halen die per minuut aangeeft of het gaat regenen, zo kan ik het aantal droge minuten zoeken. 

```js
//returns how many minutes it will stay dry
function findMinutes(array) {
    //return array index when there will be rain
    let dryMinutes = 61
    array.forEach((item, index) => {
        if (item.precipitation > 0) {
            dryMinutes = index
        }
    })
    return dryMinutes;
}
```

#### Weersverandering
Het weergeluid en de achtergrond worden met de changeWeather functie getriggerd.
```js
//handle weather change
function changeWeather(time) {
    if (time > dryMinutes) {
        document.body.classList.add('rain')
        rainAudio.play()
        dryAudio.pause();
    } else {
        document.body.classList.remove('rain')
        dryAudio.play()
        rainAudio.pause();

    }
}
```

De spraak wordt getriggerd in de Speak functie, eerst wordt alles dat momenteel uitgesproken wordt gecancelt en wordt er een nieuwe tekst uitgesproken die is meegegeven.

```js
//handles speachtext
function speak(textMessage) {
    window.speechSynthesis.cancel();
    if (time % 60 == 0) {
        let hours = time / 60
        msg.text = hours + 'uur'
    } else if (time > 60) {
        let hours = Math.floor(time / 60)
        let minutes = time % 60
        msg.text = hours + 'uur en ' + minutes + 'minuten'
    } else {
        msg.text = textMessage + "minuten";
    }
    window.speechSynthesis.speak(msg);
}
```

#### Aantal minuten
het aantal minuten gebeurt in de changeElement functie. De functie is iets uitgebreid door alles boven de 60 minuten om te zetten naar een Uur Minuten format.
```js
//change the time element
function changeElement(time) {
    if (time % 60 == 0) {
        let hours = time / 60
        timeElement.textContent = hours + ' uur'
    } else if (time > 60) {
        let hours = Math.floor(time / 60)
        let minutes = time % 60
        timeElement.textContent = hours + ' uur en ' + minutes + ' minuten'
    } else {
        timeElement.textContent = time + ' minuten'
    }
}
```

#### Scrollevent
Het aanpassen van de tijd met het scrollwiel kan ik doen door te kijken welke kant er op gescrolld wordt. Ook wordt de spraakfunctie getriggert zodat de verandering wordt opgelezen.
```js
//called when user scrolls with scrollwheel
function handleScroll(e) {
    if (e.deltaY > 0) {
        if (time > 0) {
            time -= 1;
        }
        speak(time)
        changeElement(time)
        changeWeather(time)
    } else {
        if (time < 60) {
            time += 1;
        }
        speak(time)
        changeElement(time)
        changeWeather(time)
    }
}
```

#### Speech recognition
Ik gebruik speech recognition zodat roger geen plaatsnaam hoeft in te typen of te zoeken in een lijst, zodat hij zijn ogen niet hoeft te gebruiken.

```js
var myRecognition = new webkitSpeechRecognition();
myRecognition.lang = 'nl';
const place = document.querySelector('#place')
const weatherQuestion = document.querySelector('h1')

function handlePlaceButton() {
    myRecognition.start();
    console.log('Ready to receive a color command.');
}

myRecognition.onresult = function (e) {
    place.textContent = e.results[0][0].transcript

    speak(weatherQuestion.textContent)
}

placeButton.addEventListener('click', handlePlaceButton)
```

## :exclamation: Belangrijkste test informatie 
### :one: Test 1 

![Schermopname (161)](https://user-images.githubusercontent.com/60625329/116458927-7a2f1000-a865-11eb-890c-441ca1880b7a.png)
#### Prototype
https://samslotemaker.github.io/human-centered-design-2021/table-prototype1/


#### Belangrijkste Testresultaten
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

#### Eerste idee concept
Allereerst leek het mij een goed idee om grafieken/tabellen toegankelijk te maken voor Roger, echter vertelde hij dat hij sinds enkele weken officieel werk ongeschikt is verklaard, dus ik denk dat dit niet genoeg toegevoegde waarde zou leveren in zijn toekomstige levensloop. Daarom kwam ik op hetvolgende: 

Een website die aangeeft of het droogblijft, wanneer Roger zou willen hardlopen. De applicatie zal in ieder geval het volgende moeten bevatten om testbaar te zijn wanneer we Roger weer ontmoeten:
* Een duidelijke manier van tonen of het droog blijft
* Hoog contrast met een donker thema
* Grote letters / knoppen

Dingen om te proberen zijn:
* Geluid afspelen zodat er wellicht nieteens naar het scherm gekeken hoeft te worden
* Elementen aan de zijkant positioneren, om het zoveel mogelijk gebruik te maken van Roger zijn restvisus. 

De volledige uitwerking van mijn eerste idee kun je [hier](https://github.com/SamSlotemaker/human-centered-design-2021/wiki/Uitwerken-concept) vinden. 

### :two:Test 2

![Schermopname (155)](https://user-images.githubusercontent.com/60625329/114717419-4fa56900-9d35-11eb-9f37-399c4de3f888.png)
#### Prototype
https://samslotemaker.github.io/human-centered-design-2021/prototype-2/

#### Belangrijkste Testresultaten
Wegens ziekte heeft Inju de tweede test in mijn plaats afgenomen, erg veel dank naar Inju hiervoor. Inju heeft mijn prototype met Roger doorlopen om bepaalde inzichten te verkrijgen en heeft hierbij sterk doorgevraagd naar bepaalde zaken. Inju heeft precies die punten aangekaart die ook in mijn hoofd opkwamen, de belangrijkste inzichten hieruit zijn: 

* Tekst valt buitenbeeld door inzoomen van browser (na vergelijken lijkt dit een zoom van 200% te zijn).
* Geluid is een leuke toevoeging (werking zal nog uitgelegd moeten worden), werkt nu alleen wanneer er op de pagina geklikt wordt. 
* Cursor is duidelijk door extra vergroting, wel is deze bij roger zwart geworden, waarschijnlijk door een darkmode instelling/plugin.
* Belangrijkste elementen moeten links geplaatst worden, Roger zijn linker oog is aanzienlijk beter dan zijn rechter oog (vrijwel niets).
* Roger geeft aan voor alsnog zo min mogelijk met zijn ogen te doen, omdat dit erg vermoeiend is.

#### Aankopingspunten
Uit deze feedback haal ik belangrijke aanknopingspunten die mijn concept zouden kunnen verbeteren, enkele punten zouden zijn:
* Ontwerp met een 200% ingezoomde browser, ik wil rekening gaan houden met 100% tot 300% zicht, zodat hierin nog gewisseld kan worden (zo niet perongeluk)
* Het geluid wordt nu enkel afgespeeld op klik, dit kan niet anders omdat javascript geen geluid mag afspelen zonder dat er interactie met een pagina heeft plaatsgevonden (om spam te voorkomen). Echter, wellicht is dit nu wel mogelijk omdat ik een introductie scherm toon waar op geklikt dient te worden.
* Maak extra cursor een fellere/andere kleur, zodat de chrome extentie deze niet zwart maakt. 
* Laat de vertrektijd (keuze optie) wellicht met spraak bediend worden, belangrijk daarin is: 
   * Geef juiste feedback 
   * Niet te specifiek
   * Wellicht toesenbord bedienbaar aan en uit zetten
* Geef de mogelijkheid om de pagina voor te laten lezen, misschien is dit prettiger dat de screenreader.

### :three:Test 3
![Schermopname (160)](https://user-images.githubusercontent.com/60625329/116458594-1efd1d80-a865-11eb-9790-3bd0bce993db.png)
In de derde test wil ik vooral testen of het automatisch oplezen van veranderende elementen juist werkt en prettig is, of het navigeren doormiddel van de scrollbar goed werkt en of geluidsfeedback de juiste feedback is.

#### Prototype
https://samslotemaker.github.io/human-centered-design-2021/prototype-3/


#### Belangrijkste Testresultaten
* Rechterkant wordt niet goed gezien, elementen moeten echt in 1 gebied van de pagina geplaatst worden dus.
* Spraak kan goed werken, maar is lastig om in 1 keer goed te doen zonder zeer duidelijke instructie.
* Screenreader blokkeert toetscombinaties

#### Aankopingspunten
De test was erg positief, wat fijn is voor een laatste test. Ik weet nu dat de elementen waar ik mij op heb gefocust werken en dat ik hier op kan voortbouwen. 
Ik wil voor het eindproduct in iedergeval zorgen dat de applicatie werkt (koppelen van een werkende API) en ik hoop dat ik hem nog kan uitbreiden naar mobiel, omdat dit voor Roger een stuk praktischer zou zijn. 

Daarnaast wil ik hem nog iets uitbreiden zodat Roger van plaats kan wisselen (Amsterdam blijft de 'smart default') en ik wil nog enkele vormen toevoegen die de applicatie net iets minder serieus maken.

