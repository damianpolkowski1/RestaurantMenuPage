class Dish {
    name: string;
    price: number;
    picture_link: string;

    constructor(name: string, price: number, picture_link: string) {
        this.name = name;
        this.price = price;
        this.picture_link = picture_link;
      }
}

let dishes = [new Dish('Pljeskavica', 660, './images/pljeskavica.png'),
            new Dish('Pierogi', 720, './images/pierogi.png'),
            new Dish('Żurek', 530, './images/zurek.png'),
            new Dish('Rizotto', 580, './images/rizoto.png'),
            new Dish('Rosół', 410, './images/rosol.png'),
            new Dish('Bigos', 650, './images/bigos.png'),
            new Dish('Cevapi', 700, './images/cevapi.png'),
            new Dish('Sernik', 360, './images/sernik.png'),
            new Dish('Szarlotka', 380, './images/szarlotka.png'),
            new Dish('Kotlet Schabowy', 740, './images/schabowy.png')];

export {dishes};