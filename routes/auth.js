import { Router } from "express";
import { check } from "express-validator";
import {
  crearUsuario,
  loginUsuario,
  renovarToken,
} from "../controllers/auth.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-JWT.js";

export const authRouter = Router();

authRouter.post(
  "/new",
  [
    check("name", "El name es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe tener mas de 5 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  crearUsuario,
);

authRouter.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe tener mas de 5 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  loginUsuario,
);

authRouter.get("/renew", validarJWT, renovarToken);
