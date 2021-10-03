

const validate = (schema) => async (req, res, next) => {
    // console.log(req.body);
    try {
        const value = await schema.validateAsync(req.body);
        req.payload = value
        next()
    }
    catch (err) {
        if (err.isJoi) {
            res.status(422).send({
                status: 'failed',
                err: err.message
            })
        } else {
            res.status(403).send({
                err: err.message
            })
        }


    }
}

export default validate