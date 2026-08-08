import jwt from "jsonwebtoken";

export const validarJWT = (req, res, next) => {
  try {
    const token = req.header("x-token");

    if (!token) {
      return res.status(400).json({
        ok: false,
        msg: "Petición sin token",
      });
    }

    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);

    req.uid = uid;
    req.name = name;
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      ok: false,
      msg: "Token no valido",
    });
  }

  next();
};
