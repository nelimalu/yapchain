import Image from 'next/image';

import NearLogo from '/public/near.svg';
import NextLogo from '/public/next.svg';
//import '../styles/login.css';/
import { Cards } from '@/components/cards';
import Button from '../components/button.js'
export default function Home() {
  return (
    <>
      <div style={{height: "100vh"}} className="w-full flex justify-center items-center">
        <div className='login flex flex-col'>
          <div style={{"marginBottom": "32px"}} className="flex items-center justify-center w-full"><h1 className='text-5xl font-bold text-white'>YapChain</h1></div>
            <Button />
        </div>
      </div>
    </>
  );
}