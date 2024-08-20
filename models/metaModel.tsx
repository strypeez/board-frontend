import { Schema, model, models } from "mongoose";

export interface Meta {
  carousel: string[]
}

const metaSchema = new Schema(
  {
    carousel: {
      type: [String],
    },
  },
  { timestamps: true }
);

const MetaModel = models.meta || model("meta", metaSchema);

export default MetaModel;
