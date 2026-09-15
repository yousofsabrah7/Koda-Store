import React from 'react'
import FeatureProducts from '../../components/home/FeatureProducts/FeatureProducts'
import Works from '../../components/home/HowWorks/Works'
function Home() {
  return (
    <section className='my-10 w-11/12 mx-auto flex flex-col gap-19'>
            <FeatureProducts />
            <Works/>
    </section>
  )
}

export default Home