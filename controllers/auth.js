import { compareSync, genSaltSync, hashSync } from "bcryptjs";
import { Usuario } from "../models/Usuario.js";
import { generateJWT } from "../helpers/generateJWT.js";

export const crearUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe un usuario registrado con ese email",
      });
    }

    usuario = new Usuario(req.body);

    const salt = genSaltSync();
    usuario.password = hashSync(password, salt);

    await usuario.save();

    const token = generateJWT(usuario._id, usuario.name);

    return res.status(201).json({
      ok: true,
      user: {
        uid: usuario._id,
        name: usuario.name,
        email: usuario.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Ocurrio un error, contactar con el administrador",
    });
  }
};

export const loginUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario no registrado",
      });
    }

    const validPassword = compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "El password no es correcto",
      });
    }

    const token = generateJWT(usuario._id, usuario.name);

    return res.status(200).json({
      ok: true,
      user: {
        uid: usuario._id,
        name: usuario.name,
        email: usuario.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Ocurrio un error, contactar con el administrador",
    });
  }
};

export const renovarToken = async (req, res) => {
  const { uid, name } = req;

  try {
    const usuario = await Usuario.findById(uid);
    const email = usuario.email;

    const token = generateJWT(uid, name);

    return res.status(200).json({
      ok: true,
      user: {
        uid,
        name,
        email
      },
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Ocurrio un error, contactar con el administrador",
    });
  }
};
