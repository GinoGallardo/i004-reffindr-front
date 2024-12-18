import { Box, Flex, Text, VStack, IconButton } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CgProfile } from 'react-icons/cg';
import { FaRegHeart } from 'react-icons/fa6';
import { FiHome } from 'react-icons/fi';
import { GrConfigure } from 'react-icons/gr';
import { IoMdHelp } from 'react-icons/io';
import { RxExit, RxDoubleArrowRight, RxDoubleArrowLeft } from 'react-icons/rx';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Avatar } from '@/components/ui/avatar';
import { Skeleton, SkeletonCircle } from '@/components/ui/skeleton';
import { UserRoles } from '@/constants/auth-account-constants';
import { authStore } from '@/stores/authStore';
import { userStore } from '@/stores/userStore';

import { LogoComponent } from '../Logo/LogoComponent';
import { ButtonIconComponent } from './ButtonIconComponent';
import { SelectorTypeComponent } from './SelectorTypeComponent';

const Sidebar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const actualUser = userStore((state) => state.user);
  const logout = authStore((state) => state.logout);
  const isUserDataPending = userStore((state) => state.isUserDataPending);

  // Estado para controlar si el Sidebar está expandido o contraído
  const [isExpanded, setIsExpanded] = useState(window.innerWidth > 768); // Empieza expandido si el ancho es mayor a 768px

  // Función para alternar el estado del Sidebar
  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  // Ancho dinámico del Sidebar
  const sidebarWidth = isExpanded ? '277px' : '55px';

  // Mostrar texto solo cuando el Sidebar está expandido
  const showText = isExpanded;

  const links = [
    { path: 'home', icon: <FiHome />, title: t('home') },
    { path: 'perfil', icon: <CgProfile />, title: t('profile') },
    { path: 'favoritos', icon: <FaRegHeart />, title: t('favorites') },
    { path: 'help', icon: <IoMdHelp />, title: t('help') },
    { path: 'configuration', icon: <GrConfigure />, title: t('configuration') },
  ];

  const handleLogout = () => {
    logout();
    navigate("/inquilinos");
  };

  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebarElement = document.getElementById('sidebar');
      if (sidebarElement && !sidebarElement.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    // Solo agregar el evento si el sidebar está expandido y estamos en modo móvil
    if (isExpanded && window.innerWidth <= 768) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isExpanded]);

  // Detectar el tamaño de la pantalla para ajustar el estado del Sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsExpanded(true); // En desktop siempre expandido
      } else {
        setIsExpanded(false); // En móvil siempre cerrado
      }
    };

    window.addEventListener('resize', handleResize);

    // Llamar a handleResize inicialmente para establecer el estado correcto
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Flex
        id="sidebar"
        bg={'white'}
        w={sidebarWidth}
        flexShrink={0}
        position={'fixed'}
        top={'0px'}
        h='100vh'
        borderRight={'1px solid #ddd'}
        px={isExpanded ? 8 : 2}
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='space-around'
        transition='width 0.3s ease'
      >
        {/* El botón hamburguesa solo se muestra en móviles */}
        {window.innerWidth <= 768 && (
          <Box w='100%' display='flex' justifyContent={isExpanded ? 'flex-end' : 'center'} mb={5} mt={5}>
            <IconButton
              aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
              onClick={toggleSidebar}
              variant='ghost'
              size='lg'
              transition='.5s ease'
            >
              {isExpanded ? <RxDoubleArrowLeft size={24} /> : <RxDoubleArrowRight size={24} />}
            </IconButton>
          </Box>
        )}

        <Box w={isExpanded ? 96 : 54} transition='width .3s ease' display='flex' justifyContent='center' mb={5} mt={5}>
          <LogoComponent size={'md: 96px'} src='/assets/logos-svg/logoazul.svg' />
        </Box>

        {isExpanded && (
          <Flex justifyContent='center' alignItems='center' gap='2' mb={5}>
            <SkeletonCircle loading={isUserDataPending}>
              <Avatar size='2xl' name='Sage' src={actualUser?.imageProfileUrl ?? '/public/AvatarImage1.png'} />
            </SkeletonCircle>
            <Flex flexGrow={1} flexDir='column' gapY={1}>
              <Skeleton loading={isUserDataPending}>
                <Text fontSize='md' lineClamp={2} fontWeight='bold'>
                  {actualUser?.name ?? 'ricardo'} {actualUser?.lastName ?? 'menendez'}
                </Text>
              </Skeleton>
              <Skeleton loading={isUserDataPending}>
                <Text fontWeight='medium' fontSize='sm' color='#1e3a8a' textDecoration='underline'>
                  {actualUser?.roleId === UserRoles.Owner ? 'Propietario' : 'Inquilino'}
                </Text>
              </Skeleton>
            </Flex>
          </Flex>
        )}
      
      {isExpanded && (
      <Box flexBasis='10%'>
        <SelectorTypeComponent />
      </Box>
      )}

        <Box flexBasis='50%'>
          <VStack gap={2} align='stretch'>
            {links.map((link) => (
              <Link key={link.path} to={link.path}>
                <ButtonIconComponent
                  isActive={location.pathname.includes(link.path)}
                  icon={link.icon}
                  text={showText ? link.title : ''}
                />
              </Link>
            ))}
          </VStack>
        </Box>

        <Box flexBasis='20%'>
          <VStack gap={6} align='stretch' mt={10}>
            <ButtonIconComponent
              isActive={false}
              onClick={handleLogout}
              icon={<RxExit />}
              text={showText ? t('logout') : ''}
            />
          </VStack>
        </Box>
      </Flex>
    </>
  );
};

export default Sidebar;
