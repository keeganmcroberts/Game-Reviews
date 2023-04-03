import { useState, useEffect } from "react";
import {useNavigate, useParams} from 'react-router-dom';

function GameDetailPage({user}){

    const user_id = user.id

    console.log("user id:", user_id)
    
    const params = useParams();
    let {id} = params
    const [gameState, setGameState] = useState({})
    const [review, setReview] = useState({
        user_id: user_id,
        slug: id,
        comment: "",
        score: 10,
        difficulty: 10,
        gameplay: 10,
        graphics: 10
    })

    const { slug, comment, score, difficulty, gameplay, graphics} = review


    useEffect(()=>{

        fetch('https://api.rawg.io/api/games?key=9937c17ee7f344e0a27e3d66c7b454e3')
        .then(r=>r.json())
        .then(data=>{
           data.results.map(eachGame=>{
               if (eachGame.slug === id){
                   setGameState( eachGame)
               }
           })
        })
        
    },[])

    console.log("individual game:", gameState)

    function handleChange(e){
        const {name, value} = e.target

        setReview({...review, [name]: value})

    }
 console.log("review event", review)


    return(
        <div>
            <br></br>
            <br></br>
            <br></br>  
            <br></br>
            <br></br>
            <br></br>  
           
            <h2>{gameState.name}</h2>
            <img className="detailPage-image" src={gameState.background_image}></img>
            <h3>Leave a Review:</h3>
            <form className="review-form">
            {/* need a user_id, numerical score for Gameplay, graphics, and difficulty, comment, and game slug  */}
            <h5>Difficulty</h5>
            <select onChange={handleChange} name='difficulty' value={difficulty}>
                <option value="0"> 1(worst) - 10(best) </option>
                <option value='1'> 1 </option>
                <option value='2'> 2 </option>
                <option value='3'> 3 </option>
                <option value='4'> 4 </option>
                <option value='5'> 5 </option>
                <option value='6'> 6 </option>
                <option value='7'> 7 </option>
                <option value='8'> 8 </option>
                <option value='9'> 9 </option>
                <option value='10'> 10 </option>
            </select>
            <h5>Gameplay</h5>
            <select onChange={handleChange} name='gameplay' value={gameplay}>
                <option value="0"> 1(worst) - 10(best) </option>
                <option value='1'> 1 </option>
                <option value='2'> 2 </option>
                <option value='3'> 3 </option>
                <option value='4'> 4 </option>
                <option value='5'> 5 </option>
                <option value='6'> 6 </option>
                <option value='7'> 7 </option>
                <option value='8'> 8 </option>
                <option value='9'> 9 </option>
                <option value='10'> 10 </option>
            </select>
            <h5>Graphics</h5>
            <select onChange={handleChange} name ='graphics' value={graphics}>
                <option value="0"> 1(worst) - 10(best) </option>
                <option value='1'> 1 </option>
                <option value='2'> 2 </option>
                <option value='3'> 3 </option>
                <option value='4'> 4 </option>
                <option value='5'> 5 </option>
                <option value='6'> 6 </option>
                <option value='7'> 7 </option>
                <option value='8'> 8 </option>
                <option value='9'> 9 </option>
                <option value='10'> 10 </option>
            </select>
            <h5>Score</h5>
            <select onChange={handleChange} name='score' value={score}>
                <option value="0"> 1(worst) - 10(best) </option>
                <option value='1'> 1 </option>
                <option value='2'> 2 </option>
                <option value='3'> 3 </option>
                <option value='4'> 4 </option>
                <option value='5'> 5 </option>
                <option value='6'> 6 </option>
                <option value='7'> 7 </option>
                <option value='8'> 8 </option>
                <option value='9'> 9 </option>
                <option value='10'> 10 </option>
            </select>
            <h5>Comment</h5>
            <input onChange={handleChange} name='comment' value={comment}></input>
            <br></br>
            <input type='submit'></input>
            </form>
        </div>
    )
}

export default GameDetailPage;