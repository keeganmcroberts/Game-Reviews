import { useEffect, useState } from "react";

function UserProfile({user}){


const [gamesDB, setGamesDB] = useState([])
const [viewGame, setViewGames] = useState(true)
const [viewReviews, setViewReviews] = useState(false)
const [viewFriends, setViewFriends] = useState(false)
const [allGames, setAllGames] = useState([])
const [reviewList, setReviewList] = useState([])


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
    console.log("all games", allGames)



// fetching from game API to compare our User's games with the games from the DB
useEffect(()=>{

    fetch('https://api.rawg.io/api/games?key=9937c17ee7f344e0a27e3d66c7b454e3')
    .then(r=>r.json())
    .then(data=> setAllGames(data.results))
},[])

// get request to backend server to view all reviews and compare which ones are from our user 
useEffect(()=>{
    fetch('/reviewsList')
    .then(r=>r.json())
    .then(data=> setReviewList( data))
},[])

console.log("reviewslist", reviewList)




    return(
        <div>
        <h1> 
            <br></br>
            <br></br>
            <br></br>
            <br></br>
             </h1>
            <h3>hello {user?.first_name}{user?.last_name}!</h3>
            <br></br>
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
                <h4>My Games</h4>
                <br></br>
                <div className='games-grid'>
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
            </div>
            
            : null}
           
            {viewReviews ? 
            
            <div className="profile-reviews-list">
                <h4>Reviews</h4>
                <div className="games-grid">
                <br></br>
                {allGames.map(eachGame=>{
                    if (user){
                        return(
                            reviewList.map(eachReview=>{
                                if (user.id === eachReview.user_id && eachGame.slug === eachReview.slug)
                                return(
                                    <div>
                                        <h4>{eachGame.name}</h4>
                                        <img className='platform-image' src={eachGame.background_image}></img>
                                        <h6>Difficulty:</h6>
                                        <h6>{eachReview.difficulty}</h6>
                                        <h6>Gameplay:</h6>
                                        <h6>{eachReview.gameplay}</h6>
                                        <h6>Graphics:</h6>
                                        <h6>{eachReview.graphics}</h6>
                                        <h6>Review:</h6>
                                        <h6>{eachReview.comment}</h6>
                                    </div>
                                )
                            })
                        )
                    }
                })}
                </div>
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