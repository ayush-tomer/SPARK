import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    require: true,
  },
  data: {
    type: Date,
    require: true,
    get: (date) => date.toISOString().split("T")[0],
    set: (date) => new Date(date),
  },
  Organizer: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  Aim: {
    type: String,
    require: true,
  },
});

const Events = mongoose.model("Events", eventSchema);

export default Events;
