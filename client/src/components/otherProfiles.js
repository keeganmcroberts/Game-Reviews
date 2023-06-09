
import { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {AiOutlineCheckCircle} from 'react-icons/ai';
import {AiFillCheckCircle} from 'react-icons/ai';
import {GrGamepad} from 'react-icons/gr';

function OtherProfiles({user}){
 

    const [friendAssociations, setFriendAssociations] = useState([])
    const [allGames, setAllGames] = useState([])
    const [viewGames, setViewGames] = useState(false)
    const [viewReviews, setViewReviews] = useState(false)
    const [viewFriends, setViewFriends] = useState(false)
    const [friendDetailPage, setFriendDetailPage] = useState({})
    const [iconSwitch, setIconSwitch] = useState(false)

    let {id} = useParams()
    const firstName = id.split("-")[0]
    const lastName = id.split("-")[1]
    


// this useEffect fetches an index of all Users, compares the attributes of each user to our params and sets that user equal to state
    useEffect(()=>{
        fetch("/allUsers")
        .then(r=>r.json())
        .then(users=>{
            users.map(eachUser=>{
                if (eachUser.first_name === firstName && eachUser.last_name === lastName){
                    setFriendDetailPage(eachUser)
                } 
            })
            })
      },[])

      console.log("detail page:", friendDetailPage)

    // this useEffect fetches an index of all the friend associations and and sets them equal to state: to be used for conditionals 
    useEffect(()=>{
        fetch('/allFriends')
        .then(res=>res.json())
        .then(data=>setFriendAssociations(data))
    },[])

    console.log("friend Associations:", friendAssociations)
    

        /// this useEffect is for updating the DOM element that indicagtes you've liked a friend or not. empty vs purple check mark by name 
    useEffect(()=>{
        friendAssociations.map(association=>{
            if (association.user_id === user.id && association.friend_id === friendDetailPage.id && association.liked === true){
                return(

                    setIconSwitch(true)
                )
                
            } 
        })
    },)


// this fetch simply fetches from the game API to render each profiles games page.
      useEffect(()=>{

        fetch('https://api.rawg.io/api/games?key=9937c17ee7f344e0a27e3d66c7b454e3')
        .then(r=>r.json())
        .then(data=> setAllGames(data.results))
    },[])




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


    function addFriend(friend){

        let newFriend = {
            user_id: user.id,
            friend_id: friend.id,
            first_name: friend.first_name,
            last_name: friend.last_name,
            liked: true,
            email: friend.email,
            reviews: friend.reviews
        }
 
        fetch('/addFriend', {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(newFriend)
        })

        .then((res =>{
            if (res.ok){
                res.json()
                .then(response=>{
                console.log(response)
                setIconSwitch(true)
                 })
            }
            else{
                res.json().then(errors=>{
                    console.log(errors.errors)
                })
            }
        }))
    }

    function unfollowFriend(id){
    
        fetch(`/removeFriend/${id}`,{
            method:'DELETE'
          })  
          
          setIconSwitch(false)
        
    }


if (friendDetailPage)
return(
        <div>
        <h1 className="page-title">
            <br></br>
            <br></br>
            <br></br>
            {firstName} {lastName} { iconSwitch ? <AiFillCheckCircle onClick={()=>{unfollowFriend(friendDetailPage.id)}} color='purple' cursor='pointer'/> : <AiOutlineCheckCircle onClick={()=>{addFriend(friendDetailPage)}}  cursor='pointer'/>}
        </h1>
            <br></br>
            <br></br>
            <div className="games-banner">
                <ul className="page-navbar">
                    <li className="dropdown">
                        <a onClick={viewGameList}   href="javascript:void(0)" className="profile-banner-links"> Games &#9660;</a>
                    </li>
                    <li className="dropdown">
                        <a onClick={viewReviewsList}  href="javascript:void(0)" className="profile-banner-links"> Reviews &#9660;</a>
                    </li>
                    <li className="dropdown"> 
                        <a onClick={viewFriendsList}  href="javascript:void(0)" className="profile-banner-links"> Friends &#9660;</a>
                    </li>
                   
                </ul>
                    <div className="search-right"><input type="text" className="search" placeholder="Search Games..."/></div>
    
            </div>
            {viewGames ? 
            <div>
                <h2>{firstName}'s Games</h2>
                <br></br>
                <br></br>
                <div className='games-grid'>
                {friendDetailPage.user_games.map(userGames=>{
                    return(
                        allGames.map(eachGame=>{
                            if (userGames.slug === eachGame.slug){
                                return(
                                    <div>
                                        <h4>{eachGame.name}</h4>
                                        <img className="platform-image" src={eachGame.background_image}></img>
                                    </div>
                                )
                            }
                        })
                    )
                })}
                </div>
            </div>
            : null}
            {viewReviews ? 
            <div>
                <h2>
                    {firstName}'s Reviews
                </h2>
                <br></br>
                <br></br>
            <div className='reviews-grid'>

            {friendDetailPage.reviews.map(eachReview=>{
                return(
                   
                    allGames.map(eachGame=>{
                        if (eachGame.slug === eachReview.slug){
                            return ( 
                            <div className='profile-review-card'>
                                <img src={eachGame.background_image} className='review-image'></img>
                                <h5>{eachGame.name}</h5>
                                <div className='review-ratings'>
                                <h6>Difficulty:</h6>
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
                            }
                        })
                )
            })}
            </div>
            </div>
            : null}

            {viewFriends ?
                <div>
                <h2>{firstName}'s Friends:</h2>
                {friendDetailPage.friendlist.map(eachFriend=>{
                    return(
                        <div>
                            <h4>{eachFriend.first_name} {eachFriend.last_name} <GrGamepad onClick={()=>{viewProfile(eachFriend.first_name, eachFriend.last_name)}} className='user-icon' cursor='pointer' color="red"/></h4>
                        </div>
                    )
                })}
                </div>
            : null}
        </div>
    )
}


export default OtherProfiles;