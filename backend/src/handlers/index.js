import User from "../models/Users.js"
import { validationResult } from "express-validator"
import { hashPassword, checkPassword } from "../utils/auth.js";


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
        const result = await checkPassword(password,user.password);
        
        if (!result) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        res.status(200).json({ message: 'Inicio de sesión exitoso', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const createUserBycrypt = async (req, res) => {
    /*       
        La función createUserBycrypt recibe los datos del usuario desde req.body.
        Primero utiliza User.findOne() para verificar si ya existe un usuario con el mismo nombre.
        Si esa consulta devuelve un resultado, se envía una respuesta con un error indicando que el usuario ya existe.

        Si el usuario no existe, la función llama a hashPassword() para encriptar la contraseña original.
        Luego crea una nueva instancia del modelo usando new User() y le asigna el nombre junto con la contraseña encriptada.

        Después, la función guarda el nuevo usuario en la base de datos mediante user.save().
        Finalmente, envía una respuesta con un código 201 indicando que el registro fue exitoso.    
        Si ocurre cualquier error durante el proceso, ese error es capturado por el bloque catch y se envía una respuesta con un estado 500 usando res.status(500).json()        
    */ 
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