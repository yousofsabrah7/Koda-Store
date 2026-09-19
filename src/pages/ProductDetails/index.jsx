import React ,{useEffect} from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useProduct } from "../../services/apiHooks/productsHook"
import Loading from '../../components/home/HandelLoading/Loading'

const ProductDetails = () => {

   const [selectedIndex,setSelectedIndex]=useState(0) //[ these inside dont have to be equal in name that is variable and other is function]
  const { id } = useParams()
  const { data, isError,isLoading } = useProduct(id)
  const [quantity, setQuantity] =useState(()=>{
const SavedQuantity =localStorage.getItem(`quantity.${id}`)
return SavedQuantity ? Number(SavedQuantity) :1 // Number() as it gets the string which is saved in local as string not number
  })

    useEffect(()=>{ // use effect is used to run this thing the first line down me if any of the dependances change  which are id or quantity 
localStorage.setItem(`quantity.${id}`,quantity)
  },[id,quantity])
  
const product =data?.product
  console.log("product data is :", data)
  console.log("product is :", product)
if (isLoading){
  return <Loading/>
}
if(isError){
  return <h1>There is an error</h1>
}
if(!product){ // no prodcut found
  return <h1>There is no product </h1> // no return nothing will be given
}
console.log("all images:", product.images);
return (
  <div className='min-h-screen bg-surface-base flex items-center justify-center '>
  <div className="max-w-5xl w-full mx-auto p-6 flex flex-col md:flex-row gap-8  ">

    {/* LEFT COLUMN — gallery */}
  
    <div className="flex-[1.5] ">
    <img
  src={product.images[selectedIndex].url} // same image will be made as sown bec with every selected  image in map it will make change up in img here they have same 
  // variable
  alt={product.name} 
  className="w-full h-[400px] object-fill rounded-2xl border border-gray-200 bg-gray-50"
/>

<div className="flex gap-3 mt-3">
  {product.images.map((img, index) => (
    <img
      key={img.public_id}
      src={img.url}
      onClick={() => setSelectedIndex(index)}
      className={`w-16 h-16 object-fill rounded-lg cursor-pointer border-2 ${
        index === selectedIndex? "border-orange-500" : "border-transparent"
      }`}
    />
  ))}
</div>
    </div>

    {/* RIGHT COLUMN — info */}
    <div className="flex-1">
    <h1 className="text-2xl font-bold">{product.name}</h1>
    <p className="mt-3">
      <span>EGP {product.discountPrice}</span>{" "}
      <span style={{ textDecoration: "line-through" }}>
        EGP {product.price}
      </span>
    </p>
    <p className={`font-semibold text-sm px-2 py-1 rounded inline-block mt-2 ${product.stock>0? "text-green-600 bg-green-100":"text-red-600 bg-red-100"}`}>{product.stock > 0? "IN STOCK":"NOT AVLABLE RIGHT NOW "}</p>

<span className='flex gap-3 items-center  rounded-sm p-3 '>
<button className='cursor-pointer border-2 rounded-sm px-2 py-1 '
onClick={()=>setQuantity((q)=>Math.min(product.stock,q+1))}
disabled={product.stock===0}
>+</button>
<span className='text-center w-2'>{product.stock===0 ? 0:quantity}</span>
<button className='cursor-pointer border-2 rounded-sm px-2 py-1'
onClick={()=>setQuantity((q)=>Math.max(1,q-1))}
disabled={product.stock===0}
>-</button>
</span>
<div className="flex items-center gap-3 mt-4">
  <button className={`flex-1 text-white font-semibold py-3 rounded-lg  ${product.stock===0 ? 'bg-orange-900  ' :'bg-orange-500 cursor-pointer  hover:bg-orange-900'} `}>
  {product.stock===0?"NOT AVILABLE RIGHT NOW": "Add to Cart"}
  
  </button>

  <button className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-red-50">
    ♥
  </button>
</div>

    </div>

  </div>  
  </div>
);
}

export default ProductDetails