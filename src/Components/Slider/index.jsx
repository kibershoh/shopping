import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nextSlide, prevSlide } from '../../features/SliderSlice'

const Slider = () => {

    // const slideIndex = useSelector((state)=> state.slide.value)
 
    //  console.log("slideIndex",slideIndex)
     const dispatch = useDispatch()
    return (
    <div className='mt-20'>
        <button className='mx-10' onClick={()=>dispatch(nextSlide())}>Next</button>
        <button onClick={()=>dispatch(prevSlide())}>Prev</button>
    </div>
  )
}

export default Slider