import HandleError from "../error/handleError.js";
import postModel from "../db/models/postModel.js";

class PostRepository {
  constructor(){
    this.initialize();
  }

  async initialize(){
    try {
      await postModel.sync();
    } catch (error) {
      console.log(error)
      throw new HandleError("Error when trying to sync post model", 500)
    }
  }
}

export default new PostRepository;