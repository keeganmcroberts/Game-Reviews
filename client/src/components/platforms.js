import {useNavigate, useParams} from 'react-router-dom';


function Platforms(){

    const params = useParams()
    const {id} = params

    console.log(id)
    return(
        <h1>Platform</h1>
    )
}

export default Platforms;