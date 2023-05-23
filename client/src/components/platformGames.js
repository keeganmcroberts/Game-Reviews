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
            <h1 className="page-title">
            <br></br>
            <br></br>
            <br></br>
            {id} games
        </h1>
            <br></br>
            <br></br>
            <div className="games-banner">
                <ul className="page-navbar">
                    <li className="dropdown">
                      
                       
                    </li>
                    <li className="dropdown">
                       
                       
                    </li>
                    <li className="dropdown">
                       
                    </li>
                    <li className="dropdown">
                        
                     
                    </li>
                   
            </ul>
                    <div className="search-right"><input type="text" className="search" placeholder="Search Games..."/></div>
    
            </div>
        {gamesDB.results ? 
        <div className='platformGames-grid'>
        {gamesDB.results.map(eachGame=>{
            if (eachGame.platforms.some(platform=>{
                return platform.platform.slug === id
            }) ){
                return(
                    <div className='card'>
                        <h5>{eachGame.name}</h5>
                        <img className='platform-image' src={eachGame.background_image}></img>
                        <button className='game-and-platform-page-buttons' onClick={()=>viewGame(eachGame.slug)}>View</button>
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