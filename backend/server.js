import app from './app.js';
import dbConfig from './config/dbConfig.js';

// Database Connection => Database will conect then server will start
dbConfig().then(() =>
  app.listen(process.env.PORT, () => {
    console.log(
      `Server is runnig on port http://localhost:${process.env.PORT}`
    );
  })
);
