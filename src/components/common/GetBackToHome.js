import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Home from '../home/Home';

const GetBackToHome = ({error}) => {
    const navigate = useNavigate();
    
    useEffect(() => {
        navigate('/');
    }, [navigate]);

    return (
        <>            
            <Home error={error} />
        </>
    );
};

export default GetBackToHome;
