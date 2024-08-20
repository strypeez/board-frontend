import { Schema, model, models } from "mongoose";

export interface Game {
  _id: string,
  title: string,
  description: string,
  image: string,
  thumbnail: string,
  minPlayers: number,
  maxPlayers: number,
  playingTime: number,
  yearPublished: number,
  price: number,
  quantity: number
}

const gameSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    minPlayers: {
      type: Number,
    },
    maxPlayers: {
      type: Number,
    },
    playingTime: {
      type: Number,
    },
    yearPublished: {
      type: Number,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const GameModel = models.game || model("game", gameSchema);

export default GameModel;
