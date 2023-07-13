import server from "./server.js";

server.listen(process.env.PORT, ()=>{
  console.log("Server is running at: ", "localhost:" +process.env.PORT)
});