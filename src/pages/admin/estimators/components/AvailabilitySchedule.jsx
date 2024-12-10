import React, { useEffect, useState } from "react";

const AvailabilitySchedule = ({
  availabilitySchedule,
  setAvailabilitySchedule,
  isEditable,
}) => {
  // Initialize local state
  const [schedule, setSchedule] = useState([]);

  // Transform incoming `availabilitySchedule` to local `schedule` format
  useEffect(() => {
    if (availabilitySchedule && availabilitySchedule.length > 0) {
      const transformedSchedule = availabilitySchedule.map((entry) => ({
        day: getDayName(entry.week_id), // Convert week_id to day name
        ranges: [
          { from: entry.from_time_1 || "", to: entry.to_time_1 || "" },
          { from: entry.from_time_2 || "", to: entry.to_time_2 || "" },
          { from: entry.from_time_3 || "", to: entry.to_time_3 || "" },
        ],
      }));
      setSchedule(transformedSchedule);
    }
  }, [availabilitySchedule]);

  // List of time options
  const times = Array.from({ length: 48 }, (_, i) => {
    const hours = Math.floor(i / 2);
    const minutes = i % 2 === 0 ? "00" : "30";
    return `${String(hours).padStart(2, "0")}:${minutes}`;
  });

  // Convert week_id to day name
  const getDayName = (weekId) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
    return days[weekId];
  };

  // Convert day name to week_id
  const getWeekId = (dayName) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
    return days.indexOf(dayName);
  };

  // Handle time dropdown change
  const handleTimeChange = (dayIndex, rangeIndex, key, value) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[dayIndex].ranges[rangeIndex][key] = value;
    setSchedule(updatedSchedule);

    // Sync with parent component
    const updatedAvailability = updatedSchedule.map((entry) => {
      const weekId = getWeekId(entry.day);
      return {
        week_id: weekId,
        from_time_1: entry.ranges[0].from,
        to_time_1: entry.ranges[0].to,
        from_time_2: entry.ranges[1].from,
        to_time_2: entry.ranges[1].to,
        from_time_3: entry.ranges[2].from,
        to_time_3: entry.ranges[2].to,
      };
    });
    setAvailabilitySchedule(updatedAvailability);
  };

  return (
    <div>
      <h3 className="text-[24px] text-white mb-2">Availability Schedule</h3>
      <div
        className="bg-[#1E252B] p-6 rounded-lg w-full mb-[15px]"
        style={{ border: "1px solid #ccc" }}
      >
        {schedule.map((daySchedule, dayIndex) => (
          <div className="md:gap-[25px] flex max-md:flex-col" key={dayIndex}>
            <div
              style={{ fontWeight: "bold", marginBottom: "10px" }}
              className="box_schedule_day"
            >
              {daySchedule.day}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-[25px] w-full">
              {daySchedule.ranges.map((range, rangeIndex) => (
                <div
                  key={rangeIndex}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "15px",
                  }}
                  className="bg-[#283641] rounded-[8px] min-h-[50px]"
                >
                  <select
                    value={range.from}
                    disabled={!isEditable}
                    onChange={(e) =>
                      handleTimeChange(
                        dayIndex,
                        rangeIndex,
                        "from",
                        e.target.value
                      )
                    }
                    className="bg-transparent text-white w-[100px] px-[15px]"
                  >
                    <option value="" className="text-black">
                      From
                    </option>
                    {times.map((time) => (
                      <option key={time} value={time} className="text-black">
                        {time}
                      </option>
                    ))}
                  </select>
                  <span className="text-white">~</span>
                  <select
                    value={range.to}
                    disabled={!isEditable}
                    onChange={(e) =>
                      handleTimeChange(
                        dayIndex,
                        rangeIndex,
                        "to",
                        e.target.value
                      )
                    }
                    className="bg-transparent text-white w-[100px] px-[15px]"
                  >
                    <option value="">To</option>
                    {times.map((time) => (
                      <option key={time} value={time} className="text-black">
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailabilitySchedule;
