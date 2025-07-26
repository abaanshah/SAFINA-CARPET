import React from 'react';
import './Home.css';
import Hero from '../../components/Hero/Hero';
import RugVisual from '../../components/RugVisual/RugVisual';
import ShopColor from '../../components/ShopColor/ShopColor';
import ShopSize from '../../components/ShopSize/ShopSize';
import ShopMaterial from '../../components/ShopMaterial/ShopMaterial';
const Home = () => {
  return (
    <div className='home'>
     <Hero/>
     <RugVisual/>
     <ShopColor/>
     <ShopSize/>
     <ShopMaterial/>
    </div>
  )
}

export default Home
