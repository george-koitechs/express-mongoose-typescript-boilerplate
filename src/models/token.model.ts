import { model, Schema } from "mongoose";

const TokenSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "user" },
    refreshToken: { type: String, required: true },
  },
  { timestamps: true }
);

export default model(
  "token",
  TokenSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc: any, ret: any) {
      delete ret._id;
    },
  })
);
