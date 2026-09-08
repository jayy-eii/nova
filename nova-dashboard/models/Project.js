import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    client: { type: String, default: "Internal" },
    description: { type: String, default: "" },
    status: {
      type: String,
      enum: ["On Track", "At Risk", "Delayed", "Completed"],
      default: "On Track",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Urgent"],
      default: "Medium",
    },
    deadline: { type: String, required: true }, // stored as "YYYY-MM-DD"
    // Members are stored as references to real User accounts —
    // NOT hardcoded initials like "AS", "RK" anymore.
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

projectSchema.set("toJSON", {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model("Project", projectSchema);