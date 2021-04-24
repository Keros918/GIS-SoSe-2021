// Aufgabe 1
function a1(): void {
    let x: string = "Alles";
    console.log(x);
    func3();
    func2();
    func1();
    func2();
    console.log("Logo!");
}

a1();                   

function func1(): void {
    console.log("Klar?");
}

function func2(): void {
    console.log("Alles");
}

function func3(): void {
    console.log("Gute!");
}
/* a)
Auf der Konsole wird nacheinander Alles Klar? Logo! ausgegeben
Namen dürfen keine typ namen sein wie z.B. string.
Außerdem dürfen sie nur Ziffern, Buchstaben sowie _ und $ beinhalten
Der Name darf nicht mit einer Ziffer beginnen
*/

/* b)
Zuerst wird in Zeile 8 die Funktion a1() aufgerufen. Diese läuft bis Zeile 4 durch.
In Zeile 4 wird dann die Funktion func1() ausgeführt. Diese läuft komplett durch.
Danach wird die Funktion a1() fortgesetzt. Ist diese beendet springt das Programm nochmal in Zeile 12.
Da es ab da nicht mehr weiter geht, beendet sich das Program.
*/


// Aufgabe 2
function a2(): void {
    let i: number = 9;

    do {
        console.log(i);
        i = i - 1;
    } while ( i > 0);
}

a2();
/*
Die Funktion a2() wird ausgeführt. i wird die Nummer 9 zugewiesen. Im do Abschnitt der do-while Schleife,
wird zuerst i in der Konsole ausgegeben. Danach wird i um eins verringert. Hier kommt dann die überprüfung,
ob der do Abschnitt nochmals ausgeführt werden soll. Falls i größer als 0 ist, wird er wiederholt.
*/


// Aufgabe 4
namespace a4 {
    let x: string = "Hallo";
    console.log(x);
    func1(x);
    console.log(x);
    func2();
    func3();
    console.log(x);

    function func1(y: string): void {
        y = "Bla";
        console.log(y);
    }

    function func2(): void {
        let x: string = "Blubb";
        console.log(x);
    }

    function func3(): void {
        x = "Test";
    }
}
/* a)
x wird Hallo zugewiesen und direkt auch in der Konsole ausgegeben. Dann wird func1() ausgeführt,
und der Funktion wird x übermittelt. Der übermittelte String wird in func1() y genannt.
y wird das Wort Bla zugewiesen und in der Konsole ausgeben. Dann wird x in der Konsole ausgegeben.
x hat hier wieder den Wert Hallo, da die veränderung nur für func1() gültig war, da es sich hier um eine 
lolale Variable handelt. Da x aber eine Globale Variable ist, wird dessen Wert außerhalb der Funktion nicht verändert.
Das gleiche Prinzip gilt auch für func2(). In func2() wird eine neue Variable x erschaffen, diese ist aber nur innerhalb der Funktion gültig.
Hier wird Blubb ausgegeben.
In func3() wird zwar nichts ausgeben allerdings wird der Wert von x tatsächlich verändert, weil die Variable direkt angesprochen wird.
Demnach wird als nächstes Test ausgeben, auch wenn der Befehl nicht innerhalb von func3() kam.
*/

/* b)
Globale, lokale Variablen sowie Übergabeparameter habe ich in a) schon erklärt.
Variablen unterscheiden sich zu funktionen in so fern, dass einer Variable ein Wert zugewiesen wird.
Funktionen wird kein direkter Wert zugewiesen, man kann ihnen aber Variablen als Übergabeparameter überreichen.
Mit diesen kann man dann innerhalb einer Funktion arbeiten, z.B. Ergebnisse errechnen und diese dann als Rückgabewert der Funktion zurückgeben.
*/


// Aufgabe 5
namespace a5 {
    let a: number = 3;
    let b: number = 4;
    // a)
    console.log(multiply(a, b));
    function multiply(n1: number, n2: number): number {
        n1 *= n2;
        return n1;
    }
    // b)
    console.log(max(a, b));
    function max(n1: number, n2: number): number {
        if (n2 > n1) {
            n1 = n2;
        }
        return n1;
    }
    // c)
    let c: number = 1;
    let d: number = 0;
    while (c <= 100) {
        d += c;
        c++;
    }
    console.log(d);
    // d)
    for (let zahl: number = 1; zahl <= 10; zahl++) {
        console.log(Math.floor(Math.random() * (100 - 0)) + 0);
    }
    // e)
    let e: number = 10;
    console.log(factorial(e));
    function factorial(n: number): number {
        if (n < 1) {
            return 1;
        }
        while (e > 1) {
            n *= e - 1;
            e--;
        }
        return n;
    }
    // f)
    leapyears();
    function leapyears(): void {
        let year: number = 1900;
        while (year <= 2021) {
            if ((year % 4 == 0) && (year % 100 != 0)) {
                console.log(year);
            }
            if (year % 400 == 0) {
                console.log(year);
            }
            year++;
        }
    }
}

namespace a6 {
    // a)
    let str: string = "#";
    while (str.length <= 7) {
        console.log(str);
        str += "#";
    }
    // b)
    let a: number = 1;
    while (a <= 100) {
        if (a % 3 == 0) {
            console.log("Fizz");
        } else if (a % 5 == 0) {
            console.log("Buzz");
        } else {
            console.log(a);
        }
        a++;
    }
    // c)
    let b: number = 1;
    while (b <= 100) {
        let fb: string = "";
        if (b % 3 == 0) {
            fb += "Fizz";
        }
        if (b % 5 == 0) {
            fb += "Buzz";
        }
        if (fb == "") {
            fb = b.toString();
        }
        console.log(fb);
        b++;
    }
    // d)
    console.log(schach());
    function schach(): string {
        let brett: string = "";
        let counter: number = 1;
        while (counter <= 8) {
            if (counter % 2) {
                brett += " # # # #\n";
            } else {
                brett += "# # # # \n";
            }
            counter++;
        }
        return brett;
    }
    // e)
    console.log(schach2(9));
    function schach2(size: number): string {
        let brett: string = "";
        let counter: number = size * size + size;
        let c2: number = size * size + size;
        while (counter > size) {
            if ((counter % size == 0) && (counter != c2)) {
                brett += "\n";
                if ((counter % (size * 2) == 0) && (size % 2 == 0)) {
                    counter--;
                }
            }
            if (counter % 2 == 0) {
                brett += " ";
            } else {
                brett += "#";
            }
            counter--;
        }
        return brett;
    }
}