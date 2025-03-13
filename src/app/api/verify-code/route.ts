import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json();
    console.log('\nEmail and Code: ', email, code);
    
    const decodedEmail = decodeURIComponent(email);
    console.log('Decoded email: ', decodedEmail);
    
    const client = await clientPromise;  
    const db = client.db("education_app");  
    const collection = db.collection('users');  
    const user = await collection.findOne({ email: decodedEmail });

    // console.log('User: ', user);
    

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    // Check if the code is correct and not expired
    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      await collection.updateOne(  
        { email: decodedEmail }, 
        {  
          $set: {  
            isVerified: true,  
          },  
        }  
      ) 
      return NextResponse.json({ success: true, message: 'Account verified successfully' }, { status: 200 });

    } else if (!isCodeNotExpired) {
      // Code has expired
      return NextResponse.json({ 
        success: false, 
        message: 'Verification code has expired. Please sign up again to get a new code.'
      }, { status: 400 });

    } else {
      // Code is incorrect
      return NextResponse.json( { success: false, message: 'Incorrect verification code' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error verifying user:', error);
    return NextResponse.json({ success: false, message: 'Error verifying user' }, { status: 500 });
  }
}