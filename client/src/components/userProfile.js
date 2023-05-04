import { useEffect, useState } from "react";
import {useNavigate, useParams} from 'react-router-dom';
import {GrGamepad} from 'react-icons/gr';


function UserProfile({user}){


const [gamesDB, setGamesDB] = useState([])
const [viewGame, setViewGames] = useState(true)
const [viewReviews, setViewReviews] = useState(false)
const [viewFriends, setViewFriends] = useState(false)
const [allGames, setAllGames] = useState([])
const [reviewList, setReviewList] = useState([])
const [difficultyScoreColor, setDifficultyColor] = useState('green')
const [difficultyScore, setDifficultyScore] = useState(10)
const [gameplayScoreColor, setGameplayColor] = useState('green')
const [gameplayScore, setGameplayScore] = useState(10)
const [graphicsScoreColor, setGraphicsColor] = useState('green')
const [graphicsScore, setGraphicsScore] = useState(10)
const [scoreColor, setScoreColor] = useState('green')
const [score, setScore] = useState(10)


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

let navigate = useNavigate()
function viewProfile(firstname, lastname){
  navigate(`/profile/${firstname}-${lastname}`)
}



    const myGames = user.user_games



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


console.log(user)

    return(
        <div>
        <h1 className="page-title">
            <br></br>
            <br></br>
            <br></br>
            Hi {user?.first_name}!
        </h1>
            <br></br>
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
                <h4>My Reviews</h4>
                <br></br>
                <div className="reviews-grid">
                <br></br>
                {allGames.map(eachGame=>{
                    if (user){
                        return(
                            reviewList.map(eachReview=>{
                                if (user.id === eachReview.user_id && eachGame.slug === eachReview.slug)
                                return(
                                    <div className='profile-review-card'>
                                        <img className='review-image' src={eachGame.background_image}></img>
                                        <h4>{eachGame.name}</h4>
                                        <div className='review-ratings'>
                                            <h6 className="review-category">Difficulty:</h6>
                                            {eachReview.difficulty >= 8 ?
                                                <h6 className="score" style={{color:"green"}}>{eachReview.difficulty}</h6>
                                            : eachReview.difficulty < 8 && eachReview.difficulty >= 4 ? 
                                                <h6 className="score" style={{color:"orange"}}>{eachReview.difficulty}</h6> 
                                            : 
                                                <h6 className="score" style={{color:"red"}}>{eachReview.difficulty}</h6>}

                                            <h6 className="review-category">Gameplay:</h6>
                                            {eachReview.gameplay >= 8 ?
                                                <h6 className="score" style={{color:"green"}}>{eachReview.gameplay}</h6>
                                            : eachReview.gameplay < 8 && eachReview.gameplay >= 4 ? 
                                                <h6 className="score" style={{color:"orange"}}>{eachReview.gameplay}</h6> 
                                            : 
                                                <h6 className="score" style={{color:"red"}}>{eachReview.gameplay}</h6>}

                                            <h6 className="review-category">Graphics:</h6>
                                            {eachReview.graphics >= 8 ?
                                                <h6 className="score" style={{color:"green"}}>{eachReview.graphics}</h6>
                                            : eachReview.graphics < 8 && eachReview.graphics >= 4 ? 
                                                <h6 className="score" style={{color:"orange"}}>{eachReview.graphics}</h6> 
                                            : 
                                                <h6 className="score" style={{color:"red"}}>{eachReview.graphics}</h6>}

                                            <h6 className="review-category">Review:</h6>
                                            <h6 className="score">{eachReview.comment}</h6>

                                            <h6 className="review-category">Score:</h6>
                                            {eachReview.score >= 8 ?
                                                <h6 className="score" style={{color:"green"}}>{eachReview.score}</h6>
                                            : eachReview.score < 8 && eachReview.score >= 4 ? 
                                                <h6 className="score" style={{color:"orange"}}>{eachReview.score}</h6> 
                                            : 
                                                <h6 className="score" style={{color:"red"}}>{eachReview.score}</h6>}
                                        </div>
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
            
            <div className="profile-friends-list-body">
                <h4>My Friends</h4>
                {user.friendlist.map(eachFriend=>{
                    return(
                    <div className="users-list">
                        <h4>{eachFriend.first_name} {eachFriend.last_name} <GrGamepad onClick={()=>{viewProfile(eachFriend.first_name, eachFriend.last_name)}} className='view-user-icon' cursor='pointer' size="20" color="red"/></h4>
                    </div>
                    )
                })}
            </div>
            
            : null}
        </div>
    )
}

export default UserProfile;