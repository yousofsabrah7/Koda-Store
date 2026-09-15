import FeatureProducts from '../../components/home/FeatureProducts/FeatureProducts'
import Works from '../../components/home/HowWorks/Works'
import Hero from '../../components/home/HeroSection/Hero'
import Categories from '../../components/home/Categories/Categories'
import EmailSection from '../../components/home/Email/EmailSection'

function Home() {
  return (
    <div>
      <Hero />
    <section className='my-10 w-11/12 mx-auto flex flex-col gap-19'>
            <Categories />
            <FeatureProducts />
            <Works/>
            <EmailSection />
    </section>
    </div>
  )
}

export default Home