// components/TeacherProfileSkeleton.js  
import React from 'react';  
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";  
import { Skeleton } from "@/components/ui/skeleton";  

const TeacherProfileSkeleton = () => {  
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
              <Skeleton className="h-10 w-full" /> {/* Email Skeleton */}  
              <Skeleton className="h-10 w-full" /> {/* Contact Number Skeleton */}  
              <Skeleton className="h-10 w-full" /> {/* High School Skeleton */}  
              <Skeleton className="h-10 w-full" /> {/* SSC Passing Year Skeleton */}  
              <Skeleton className="h-10 w-full" /> {/* College Skeleton */}  
              <Skeleton className="h-10 w-full" /> {/* HSC Passing Year Skeleton */}  
              <Skeleton className="h-10 w-full" /> {/* University Skeleton */}  
              <Skeleton className="h-10 w-full" /> {/* Graduation Year Skeleton */}  
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

export default TeacherProfileSkeleton;