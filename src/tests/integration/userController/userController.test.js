import request from "supertest";
import userModel from "../../../db/models/userModel";
import truncate from "../../utils-tests/truncate" 
import server from "../../../server";
import bcrypt from "bcryptjs";
import userRepository from "../../../repositories/userRepository";
import userController from "../../../controllers/userController/userController";
import JwtUtil  from "../../../utils/JwUtil";

const mockUser = {
  name: "Teste",
  email: "teste@gmail.com",
  password: "123333", 
};
let token = "";

describe('Suite: user controller', ()=>{
  beforeEach(async () => {
    await truncate(userModel);
  });

  
  it('Should create a user', async ()=>{
    let response = await request(server)
     .post("/create-user")
     .send(mockUser);
    expect(response.status).toBe(201)
  });

  it('Should create a hashed password', async ()=>{
    let password = "123";
    let response = await userRepository.hashPassword(password);
    let isEqual = await bcrypt.compare(password, response);
    expect(isEqual).toBe(true)
  });

  it("shoud delete a user", async ()=>{
    let newUser = { ...mockUser, email: "novouser@gmail.com" };
    let {id} = await userModel.create(newUser);
    let response = await request(server)
      .delete(`/delete-user/${id}`);

    expect(response.status).toBe(200);
  });

  it("should login a user", async ()=>{
    const {id, email} = await userModel.create(mockUser);
    const response = JwtUtil.generate({id, email})
    token = response;
    expect(true).toBe(true)
  });

  it("should compare a jwt", ()=>{
    const response = JwtUtil.verify(token);
    expect(response).toBeTruthy();
  })

  
});