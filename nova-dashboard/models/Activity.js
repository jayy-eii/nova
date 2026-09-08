import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    // e.g. "created", "moved", "completed", "commented on", "invited"
    action: { type: String, required: true },
    // Human-readable label of what was acted on, e.g. a task title or project name
    target: { type: String, required: true },
    detail: { type: String, default: "" },
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", default: null },
  },
  { timestamps: true }
);

activitySchema.set("toJSON", {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model("Activity", activitySchema);