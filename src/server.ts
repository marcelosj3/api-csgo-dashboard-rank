import { app } from "./app";
import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected!");

    const port = process.env.PORT ?? 3000;

    app.listen(port, () => {
      console.log(`App running at port: ${port}`);
    });
  })
  .catch((err) => console.error(err));
