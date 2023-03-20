import { useEffect } from "react";

function Games(){

useEffect(()=>{

    fetch('https://api.rawg.io/api/games?key=9937c17ee7f344e0a27e3d66c7b454e3')
    .then(r=>r.json())
    .then(data=>console.log(data))
    
},[])


    return(
        <h1>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            Games</h1>
    )
}

export default Games;