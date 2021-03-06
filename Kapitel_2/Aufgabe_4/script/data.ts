namespace Kapitelaufgabe2_4 {
    export interface Part {
        imageSrc: string;
    }

    export interface Parts {
        heads: Part[];
        bodys: Part[];
        legs: Part[];
    }

    export interface Picture {
        head?: Part;
        body?: Part;
        leg?: Part;
    }

    export let partsJSON: string =
        `
        {
            "heads": [
                {
                    "imageSrc": "./img/Schwarzwald1.jpg"
                },
                {
                    "imageSrc": "./img/Schwarzwald2.jpg"
                },
                {
                    "imageSrc": "./img/AmsterdamZoo.jpg"
                }
            ],
            "bodys": [
                {
                    "imageSrc": "./img/Amsterdam1.jpg"
                },
                {
                    "imageSrc": "./img/Amsterdam2.jpg"
                },
                {
                    "imageSrc": "./img/Amsterdam3.jpg"
                } 
            ],
            "legs": [
                {
                    "imageSrc": "./img/Amsterdam4.jpg"
                },
                {
                    "imageSrc": "./img/Amsterdam5.jpg"
                },
                {
                    "imageSrc": "./img/Amsterdam6.jpg"
                }
            ]
        }
    `;
}