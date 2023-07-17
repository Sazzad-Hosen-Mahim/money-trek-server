import mongoose from "mongoose";

const numberSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true,
  },
});

const NumberModel = mongoose.model("Number", numberSchema);

export default NumberModel;
