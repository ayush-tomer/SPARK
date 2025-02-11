import Events from "../Models/events.model.js";

//Create event :
export const CreateEvent = async (req, res) => {
  const { title, date, Organizers, description, category, Aim } = req.body;
  try {
    if (!title) {
      return res
        .status(400)
        .json({ message: "Title Field cant be empty", error: true });
    }
    if (!date) {
      return res
        .status(400)
        .json({ message: "Date Field cant be empty", error: true });
    }
    if (!Organizers) {
      return res
        .status(400)
        .json({ message: "Oraganizer Field cant be empty", error: true });
    }
    if (!description) {
      return res
        .status(400)
        .json({ message: "Description Field cant be empty", error: true });
    }
    if (!category) {
      return res
        .status(400)
        .json({ message: "Category Field cant be empty", error: true });
    }
    if (!Aim) {
      return res
        .status(400)
        .json({ message: "Aim Field cant be empty", error: true });
    }

    const event = await Events.findOne({ title });
    if (event) {
      return res
        .status(400)
        .json({ message: "Event already exists", error: true });
    }

    const newEvent = new Events({
      title,
      date,
      Organizers,
      description,
      category,
      Aim,
    });

    if (newEvent) {
      await newEvent.save();
      res.status(200).json({
        message: "Event Created Successfully",
        error: false,
        data: newEvent,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Issue", error: true });
  }
};

// Update event :
export const UpdateEvent = async (req, res) => {
  const { id } = req.params;
  try {
    if (!title && !date && !Organizers && !description && !category && !Aim) {
      return res
        .status(400)
        .json({ message: "No Update Data given", error: true });
    }

    const event = await Events.findOne({ _id: id });
    if (!event) {
      return res.status(400).json({ message: "No Event exists", error: true });
    }

    if (title) {
      event.title = title;
    }
    if (date) {
      event.date = date;
    }
    if (Organizers) {
      event.Organizers = Organizers;
    }
    if (description) {
      event.description = description;
    }
    if (category) {
      event.category = category;
    }
    if (Aim) {
      event.Aim = Aim;
    }

    await event.save();

    res.status(200).json({ message: "Updated Successfully", error: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Issue", error: true });
  }
};

//Delete Event :
export const DeleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Events.findOne({ _id: id });
    if (!event) {
      return res.status(400).json({ message: "No event found", error: true });
    }
    await Events.findByIdAndDelete({ _id: id });
    res
      .status(200)
      .json({ message: "Event Deleted Successfully", error: true });
  } catch (error) {
    console.log(error);
    res.json(500).json({ message: "Internal Server issue", error: true });
  }
};

//Getevents :
export const GetEvents = async (req, res) => {
  try {
    const events = await Events.find().sort({ date: -1 });
    if (!events) {
      return res.status(400).json({ message: "No Events occur", error: true });
    }

    res.status(200).json({
      message: "Events Successfully retrieved ",
      error: false,
      date: events,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Issue", error: true });
  }
};

//GetSingle Events :
export const GetEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Events.findById({ _id: id });
    if (!event) {
      return res.json({ message: "No event exists", error: true });
    }
    res.json({
      message: "Event Retrieved Successfully",
      error: false,
      data: event,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Issue", error: true });
  }
};
