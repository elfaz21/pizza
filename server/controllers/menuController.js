const Menu = require("../models/menuModel");

// Get all pizzas
exports.getAllPizzas = async (req, res) => {
  try {
    const pizzas = await Menu.find(); // Using Menu model directly
    res.status(200).json(pizzas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new pizza
exports.addPizza = async (req, res) => {
  const {
    name,
    price,
    toppings,
    pizzaPhoto,
    userId,
    restaurantName,
    imageUrl,
  } = req.body; // Ensure naming is consistent

  const newPizza = new Menu({
    name,
    price,
    toppings,
    pizzaPhoto, // Ensure this matches the schema
    userId,
    restaurantName,
    imageUrl,
  });

  try {
    const savedPizza = await newPizza.save();
    res.status(201).json(savedPizza);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Get a single pizza by ID
exports.getPizzaById = async (req, res) => {
  const { id } = req.params;

  try {
    const pizza = await Menu.findById(id);
    if (!pizza) {
      return res.status(404).json({ message: "Pizza not found" });
    }
    res.status(200).json(pizza);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Edit a pizza by ID
exports.editPizza = async (req, res) => {
  const { id } = req.params;
  const update = req.body;

  try {
    const updatedPizza = await Menu.findByIdAndUpdate(id, update, {
      new: true,
    });
    if (!updatedPizza) {
      return res.status(404).json({ message: "Pizza not found" });
    }
    res.status(200).json(updatedPizza);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a pizza by ID
exports.deletePizza = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPizza = await Menu.findByIdAndDelete(id);
    if (!deletedPizza) {
      return res.status(404).json({ message: "Pizza not found" });
    }
    res.status(200).json({ message: "Pizza deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
