
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
            email: friend.email
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
                 })
            }
            else{
                res.json().then(errors=>{
                    console.log(errors.errors)
                })
            }
        }))
    }


if (friendDetailPage)
return(
        <div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
                <h1>{firstName} {lastName} { iconSwitch ? <AiFillCheckCircle color='purple' cursor='pointer'/> : <AiOutlineCheckCircle onClick={()=>{addFriend(friendDetailPage)}}  cursor='pointer'/>} </h1>
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
            {friendDetailPage.reviews.map(eachReview=>{
                return(
                   
                    allGames.map(eachGame=>{
                        if (eachGame.slug === eachReview.slug){
                            return ( 
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
                {friendDetailPage.user_games.map(userGames=>{
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
            {viewFriends ?
                <div>
                Friends List Here:
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