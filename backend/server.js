import app from "./app.js";



app.listen(process.env.PORT,()=>{
        console.log(`Server is runnig om Port http://localhost:${process.env.PORT}`);
})