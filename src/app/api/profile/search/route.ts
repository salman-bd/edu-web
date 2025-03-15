import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("query")?.toLowerCase()

  const session = await getServerSession()
  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthenticated user' }, { status: 401 })
  }

  if (!query || query.length < 2) {
    return NextResponse.json({ profiles: [] })
  }

  try {
    const client = await clientPromise;  
    const db = client.db("education_app");  
    const collection = db.collection('profiles'); 

    console.log('Query to search profile: ', query);
    
    // Use MongoDB's $regex for partial matching on multiple fields
    const profiles = await collection.find({
      $or: [
        // { id: { $regex: query, $options: 'i' } },
        { firstName: { $regex: query, $options: 'i' } },
        { lastName: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { phone: { $regex: query, $options: "i" } },
      ]
    }).toArray();
    
    console.log('Fetched Profiles: ', profiles);
    
    return NextResponse.json({ profiles })

  } catch (error) {
    console.error("Error searching profiles:", error)
    return NextResponse.json({ error: "Failed to search profiles" }, { status: 500 })
  }
}