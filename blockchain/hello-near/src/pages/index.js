import Image from 'next/image';

import NearLogo from '/public/near.svg';
import NextLogo from '/public/next.svg';
//import '../styles/login.css';/
import { Cards } from '@/components/cards';

export default function Home() {
  return (
    <>
      <div style={{height: "100vh"}} className="w-full flex justify-center items-center">
        <div className='login flex flex-col gap-4'>
          <div className="flex items-center justify-center w-full mb-2"><h1 className='text-5xl font-bold text-white'>YapChain</h1></div>
            {/*
            <input name='username' className="px-2 py-1 pixel-corners"placeholder='username'/>
            <input name='password' className="px-2 py-1 pixel-corners"placeholder='password'/>

            <div className='submit flex justify-center items-center'><p className='font-bold'>Go!</p></div>
            */}
          </div>
        </div>
       {/*<div className={w-full h-full z-10 bg-white} ></div>*/}
    </>
  );
}