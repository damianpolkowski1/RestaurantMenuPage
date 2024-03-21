class Dish {
  id: string;
  name: string;
  price: number;
  picture_link: string;

  constructor(id: string, name: string, price: number, picture_link: string) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.picture_link = picture_link;
  }
}

const dish_api_link = "http://localhost:2137/dish/";

async function getDishesData() {
  try {
    const response = await fetch(dish_api_link);
    if (!response.ok) {
      throw new Error("Failed to fetch data from API");
    }
    const data: Dish[] = await response.json();
    return data;
  } catch (error) {
    return [];
  }
}

async function getDishesLength() {
  try {
    const response = await fetch(dish_api_link);
    if (!response.ok) {
      throw new Error("Failed to fetch data from API");
    }
    const data: number = await response.json();
    return data;
  } catch (error) {
    return 0;
  }
}

async function getSpecificDish(id: string) {
  try {
    const response = await fetch(dish_api_link + id);

    if (!response.ok) {
      throw new Error("Bajo jajo, server not working");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error happened: ", error);
  }
}

async function updateSpecificDish(id: string, body: Object) {
  try {
    const data = await fetch(dish_api_link + id, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        ["Content-Type"]: "application/json",
      },
    }).then(
      async (response) => {
        const data = await response.json();
        return data;
      },
      (err) => console.error(err)
    );
    return data;
  } catch (error) {
    console.error("Error happened: ", error);
  }
}

async function createNewDish(body: Object) {
  try {
    const data = await fetch(dish_api_link, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        ["Content-Type"]: "application/json",
      },
    }).then(
      async (response) => {
        const data = await response.json();
        return data;
      },
      (err) => console.error(err)
    );
    return data;
  } catch (error) {
    console.error("Error happened: ", error);
  }
}

async function deleteDish(id: string) {
  try {
    const data = await fetch(dish_api_link + id, {
      method: "DELETE",
    }).then(
      async (response) => {
        const data = await response.json();
        return data;
      },
      (err) => console.error(err)
    );
    return data;
  } catch (error) {
    console.error("Error happened: ", error);
  }
}

export {
  getSpecificDish,
  getDishesData,
  getDishesLength,
  updateSpecificDish,
  createNewDish,
  deleteDish,
  Dish,
};
