import { useEffect, useState } from "react";

function UserProfile({user}){


const [gamesDB, setGamesDB] = useState([])
const [viewGame, setViewGames] = useState(true)
const [viewReviews, setViewReviews] = useState(false)
const [viewFriends, setViewFriends] = useState(false)

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

console.log("profile page user", user.user_games)


useEffect(()=>{

    fetch('https://api.rawg.io/api/games?key=9937c17ee7f344e0a27e3d66c7b454e3')
    .then(r=>r.json())
    .then(data=>{
        data.results.map(eachGame=>{
            if (eachGame.slug === user.user_games.map(eachLikedGame=>{
                return eachLikedGame.slug
            })){
                console.log( "need this game", eachGame )
            }
        })
    })
        
    
},[])

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
                        <h4 onClick={viewGameList}  href="javascript:void(0)" class="dropbtn">My Games &#9660;</h4>
                    </li>
                    <li class="dropdown">
                        <h4 onClick={viewReviewsList} href="javascript:void(0)" class="dropbtn">My Reviews &#9660;</h4>
                    </li>
                    <li class="dropdown">
                        <h4  onClick={viewFriendsList} href="javascript:void(0)" class="dropbtn">My Friends &#9660;</h4>
                    </li>
                   
            </ul>
                    <div className="search-right"><input type="text" className="search" placeholder="Search Games..."
                    /></div>
    
            </div>
            {viewGame ? 

            <div className="profile-games-list">
                <h4>Games</h4>
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