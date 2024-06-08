import 'react'
import { useState } from 'react'
import '../assets/login.css'

export default function Login() {
    const [isTransition, setIsTransition] = useState(null)
    const clicked = () => {
        console.log("sadhiasddasikadsijoadsnhjkosdfjohi")
        setIsTransition("transition-page")
    }
    return (
        <>
            <div style={{height: "100vh"}} className="w-full flex justify-center items-center">
                <div className='login min-w-96 min-h-96 px-8 pt-8 flex flex-col gap-4'>
                    <div className="flex items-center justify-center w-full mb-2">
                        <h1 className='text-5xl font-bold text-white'>YapChain</h1>
                    </div>
                    
                    <input name='username' className="px-2 py-1 pixel-corners"placeholder='username'/>
                    <input name='password' className="px-2 py-1 pixel-corners"placeholder='password'/>
                    
                    <div className='submit flex justify-center items-center' onClick={clicked}>
                        <p className='font-bold'>Go!</p>
                    </div>
                </div>
            </div>
            {/*<div className={`w-full h-full z-10 bg-white ${isTransition}`} ></div>*/}
        </>
    )
}