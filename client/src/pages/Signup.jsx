import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import  { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function Signup() {
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.username || !formData.email || !formData.password) {
            return setErrorMessage('Please fill out all fields.');
        }

        try {
            setLoading(true);
            setErrorMessage(null);
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Corrected Content-Type
                },
                body: JSON.stringify(formData)
            });

            if (!res.ok) {
                throw new Error('Signup failed, please try again.');
            }
            if (res.ok) {
                navigate('/signin');
            }

            const data = await res.json();
            console.log(data)
            if (data.success === false) {
                return setErrorMessage(data.message);
            }

            // Handle successful signup (e.g., navigate to a different page or clear form)
            // ...
            setLoading(false);

        } catch (error) {
            setErrorMessage(error.message);
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen mt-20'>
            <div className='flex p-4 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
                <div className='flex-1'>
                    <Link to='/' className='font-bold dark:text-white text-4xl'>
                        <span className='px-2 pt-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                            Daily
                        </span> Blog
                    </Link>
                    <p className='text-sm mt-5'>
                        This is a demo project on Blog application. You can sign up with your email and password, or with Google.
                    </p>
                </div>
                <div className='flex-1'>
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div>
                            <Label value='Your Username' />
                            <TextInput type='text' placeholder='Username' id='username' onChange={handleChange} />
                        </div>
                        <div>
                            <Label value='Your Email' />
                            <TextInput type='text' placeholder='Email' id='email' onChange={handleChange} />
                        </div>
                        <div>
                            <Label value='Your Password' />
                            <TextInput type='password' placeholder='Password' id='password' onChange={handleChange} />
                        </div>
                        <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
                            {
                                loading ? (
                                    <>
                                        <Spinner size='sm' />
                                        <span className='pl-3'>Loading...</span>
                                    </>
                                ) : 'Sign Up'
                            }
                        </Button>
                        <OAuth />
                    </form>
                    <div className='flex gap-2 text-sm mt-5'>
                        <span>Have an account?</span>
                        <Link to='/signin' className='text-blue-500'>
                            Sign In
                        </Link>
                    </div>
                    {
                        errorMessage && (
                            <Alert className='mt-5' color='failure'>
                                {errorMessage}
                            </Alert>
                        )
                    }
                </div>
            </div>
        </div>
    );
}
