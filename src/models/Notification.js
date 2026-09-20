import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    audience: { type: String, enum: ["admin", "user"], required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, // set only when audience === "user"
    type: { type: String, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    link: { type: String, default: "" },
    read: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.models.Notification ||
  mongoose.model("Notification", NotificationSchema);
