import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    role: { type: String, default: "Member" },
    avatarColor: { type: String, default: "#6E56F8" },
  },
  { timestamps: true }
);

// Hash the password automatically whenever it's set/changed.
// NOTE: async pre-hooks in mongoose v9 don't pass a `next` callback —
// just return (or let the async function resolve) instead of calling next().
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare a plain-text password against the stored hash
userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

userSchema.methods.getInitials = function () {
  return this.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

// Never send the password hash back in API responses
userSchema.set("toJSON", {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.password;
    return ret;
  },
});

export default mongoose.model("User", userSchema);