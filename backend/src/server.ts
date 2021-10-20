import { serverHttp } from "./app";

const port = Number(process.env.APP_PORT);

serverHttp.listen(port, () => console.log(`Server is running 🚀: ${port}`))