// server/repositories/participants.js
import { ObjectId } from 'mongodb';
import { getDB } from '../db.js';

const collection = () => getDB().collection('participants');

export async function createParticipant(data) {
  const result = await collection().insertOne({
    ...data,
    createdAt: new Date(),
    updatedAt: new Date()
  });
  return result.insertedId;
}

//  修正：接受 page 和 limit 參數 
export async function listParticipants(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const total = await collection().countDocuments({});
    
    const participants = await collection()
        .find()
        .sort({ createdAt: -1 })
        //  實作分頁核心：skip 和 limit 
        .skip(skip) 
        .limit(limit)
        .toArray();
        
    return { participants, total }; // 回傳清單和總數
}

export async function updateParticipant(id, patch) {
  return collection().updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...patch, updatedAt: new Date() } }
  );
}

export function deleteParticipant(id) {
  return collection().deleteOne({ _id: new ObjectId(id) });
}
