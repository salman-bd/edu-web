import { NextRequest, NextResponse } from "next/server";  
import bcryptjs from "bcryptjs";  
import { sendVerificationEmail } from "@/lib/sendEmails";  
import clientPromise from "@/lib/mongodb";  

export async function POST(request: NextRequest) {  
    const client = await clientPromise;  
    const db = client.db("education_app");  
    const collection = db.collection('users');  

    try {  
        const { name, email, password } = await request.json();  
        
        // Check if user exists  
        const existingUserByEmail = await collection.findOne({ email });  
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();  
    
        if (existingUserByEmail) {  
            if (existingUserByEmail.isVerified) {  
                return NextResponse.json({ success: false, message: "User already exists with this email" }, { status: 400 });  
            }  
    
            const hashedPassword = await bcryptjs.hash(password, 10);  
            const verifyCodeExpiry = new Date(Date.now() + 600000); // 10 minutes  
            await collection.updateOne(  
                { email },  
                {  
                    $set: {  
                        password: hashedPassword,  
                        verifyCode,  
                        verifyCodeExpiry,  
                    },  
                }  
            );  
        } else {  
            const hashedPassword = await bcryptjs.hash(password, 10);  
            const verifyCodeExpiry = new Date(Date.now() + 3600000); // 1 hour  
            await collection.insertOne({  
                name,  
                email,  
                password: hashedPassword,  
                verifyCode,  
                verifyCodeExpiry,  
                isVerified: false,  
            });  
        }  
    
        const emailResponse = await sendVerificationEmail(email, name, verifyCode);  
        if (!emailResponse.success) {  
            return NextResponse.json({ success: false, message: emailResponse.message }, { status: 500 });  
        }  
    
        return NextResponse.json({  
            success: true,  
            message: "User registered successfully. Please verify your email."  
        }, { status: 201 });  
    
    } catch (error) {  
        console.error("Error registering user: ", error);  
        return NextResponse.json({  
            success: false,  
            message: "Error registering user: " + (error instanceof Error ? error.message : 'Unknown error'),  
        }, { status: 500 });  
    }   
}