import { Dish } from "./data";

async function getDishesData(link: string) {
    try {
      const response = await fetch(link);
      if (!response.ok) {
        throw new Error('Failed to fetch data from API');
      }
      const data: Dish[] = await response.json();
      return data;
    } catch (error) {
      return [];
    }
  }

  async function getDishesLength(link: string) {
    try {
      const response = await fetch(link);
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

export{ getSpecificDish, getDishesData, getDishesLength };