import { Router } from "express";
import { body } from "express-validator";
import { loginUser, createUserBycrypt, getUsers, deleteUser } from "./handlers/index.js";
import { handleInputErrors } from "./middleware/validation.js";


const router = Router();


router.post('/ejemplo2',
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria'),
    handleInputErrors,
    loginUser,
)

router.post('/ejemplo3',
    /*Requisitos: 
        1. Con express, acceder al body para poner 3 validaciones a cada campo con su respectivo mensaje.
        2. Validar los errores con la funcion validationResult de express que esta en handleInputErrors.
        3. Llamar la funcion createUserBycrypt con su correspondiente.                
    */
        
)

router.get("/ejemplo4", getUsers);

router.delete('/ejemplo5', deleteUser);



export default router;
