import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import steve from "/Users/keegan/Development/code/gamereviews/client/src/favicon-32x32.png"
import {GrGamepad} from 'react-icons/gr';



function Home({logo, user, setUser}) {

  const [allUsers, setAllUsers] = useState([])
  const [seeFeed, setSeeFeed] = useState(true)
  const [seeFeatured, setSeeFeatured] = useState(false)
  const [seeUsers, setSeeUsers] = useState(false)
  const [friendAssociations, setFriendAssociations] = useState([])


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


  console.log("ALL USERs", allUsers)
  console.log("my user home page:", user)
  


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