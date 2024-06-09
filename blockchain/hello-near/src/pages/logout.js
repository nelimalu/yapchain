import { useState, useContext } from 'react';
import { NearContext } from '@/context';
import { useRouter } from 'next/router';

export default function Logout() {
    const { signedAccountId, wallet } = useContext(NearContext);
    const [counter, setCounter] = useState(5);
    const router = useRouter()
    const handleLogout = () => {
        if (wallet) {
            wallet.signOut();
            
        }
    };

    return (
        <div style={{height: "100vh"}} className="w-full flex justify-center items-center">
            <button onClick={handleLogout} className='btn pixel' style={{"padding": "24px 38px"}}>
            {signedAccountId ? `Logout ${signedAccountId}` : 'Succesfully Logged Out, redirecting you in `${counter}` seconds'}
            </button>
        </div>
        
    );
}
