import Events from "../Models/events.model.js";

//Create Event :
export const createEvent = async (req, res) => {
  try {
    const event = new Events(req.body);
    if (!event) {
      return res
        .status(400)
        .json({ message: "Event Created Successfully", error: true });
    }

    await event.save();
    res.status(200).json({
      error: false,
      message: "Event Created Succesfully",
      data: event,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server issue", error: true });
  }
};

// Get All Events :
export const getAllEvents = async (req, res) => {
  try {
    const events = await Events.find();
    if (!events) {
      return res.status(401).json({ error: true, message: "No Events found" });
    }

    res
      .status(200)
      .json({ error: false, message: "Successfully retrieved", data: events });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server issue", error: true });
  }
};

//get Single Event :
export const getSingleEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Events.findOne({ _id: id });
    if (!event) {
      return res.status(401).json({ message: "No Event Found", error: true });
    }
    res.status(200).json({
      error: false,
      message: "Event Retrieved Successfully",
      data: event,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, message: "Internal Server Issue" });
  }
};

//Update Event :
export const UpdateEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Events.findById({ _id: id });
    if (!event) {
      res.status(401).json({ error: true, message: "No event exists" });
    }

    await Events.findByIdAndUpdate({ _id: id }, req.body);
    res.status(200).json({ message: "Updated Successfully", error: false });
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: error, message: "Internal Server Issue" });
  }
};

//Delete Event
export const DeleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Events.findById({ _id: id });
    if (!event) {
      res.status(401).json({ error: true, message: "No event exists" });
    }
    await Events.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "Updated Successfully", error: false });
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: error, message: "Internal Server Issue" });
  }
};
