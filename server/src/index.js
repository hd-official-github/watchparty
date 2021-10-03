import express from 'express'
import { MONGODB_URL, MONGO_OPTS, PORT } from './config/config'
import routes from './routes/index'
import cors from 'cors'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import fs from 'fs'
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
import http from 'http'
const app = express();
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use('/v1', routes);

mongoose.connect(MONGODB_URL, MONGO_OPTS).catch(error => console.log("ERROR MONGODB ", error));
var model_path = __dirname + "/src/models";

fs.readdirSync(model_path).forEach((file) => {
    console.log("FILE ", file);
    if (file.indexOf('.js') > 0) {
        var urldata = './models/' + file
        import(urldata);
    }
})
import('./models/UserModel')


export const server = http.createServer(app);
import('./micorservices/socket')
server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});

