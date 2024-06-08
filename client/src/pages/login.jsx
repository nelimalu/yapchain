import 'react'
import '../assets/login.css'

export default function Login() {
    return (
        <>
            <div className='login min-w-96 min-h-96 px-8 pt-8 flex flex-col gap-4'>
                <div className="flex items-center justify-center w-full mb-2"><h1 className='text-5xl font-bold'>YapChain</h1></div>
                
                <input name='username' className="px-2 py-1 pixel-corners"placeholder='username'/>
                <input name='password' className="px-2 py-1 pixel-corners"placeholder='password'/>
                
                <div className='submit flex justify-center items-center'><p className='font-bold'>Go!</p></div>
            </div>
        </>
    )
}