import jwt from "jsonwebtoken";

export const generateJWT = (uid, name) => {
  try {
    const payload = { uid, name };
    return jwt.sign(payload, process.env.SECRET_JWT_SEED, {
      expiresIn: "5h",
    });
  } catch (error) {
    console.error(error);
    throw new Error("No se pudo generar el JWT");
  }
};
