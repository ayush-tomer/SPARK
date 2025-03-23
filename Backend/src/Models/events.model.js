import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  banner: {
    type: String,
    required: true,
  },
  Date: {
    type: String,
    required: true,
  },
  Location: {
    type: String,
    required: true,
  },
  Mode: {
    type: String,
    required: true,
    enum: ["Offline", "Online", "Hybrid"],
  },
  Website: {
    type: String,
    required: true,
  },
  Apply: {
    type: String,
    required: true,
  },
  Deadline: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Social: [
    {
      Link: { type: String, required: true },
    },
  ],
  PricePool: [
    {
      First: { type: String, required: true },
      Second: { type: String, required: true },
      Third: { type: String, required: true },
    },
  ],
  TrackPrizes: [
    {
      Name: {
        type: String,
        required: true,
      },
      Prize: {
        type: Number,
        required: true,
      },
    },
  ],
  Sponsor: [
    {
      Name: {
        type: String,
        required: true,
      },
      Logo: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      Tier: {
        type: String,
        enum: ["Platinum", "Gold", "Silver", "Bronze"],
      },
    },
  ],
  Schedule: [
    {
      Day: [
        {
          Event: [
            {
              time: {
                type: String,
                required: true,
              },
              eventTitle: {
                type: String,
                required: true,
              },
              description: {
                type: String,
                required: true,
              },
            },
          ],
        },
      ],
    },
  ],
  Faq: [
    {
      Questions: {
        type: String,
        required: true,
      },
      Answers: {
        type: String,
        required: true,
      },
    },
  ],
});

const Events = mongoose.model("Events", eventSchema);

export default Events;
