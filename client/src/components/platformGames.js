import {useNavigate, useParams} from 'react-router-dom';


function Platforms({gamesDB}){

    const params = useParams()
    const {id} = params

    console.log(id)
    console.log("games DB from App.js", gamesDB)

    let navigate = useNavigate();
    function viewGame(id){
        navigate(`/game/${id}`)
    }




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
        <div className='platformGames-grid'>
        {gamesDB.results.map(eachGame=>{
            if (eachGame.platforms.some(platform=>{
                return platform.platform.slug === id
            }) ){
                return(
                    <div>
                        <h5>{eachGame.name}</h5>
                        <img className='game-image' src={eachGame.background_image}></img>
                        <button onClick={()=>viewGame(eachGame.slug)}>View</button>
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