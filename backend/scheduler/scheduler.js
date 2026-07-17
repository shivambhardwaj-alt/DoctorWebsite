import cron from "node-cron";
import appointmentModel from "../models/appointmentModel.js";

cron.schedule("*/5 * * * *", async () => {
  try {
    console.log("scheduler triggered");
    const now = new Date();

    const appointments = await appointmentModel.find({
      cancelled: false,
      isCompleted: false,
    });

    for (const appointment of appointments) {
      const [day, month, year] = appointment.slot_date.split("-");

      const appointmentDate = new Date(
        `${year}-${month}-${day} ${appointment.slotTime}`
      );

      if (appointmentDate < now) {
        appointment.cancelled = true;
        
        await appointment.save();
      }
    }
  } catch (err) {
    console.error(err);
  }
});