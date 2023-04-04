import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {BsHandThumbsUp} from 'react-icons/bs';
import {BsHandThumbsUpFill} from 'react-icons/bs';


function Games(){

    const [likedGame, setLikedGame] = useState(false)
    const [gamesDB, setGamesDB] = useState([])

    useEffect(()=>{

        fetch('https://api.rawg.io/api/games?key=9937c17ee7f344e0a27e3d66c7b454e3')
        .then(r=>r.json())
        .then(data=>setGamesDB(data.results))
        
    },[])

    console.log("GAMES LIST:", gamesDB)


    const [allBands, setAllBands] = useState([])
    const [bandSearchBar, setBandSearchBar] = useState([])
    const [followBand, setFollowBand] = useState(false)
    
    function handleingtheSearch(thethingsItypeintotheSearchBar){
      let resultofSearch= bandSearchBar.filter((whatItype)=> {
        if(whatItype.name.toLowerCase().includes(thethingsItypeintotheSearchBar.toLowerCase())){
          return whatItype
        }
      })
      setAllBands(resultofSearch)
    }

    let navigate = useNavigate();
    function viewGame(id){
        navigate(`/game/${id}`)
    }

    function likeGame(){
        setLikedGame(!likedGame)
    }



if (gamesDB)
    return (
        <div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className="games-banner">
                <ul className="page-navbar">
                    <li class="dropdown">
                        <a href="javascript:void(0)" class="dropbtn">Platform &#9660;</a>
                        <div class="dropdown-content">
                            <a href="#">Playstation</a> 
                            <a href="#">Xbox</a> 
                            <a href="#">PC</a> 
                            <a href="#">Nintendo</a> 
                        </div>
                    </li>
                    <li class="dropdown">
                        <a href="javascript:void(0)" class="dropbtn">Genre &#9660;</a>
                        <div class="dropdown-content">
                            <a href="#">Action</a> 
                            <a href="#">Adventure</a> 
                            <a href="#">Indie</a> 
                            <a href="#">MMO</a> 
                            <a href="#">RPG</a> 
                            <a href="#">Shooter</a> 
                            <a href="#">Puzzle</a> 
                        </div>
                    </li>
                    <li class="dropdown">
                        <a href="javascript:void(0)" class="dropbtn">Rating &#9660;</a>
                        <div class="dropdown-content">
                            <a href="#">High to Low</a> 
                            <a href="#">Low to High</a> 
                            <a href="#">Popular</a> 
                        </div>
                    </li>
                    <li class="dropdown">
                        <a href="javascript:void(0)" class="dropbtn">Year &#9660;</a>
                        <div class="dropdown-content">
                            <a href="#">2023</a> 
                            <a href="#">2022</a> 
                            <a href="#">2021</a> 
                            <a href="#">2020</a> 
                            <a href="#">2019</a> 
                            <a href="#">2018</a> 
                            <a href="#">2017</a> 
                            <a href="#">2016</a> 
                            <a href="#">2016</a> 
                            <a href="#">2016</a> 
                            <a href="#">2015</a> 
                            <a href="#">2014</a> 
                            <a href="#">2013</a> 
                            <a href="#">2012</a> 
                            <a href="#">2011</a> 
                            <a href="#">2010</a> 
                        </div>
                    </li>
                   
            </ul>
                    <div className="search-right"><input type="text" className="search" placeholder="Search Games..."
                    onChange={(synthEvent)=> handleingtheSearch(synthEvent.target.value)}/></div>
    
            </div>
            <br></br>
            <br></br>
            <div className="games-grid">
                {gamesDB.map(eachGame=>{
                    return(
                        <div >
                            <h6>{eachGame.name}</h6>
                            <img className="platform-image" src={eachGame.background_image}></img>
                            <button onClick={()=>viewGame(eachGame.slug)}>View</button>
                            {likedGame 
                            ? 
                            <button onClick={likeGame}>{<BsHandThumbsUpFill/>}</button>
                            : 
                            <button onClick={likeGame}>{<BsHandThumbsUp/>}</button>
                            }
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Games;