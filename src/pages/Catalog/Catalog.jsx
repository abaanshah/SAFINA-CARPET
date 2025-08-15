import React, { useEffect, useState } from "react";
import { Heart, Plus } from "lucide-react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  // Parse query params for any filter: size, material, design, etc.
  const query = new URLSearchParams(location.search);
  const filters = {};
  for (let [key, value] of query.entries()) {
    filters[key] = value;
  }
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when page opens
  }, [location.search]);
  

  useEffect(() => {
    const fetchRugs = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/sizes", {
          params: filters,
        });
        setProducts(data);
      } catch (err) {
        console.error("Error fetching rugs:", err);
      }
    };

    fetchRugs();
  }, [location.search]); // Refetch when query changes

  return (
    <div className="mt-[10vh] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 p-6">
      {products.length === 0 ? (
        <p className="text-center col-span-3">No rugs found for this filter</p>
      ) : (
        products.map((product) => (
          <div
            key={product._id}
            className=" bg-amber-50 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative">
              <img
              src="https://www.loomkart.com/cdn/shop/files/faux_silk_carpets_loomkart_0007_floral_faux_silk_carpet1.jpg?v=1753537724"
                // src={product.imageUrl || product.image}
                alt={product.name}
                className=" "
              />
              <div className="absolute top-2 right-2 flex flex-col gap-2">
                <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition">
                  <Heart size={18} className="text-gray-700" />
                </button>
                <button className="bg-black text-white p-2 rounded-full shadow hover:bg-gray-800 transition">
                  <Plus size={18} />
                </button>
              </div>
            </div>
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.material}</p>
              <p className="text-sm text-gray-500">
                {product.size} • {product.color}
              </p>
              <p className="text-lg font-bold text-gray-800 mt-2">
                ₹{product.price}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Catalog;
