import { connect } from "mongoose";

const connectToDB = async (url:string) => {
  try {
    return await connect(url);
    
  } catch (e) {
    throw new Error('Connection Error');
  }
};

export default connectToDB;
