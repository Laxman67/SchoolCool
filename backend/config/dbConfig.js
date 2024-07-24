import mongoose from 'mongoose';

const dbConfig = async () => {
  await mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log(`Database Connected`))
    .catch((err) => {
      console.log(`Error Occured : ${err}`);
    });
};

export default dbConfig;
