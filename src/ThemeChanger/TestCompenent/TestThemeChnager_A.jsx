import { useContext, useEffect, useState } from "react";
import ThemeContext from "../ThemeContext";

function TestThemeChnager_A() {
   const {dark , setDark} = useContext(ThemeContext);
   const [color, setcolor] = useState("no color"); 

useEffect(() => {
    if(dark){
      setcolor("dark");
    } else {
      setcolor("light");
    }
  }, [dark]);

   return(
     <div style={{
        minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s'
     }}>
        <button
        onClick={()=> setDark(d => !d)} 
        style={{
           background: dark ? '#f00' : '#aff',
            color: dark ? '#fff' : '#f00',
            margin:'100px',
            fontFamily:'Consolas',
            fontSize:'2rem',
            padding: '40px'
        }}>
            On External componet click changing theme : {color}
        </button>
     </div>        
    )
}

export default TestThemeChnager_A;