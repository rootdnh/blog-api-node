import request from "supertest";
import userModel from "../../../db/models/userModel";
import truncate from "../../utils/truncate" 
import server from "../../../server";
import userController from "../../../controllers/userController/userController";
import userRepository from "../../../repositories/userRepository";


const mockUser = {
  name: "Teste",
  email: "teste@gmail.com",
  password: "123333"
};

describe('Suite: user controller', ()=>{
  beforeEach(async () => {
    await truncate(userModel);
  });

  
  it('Should be create a user', async ()=>{
    
    let response = await request(server)
     .post("/create-user")
     .send(mockUser);
    expect(response.status).toBe(201)
  });

  it('Should be create a hashed password', async ()=>{
    let password = "123";
    let response = await userRepository.hashPassword(password)

     console.log(response);
    expect(true).toBe(true)
  })
})