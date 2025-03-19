import mongoose from "mongoose";

const CommunityScehama = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  members: {
    type: Number,
  },
  url: {
    type: String,
    required: true,
  },
  college:{
    type: String,
    required: true,
  }
});

const Community = mongoose.model("Community", CommunityScehama);

export default Community;
