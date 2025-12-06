import React from 'react'
import PageLayout from '../../components/layout/PageLayout'
import Navbar from '../../components/Navbar'
import CardPantau from './CardPantau'

const Pantau = () => {
   return (
      <PageLayout>
         <Navbar />
         <div className="pt-4">
            <CardPantau />
         </div>
      </PageLayout>
   )
}

export default Pantau