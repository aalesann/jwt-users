import app from './app';
import './database';
import './config/config'


app.listen(process.env.PORT, () => console.log("Server on port", process.env.PORT));