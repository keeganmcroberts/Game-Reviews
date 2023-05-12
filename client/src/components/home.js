import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import steve from "/Users/keegan/Development/code/gamereviews/client/src/favicon-32x32.png"
import {GrGamepad} from 'react-icons/gr';
import moment from 'moment'



function Home({logo, user, setUser, games}) {

  const [allUsers, setAllUsers] = useState([])
  const [allUsersSearch, setAllUsersSearch] = useState([])
  const [seeFeed, setSeeFeed] = useState(true)
  const [seeFeatured, setSeeFeatured] = useState(false)
  const [seeUsers, setSeeUsers] = useState(false)
  const [friendAssociations, setFriendAssociations] = useState([])
  const [myFriends, setMyFriends] = useState([])
  const [unsortedFriendReviews, setUnsortedFriendReviews] = useState([])
  const [unsortedFriendReviewsSearch, setUnsortedFriendReviewsSearch] = useState([])
  const [unsortedReviews, setUnsortedReviews] = useState([])

  //  console.log("ALL GAMES", games)
  //  console.log(allUsers)

  const Moment = require('moment')

  useEffect(()=>{
    fetch("/usersession")
    .then(r=>r.json())
    .then(user=>(setUser(user)))
  
  },[])

  useEffect(()=>{
    fetch("/allUsers")
    .then(r=>r.json())
    .then(users=>{
      setAllUsers(users)
      setAllUsersSearch(users)
    
    })
  
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

    const myFriends = allUsers.filter(user =>
      friendAssociations.some(friend => friend.friend_id === user.id)
      );

    setMyFriends(myFriends);

  },[ allUsers])




// adding all of our friends reviews into a new array so that we can sort by the date they were submitted and render accordingly. 
  useEffect(()=>{
      const newAllReviews = myFriends.flatMap(friend => friend.reviews);
      setUnsortedFriendReviews(newAllReviews)
      setUnsortedFriendReviewsSearch(newAllReviews);
  },[myFriends])

  // sorting our friends Review array to compare the dates and render the latest submissions first
  const sortedFriendsReviews  = unsortedFriendReviews.sort((a,b) => new Moment(b.created_at).format('YYYYMMDD') - new Moment(a.created_at).format('YYYYMMDD'))
 
 


  // same process as above but for all the users on the platform 
  useEffect(()=>{
    const allUserReviews = allUsers.flatMap(user => user.reviews);
    setUnsortedReviews(allUserReviews);
  },[allUsers])

  console.log('unsorted Reviews', unsortedReviews)

  const sortedAllReviews = unsortedReviews.sort((a,b) => new Moment(b.created_at).format('YYYYMMDD') - new Moment(a.created_at).format('YYYYMMDD'))


  
  
  function friendSearch(thethingsItypeintotheSearchBar){
    let resultofSearch= allUsersSearch.filter((friend)=> {
        let friendName = friend.first_name + " " + friend.last_name + " "
      if(friendName.toLowerCase().includes(thethingsItypeintotheSearchBar.toLowerCase())){
        return friend
      }
    })
    setAllUsers(resultofSearch)
  }


  // function reviewSearch(thethingsItypeintotheSearchBar){
  //   let resultofSearch= unsortedFriendReviewsSearch.filter((review)=> {
  //     if(review.slug.toLowerCase().includes(thethingsItypeintotheSearchBar.toLowerCase())){
  //       return review
  //     }
  //   })
  //   setUnsortedFriendReviews(resultofSearch)
  // }
  

    return (
      <div>
        <h1 className="page-title">
            <br></br>
            <br></br>
            <br></br>
            Home
        </h1>
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
            {seeFeed ? 
                // onChange={(synthEvent)=> handleingtheSearch(synthEvent.target.value)}
                <div className="search-right"><input type="text" className="search" placeholder="Search..."/></div>
              : null}
            {seeFeatured ? 
                <div className="search-right"><input type="text" className="search" placeholder="Search..." /></div>
            : null}
            {seeUsers ? 
                <div className="search-right"><input type="text" className="search" placeholder="Search Users..." onChange={(synthEvent)=> friendSearch(synthEvent.target.value)}/></div>
            : null}
            
    
            </div>

        {seeFeed ? 
        <div className="homepage-body">
          <h3>
            My Feed
          </h3>
          <div className="homepage-reviews-grid">
            {sortedFriendsReviews.map(eachReview=>{
              return(
                games.map(game=>{
                  if (game.slug === eachReview.slug){
                    return(
                      allUsers.map(eachFriend=>{
                          if (eachFriend.id === eachReview.user_id){
                            return(
                              <div className='profile-review-card'>
                                <h4>{eachFriend.first_name} {eachFriend.last_name}</h4>
                                <h6>{moment(`${eachReview.created_at}`).format("MMMM Do YYYY, HH:mm A")}</h6>
                                <br></br>
                                <img className='review-image' src={game.background_image}></img>
                                <h4>{game.name}</h4>
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
                          } 
                      })
                    )
                  }
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
               <div className="homepage-reviews-grid">
                 {sortedAllReviews.map(eachReview=>{
                   return(
                     games.map(game=>{
                       if (game.slug === eachReview.slug){
                         return(
                           allUsers.map(eachFriend=>{
                               if (eachFriend.id === eachReview.user_id){
                                 return(
                                   <div className='profile-review-card'>
                                     <h4>{eachFriend.first_name} {eachFriend.last_name}</h4>
                                     <h6>{moment(`${eachReview.created_at}`).format("MMMM Do YYYY, HH:mm A")}</h6>
                                     <br></br>
                                     <img className='review-image' src={game.background_image}></img>
                                     <h4>{game.name}</h4>
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
                               } 
                           })
                         )
                       }
                     })
                   )
                 })}
               </div>
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