import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import steve from "/Users/keegan/Development/code/gamereviews/client/src/favicon-32x32.png"
import {GrGamepad} from 'react-icons/gr';



function Home({logo, user, setUser}) {

  const [allUsers, setAllUsers] = useState([])
  const [seeFeed, setSeeFeed] = useState(true)
  const [seeFeatured, setSeeFeatured] = useState(false)
  const [seeUsers, setSeeUsers] = useState(false)


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

  console.log("ALL USERs", allUsers)
  


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
            <div className="search-right"><input type="text" className="search" placeholder="Search Games..."/>
            </div>
    
            </div>
            {seeFeed ? 
          <div className="homepage-body">
          <img src="https://upload.wikimedia.org/wikipedia/en/e/e7/Steve_%28Minecraft%29.png" className="App-logo" alt="whoops" />
          <p>
             Hail Steve
          </p>
          </div>
          : null }
          {seeFeatured ? 
          <div className="homepage-body">
          <img src="https://upload.wikimedia.org/wikipedia/en/e/e7/Steve_%28Minecraft%29.png" className="App-logo" alt="whoops" />
          <p>
            Featured
          </p>
          </div>
          : null }
          {seeUsers ? 
          <div className="homepage-body">
          <img src="https://upload.wikimedia.org/wikipedia/en/e/e7/Steve_%28Minecraft%29.png" className="App-logo" alt="whoops" />
          <h4>
             Users:
          </h4>
          {allUsers.map(eachUser=>{
            return(
              <div>
              <p>{eachUser.first_name} {eachUser.last_name}<GrGamepad onClick={()=>{viewProfile(eachUser.first_name, eachUser.last_name)}} className='user-icon' cursor='pointer' color="red"/></p>
  
              </div>

            )
          })}
          </div>
          : null }


        
      </div>
    );
  }
  
  export default Home;