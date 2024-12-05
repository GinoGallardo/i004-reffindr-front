import { Box, Flex, Text, useBreakpointValue, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { CgProfile } from 'react-icons/cg'
import { FaRegHeart } from 'react-icons/fa6'
import { FiHome } from 'react-icons/fi'
import { IoMdHelp } from 'react-icons/io'
import { GrConfigure } from "react-icons/gr";
import { RxExit } from 'react-icons/rx'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { Avatar } from '@/components/ui/avatar'
import { UserRoles } from '@/constants/auth-account-constants'
import { authLogout } from '@/services/authService'
import { userStore } from '@/stores/userStore'

import { LogoComponent } from '../Logo/LogoComponent'
import { ButtonIconComponent } from './ButtonIconComponent'
import { SelectorTypeComponent } from './SelectorTypeComponent'

const Sidebar = () => {
  const { t } = useTranslation()
  const sidebarWidth = useBreakpointValue({ base: '277px' })
  const navigate = useNavigate()
  const actualUser = userStore((state) => state.user)

  const links = [
    {
      path: 'home',
      icon: <FiHome />,
      title: t('home'),
    },
    {
      path: 'perfil',
      icon: <CgProfile />,
      title: t('profile'),
    },
    {
      path: 'favoritos',
      icon: <FaRegHeart />,
      title: t('favorites'),
    },
    {
      path: 'help',
      icon: <IoMdHelp />,
      title: t('help'),
    },
    {
      path: 'configuration',
      icon: <GrConfigure />,
      title: t('configuration'),
    },
  ]

  const handleLogout = () => {
    authLogout()
    navigate('/inquilinos')
  }

  const location = useLocation()

  console.log(location)
  return (
    <Flex
      w={sidebarWidth}
      flexShrink={0}
      position={'sticky'}
      top={'0px'}
      h='100vh'
      borderRight={'1px solid #ddd'}
      px={8}
      display='flex'
      flexDirection='column'
      justifyContent='space-around'
    >
      <Box display='flex' justifyContent='center' mb={5} mt={5}>
        <LogoComponent size='96px' src='/assets/logos-svg/logoazul.svg' />
      </Box>
      <Flex justifyContent='center' alignItems='center' gap='2' mb={5}>
        <Avatar size='lg' name='Sage' src={actualUser.imageProfileUrl} />
        <Text fontSize='lg' fontWeight='bold'>
          {actualUser?.name} {actualUser?.lastName}
          <Text fontWeight={'medium'} fontSize='md' color='blue' textDecoration='underline'>
            {actualUser?.roleId == UserRoles.Owner ? 'Propietario' : 'Inquilino'}
          </Text>
        </Text>
      </Flex>

      <Box flexBasis='10%'>
        <SelectorTypeComponent />
      </Box>

      <Box flexBasis='50%'>
        <VStack gap={2} align='stretch'>
          {links.map((link) => (
            <Link key={link.path} to={link.path}>
              <ButtonIconComponent
                isActive={location.pathname.includes(link.path)}
                icon={link.icon}
                text={link.title}
              />
            </Link>
          ))}
        </VStack>
      </Box>

      <Box flexBasis='20%'>
        <VStack gap={6} align='stretch' >
          <ButtonIconComponent isActive={false} onClick={handleLogout} icon={<RxExit />} text={t('logout')} />
        </VStack>
      </Box>
    </Flex>
  )
}

export default Sidebar
