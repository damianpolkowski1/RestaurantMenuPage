class Dish {
  id: string;
  name: string;
  price: number;
  picture_link: string;

  constructor(id: string, name: string, price: number, picture_link: string)
  {
    this.id = id;
    this.name = name;
    this.price = price;
    this.picture_link = picture_link;
  }
}

async function getDishesData() {
    try {
      const response = await fetch('http://localhost:2137/dish');
      if (!response.ok) {
        throw new Error('Failed to fetch data from API');
      }
      const data: Dish[] = await response.json();
      return data;
    } catch (error) {
      return [];
    }
  }

  async function getDishesLength() {
    try {
      const response = await fetch('http://localhost:2137/dish/number');
      if (!response.ok) {
        throw new Error('Failed to fetch data from API');
      }
      const data: number = await response.json();
      return data;
    } catch (error) {
      return 0;
    }
  }

async function getSpecificDish(id: string) {
    try
    {
      const response = await fetch('http://localhost:2137/dish/' + id);
      
      if (!response.ok)
      {
        throw new Error('Bajo jajo, server not working');
      }
      
      const data = await response.json();
      return data;
    }
    catch (error)
    {
      console.error('Error happened: ', error);
    }
}

export{ getSpecificDish, getDishesData, getDishesLength, Dish };