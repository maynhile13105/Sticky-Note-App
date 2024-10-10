import React, {useState, useEffect, useContext} from "react";

function ClickHeart(){
    const [fav, setFav] = useState('♡');
    const favClick = () => {
        setFav(fav === '♡' ? '❤' : '♡')
    };
    return (
        <div>
            <button onClick = {favClick}></button>
            <ClickHeart/>
        </div>
        
    );
}
 
export default ClickHeart;