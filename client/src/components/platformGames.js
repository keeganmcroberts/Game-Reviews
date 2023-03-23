import {useNavigate, useParams} from 'react-router-dom';


function Platforms({gamesDB}){

    const params = useParams()
    const {id} = params

    console.log(id)
    console.log("games DB from App.js", gamesDB)
    return(
        <div>
            <br></br>
            <br></br>
            <br></br>
        <h1>Platforms: {id}</h1>
            <br></br>
            <br></br>
            <br></br>
        {gamesDB.results ? 
        <div className='games-grid'>
        {gamesDB.results.map(eachGame=>{
            if (eachGame.platforms.some(platform=>{
                return platform.platform.slug === id
            }) ){
                return(
                    <div>
                        <h2>{eachGame.name}</h2>
                        <img className='game-image' src={eachGame.background_image}></img>
                    </div>
                )
            }
        })}

        </div>
        : null}
        </div>
    )
}

export default Platforms;