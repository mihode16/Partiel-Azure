const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// CONNEXION À AZURE COSMOS DB
// La variable d'environnement sera configurée dans le portail Azure
const mongoURI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/tp_azure";

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connecté à Azure Cosmos DB"))
  .catch((err) => console.error("Erreur de connexion :", err));

// Modèle de données
const Task = mongoose.model("Task", { title: String });

// Routes API
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post("/tasks", async (req, res) => {
  const newTask = new Task({ title: req.body.title });
  await newTask.save();
  res.status(201).json(newTask);
});

// Port d'écoute (Azure définit automatiquement le PORT)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
