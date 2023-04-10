
import { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';

function OtherProfiles(){



    const [allUsers, setAllUsers] = useState([])
    const [allGames, setAllGames] = useState([])

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
                <h1>{firstName} {lastName}</h1>
            <br></br>
            <div className="games-banner">
                <ul className="page-navbar">
                    <li class="dropdown">
                        <h4   href="javascript:void(0)" className="profile-banner-links"> Games &#9660;</h4>
                    </li>
                    <li class="dropdown">
                        <h4  href="javascript:void(0)" className="profile-banner-links"> Reviews &#9660;</h4>
                    </li>
                    <li class="dropdown">
                        <h4  href="javascript:void(0)" className="profile-banner-links"> Friends &#9660;</h4>
                    </li>
                   
                </ul>
                    <div className="search-right"><input type="text" className="search" placeholder="Search Games..."
                    /></div>
    
            </div>
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
        </div>
    )
})
 )
}


export default OtherProfiles;