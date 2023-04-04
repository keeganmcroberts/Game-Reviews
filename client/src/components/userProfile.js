import { useEffect, useState } from "react";

function UserProfile({user}){


const [gamesDB, setGamesDB] = useState([])
const [viewGame, setViewGames] = useState(true)
const [viewReviews, setViewReviews] = useState(false)
const [viewFriends, setViewFriends] = useState(false)
const [allGames, setAllGames] = useState([])
// const [myGames, setMyGames] = useState([])

function viewGameList(){
    setViewReviews(false)
    setViewFriends(false)
    setViewGames(true)
}

function viewReviewsList(){
    setViewGames(false)
    setViewFriends(false)
    setViewReviews(true)
}

function viewFriendsList(){
    setViewGames(false)
    setViewReviews(false)
    setViewFriends(true)
}



    const myGames = user.user_games
    console.log("MY GAMES", myGames)




useEffect(()=>{

    fetch('https://api.rawg.io/api/games?key=9937c17ee7f344e0a27e3d66c7b454e3')
    .then(r=>r.json())
    .then(data=> setAllGames(data.results))
},[])

console.log("ALL GAMES:", allGames)

// {parkData.map(eachPark=>{
//     if (user)
//      return(
//          parksArray.map(myParks=>{
//          if (user.id === myParks.user_id && eachPark.parkCode === myParks.parkCode)
//              return(
//              <div className='home--park-card'>
//                  <h4 className='card-title'>{eachPark.fullName}</h4>
//                  <img className='homepage-images' src={eachPark.images[0].url}></img>
//                  <button className="info-button" onClick={() => viewPark(eachPark.parkCode)}>More info</button>
//                  <button onClick={()=>deletePark(myParks.id)}  className='info-button'>Unfollow</button>
//              </div>
//              )

//          })
//      )
//  })}
//  </div>

console.log(gamesDB)



    return(
        <div>
        <h1> 
            <br></br>
            <br></br>
            <br></br>
            <br></br>
             </h1>
            <h4>hello {user?.first_name}</h4>
            <div className="games-banner">
                <ul className="page-navbar">
                    <li class="dropdown">
                        <h4 onClick={viewGameList}  href="javascript:void(0)" className="profile-banner-links">My Games &#9660;</h4>
                    </li>
                    <li class="dropdown">
                        <h4 onClick={viewReviewsList} href="javascript:void(0)" className="profile-banner-links">My Reviews &#9660;</h4>
                    </li>
                    <li class="dropdown">
                        <h4  onClick={viewFriendsList} href="javascript:void(0)" className="profile-banner-links">My Friends &#9660;</h4>
                    </li>
                   
            </ul>
                    <div className="search-right"><input type="text" className="search" placeholder="Search Games..."
                    /></div>
    
            </div>



            {viewGame ? 

            <div className="profile-games-list">
                <h4>Games</h4>
                {allGames.map(eachGame=>{
                    if (user)
                    return(
                        myGames.map(myGames=>{
                            if (user.id === myGames.user_id && eachGame.slug === myGames.slug)
                            return(
                                <div>
                                    <h4>{eachGame.name}</h4>
                                    <img className="platform-image" src={eachGame.background_image}></img>
                                </div>
                                    )
                         })
                    )
                })}
               
            </div>
            
            : null}
           
            {viewReviews ? 
            
            <div className="profile-reviews-list">
                <h4>Reviews</h4>
            </div>
            
            : null}
            
            {viewFriends ? 
            
            <div className="profile-friends-list">
                <h4>Friends</h4>
            </div>
            
            : null}
        </div>
    )
}

export default UserProfile;