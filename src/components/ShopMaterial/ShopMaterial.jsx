import React, { useEffect, useState } from 'react';
import './ShopMaterial.css';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const fallbackCards = [
  { name: "Hand Made", image: "/uploads/handmade.png", bgColor: "#26425E" },
  { name: "Staple", image: "/uploads/staple.png", bgColor: "#891322" },
  { name: "Machine Made", image: "/uploads/machinemade.png", bgColor: "#684D26" },
];

const ShopMaterial = () => {
  const [materials, setMaterials] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/materials")
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) setMaterials(data);
        else setMaterials(fallbackCards);
      })
      .catch(err => {
        console.error(err);
        setMaterials(fallbackCards);
      });
  }, []);

  // Navigate to catalog with selected material
  const handleClick = (materialName) => {
    navigate(`/catalog?material=${materialName}`);
  };

  return (
    <div className="shopmaterial_container">
      <h1 className="shopmaterial_heading">SHOP BY MATERIAL</h1>
      <div className="shopmaterial_slider">
        {materials.map((card, index) => (
          <div
            key={index}
            className="slider_card"
            style={{ backgroundColor: card.bgColor, cursor: 'pointer' }}
            onClick={() => handleClick(card.name)}
          >
            <div className="material_heading">
              <img src={card.image} alt={card.name} />
              <h2>{card.name}</h2>
            </div>
            <button>
              <p>Shop Collection</p> <ArrowUpRight />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopMaterial;
