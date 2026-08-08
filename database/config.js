import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN);
    console.log("DB Online");
  } catch (error) {
    console.error(error);
    throw new Error("No se pudo conectar a la DB");
  }
};
