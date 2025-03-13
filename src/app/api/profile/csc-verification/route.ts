import { NextRequest, NextResponse } from "next/server";  

export async function POST(request: NextRequest) {  
  try {  
    // Use request.nextUrl.searchParams instead of useSearchParams()
    const searchParams = request.nextUrl.searchParams;  
    const type = searchParams.get('type');  
    console.log('Profile type: ', type);  
    
    const { code } = await request.json();  
    
    if (!code) {  
      return NextResponse.json({ success: false, message: 'CSC Verification code is missing' }, { status: 400 });  
    }  
    
    if (type === 'student' && code === 'STU-CSC003') {  
      return NextResponse.json({ success: true, message: 'CSC Student Verification Successful!' }, { status: 200 });  
    } else if (type === 'teacher' && code === 'TCH-CSC002') {  
      return NextResponse.json({ success: true, message: 'CSC Teacher Verification Successful!' }, { status: 200 });  
    } else {  
      return NextResponse.json({ success: false, message: 'Invalid type or code.' }, { status: 400 });  
    }  

  } catch (error) {  
    return NextResponse.json({ success: false, message: String(error) }, { status: 500 });  
  }  
}