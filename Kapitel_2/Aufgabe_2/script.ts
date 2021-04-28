namespace Aufgabe2 {
    // Aufgabe 1
    // a)
    function min(... outputs: number[]): number {
        let min: number = outputs[0];
        for (let i: number = 0; i < outputs.length; i++) {
            if (outputs[i] < min) {
                min = outputs[i];
            }
        }
        return min;
    } 
    console.log(min(1, 2, 3, -1, 7));

    // b)
    function isEven(_num: number): boolean {
        let even: boolean;
        if (_num == 0) {
            even = true;
        } else if (_num == 1) {
            even = false;
        } else {
            even = isEven(_num - 2);
        }
        return even; 
    }
    console.log(isEven(50));
    console.log(isEven(75));
    /*
    Bei -1 ruft sich die Funktion unendlich oft selbst auf, weil nie eine Bedingung der if-Schleife erfüllt wird.
    _num wird sich jedes mal um 2 verkleinern und somit nie 1 oder 0 werden.
    Beheben könnte man das ganze in dem man vorher überprüft ob _num kleiner als 0 ist.
    Ist das der Fall könnte man z.B. einen Error ausgeben.
    */

    // c)

    /* Ausgeklammert wegen 5.
    // 1.
    interface Student {
        vorName: string;
        nachName: string;
        eMail: string;
        matrikelNummer: number;
    }

    // 2.
    let s1: Student = {vorName: "Leon", nachName: "Haas", eMail: "haasleon.s@gmx.de", matrikelNummer: 267211};
    let s2: Student = {vorName: "Max", nachName: "Mustermann", eMail: "max.mustermann@gmail.com", matrikelNummer: 123456};
    let s3: Student = {vorName: "Erika", nachName: "Musterfrau", eMail: "erika.musterfrau@gmail.com", matrikelNummer: 654321};

    //3.
    let sArray: Student[] = [s1, s2, s3]; 
    sArray.push({vorName: "Laura", nachName: "Müller", eMail: "laura.müller@gmx.de", matrikelNummer: 123654});
    console.log(sArray[0].vorName + ", " + sArray[1].nachName + ", " + sArray[3].eMail + ", " + sArray[2].matrikelNummer);

    //4.
    function showInfo(_student: Student): void {
        console.log("Vorname: " + _student.vorName + "\n" + "Nachname: " + _student.nachName + "\n" + 
        "Email: " + _student.eMail + "\n" + "Matrikelnummer: " + _student.matrikelNummer);

    }

    showInfo(s1);
    showInfo(s2);
    showInfo(s3);
    showInfo(sArray[3]);
    */

    // 5.
    class Student {
        vorName: string;
        nachName: string;
        eMail: string;
        matrikelNummer: number;

        constructor(_vn: string, _nn: string, _e: string, _mn: number) {
            this.vorName = _vn;
            this.nachName = _nn;
            this.eMail = _e;
            this.matrikelNummer = _mn;
        }
        
        // 4.
        showInfo(): void {
            console.log("Vorname: " + this.vorName + "\n" + "Nachname: " + this.nachName + "\n" + 
            "Email: " + this.eMail + "\n" + "Matrikelnummer: " + this.matrikelNummer);
        }
    }
    // 2.
    let s1: Student = new Student("Leon", "Haas", "haasleon.s@gmx.de", 267211);
    let s2: Student = new Student("Max", "Mustermann", "max.mustermann@gmail.com", 123456);
    let s3: Student = new Student("Erika", "Musterfrau", "erika.musterfrau@gmail.com", 654321);

    //3.
    let sArray: Student[] = [s1, s2, s3]; 
    sArray.push(new Student("Laura", "Müller", "laura.müller@gmx.de", 123654));
    console.log(sArray[0].vorName + ", " + sArray[1].nachName + ", " + sArray[3].eMail + ", " + sArray[2].matrikelNummer);

    s1.showInfo();
    s2.showInfo();
    s3.showInfo();
    sArray[3].showInfo();


    // Aufgabe 2
    // a)
    function backwards(_arr: number[]): number[] {
        let back: number[] = [];
        let iArr: number;
        let iBack: number;
        for (iBack = 0, iArr = _arr.length - 1; iArr >= 0; iArr--, iBack++) {
            back[iBack] = _arr[iArr];
        }
        return back;
    }
    let test: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    console.log(backwards(test));

    // b)
    /*
    function join(_arr1: number[], _arr2: number[]): number[] {
        let join: number[] = [];
        for (let i: number = 0; i < _arr1.length; i++) {
            join[i] = _arr1[i];
            if (join.length == _arr1.length) {
                let a: number = i;
                i = 0;
                for (let i2: number = join.length; i2 < _arr1.length + _arr2.length; i2++, i++) {
                    join[i2] = _arr2[i];
                }
                i = a;
            }
        }
        return join;
    }
    */
   // b) Bonus
    function join(... outputs: number[][]): number[] {
       let join: number[] = [];
       let iTotal: number = 0;
       for (let index: number = 0; index < outputs.length ; index++) {
            for (let i2: number = 0; i2 < outputs[index].length; i2++) {
                join[iTotal] = outputs[index][i2];
                iTotal++;
            }
       }
       return join;
   }
    let arr1: number[] = [1, 2, 3, 4, 5];
    let arr2: number[] = [6, 7, 8, 9];
    let arr3: number[] = [10, 11];
    console.log(join(arr1 , arr2, arr3));

    // c)
    function split(_arr: number[], _num1: number, _num2: number): number[] {
        let split: number[] = [];
        if (_num1 > _num2) {
            let a: number = _num1;
            _num1 = _num2;
            _num2 = a;
        }
        if (_num1 < 0) {
            _num1 = 0;
        }
        if (_num2 > _arr.length) {
            _num2 = _arr.length;
        }
        for (let i: number = _num1, i2: number = 0; i < _num2; i++, i2++) {
            split[i2] = _arr[i];
        }
        return split;
    }
    let num1: number = 3;
    let num2: number = -2;
    console.log("c): " + split(arr1, num1, num2));


    // Aufgabe 3
    let canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("myFirstCanvas");
    let context: CanvasRenderingContext2D = canvas.getContext("2d");

    // a)
    context.fillStyle = "#349625";
    context.fillRect(0, 634, 1890, 316);

    context.fillStyle = "#0088ff";
    context.fillRect(0, 0, 1890, 634);

    context.beginPath();
    context.moveTo(270, 180);
    context.bezierCurveTo(230, 200, 230, 250, 330, 250);
    context.bezierCurveTo(350, 280, 420, 280, 440, 250);
    context.bezierCurveTo(520, 250, 520, 220, 490, 200);
    context.bezierCurveTo(530, 140, 470, 130, 440, 150);
    context.bezierCurveTo(420, 105, 350, 120, 350, 150);
    context.bezierCurveTo(300, 105, 250, 120, 270, 180);
    context.closePath();
    context.fillStyle = "white";
    context.fill();
    context.stroke();

    context.beginPath();
    context.moveTo(1270, 200);
    context.bezierCurveTo(1230, 220, 1230, 270, 1330, 270);
    context.bezierCurveTo(1350, 300, 1420, 300, 1440, 270);
    context.bezierCurveTo(1520, 270, 1520, 240, 1490, 220);
    context.bezierCurveTo(1530, 160, 1470, 150, 1440, 170);
    context.bezierCurveTo(1420, 125, 1350, 140, 1350, 170);
    context.bezierCurveTo(1300, 125, 1250, 140, 1270, 200);
    context.closePath();
    context.fillStyle = "white";
    context.fill();
    context.stroke();

    context.fillStyle = "brown";
    context.fillRect(500, 434, 250, 250);

    context.fillRect(1650, 434, 70, 400);

    context.fillStyle = "black";
    context.fillRect(583, 584, 83, 100);

    context.beginPath();
    context.moveTo(450, 434);
    context.lineTo(625, 320);
    context.lineTo(800, 434);
    context.closePath();
    context.fill();
    context.stroke();

    context.beginPath();
    context.fillStyle = "green";
    context.moveTo(1685, 404);
    context.arc(1685, 404, 150, 0, 2 * Math.PI, true);
    context.closePath();
    context.fill();

    // b)
    class Rechteck {
        random: number;
        posX: number;
        posY: number;
        width: number;
        height: number;

        // c)
        constructor() {
            this.random = Math.random() * 10;
            this.posX = this.random * 150;
            this.posY = this.random * 60;
            this.width = Math.random() * 200;
            this.height = Math.random() * 200;
        }

        // d)
        drawRect(): void {
            context.strokeRect(this.posX, this.posY, this.width, this.height);
        }
    }

    // e)
    let anzahl: number = Math.random() * 10;
    anzahl = Math.round(anzahl);
    let rectangles: Rechteck[] = [];
    while (anzahl > 0) {
        rectangles.push(new Rechteck);
        rectangles[rectangles.length - 1].drawRect();
        anzahl--;
    }
}