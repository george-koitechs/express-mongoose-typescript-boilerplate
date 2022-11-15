import { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String },
  },
  { timestamps: true }
);

export default model(
  "user",
  UserSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc: any, ret: any) {
      delete ret._id;
    },
  })
);
