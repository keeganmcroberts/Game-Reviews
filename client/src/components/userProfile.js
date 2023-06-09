import { useEffect, useState } from "react";
import {useNavigate, useParams} from 'react-router-dom';
import {GrGamepad} from 'react-icons/gr';
import {BsTrash} from 'react-icons/bs'

import {RxAvatar} from 'react-icons/rx'

function UserProfile({user}){

    console.log(user)


const [gamesDB, setGamesDB] = useState([])
const [viewGame, setViewGames] = useState(true)
const [viewReviews, setViewReviews] = useState(false)
const [viewFriends, setViewFriends] = useState(false)
const [allGames, setAllGames] = useState([])
const [reviewList, setReviewList] = useState([])
const [myGames, setMyGames] = useState([])
const [gameSearchBar, setGameSearchBar] = useState([])
const [reviewSearchBar, setReviewSearchBar] = useState([])
const [friendSearchBar, setFriendSearchBar] = useState([])
const [friendList, setFriendList] = useState([])
const [difficultyScoreColor, setDifficultyColor] = useState('green')
const [difficultyScore, setDifficultyScore] = useState(10)
const [gameplayScoreColor, setGameplayColor] = useState('green')
const [gameplayScore, setGameplayScore] = useState(10)
const [graphicsScoreColor, setGraphicsColor] = useState('green')
const [graphicsScore, setGraphicsScore] = useState(10)
const [scoreColor, setScoreColor] = useState('green')
const [score, setScore] = useState(10)
const [avatar, setAvatar] = useState(false)
const [avatarData, setAvatarData] = useState(null)


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

function addAvatar(){
    setAvatar(!avatar)
}

function handleAvatarSubmit(){
    const formData = new FormData()
    formData.append('avatar', avatarData)

    fetch(`/addAvatar/${user.id}`, {
        method: "PATCH",
        body: formData
    })
    .then(res=>res.json())
    .then(res => console.log("avatar edited"))
    window.location.reload(false)
}

let navigate = useNavigate()
function viewProfile(firstname, lastname){
  navigate(`/profile/${firstname}-${lastname}`)
}

// fetching from game API to compare our User's games with the games from the DB
useEffect(()=>{

    fetch('https://api.rawg.io/api/games?key=9937c17ee7f344e0a27e3d66c7b454e3')
    .then(r=>r.json())
    .then(data=>  {setAllGames(data.results)
        setMyGames(user.user_games)
        setGameSearchBar(user.user_games)
    })
},[])

// search for userprofile games, but need to add game name property when liking game, because the logic to compare the slug with what is typed is complicated
function gameSearch(thethingsItypeintotheSearchBar){
    let resultofSearch= gameSearchBar.filter((game)=> {
      if(game.name.toLowerCase().includes(thethingsItypeintotheSearchBar.toLowerCase())){
        return game
      }
    })
    setMyGames(resultofSearch)
  }




// get request to backend server to view all reviews and compare which ones are from our user 
useEffect(()=>{
    fetch('/reviewsList')
    .then(r=>r.json())
    .then(data=> {
        setReviewList( data)
        setReviewSearchBar(data)
    })
},[])

  function reviewSearch(thethingsItypeintotheSearchBar){
    let resultofSearch= reviewSearchBar.filter((review)=> {
      if(review.gameTitle.toLowerCase().includes(thethingsItypeintotheSearchBar.toLowerCase())){
        return review
      }
    })
    setReviewList(resultofSearch)
  }

  console.log("reviews list", reviewSearchBar)



 //setting friendlist to state for filter function
 useEffect(()=>{
    setFriendSearchBar(user.friendlist)
    setFriendList(user.friendlist)
  }, [])

  function friendSearch(thethingsItypeintotheSearchBar){
    let resultofSearch= friendSearchBar.filter((friend)=> {
        let friendName = friend.first_name + " " + friend.last_name + " "
      if(friendName.toLowerCase().includes(thethingsItypeintotheSearchBar.toLowerCase())){
        return friend
      }
    })
    setFriendList(resultofSearch)
  }


  function unlikeGame(id){
    
    fetch(`/removeGame/${id}`,{
        method:'DELETE'
      })  
}

function deleteReview(id){
    
    fetch(`/deleteReview/${id}`,{
        method:'DELETE'
      })  

      fetch('/reviewsList')
      .then(r=>r.json())
      .then(data=> {
          setReviewList( data)
          setReviewSearchBar(data)
      })

}





    return(
        <div>
        <h1 className="page-title">
            <br></br>
            <br></br>
            <br></br>
            Hi &#160; <RxAvatar className="avatar" onClick={addAvatar}/> {user?.first_name}!
        </h1>
            <br></br>
            <br></br>
            { avatar ? 
            <div className="upload-avatar-field">
                <form>
                <label for="myfile">Upload Avatar:</label>
                <input type="file" accept="image/*"/>
                <button type="submit">Submit</button>
                </form>

            </div>
            : null}
            <div className="games-banner">
                <ul className="page-navbar">
                    <li class="dropdown">
                        <a onClick={viewGameList}  href="javascript:void(0)" className="profile-banner-links">My Games &#9660;</a>
                    </li>
                    <li class="dropdown">
                        <a onClick={viewReviewsList} href="javascript:void(0)" className="profile-banner-links">My Reviews &#9660;</a>
                    </li>
                    <li class="dropdown">
                        <a  onClick={viewFriendsList} href="javascript:void(0)" className="profile-banner-links">My Friends &#9660;</a>
                    </li>
                   
            </ul>
                {viewGame ? 
                // onChange={(synthEvent)=> handleingtheSearch(synthEvent.target.value)}
                    <div className="search-right"><input type="text" className="search" placeholder="Search Games..." onChange={(synthEvent)=> gameSearch(synthEvent.target.value)}/></div>
                    : null}
                {viewReviews ? 
                    <div className="search-right"><input type="text" className="search" placeholder="Search Reviews..." onChange={(synthEvent)=> reviewSearch(synthEvent.target.value)}/></div>
                    : null}
                {viewFriends ? 
                    <div className="search-right"><input type="text" className="search" placeholder="Search Friends..." onChange={(synthEvent)=> friendSearch(synthEvent.target.value)}/></div>
                    : null}
    
            </div>
        


            {viewGame && allGames && myGames ? 

            <div className="profile-games-list">
                <h4>My Games</h4>
                <br></br>
                <div className='games-grid'>
                
                {allGames?.map(eachGame=>{
                    if (user)
                    return(
                        myGames.map(myGames=>{
                            if (user.id === myGames.user_id && eachGame.slug === myGames.slug)
                            return(
                                <div>
                                    <h4>{eachGame.name}</h4>
                                    <img className="platform-image" src={eachGame.background_image}></img>
                                    <button onClick={()=>unlikeGame(myGames.id)} >Delete</button>
                                    {/*  */}
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
                                        <button><BsTrash onClick={()=>deleteReview(eachReview.id)}/></button>
                                    </div>
                                )
                            })
                        )
                    }
                })}
                </div>
            </div>
            
            : null}
            
            {viewFriends && user ? 
            
            <div className="profile-friends-list-body">
                <h4>My Friends</h4>
                {friendList?.map(eachFriend=>{
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