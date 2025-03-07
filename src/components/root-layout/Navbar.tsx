"use client";  

import Link from 'next/link';  
import { useState } from 'react';  
import { Menu, X } from 'lucide-react';  
import { usePathname } from 'next/navigation';  
import clsx from 'clsx';  
import { Button } from '@/components/ui/button';  
import { ProfilePopover } from '@/components/profile/ProfilePopover'; 
import { useSession } from 'next-auth/react';
import Image from 'next/image';

const Navbar = () => {  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathName = usePathname();  

  const toggleMenu = () => {  
      setIsMenuOpen(!isMenuOpen);  
  };  

  const { data: session } = useSession(); 

  const userSession = session?.user;
  // console.log("Session Data in dashbosrd page: ", console);


  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 overflow-hidden px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-hidden">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-800">
                <Image 
                  src='/logo.png'
                  width={36}
                  height={36}
                  alt='CSC Logo'
                />
              </Link>
            </div>
          </div>

          <div  className="hidden justify-between sm:ml-6 sm:flex sm:space-x-8">
            <Link href="/" 
            className={clsx("inline-flex items-center px-1 pt-1 border-b-2 ",
              {'border-indigo-500': pathName === '/'})}>
              Home
            </Link>

            <Link href="/about" 
            className={clsx("inline-flex items-center px-1 pt-1 border-b-2 ",
            {'border-indigo-500': pathName === '/about'}

            )}>
              About Us
            </Link>
            <Link href="/programs" 
            className={clsx("inline-flex items-center px-1 pt-1 border-b-2 ",
            {'border-indigo-500': pathName === '/programs'}

            )}>
              Academic Programs
            </Link>
            <Link href="/admissions" 
            className={clsx("inline-flex items-center px-1 pt-1 border-b-2 ",
            {'border-indigo-500': pathName === '/admissions'}

            )}>
              Admissions
            </Link>
            <Link href="/services" 
            className={clsx("inline-flex items-center px-1 pt-1 border-b-2 ",
              {'border-indigo-500': pathName === '/services'})}>
              Services
            </Link>

            <Link href="/teachers" 
            className={clsx("inline-flex items-center px-1 pt-1 border-b-2 ",
              {'border-indigo-500': pathName === '/teachers'})}>
              Teachers
            </Link>
          </div>

          <div className="hidden justify-between sm:ml-6 sm:flex sm:space-x-8">
            {userSession ? (  
              <>  
                <Link href="/profile" 
                className={clsx("inline-flex items-center px-1 pt-1 border-b-2 ",
                  {'border-indigo-500': pathName === '/profile'})}>
                  Profile
                </Link>

                <ProfilePopover />
                    
              </>  
            ) : (  
              <div className='flex gap-2'>  
                <Link href="/signin"   
                  className={clsx("inline-flex items-center border-b-2 ", {'': pathName === '/signin'})}>  
                  <Button className=' bg-indigo-700 hover:bg-indigo-600 text-white'>Sign in</Button>  
                </Link>  
                <Link href="/signup"   
                  className={clsx("inline-flex items-center justify-center ",{'': pathName === '/signup'})}>  
                  <Button className=' bg-red-900 hover:bg-red-800 text-white'>Sign Up</Button>  
                </Link>  
              </div>  
            )}
          </div>

          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1 ">

            {userSession && (  
              <div className='flex flex-col items-center justify-center gap-'>   
                <div className=' '><ProfilePopover /></div>  
                <h4 className='font-semibold'>{userSession?.name}</h4>   
              </div>   
            )}

            <Link href="/" 
            className={clsx(
              "block pl-3 pr-4 py-2 border-l-4 text-base font-medium ",
              {'border-indigo-500 text-indigo-700 bg-indigo-50': pathName === '/'}
              )}>
              Home
            </Link>
            <Link href="/about" 
            className={clsx(
              "block pl-3 pr-4 py-2 border-l-4 text-base font-medium ",
              {'border-indigo-500 text-indigo-700 bg-indigo-50': pathName === '/about'}
              )}>
              About Us
            </Link>
            <Link href="/programs" 
            className={clsx(
              "block pl-3 pr-4 py-2 border-l-4 text-base font-medium ",
              {'border-indigo-500 text-indigo-700 bg-indigo-50': pathName === '/programs'}
              )}>
              Academic Programs
            </Link>
            <Link href="/admissions" 
            className={clsx(
              "block pl-3 pr-4 py-2 border-l-4 text-base font-medium ",
              {'border-indigo-500 text-indigo-700 bg-indigo-50': pathName === '/admissions'}
              )}>
              Admissions
            </Link>
            <Link href="/services" 
            className={clsx(
              "block pl-3 pr-4 py-2 border-l-4 text-base font-medium ",
              {'border-indigo-500 text-indigo-700 bg-indigo-50': pathName === '/services'}
              )}>
              Services
            </Link>
            <Link href="/teachers" 
            className={clsx(
              "block pl-3 pr-4 py-2 border-l-4 text-base font-medium ",
              {'border-indigo-500 text-indigo-700 bg-indigo-50': pathName === '/teachers'}
              )}>
              Teachers
            </Link>
 
            {userSession ? (  
              <>  
                <Link href="/profile" 
                className={clsx(
                  "block pl-3 pr-4 py-2 border-l-4 text-base font-medium ",
                  {'border-indigo-500 text-indigo-700 bg-indigo-50': pathName === '/profile'}
                  )}>
                  Profile
                </Link>
              </>  
            ) : (  
              <>  
                <Link href="/signin"   
                className={clsx(
                  "block pl-3 pr-4 py-2 border-l-4 text-base font-medium ",
                  {'border-indigo-500 text-indigo-700 bg-indigo-50': pathName === '/signin'}
                  )}>
                    Sign in  
                </Link>  
                <Link href="/signup"   
                className={clsx(
                  "block pl-3 pr-4 py-2 border-l-4 text-base font-medium ",
                  {'border-indigo-500 text-indigo-700 bg-indigo-50': pathName === '/signup'}
                  )}>
                  Sign Up 
                </Link>  
              </>  
            )}

          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar;

