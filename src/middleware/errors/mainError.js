import ErrorNum from "../../service/errors/enums.js";


export default (error, req, res, next) => {
    console.log(error);

    switch (error.code) {
        case ErrorNum.INVALID_TYPE_ERROR:
            return res.status(400).send({
                status: "error",
                error: error.name,
                message: error.message,
                cause: error.cause
            });

        default:
            return res.status(500).send({
                status: "error",
                error: "Error inmanejable",
                cause: error.cause
            });
    }
};