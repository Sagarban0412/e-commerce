import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // optional: removes extra spaces
    },
    email: {
      type: String,
      required: true,
      unique: true, // prevents duplicate emails
      lowercase: true, // always store emails in lowercase
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // optional: enforce password length
    },
    role: {
      type: String,
      default: "user",
      enum: ["admin", "user"],
    },
  },
  { timestamps: true } // ✅ correct
);

const User = mongoose.model("User", userSchema);

export default User;
