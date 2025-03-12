import mongoose from "mongoose"
// import { Pool } from 'pg';  

type ConnectionObject = {  
    isConnected?: number;  
};  

const connection: ConnectionObject = {};  

// MongoDB Connection  
export async function mongoDbConnect(): Promise<void> {  
    if (connection.isConnected) {  
        // console.log("Already connected to MongoDB");  
        return;  
    }
    try {  
        const db = await mongoose.connect(process.env.MONGODB_URI || '');  

        connection.isConnected = db.connections[0].readyState;  
        // console.log("MongoDB Connected Successfully");  
        
    } catch (error) {  
        console.log("MongoDB Connection Failed, and ERROR: ", error);  
        process.exit(1);  // Use exit code 1 for errors  
    }  
}  

// PostgreSQL Connection 
/* 
export const pool = new Pool({  
    user: process.env.AWS_DB_USER,  
    host: process.env.AWS_DB_HOST,  
    database: process.env.AWS_DB_NAME,  
    password: process.env.AWS_DB_PASSWORD,  
    port: Number(process.env.AWS_DB_PORT),  // Ensure port is a number  
});  

// Function to connect to PostgreSQL (if needed)  
export async function pgConnect(): Promise<void> {  
    try {  
        await pool.connect();  
        console.log("PostgreSQL Connected Successfully");  
    } catch (error) {  
        console.error("PostgreSQL Connection Failed: ", error);  
        process.exit(1);  
    }  
}
*/