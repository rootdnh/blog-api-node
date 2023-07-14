import request from "supertest";
import userModel from "../../../db/models/userModel";
import truncate from "../../utils/truncate" 
import server from "../../../server";
const mockUser = {
  name: "Djonata",
  email: "wardjonata@gmail.com",
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
  })
})