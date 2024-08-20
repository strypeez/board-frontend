import mongoose from 'mongoose';
import GameModel from '@/models/gameModel';

const uri = process.env.MONGODB_URI || '';
mongoose.connect(uri);

export const changeStream = GameModel.watch();