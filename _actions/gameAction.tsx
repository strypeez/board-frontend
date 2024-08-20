"use server";

import GameModel from "@/models/gameModel";
import CategoryModel from "@/models/categoryModel";
import connectDB from "../config/database";

import { Game } from "@/models/gameModel";

import { getErrorMessage } from "./categoryAction";

export interface GamesResponse {
  data: Game[]
}

export async function deleteGame(gameId: string) {
  try {
    await connectDB();
    const res = await CategoryModel.updateMany(
      {},
      {
        $pull: {
          items: gameId,
        },
      }
    );
    const res2 = await GameModel.deleteOne({ _id: gameId });
  } catch (error) {
    console.log("this is the error in deleteGame", getErrorMessage(error));
    return { errMsg: getErrorMessage(error) };
  }
}

export async function getGames() {
  try {
    await connectDB();
    const data = await GameModel.find();

    return { data };
  } catch (error) {
    return { errMsg: getErrorMessage(error) };
  }
}

export async function getGame(gameId: string) {
  try {
    await connectDB();
    const data = await GameModel.findById(gameId);
    return { data };
  } catch (error) {
    return { errMsg: getErrorMessage(error) };
  }
}

export async function updateGame(gameId: string, params: Game) {
  try {
    await connectDB();
    const category = await GameModel.findOneAndUpdate(
      { _id: gameId },
      {
        title: params.title,
        description: params.description,
        image: params.image,
        thumbnail: params.thumbnail,
        minPlayers: params.minPlayers,
        maxPlayers: params.maxPlayers,
        playingTime: params.playingTime,
        yearPublished: params.yearPublished,
        price: params.price,
        quantity: params.quantity,
      }
    );
  } catch (error) {
    console.log("this is ther error", error);
    return { errMsg: getErrorMessage(error) };
  }
}

export async function getGamesList(items:string[]): Promise<GamesResponse | {errMsg: string}>{
  try {
    await connectDB();
    const data = await GameModel.find({ _id: items });
    return { data };
  } catch (error) {
    console.log("this is the error of getGamesList", await getErrorMessage(error));
    return { errMsg: await getErrorMessage(error) };
  }
}

export async function createGame(params: Game) {
  try {
    await connectDB();
    const newGame = new GameModel({
      title: params.title,
      description: params.description,
      image: params.image,
      thumbnail: params.thumbnail,
      minPlayers: params.minPlayers,
      maxPlayers: params.maxPlayers,
      playingTime: params.playingTime,
      yearPublished: params.yearPublished,
      price: params.price,
      quantity: params.quantity,
    });
    newGame.save();
  } catch (error) {
    console.log("error saving game", getErrorMessage(error));
  }
}
