import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {BsHandThumbsUp} from 'react-icons/bs';
import {BsHandThumbsUpFill} from 'react-icons/bs';


function Games(){

    const [gamesDB, setGamesDB] = useState([])
    const [likedGame, setLikedGame] = useState(false)
    const [platformState, setPlatformState] = useState("")
    const [genreState, setGenreState] = useState("")
    const [yearState, setYearState] = useState("")
    const [searchBarDB, setSearchBarDB] = useState([])



    console.log("genreState", genreState)
    console.log("platformstate", platformState)
    console.log("yearState", yearState)

    useEffect(()=>{

        fetch('https://api.rawg.io/api/games?key=9937c17ee7f344e0a27e3d66c7b454e3')
        .then(r=>r.json())
        .then(data=> { setGamesDB(data.results)
            setSearchBarDB(data.results)

        })
        
    },[])

        // useEffect(()=>{
        //     if (genreState){
        //         const filteredGames = gamesDB.filter(genreState === )
        //         setFilteredGames(filteredGames)}
        //   )  }
        
            


        // },[])

    console.log("GAMES LIST:", gamesDB)
    console.log("search bar db", searchBarDB)


    const [allBands, setAllBands] = useState([])
    const [bandSearchBar, setBandSearchBar] = useState([])
    const [followBand, setFollowBand] = useState(false)
    
    function handleingtheSearch(thethingsItypeintotheSearchBar){
      let resultofSearch= searchBarDB.filter((game)=> {
        if(game.name.toLowerCase().includes(thethingsItypeintotheSearchBar.toLowerCase())){
          return game
        }
      })
      setGamesDB(resultofSearch)
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
        <h1 className="page-title">
            <br></br>
            <br></br>
            <br></br>
            Games
        </h1>
            <br></br>
            <br></br>
            <div className="games-banner">
                <ul className="page-navbar">
                    <li className="dropdown">
                        <a href="javascript:void(0)" class="dropbtn">Platform &#9660;</a>
                        <div className="dropdown-content">
                            <a onClick={()=>setPlatformState("")} href="#">All</a> 
                            <a onClick={()=>setPlatformState("PlayStation")} href="#">PlayStation</a> 
                            <a onClick={()=>setPlatformState("Xbox")} href="#">Xbox</a> 
                            <a onClick={()=>setPlatformState("PC")} href="#">PC</a> 
                            <a onClick={()=>setPlatformState("Nintendo")} href="#">Nintendo</a> 
                        </div>
                    </li>
                    <li className="dropdown">
                        <a href="javascript:void(0)" className="dropbtn">Genre &#9660;</a>
                        <div className="dropdown-content">
                            <a onClick={()=>setGenreState("")} href="#">All</a> 
                            <a onClick={()=>setGenreState("Action")} href="#">Action</a> 
                            <a onClick={()=>setGenreState("Adventure")} href="#">Adventure</a> 
                            <a onClick={()=>setGenreState("Indie")} href="#">Indie</a> 
                            <a onClick={()=>setGenreState("Massively Multiplayer")} href="#">MMO</a> 
                            <a onClick={()=>setGenreState("RPG")} href="#">RPG</a> 
                            <a onClick={()=>setGenreState("Shooter")} href="#">Shooter</a> 
                            <a onClick={()=>setGenreState("Puzzle")} href="#">Puzzle</a> 
                        </div>
                    </li>
                    <li className="dropdown">
                        <a href="javascript:void(0)" className="dropbtn">Rating &#9660;</a>
                        <div className="dropdown-content">
                            <a href="#">High to Low</a> 
                            <a href="#">Low to High</a> 
                            <a href="#">Popular</a> 
                        </div>
                    </li>
                    <li className="dropdown">
                        <a href="javascript:void(0)" className="dropbtn">Year &#9660;</a>
                        <div className="dropdown-content">
                            <a onClick={()=>setYearState("2023")} href="#">2023</a> 
                            <a onClick={()=>setYearState("2022")} href="#">2022</a> 
                            <a onClick={()=>setYearState("2021")} href="#">2021</a> 
                            <a onClick={()=>setYearState("2020")} href="#">2020</a> 
                            <a onClick={()=>setYearState("2019")} href="#">2019</a> 
                            <a onClick={()=>setYearState("2018")} href="#">2018</a> 
                            <a onClick={()=>setYearState("2017")} href="#">2017</a> 
                            <a onClick={()=>setYearState("2016")} href="#">2016</a> 
                            <a onClick={()=>setYearState("2015")} href="#">2015</a> 
                            <a onClick={()=>setYearState("2014")} href="#">2014</a> 
                            <a onClick={()=>setYearState("2013")} href="#">2013</a> 
                            <a onClick={()=>setYearState("2012")} href="#">2012</a> 
                            <a onClick={()=>setYearState("2011")} href="#">2011</a> 
                            <a onClick={()=>setYearState("2010")} href="#">2010</a> 
                        </div>
                    </li>
                   
            </ul>
                    <div className="search-right"><input type="text" className="search" placeholder="Search Games..."
                    onChange={(synthEvent)=> handleingtheSearch(synthEvent.target.value)}/></div>
    
            </div>
            <br></br>
            <br></br>
            {platformState || genreState ?
            
            <h2>{platformState}:{genreState}</h2>
            : null}
            <div className="games-grid">
                {gamesDB.map(eachGame=>{
                    // return(
                    //     <div>
                    //         <h5>{eachGame.name}</h5>
                    //         <img className="platform-image" src={eachGame.background_image}></img>
                    //         <button onClick={()=>viewGame(eachGame.slug)}>View</button>
                    //     </div>
                    //                 )
                    if (platformState === ""){
                        return(
                            <div className="card">
                                <h5>{eachGame.name}</h5>
                                <img className="platform-image" src={eachGame.background_image}></img>
                                <button className="game-and-platform-page-buttons" onClick={()=>viewGame(eachGame.slug)}>View</button>
                            </div>
                            )
                    } else{
                    return(
                    eachGame.parent_platforms.map(eachPlatform=>{
                        if (eachPlatform.platform.name === platformState)
                        return(
                        eachGame.genres.map(eachGenre=>{
                            if (eachGenre.name === genreState || genreState === "")
                            return(
                            <div>
                                <h6>{eachGame.name}</h6>
                                <img className="platform-image" src={eachGame.background_image}></img>
                                <button className="game-and-platform-page-buttons" onClick={()=>viewGame(eachGame.slug)}>View</button>
                            </div>
                            )
                    })
                    )
                    }) 
                 
                    )}
                })}
            </div>
        </div>
    )
}

export default Games;