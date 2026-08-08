import { Router } from "express";
import { check } from "express-validator";
import {
  actualizarEvento,
  crearEvento,
  eliminarEvento,
  getEventos,
} from "../controllers/events.js";
import { validarJWT } from "../middlewares/validar-JWT.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { isDate } from "../helpers/isDate.js";

export const eventsRouter = Router();

eventsRouter.use(validarJWT);

eventsRouter.get(
  "/",

  getEventos,
);

eventsRouter.post(
  "/",
  [
    check("title", "title es obligatorio").not().isEmpty(),
    check("start", "start es obligatorio").custom(isDate),
    check("end", "end es obligatorio").custom(isDate),
    validarCampos,
  ],
  crearEvento,
);

eventsRouter.put(
  "/:id",
  [
    check("title", "title es obligatorio").not().isEmpty(),
    check("start", "start es obligatorio").custom(isDate),
    check("end", "end es obligatorio").custom(isDate),
    validarCampos,
  ],
  actualizarEvento,
);

eventsRouter.delete("/:id", eliminarEvento);
