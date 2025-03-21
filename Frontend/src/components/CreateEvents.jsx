import { useState } from "react";

const AddEventModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    banner: "",
    Date: "",
    Location: "",
    Mode: "Offline",
    Website: "",
    Deadline: "",
    Description: "",
    Schedule: [
      { Day: [{ Event: [{ time: "", eventTitle: "", description: "" }] }] },
    ],
    TrackPrizes: [{ Name: "", Prize: "" }],
    FAQ: [{ Question: "", Answers: "" }],
    Sponsor: [{ Name: "", Logo: "", url: "", Tier: "Platinum" }],
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add new Day
  const addDay = () => {
    setFormData({
      ...formData,
      Schedule: [
        ...formData.Schedule,
        { Day: [{ Event: [{ time: "", eventTitle: "", description: "" }] }] },
      ],
    });
  };

  // Remove Day
  const removeDay = (dayIndex) => {
    const updatedSchedule = formData.Schedule.filter(
      (_, index) => index !== dayIndex
    );
    setFormData({ ...formData, Schedule: updatedSchedule });
  };

  // Add new Event inside a Day
  const addEvent = (dayIndex) => {
    const updatedSchedule = [...formData.Schedule];
    updatedSchedule[dayIndex].Day[0].Event.push({
      time: "",
      eventTitle: "",
      description: "",
    });
    setFormData({ ...formData, Schedule: updatedSchedule });
  };

  // Remove Event from a Day
  const removeEvent = (dayIndex, eventIndex) => {
    const updatedSchedule = [...formData.Schedule];
    updatedSchedule[dayIndex].Day[0].Event = updatedSchedule[
      dayIndex
    ].Day[0].Event.filter((_, index) => index !== eventIndex);
    setFormData({ ...formData, Schedule: updatedSchedule });
  };

  // Handle Schedule Change
  const handleScheduleChange = (dayIndex, eventIndex, field, value) => {
    const updatedSchedule = [...formData.Schedule];
    updatedSchedule[dayIndex].Day[0].Event[eventIndex][field] = value;
    setFormData({ ...formData, Schedule: updatedSchedule });
  };

  // Add new Track Prize
  const addPrize = () => {
    setFormData({
      ...formData,
      TrackPrizes: [...formData.TrackPrizes, { Name: "", Prize: "" }],
    });
  };

  // Remove Track Prize
  const removePrize = (index) => {
    const updatedPrizes = formData.TrackPrizes.filter((_, i) => i !== index);
    setFormData({ ...formData, TrackPrizes: updatedPrizes });
  };

  // Handle Track Prize Change
  const handlePrizeChange = (index, field, value) => {
    const updatedPrizes = [...formData.TrackPrizes];
    updatedPrizes[index][field] = value;
    setFormData({ ...formData, TrackPrizes: updatedPrizes });
  };
  // Add new Track Prize
  const addFAQ = () => {
    setFormData({
      ...formData,
      FAQ: [...formData.FAQ, { Question: "", Answers: "" }],
    });
  };

  // Remove Track Prize
  const removeFAQ = (index) => {
    const updatedFAQ = formData.FAQ.filter((_, i) => i !== index);
    setFormData({ ...formData, FAQ: updatedFAQ });
  };

  // Handle Track Prize Change
  const handleFAQChange = (index, field, value) => {
    const updatedFAQ = [...formData.FAQ];
    updatedFAQ[index][field] = value;
    setFormData({ ...formData, FAQ: updatedFAQ });
  };

  const addSponsor = () => {
    setFormData((prev) => ({
      ...prev,
      Sponsor: [
        ...(prev.Sponsor || []),
        { Name: "", Logo: "", url: "", Tier: "Platinum" },
      ],
    }));
  };

  const removeSponsor = (index) => {
    setFormData((prev) => ({
      ...prev,
      Sponsor: prev.Sponsor.filter((_, i) => i !== index),
    }));
  };

  const handleSponsorChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedSponsor = [...(prev.Sponsor || [])];
      updatedSponsor[index][field] = value;
      return { ...prev, Sponsor: updatedSponsor };
    });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "http://localhost:8080/api/Events/events-create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await response.json();
    console.log(data);
    setIsOpen(false);
  };

  return (
    <div className="text-center">
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        onClick={() => setIsOpen(true)}
      >
        Add Event
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-gray-900 text-white p-6 rounded-lg w-full max-w-4xl shadow-lg relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-3 right-4 text-gray-300 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              ✖
            </button>

            <h2 className="text-2xl font-bold mb-4">Create New Event</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              {/* Left Column */}
              <div className="space-y-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Event Title"
                  className="w-full p-3 border rounded bg-gray-800"
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="banner"
                  placeholder="Banner URL"
                  className="w-full p-3 border rounded bg-gray-800"
                  onChange={handleChange}
                  required
                />
                <input
                  type="date"
                  name="Date"
                  className="w-full p-3 border rounded bg-gray-800"
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="Location"
                  placeholder="Location"
                  className="w-full p-3 border rounded bg-gray-800"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <select
                  name="Mode"
                  className="w-full p-3 border rounded bg-gray-800"
                  onChange={handleChange}
                  required
                >
                  <option value="Offline">Offline</option>
                  <option value="Online">Online</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
                <input
                  type="url"
                  name="Website"
                  placeholder="Event Website"
                  className="w-full p-3 border rounded bg-gray-800"
                  onChange={handleChange}
                  required
                />
                <input
                  type="date"
                  name="Deadline"
                  className="w-full p-3 border rounded bg-gray-800"
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="Description"
                  placeholder="Event Description"
                  className="w-full p-3 border rounded bg-gray-800"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <h1>PrizePool</h1>
                <div>
                  <input
                    type="url"
                    name=""
                    placeholder="Ist Prize"
                    className="w-full p-3 border mb-2 rounded bg-gray-800"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <input
                    type="url"
                    name=""
                    placeholder="IInd Prize"
                    className="w-full p-3 border rounded bg-gray-800"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Schedule Section */}
              <div className="col-span-2">
                <h3 className="text-xl font-semibold mb-2">Schedule</h3>
                {formData.Schedule.map((day, dayIndex) => (
                  <div key={dayIndex} className="p-3 border rounded mt-2">
                    <h4 className="font-semibold">Day {dayIndex + 1}</h4>
                    {day.Day[0].Event.map((event, eventIndex) => (
                      <div key={eventIndex} className="p-2 border mt-2 rounded">
                        <input
                          type="time"
                          value={event.time}
                          onChange={(e) =>
                            handleScheduleChange(
                              dayIndex,
                              eventIndex,
                              "time",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border rounded"
                          required
                        />
                        <input
                          type="text"
                          placeholder="Event Title"
                          value={event.eventTitle}
                          onChange={(e) =>
                            handleScheduleChange(
                              dayIndex,
                              eventIndex,
                              "eventTitle",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border rounded mt-2"
                          required
                        />
                        <textarea
                          placeholder="Event Description"
                          value={event.description}
                          onChange={(e) =>
                            handleScheduleChange(
                              dayIndex,
                              eventIndex,
                              "description",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border rounded mt-2"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => removeEvent(dayIndex, eventIndex)}
                          className="mt-2 bg-red-500 text-white p-2 rounded"
                        >
                          Remove Event
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addEvent(dayIndex)}
                      className="mt-2 bg-green-500 text-white p-2 rounded"
                    >
                      + Add Event
                    </button>
                    <button
                      type="button"
                      onClick={() => removeDay(dayIndex)}
                      className="mt-2 bg-red-500 text-white p-2 rounded ml-2"
                    >
                      Remove Day
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addDay}
                  className="mt-2 bg-blue-500 text-white p-2 rounded"
                >
                  + Add Day
                </button>
              </div>
              <div className="col-span-2">
                <h3 className="text-xl font-semibold mb-2">Track Prizes</h3>
                {formData.TrackPrizes.map((prize, index) => (
                  <div key={index} className="p-2 border mt-2 rounded">
                    <input
                      type="text"
                      placeholder="Prize Name"
                      value={prize.Name}
                      onChange={(e) =>
                        handlePrizeChange(index, "Name", e.target.value)
                      }
                      className="w-full p-2 border rounded mt-2"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Prize Amount"
                      value={prize.Prize}
                      onChange={(e) =>
                        handlePrizeChange(index, "Prize", e.target.value)
                      }
                      className="w-full p-2 border rounded mt-2"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => removePrize(index)}
                      className="mt-2 bg-red-500 text-white p-2 rounded"
                    >
                      Remove Prize
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addPrize}
                  className="mt-2 bg-green-500 text-white p-2 rounded"
                >
                  + Add Prize
                </button>
              </div>
              <div className="col-span-2">
                <h3 className="text-xl font-semibold mb-2">FAQ</h3>
                {formData.FAQ.map((faq, index) => (
                  <div key={index} className="p-2 border mt-2 rounded">
                    <input
                      type="text"
                      placeholder="Question"
                      value={faq.Question}
                      onChange={(e) =>
                        handlePrizeChange(index, "Question", e.target.value)
                      }
                      className="w-full p-2 border rounded mt-2"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Answers"
                      value={faq.Answers}
                      onChange={(e) =>
                        handleFAQChange(index, "Answers", e.target.value)
                      }
                      className="w-full p-2 border rounded mt-2"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => removeFAQ(index)}
                      className="mt-2 bg-red-500 text-white p-2 rounded"
                    >
                      Remove FAQ
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFAQ}
                  className="mt-2 bg-green-500 text-white p-2 rounded"
                >
                  + Add FAQ
                </button>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "16px",
                }}
              >
                {Array.isArray(formData.Sponsor) &&
                  formData.Sponsor.map((sponsor, index) => (
                    <div
                      key={index}
                      style={{
                        border: "1px solid gray",
                        padding: "16px",
                        borderRadius: "10px",
                      }}
                    >
                      <input
                        type="text"
                        placeholder="Sponsor Name"
                        value={sponsor.Name}
                        className="w-full p-2 border rounded mt-2"
                        onChange={(e) =>
                          handleSponsorChange(index, "Name", e.target.value)
                        }
                      />
                      <input
                        type="text"
                        placeholder="Logo URL"
                        className="w-full p-2 border rounded mt-2"
                        value={sponsor.Logo}
                        onChange={(e) =>
                          handleSponsorChange(index, "Logo", e.target.value)
                        }
                      />
                      <input
                        type="text"
                        placeholder="Website URL"
                        className="w-full p-2 border rounded mt-2"
                        value={sponsor.url}
                        onChange={(e) =>
                          handleSponsorChange(index, "url", e.target.value)
                        }
                      />
                      <select
                        value={sponsor.Tier}
                        className="w-2/3 mr-5 p-2 border rounded mt-2"
                        onChange={(e) =>
                          handleSponsorChange(index, "Tier", e.target.value)
                        }
                      >
                        <option value="Platinum">Platinum</option>
                        <option value="Gold">Gold</option>
                        <option value="Silver">Silver</option>
                        <option value="Bronze">Bronze</option>
                      </select>
                      <button onClick={() => removeSponsor(index)}>
                        Remove
                      </button>
                    </div>
                  ))}
              </div>
              <button onClick={addSponsor} className="border">Add Sponsor</button>
              {/* Submit Button */}
              <div className="col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddEventModal;
