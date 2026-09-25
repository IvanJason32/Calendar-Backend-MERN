import { Evento } from "../models/Evento.js";

export const getEventos = async (req, res) => {
  try {
    const eventos = await Evento.find().populate("user", "_id name email");

    return res.status(200).json({
      ok: true,
      events: eventos,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Ocurrio un error, contacte con el administrador",
    });
  }
};

export const crearEvento = async (req, res) => {
  try {
    const { uid } = req;

    const evento = new Evento(req.body);
    evento.user = uid;
    const eventoGuardado = await evento.save();

    return res.status(201).json({
      ok: true,
      event: eventoGuardado,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Ocurrio un error, contacte con el administrador",
    });
  }
};

export const actualizarEvento = async (req, res) => {
  try {
    const eventoId = req.params.id;
    const { uid } = req;

    const evento = await Evento.findById(eventoId);

    if (!evento) {
      return res.status(400).json({
        ok: false,
        msg: "No existe evento con el id ingresado",
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tienes permisos para editar el evento",
      });
    }

    const nuevoEvento = { ...req.body, user: uid };

    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      {
        new: true,
      },
    );

    return res.status(200).json({
      ok: true,
      event: eventoActualizado,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Ocurrio un error, contacte con el administrador",
    });
  }
};

export const eliminarEvento = async (req, res) => {
  try {
    const eventoId = req.params.id;
    const { uid } = req;

    const evento = await Evento.findById(eventoId);

    if (!evento) {
      return res.status(400).json({
        ok: false,
        msg: "No existe evento con el id ingresado",
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tienes permisos para eliminar el evento",
      });
    }

    await Evento.findByIdAndDelete(eventoId);

    return res.status(200).json({
      ok: true,
      msg: "Evento eliminado exitosamente",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Ocurrio un error, contacte con el administrador",
    });
  }
};
