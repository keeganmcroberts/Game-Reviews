
import { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {AiOutlineCheckCircle} from 'react-icons/ai';
import {AiFillCheckCircle} from 'react-icons/ai';

function OtherProfiles(){



    const [allUsers, setAllUsers] = useState([])
    const [allGames, setAllGames] = useState([])
    const [viewGames, setViewGames] = useState(false)
    const [viewReviews, setViewReviews] = useState(false)
    const [viewFriends, setViewFriends] = useState(false)

    let {id} = useParams()
    const firstName = id.split("-")[0]
    const lastName = id.split("-")[1]
    


    useEffect(()=>{
        fetch("/allUsers")
        .then(r=>r.json())
        .then(users=>(setAllUsers(users)))
      
      },[])

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
      

      
   return(
allUsers.map(user=>{
    if (user.first_name === firstName && user.last_name === lastName)
    return(
        <div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
                <h1>{firstName} {lastName} <AiOutlineCheckCircle cursor='pointer'/></h1>
            <br></br>
            <div className="games-banner">
                <ul className="page-navbar">
                    <li class="dropdown">
                        <h4 onClick={viewGameList}   href="javascript:void(0)" className="profile-banner-links"> Games &#9660;</h4>
                    </li>
                    <li class="dropdown">
                        <h4 onClick={viewReviewsList}  href="javascript:void(0)" className="profile-banner-links"> Reviews &#9660;</h4>
                    </li>
                    <li class="dropdown">
                        <h4 onClick={viewFriendsList}  href="javascript:void(0)" className="profile-banner-links"> Friends &#9660;</h4>
                    </li>
                   
                </ul>
                    <div className="search-right"><input type="text" className="search" placeholder="Search Games..."
                    /></div>
    
            </div>
            {viewReviews ? 
            <div className='games-grid'>
            {user.reviews.map(eachReview=>{
                return(
                   
                    allGames.map(eachGame=>{
                        if (eachGame.slug === eachReview.slug){
                            return(
                            <div>
                                <img src={eachGame.background_image} className='platform-image'></img>
                                <h5>{eachGame.name}</h5>
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
                            }
                        })
                )
            })}
            </div>
            : null}
            {viewGames ? 
            <div>
                {user.user_games.map(userGames=>{
                    return(
                        allGames.map(eachGame=>{
                            if (userGames.slug === eachGame.slug){
                                return(
                                    <div>
                                        <h6>{eachGame.name}</h6>
                                        <img className="platform-image" src={eachGame.background_image}></img>
                                    </div>
                                )
                            }
                        })
                    )
                })}
            </div>
            : null}
        </div>
    )
})
 )
}


export default OtherProfiles;