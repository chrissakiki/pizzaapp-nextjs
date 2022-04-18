import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
  {
    customer: {
      type: String,
      required: true,
      trim: true,
      maxlength: 60,
    },
    phoneNumber: {
      type: Number,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    pizza: [
      {
        title: { type: String, required: true },
        size: { type: Number, required: true },
        quantity: { type: Number, required: true },
        extraOptions: {
          type: [
            {
              text: { type: String, required: true },
              price: { type: Number, required: true },
            },
          ],
        },
      },
    ],

    total: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
    },
    method: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default models.Order || model("Order", OrderSchema);
