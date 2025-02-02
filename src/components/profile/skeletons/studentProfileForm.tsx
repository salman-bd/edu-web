'use client'  

import React from 'react';  
import { Skeleton } from "@/components/ui/skeleton"; // Assuming you have a Skeleton component for loading effect  
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";  

const StudentProfileSkeleton = () => {  
  return (  
    <div className='flex justify-center items-center bg-gray-100'>  
      <div className='w-full p-8 space-y-8 bg-white rounded-lg shadow-md'>  
        <Card className="w-full">  
          <CardHeader>  
            <Skeleton className="h-6 w-1/2" />  
            <CardDescription>  
              <Skeleton className="h-4 w-4/5" />  
            </CardDescription>  
          </CardHeader>  
          <CardContent>  
            <div className="space-y-8">  
              <Skeleton className="h-10 w-full" /> {/* Avatar Upload Skeleton */}  
              <Skeleton className="h-10 w-full" /> {/* Institution Name Skeleton */}  
              <Skeleton className="h-10 w-full" /> {/* Full Name Skeleton */}  
              <Skeleton className="h-10 w-full" /> {/* Grade Selector Skeleton */}  
              <Skeleton className="h-10 w-full" /> {/* Email Skeleton */}  
              <Skeleton className="h-10 w-full" /> {/* Contact Number Skeleton */}  
              <Skeleton className="h-10 w-full" /> {/* Date of Birth Skeleton */}  
              <Skeleton className="h-10 w-full" /> {/* Gender Selector Skeleton */}  
              <Skeleton className="h-10 w-full" /> {/* Achievements Skeleton */}  
              <Skeleton className="h-10 w-1/4" /> {/* Submit Button Skeleton */}  
            </div>  
          </CardContent>  
        </Card>  
      </div>  
    </div>  
  );  
};  

export default StudentProfileSkeleton;