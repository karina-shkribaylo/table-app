import React from 'react';
import loader from "../../assets/images/preloader.svg";

let Loader = (props) => {
    return <div  style={ { backgroundColor: 'white' } }>
        <img src={loader} alt="Wait please:)" />
    </div>
}

export default Loader;