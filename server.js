import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import userModel from "./models/userModel.js";
import NumberModel from "./models/NumberModel.js";

//configure env
dotenv.config();

//database config
connectDb();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Money Trek</h1>");
});

//for user data in admin dashboard

app.get("/admin-users", async (req, res) => {
  try {
    const user = await userModel.find({ role: 0 });
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in getting user data",
      error,
    });
  }
});

//for getting stored amount

app.get("/stored-amount", async (req, res) => {
  try {
    const amount = await NumberModel.find({});
    res.json(amount);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in getting amount",
      error,
    });
  }
});

//for storing amount in user dashboard
app.post("/numbers", (req, res) => {
  const { value } = req.body;

  const newNumber = new NumberModel({ value });

  newNumber
    .save()
    .then((savedNumber) => {
      res.json(savedNumber);
    })
    .catch((error) => {
      console.error("Error saving number:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server running on mode ${process.env.DEV_MODE} on ${PORT}`.bgCyan.white
  );
});
