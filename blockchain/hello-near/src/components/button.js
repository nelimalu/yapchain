//button.js
import Link from 'next/link';
import { useEffect, useState, useContext } from 'react';

import { NearContext } from '@/context';
import { useRouter } from 'next/router';

export default function Button() {
    const { signedAccountId, wallet } = useContext(NearContext);
    const [action, setAction] = useState(() => { });
    const [label, setLabel] = useState('Loading...');
    const [isLoggedOut, setIsLoggedOut] = useState(true)
    const router = useRouter()

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    useEffect(() => {
      if (!wallet) return;
      
      if (signedAccountId) {
        setIsLoggedOut(false)
        setLabel(`Logged in as ${signedAccountId}`);
        console.log('Hello');
        sleep(2000).then(() => { router.push("/yapper") });
        
        
      } else {
        
        setAction(() => wallet.signIn);
        setLabel('Login');
      }
    }, [signedAccountId, wallet]);
    return (
        <div className='navbar-nav pt-1' style={{"display": "flex", "align-items": "center", "justify-content": "center", "textAlign": "center", "min-width": "256px"}}>
          {isLoggedOut ?
            <button className="btn full pixel-corners" onClick={action} > {label} </button> :<p style={{"maxWidth": "312px", "fontSize": "14px", "width": "100%"}}>You are logged in as  <u>{signedAccountId}.</u> Please wait while we transport you</p>
          }
        </div>
    )
}