import ProfileModel from "@/models/ProfileModel";
import { mongoDbConnect } from "./dbConnect";


export default async function profileDelete(id: string) {
  await mongoDbConnect();
  try {
    const response = await ProfileModel.findOneAndDelete({ id }); 
    return response;
  } catch (error) {
    return error;
  }
 
}
