import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import steve from "/Users/keegan/Development/code/gamereviews/client/src/favicon-32x32.png"
import {GrGamepad} from 'react-icons/gr';
import moment from 'moment'



function Home({logo, user, setUser, games}) {

  const [allUsers, setAllUsers] = useState([])
  const [seeFeed, setSeeFeed] = useState(true)
  const [seeFeatured, setSeeFeatured] = useState(false)
  const [seeUsers, setSeeUsers] = useState(false)
  const [friendAssociations, setFriendAssociations] = useState([])
  const [myFriends, setMyFriends] = useState([])
  const [unsortedFriendReviews, setUnsortedFriendReviews] = useState([])

   console.log("ALL GAMES", games)


  useEffect(()=>{
    fetch("/usersession")
    .then(r=>r.json())
    .then(user=>(setUser(user)))
  
  },[])

  useEffect(()=>{
    fetch("/allUsers")
    .then(r=>r.json())
    .then(users=>(setAllUsers(users)))
  
  },[])

  useEffect(()=>{
    fetch('/allFriends')
    .then(res=>res.json())
    .then(data=>setFriendAssociations(data))
},[])


  // console.log("ALL USERs", allUsers)
  // console.log("my user home page:", user)
  // console.log("friend associations:", friendAssociations)
  


  function viewUsers(){
    setSeeFeatured(false)
    setSeeFeed(false)
    setSeeUsers(true)
  }

  function viewFeatured(){
    setSeeFeed(false)
    setSeeUsers(false)
    setSeeFeatured(true)
  }

  function viewFeed(){
    setSeeUsers(false)
    setSeeFeatured(false)
    setSeeFeed(true)

  }

  let navigate = useNavigate()
  function viewProfile(firstname, lastname){
    navigate(`/profile/${firstname}-${lastname}`)
  }

  // iterating through all users and matching the id's to those on our own friends list, then creating a new array of our friends to render their reviews only
  useEffect(()=>{

    const newMatchedUsers = allUsers.filter(user =>
      friendAssociations.some(friend => friend.friend_id === user.id)
      );

    setMyFriends(newMatchedUsers);

  },[allUsers, friendAssociations])

  console.log("FRIENDS I NEED:", myFriends)

  

// adding all of our friends reviews into a new array so that we can sort by the date they were submitted and render accordingly. 
  useEffect(()=>{
      const newAllReviews = myFriends.flatMap(friend => friend.reviews);
      setUnsortedFriendReviews(newAllReviews);
  },[allUsers, friendAssociations])



  console.log("friend reviews", unsortedFriendReviews)


      // return(
      //   games.map(game=>{
      //     if (game.slug === friendReview.slug){
  

    return (
      <div >
        <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>         
        <div className="games-banner">
            <ul className="page-navbar">
              <li class="dropdown">
                  <h4 onClick={viewFeed}   href="javascript:void(0)" className="profile-banner-links">My Feed &#9660;</h4>
              </li>
              <li class="dropdown">
                  <h4 onClick={viewFeatured} href="javascript:void(0)" className="profile-banner-links">Featured &#9660;</h4>
              </li>
              <li class="dropdown">
                  <h4 onClick={viewUsers} href="javascript:void(0)" className="profile-banner-links">Find Users &#9660;</h4>
              </li>
                   
            </ul>
            <div className="search-right"><input type="text" className="search" placeholder="Search..."/>
            </div>
    
            </div>
            {seeFeed ? 
          <div className="homepage-body">
            <h3>
              My Feed
            </h3>
            <div className="homepage-reviews-grid">
            {myFriends.map(eachFriend=>{
              return(
                eachFriend.reviews.map(friendReview=>{
                  return(
                    games.map(game=>{
                      if (game.slug === friendReview.slug){
                        return(
                        <div className='profile-review-card'>
                        <h4>{eachFriend.first_name} {eachFriend.last_name}</h4>
                        <h6>{moment(`${friendReview.created_at}`).format('MMMM Do YYYY')}</h6>
                        <br></br>
                        <img className='review-image' src={game.background_image}></img>
                        <h4>{game.name}</h4>
                        <div className='review-ratings'>
                            <h6 className="review-category">Difficulty:</h6>
                            {friendReview.difficulty >= 8 ?
                                <h6 className="score" style={{color:"green"}}>{friendReview.difficulty}</h6>
                            : friendReview.difficulty < 8 && friendReview.difficulty >= 4 ? 
                                <h6 className="score" style={{color:"orange"}}>{friendReview.difficulty}</h6> 
                            : 
                                <h6 className="score" style={{color:"red"}}>{friendReview.difficulty}</h6>}

                            <h6 className="review-category">Gameplay:</h6>
                            {friendReview.gameplay >= 8 ?
                                <h6 className="score" style={{color:"green"}}>{friendReview.gameplay}</h6>
                            : friendReview.gameplay < 8 && friendReview.gameplay >= 4 ? 
                                <h6 className="score" style={{color:"orange"}}>{friendReview.gameplay}</h6> 
                            : 
                                <h6 className="score" style={{color:"red"}}>{friendReview.gameplay}</h6>}

                            <h6 className="review-category">Graphics:</h6>
                            {friendReview.graphics >= 8 ?
                                <h6 className="score" style={{color:"green"}}>{friendReview.graphics}</h6>
                            : friendReview.graphics < 8 && friendReview.graphics >= 4 ? 
                                <h6 className="score" style={{color:"orange"}}>{friendReview.graphics}</h6> 
                            : 
                                <h6 className="score" style={{color:"red"}}>{friendReview.graphics}</h6>}

                            <h6 className="review-category">Review:</h6>
                            <h6 className="score">{friendReview.comment}</h6>

                            <h6 className="review-category">Score:</h6>
                            {friendReview.score >= 8 ?
                                <h6 className="score" style={{color:"green"}}>{friendReview.score}</h6>
                            : friendReview.score < 8 && friendReview.score >= 4 ? 
                                <h6 className="score" style={{color:"orange"}}>{friendReview.score}</h6> 
                            : 
                                <h6 className="score" style={{color:"red"}}>{friendReview.score}</h6>}
                        </div>
                        </div>
  
                        )

                      }
                    })
                    )
                })
              )
              
            })}
            </div>
          </div>
          : null }
          {seeFeatured ? 
          <div className="homepage-body">
          <h3>
            Featured
          </h3>
          </div>
          : null }
          {seeUsers ? 
          <div className="homepage-body">
          <h3>
             Users
          </h3>
          {allUsers.map(eachUser=>{
            return(
              <div className="users-list">
              <p>{eachUser.first_name} {eachUser.last_name}</p>
              <GrGamepad onClick={()=>{viewProfile(eachUser.first_name, eachUser.last_name)}} className='view-user-icon' cursor='pointer' size='20'color="red"/>
              </div>

            )
          })}
          </div>
          : null }


        
      </div>
    );
  }
  
  export default Home;