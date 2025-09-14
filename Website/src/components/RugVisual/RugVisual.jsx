import React from 'react'
import './RugVisual.css'
import rugvisual from '../../assets/rugvisual.jpeg'

const RugVisual = () => {
  return (
    <div className='rug_visual_container'>
      <div className="rug_visual_img">
      <div className="larr"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z"/></svg></div>
      <div className="rug_visual_overlay"></div>
      <div className="rug_visual_text">
        <h1>RUG<br/>VISUALIZATION</h1>
        <p>
        you asking for a visualization of how a SAFINA CARPETS rug would look in a room? If so, let me know the type of room (living room, bedroom, office, etc.) and the style of carpet you'd like to see (Persian, Mughal, modern, etc.), and I'll generate an image for you.
        </p>
        <button>Try Now</button>
      </div>
      <img src={rugvisual} alt="" />
      <div className="rarr"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"/></svg></div>
      </div>
    </div>
  )
}

export default RugVisual
