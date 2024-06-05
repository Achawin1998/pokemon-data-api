'use client'

import React, { useState } from 'react'
import { FaHeart , FaRegHeart } from  'react-icons/fa'

function LikePoke({ item }) {
    const [Like , setLike] = useState(() => {
        const savedLike = localStorage.getItem(`like_${item.id}`);
        return savedLike ? JSON.parse(savedLike) : false
    })

    const toggleLike = () => {
        const updateLike = !Like
        setLike(updateLike);
        localStorage.setItem(`like_${item.id}` , JSON.stringify(updateLike))
    }

  return (
    <section>
        <button className='hover:scale-125'
             onClick={() => toggleLike()}>
            {Like ? <FaHeart style={{color: 'red'}} /> : <FaRegHeart />}
        </button>
    </section>
  )
}

export default LikePoke