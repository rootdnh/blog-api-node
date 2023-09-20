import request from "supertest";
import userModel from "../../../db/models/userModel";
import truncate from "../../utils-tests/truncate" 
import server from "../../../server";
import path from "node:path";
import { __dirname } from "../../../../dirname";
import fs from "node:fs";
import bcrypt from "bcryptjs";
import userRepository from "../../../repositories/userRepository";
import JwtUtil  from "../../../utils/JwtUtil.js";

const mockUser = {
  name: "Teste",
  email: "teste@gmail.com",
  password: "123333", 
};
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZkN2EyMDhjLWJmMGEtNDVmMy04YTBmLTkxZGU2ODBmNzcwMCIsImVtYWlsIjoiYXZhdGFyQGdtYWlsLmNvbSIsImlhdCI6MTY5Mzg1MTcwMSwiZXhwIjoxNjk2NDQzNzAxfQ.gUp_FUojSH8CbcZj6I0raJ3X0arfIMZVPOKl46MxAic";

describe('Suite: user controller', ()=>{
  beforeEach(async () => {
    await truncate(userModel);
  });

  
  it('Should create a user', async ()=>{
    console.log(__dirname)
    let data = await request(server)
     .post("/create-user")
     .set('Authorization', `Bearer ${token}`)
     .set('Content-Type', 'multipart/form-data')
     .field('name', mockUser.name)
     .field('email', mockUser.email)
     .field('password', mockUser.password)
     .attach('avatar', path.join(__dirname, 'src/uploads/b2a65c57c8da392bd0b31f6aec9dd6b4-perfil.png'))
     let json = await JSON.parse(data.text)
     let url = path.join(__dirname, 'src/uploads/', json.response.newAvatar.url);
     expect(data.status).toBe(201)
     fs.unlinkSync(url);

  });

  // it('Should create a hashed password', async ()=>{
  //   let password = "123";
  //   let response = await userRepository.hashPassword(password);
  //   let isEqual = await bcrypt.compare(password, response);
  //   expect(isEqual).toBe(true)
  // });

  // it("shoud delete a user", async ()=>{
  //   let newUser = { ...mockUser, email: "novouser@gmail.com" };
  //   let {id} = await userModel.create(newUser);
  //   let response = await request(server)
  //     .delete(`/delete-user/${id}`);

  //   expect(response.status).toBe(200);
  // });

  // it("should login a user", async ()=>{
  //   const {id, email} = await userModel.create(mockUser);
  //   const response = JwtUtil.generate({id, email})
  //   token = response;
  //   expect(true).toBe(true)
  // });

  // it("should compare a jwt", ()=>{
  //   const response = JwtUtil.verify(token);
  //   expect(response).toBeTruthy();
  // })

  
});