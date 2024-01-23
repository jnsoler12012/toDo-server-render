import { default as app } from './app.js';
import dotenv from "dotenv"

dotenv.config()

const port = process.env.WEBPACK_URL_PORT || 5000;

app.listen(port, () => {
    /* eslint-disable no-console */
    console.log(`Listening: http://localhost:${port}`);
    /* eslint-enable no-console */
});