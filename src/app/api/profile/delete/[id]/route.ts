import { NextResponse } from "next/server";  

import { mongoDbConnect } from "@/lib/dbConnect";  

import ProfileModel from "@/models/ProfileModel";  


export async function DELETE(request: Request) {  

  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  console.log("ID to be deleted:", id);  

  if (!id) {  
    return NextResponse.json(  
      { message: "Profile ID is required" },  
      { status: 400 }  
    );  
  }  

  try {  
    await mongoDbConnect();  
    const deletedProfile = await ProfileModel.findByIdAndDelete(id);  

    if (!deletedProfile) {  
      return NextResponse.json(  
        { message: "Profile not found" },  
        { status: 404 }  
      );  
    }  
    console.log("Deleted profile:", deletedProfile);  

    // Return success response  
    return NextResponse.json(  
      { message: "Profile deleted successfully" },  
      { status: 200 }  
    );  

  } catch (error) {  
    console.error("Error deleting profile:", error);  
    return NextResponse.json(  
      { message: "Internal server error" },  
      { status: 500 }  
    );  
  }  
}