import { Router } from "express";
import CustomError from "../service/errors/CustomError.js";
import ErrorNum from "../service/errors/enums.js";
import { infoError } from "../service/errors/infoError.js";

const users = [];

const userRouter = Router();

userRouter.get("/", (req, res)=>{
    res.send({status:`successs`, payload: users})
});

userRouter.post("/", (req,res)=>{
    const {first_name, last_name, email} = req.body;
    if(!first_name||!last_name||!email){ 
        CustomError.createError({
            name:`Error al crear usuario`,
            message:`Credenciales invalidas o inexistentes`,
            cause: infoError({first_name,last_name,email}),
            code: ErrorNum.INVALID_TYPE_ERROR
        })
    }
    const user = {
        first_name,
        last_name,
        email
    }
    if(users.length===0){
        user.id=1;
    }else{
        user.id = users[users.length-1].id+1;
    }
    users.push(user);
    res.send({status:`success`, payload:user})

})
 

export default userRouter;
