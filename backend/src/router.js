import { Router } from "express";
import { body } from "express-validator";
import { createUser, loginUser, createUserBycrypt, getUsers, deleteUser } from "./handlers/index.js";
import { handleInputErrors } from "./middleware/validation.js";


const router = Router();

router.post('/ejemplo1',
    createUser
);

router.post('/ejemplo2',
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria'),
    handleInputErrors,
    loginUser,
)

router.post('/ejemplo3',
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria'),
    handleInputErrors,
    createUserBycrypt
)

router.get("/ejemplo4", getUsers);

router.delete('/ejemplo5', deleteUser);



export default router;
