import server from "./server.js";
const PORT = process.env.PORT || 5000;

server.listen(PORT, ()=>{
  console.log("Server is running at: ", "localhost:" + PORT)
});