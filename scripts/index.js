// rimbocchiamoci le maniche!

// APPUNTAMENTI
// un appuntamento sarà una STRINGA -> "12:00 - Commercialista", "20:30 - Cinema", etc.
// ARRAY DI ARRAY
// [
//   [], [], [], [], [], [], []
//   [], [], [], [], [], [], []
//   [], [], [], [], [], [], []
//   [], [], [], [], [], [], []
//   [], [], []
// ]

// creo la cassettiera, inizialmente vuota
const appointments = []

// - per prima cosa cercherei di riempire l'H1 con il nome del mese corrente

// ogni volta che apriamo la pagina il browser dovrà capire la data corrente (dal sistema operativo)
// per farlo, creiamo un OGGETTO DI TIPO DATA
const now = new Date() // stiamo utilizzando una funzione COSTRUTTORE per creare un OGGETTO di tipo DATA (date)
console.log(now.getTime()) // <- ms passati dal 1 gennaio 1970

// creo un ARRAY DI MESI
const monthsInItalian = [
  'Gennaio', // 0
  'Febbraio', // 1
  'Marzo', // 2
  'Aprile', // 3
  'Maggio', // 4
  'Giugno', // 5
  'Luglio', // 6
  'Agosto', // 7
  'Settembre', // 8
  'Ottobre', // 9
  'Novembre', // 10
  'Dicembre', // 11
]

// noi utilizzeremo now per capire IN CHE MESE SIAMO
const calculateCurrentMonthForH1 = function () {
  // riempiamo l'h1 della pagina con il mese corrente
  // per prima cosa recupero un riferimento nell'HTML all'H1 vuoto
  const h1 = document.querySelector('h1') // prende il primo e anche ultimo h1 // <h1></h1>
  console.log('risultato di getMonth', now.getMonth())
  // getMonth torna l'INDICE del mese corrente in un ipotetico array di 12 mesi
  // l'array l'ho creato! si chiama monthsInItalian
  const currentMonthIndex = now.getMonth() // 2 nella giornata di lezione, 19 Marzo
  const currentMonth = monthsInItalian[currentMonthIndex] // 'Marzo'
  h1.innerText = currentMonth // metto es. 'Marzo' dentro l'h1 -> <h1>Marzo</h1>
}

calculateCurrentMonthForH1()

// ora l'h1 mostrerà SEMPRE il mese giusto, quello in cui si è aperta la pagina!
// - step successivo: dobbiamo creare la GRIGLIA del calendario
// problema: non sappiamo quanti giorni ha il mese corrente (JS non ce lo espone)
// il numero dei giorni del mese corrente equivarrà al numero delle celle da creare
// COME FACCIAMO A TROVARE IL NUMERO GIUSTO DI CELLE DA CREARE?
// -> strategia: andiamo al PRIMO GIORNO del mese successivo, TOGLIAMO 24ore, otteniamo
// l'ULTIMO GIORNO del mese CORRENTE. Il numero del GIORNO di quella data equivale al numero
// dei giorni del mese corrente.

const numberOfDaysInCurrentMonth = function () {
  // calcoliamo ora la data appartenente al PRIMO GIORNO del mese successivo
  // per farlo generiamo un new Date() NEL FUTURO
  // troviamo il mese corrente
  const currentMonthIndex = now.getMonth() // 2 per marzo
  const currentYear = now.getFullYear() // 2026
  // ora con queste informazioni posso creare la data nel futuro del PRIMO giorno del mese SUCCESSIVO
  // voglio creare una Date es. -> new Date(2026, 3, 1) // yyyy mm dd -> 1 aprile 2026
  // new Date(currentYear, currentMonthIndex + 1, 1) // questa data troverebbe sempre il PRIMO del MESE SUCCESSIVO
  const lastDayOfTheMonth = new Date(currentYear, currentMonthIndex + 1, 0) // questo è l'ultimo giorno del mese corrente!
  // ho trovato l'ultimo giorno del mese corrente -> è anche lo 0 del mese successivo!
  // ora che ce l'ho estrapolo il NUMERO del giorno -> es. 31 -> questo è il numero delle celle da creare per questo mese
  const numberOfDays = lastDayOfTheMonth.getDate() // per marzo, 31; per giugno, 30
  return numberOfDays
}

const numberOfCells = numberOfDaysInCurrentMonth()
// ora ho il numero delle celle da creare, e tra poco nelle righe successive creerò le celle per il calendario
console.log(`il mese corrente, marzo, ha ${numberOfCells} giorni`)

// ora che so quanti giorni ha il mese corrente, posso creare le CELLE del calendario!
// dovrò crearne ${numberOfCells} // 31
const createCalendarCells = function () {
  // in questa funzione andremo ad appendere alla sezione vuota del calendario "numberOfCells" celle
  // prendiamo un riferimento alla section vuota in HTML
  const emptySectionInHTML = document.getElementById('calendar') // <section></section>
  // per numberOfCells volte...
  for (let i = 0; i < numberOfCells; i++) {
    // qui basta che vada a creare UNA cella, l'operazione verrà ripetuta numberOfCellsVolte (31 x marzo)
    // creiamo una cella
    const dayCell = document.createElement('div') // <div></div>
    // aggiungo al div vuoto appena creato la classe CSS "day", che lo rende inline-block, dimensionato etc.
    dayCell.classList.add('day') // la classe day è "preconfezionata" nel CSS -> <div class="day"></div>
    // ora creiamo il contenuto, che avrò il numero del giorno -> dobbiamo creare e inserire un h3
    const dayCellValue = document.createElement('h3') // <h3></h3>
    // inserisco dentro questo h3 il giorno corrente
    dayCellValue.innerText = i + 1 // ?
    // appendiamo l'h3 al div della cella
    dayCell.appendChild(dayCellValue) // <div class="day"> <h3>1</h3> </div>

    // CHICCA: prima di appendere dayCell al calendario, controlliamo se questa dayCell è proprio quella
    // relativa alla giornata di oggi -> SE lo è, le daremo la classe aggiuntiva "color-epic"
    if (i + 1 === now.getDate()) {
      dayCell.classList.add('color-epic')
    }

    // ultima cosa prima di appendere la cella nella section: la rendiamo CLICCABILE
    // la cella non (ancora) in HTML, non posso sfruttare il metodo a) che Stefano mi aveva detto
    // per aggiungere un event listener (non posso fare "onclick=miaFunzione()")
    // ho bisogno del metodo b), quello via JS!
    dayCell.addEventListener('click', function () {
      console.log('CELLA CLICCATA!', i + 1)
    })

    // appendo la dayCell alla section del calendario (vuota)
    emptySectionInHTML.appendChild(dayCell)

    // inoltre, per OGNI GIORNO del calendario, creo un "cassetto" nella "cassettiera"
    appointments.push([]) // così ottengo per ogni cella un posticino dove salvarci gli eventi
  }

  // vediamo com'è la nostra cassettiera per gli eventi
  console.log('BANCA DATI', appointments)
}

createCalendarCells()
