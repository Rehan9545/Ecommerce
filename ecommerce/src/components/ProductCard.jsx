export default function ProductCard({image,title,price,addToCart}){
 
    return (
        <div className="cursor-pointer transition-transform transform hover:scale-105 mb-10">
        <div className="relative">
          <img src={image} alt="Product Title" className="w-full h-48 object-cover rounded-lg" />
          {/* <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-white text-lg font-semibold">
            {title}
          </div> */}
        </div>
        <div className="mt-2 px-4">
          <div className="flex justify-between items-center">
          <p className="text-lg font-bold">{title}</p>
          <p>{price}</p>
          </div>
          
          <button
            onClick={addToCart}
            className="w-full mt-2 py-2 bg-black text-white rounded-lg hover:bg-black"
          >
            Add to Cart
          </button>
        </div>
      </div>
    )
}