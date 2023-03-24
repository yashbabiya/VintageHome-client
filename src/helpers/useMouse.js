import { useEffect, useState } from 'react'

export default function useMouse() {


    const [state, setstate] = useState({
        x:null,
        y:null
    });

    
    useEffect(() => {

        const handle = (e) =>{
            setstate({
                x:e.pageX,
                y:e.pageY
            })
        }
        document.addEventListener("mousemove",handle);
        
        return () => {
            document.removeEventListener("mousemove",handle);
        };
    });
  return state
}