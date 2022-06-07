import React from 'react';


export default function Loading ({setLoading}){

const title = {
    color: "white",
    fontSize: "60px"
}

const img = {
    width: "150px",
    height: "150px"
}


 return(
     <div>
             <p style={title}>LOADING...</p>
             <img src='https://www.gifsanimados.org/data/media/1667/bola-del-mundo-imagen-animada-0003.gif' alt='' style={img}/>
     </div>
 )
}