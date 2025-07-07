import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Protected({children, authentication = true}) {
    // This component is a placeholder for the AuthLayout.
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() =>{
      // false && false;
  
      // if( authStatus === true ){
      //   navigate("/");
      // }
      // else if( authStatus === false ){
      //   navigate("/login");
      // }

        if(authentication && authStatus !== authentication){
            navigate("/login");
        }
        else if(!authentication && authStatus !== authentication){
            navigate("/");
        }
        setLoader(false);
    },[authStatus, navigate, authentication])
  return (
    <>{children}</>
  )
}

