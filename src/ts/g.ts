/*
  1. Se om du kan hitta två stycken code smells i följande funktion och rätta till dem.
  Funktionen tar emot en lista med längshoppslängder och syftet med funktionen är att summera
  dessa hopplängder.
  */

function getLength(jumpings: number[]): number {
  return jumpings.reduce((jumpDistanceSoFar, currentJump) => jumpDistanceSoFar + currentJump);
}

/*
  2. I detta exempel har vi fokuserat på if-statements. Se om du kan göra exemplet bättre!
  */

class Student {
  constructor(
    public name: string,
    public handedInOnTime: boolean,
    public passed: boolean,
  ) {}
}

function getStudentStatus(student: Student): string {
    if (student.name == "Sebastian" && student.handedInOnTime) {
      return "VG"
    } else {
      return "IG"
    }
}


/*
  3. Variabelnamn är viktiga. Kika igenom följande kod och gör om och rätt.
  Det finns flera code smells att identifiera här. Vissa är lurigare än andra.
  */

const MILLISECONDS_IN_A_WEEK: number = 604800000;
const DAYS_IN_A_WEEK: number = 7;

class Temp {
  constructor(
    public city: string, 
    public dateToday: Date, 
    public temperature: number) {}
}

function averageWeeklyTemperature(weeklyTemperature: Temp[]) {
  let totalTemperature: number = 0;

  for (let i = 0; i < weeklyTemperature.length; i++) {
    if (weeklyTemperature[i].city === "Stockholm" && weeklyTemperature[i].dateToday.getTime() > Date.now() - MILLISECONDS_IN_A_WEEK) {
      totalTemperature += weeklyTemperature[i].temperature;
    }
  }

  return totalTemperature / DAYS_IN_A_WEEK;
}

/*
  4. Följande funktion kommer att presentera ett objekt i dom:en. 
  Se om du kan göra det bättre. Inte bara presentationen räknas, även strukturer.
  */

class Product {
  constructor (
    public name: string,
    public price: number,
    public amount: number,
    public description: string,
    public image: string,
    public parent: HTMLElement,
    ) {}
}

function showProduct(product: Product) {
  let container = document.createElement("div");
  let title = document.createElement("h4");
  let price = document.createElement("strong");
  let imageTag = document.createElement("img");

  title.innerHTML = product.name;
  price.innerHTML = product.price.toString();
  imageTag.src = product.image;

  container.appendChild(title);
  container.appendChild(imageTag);
  container.appendChild(price);
  product.parent.appendChild(container);
}

/*
  5. Följande funktion kommer presentera studenter. Men det finns ett antal saker som 
  går att göra betydligt bättre. Gör om så många som du kan hitta!
  */

function presentStudents(students: Student[]) {
  const passedStudentsList = document.querySelector('ul#passedstudents');
  const failedStudentsList = document.querySelector('ul#failedstudents');

  students.forEach((student) => {
    const container = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = student.handedInOnTime;
    container.appendChild(checkbox);

    if (student.handedInOnTime) {
      passedStudentsList?.appendChild(container);
    } else {
      failedStudentsList?.appendChild(container)
    }
  })
}

/*
  6. Skriv en funktion som skall slå ihop följande texter på ett bra sätt:
  Lorem, ipsum, dolor, sit, amet
  Exemplet under löser problemet, men inte speciellt bra. Hur kan man göra istället?
  */

function concatenateStrings() {
  const strings = ["Lorem", "ipsum", "dolor", "sit", "amet"];
  return strings.join(", ");
}

/* 
7. Denna funktion skall kontrollera att en användare är över 20 år och göra någonting.
    Det finns dock problem med denna typ av funktion. Vad händer när kraven ändras och
    fler och fler parametrar behöver läggas till? T.ex. avatar eller adress. Hitta en bättre
    lösning som är hållbar och skalar bättre. 
*/

const MINIMUM_REQIRED_AGE: number = 20;
const WEIRD_UNIX_TIME_STAMP: number = 1970;

class User {
  constructor (
    public userName: string,
    public birthday: Date,
    public email: string,
    public password: string,
  ) {}
}

function getUserAge(birthday: Date): number {
  let ageDiff = Date.now() - birthday.getTime();
  let ageDate = new Date(ageDiff);
  const userAge = Math.abs(ageDate.getUTCFullYear() - WEIRD_UNIX_TIME_STAMP);
  return userAge;
}

function createUser(user: User) {
  const userAge = getUserAge(user.birthday);

  if (userAge >= MINIMUM_REQIRED_AGE) {
    // Logik för att skapa en användare
  } else {
    return `Du är under ${MINIMUM_REQIRED_AGE} år`;
  }
}
