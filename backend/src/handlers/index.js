import User from "../models/Users.js"
import { validationResult } from "express-validator"
import { hashPassword } from "../utils/auth.js";


export const createUser = async (req, res) => {
    const { name } = req.body;

    try {
        const userExists = await User.findOne({ name });

        if (userExists) {
            return res.status(400).json({ error: 'El usuario ya existe' });
        }

        const user = new User(req.body)
        await user.save();

        res.status(201).json({ message: 'Usuario creado exitosamente' });
        console.log("BODY RECIBIDO:", req.body);


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const loginUser = async (req, res) => {

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, password } = req.body;

    try {
        const user = await User.findOne({ name });
        if (!user) {
            return res.status(400).json({ error: 'Usuario no encontrado' });
        }

        if (user.password !== password) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        res.status(200).json({ message: 'Inicio de sesión exitoso', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const createUserBycrypt = async (req, res) => {
    const { name, password } = req.body;

    try {
        const userExists = await User.findOne({ name });

        if (userExists) {
            return res.status(400).json({ error: 'El usuario ya existe' });
        }

        const hashedPassword = await hashPassword(password);
        const user = new User({ name, password: hashedPassword });

        await user.save();

        res.status(201).json({ message: "Ha sido registrado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const getUsers = async (req, res) => {
    try {
        const { name } = req.query;
        const usuario = await User.findOne({ name });

        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.status(200).json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al obtener el usuario" });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({ mensaje: "Falta el parámetro 'name'" });
        }

        const eliminado = await User.findOneAndDelete({ name });

        if (!eliminado) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.status(200).json({ mensaje: `Usuario '${name}' eliminado correctamente` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al eliminar el usuario" });
    }
}