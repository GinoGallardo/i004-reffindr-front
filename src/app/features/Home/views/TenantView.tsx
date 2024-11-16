import { IoLogoInstagram } from 'react-icons/io5'

import { HeadSection } from '@/app/UI/components/head-section/HeadSection'

export const TenantView = () => {
  return (
    <>
      <HeadSection
        headLink={{
          title: 'Soy propietario',
          path: '/owner',
        }}
        backgroundImage='/landing-inquilinos-head.png'
        headIcon={<IoLogoInstagram size={32} />}
        title='Encontrá tu hogar sin &#10; intermediarios'
      />
    </>
  )
}
