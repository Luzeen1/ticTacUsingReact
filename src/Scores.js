import React from 'react';



export default ({i,round,p1,p2})=>{
  return(
        <tr key={i}>
           <td>{round}</td>
           <td>{p1}</td>
           <td>{p2}</td>
        </tr>
    
  )
};

