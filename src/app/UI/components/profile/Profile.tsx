import { Box, Button, Flex, Stack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { TbMenuDeep } from "react-icons/tb";
import { useState } from 'react';

export const Profile = () => {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const viewProfile = [
    { path: '', title: t('myProfile') },
    { path: 'mis-anuncios', title: t('myAds') },
    { path: 'candidatos-enviados', title: t('sendedCandidates') },
    { path: 'notificaciones', title: t('notifications') },
    { path: 'mi-rating', title: t('myRating') },
  ]
  const location = useLocation()
  const partialPathname = location.pathname.split('/').slice(2)
  const pathname = partialPathname.length == 0 ? '' : partialPathname[0]
  return (
    <Flex flexDirection='column'>
      <Box zIndex={100} display={{ base: "flex", lg: "none" }} flexDirection="column">
        <Button bg="white" justifyContent={'start'} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <TbMenuDeep size={24} color="black" />
        </Button>
        {isMenuOpen && (
          <Box position="absolute" w="17em" mt="40px" bg="white" boxShadow="md" p={2} borderRadius="md">
            <Stack display={'flex'} alignItems={'start'} wrap={'wrap'} justifyContent={'start'} direction={'column'}>
              {viewProfile.map((item) => (
                <Link key={item.path} to={`${item.path}`}>
                  <Button
                    size={{ base: "sm", lg: "md" }}
                    colorScheme={pathname === item.path ? "blue" : "gray"}
                    variant="ghost"
                    w="100%"
                  >
                    {item.title}
                  </Button>
                </Link>
              ))}
            </Stack>
          </Box>
        )}
      </Box>

      {/* Menú para pantallas grandes */}
      <Stack display={{ base: "none", lg: "flex" }} wrap="wrap" justifyContent="center" direction="row">
        {viewProfile.map((item) => (
          <Link key={item.path} to={`${item.path}`}>
            <Button
              key={item.path}
              size={{ base: 'sm', lg: 'md' }}
              colorPalette={'border'}
              variant='outline'
              borderColor={pathname == item.path ? 'blue' : '#ccc'}
            >
              {item.title}
            </Button>
          </Link>
        ))}
      </Stack>
      <Box mt={4}>
        <Outlet />
      </Box>
    </Flex>
  )
}
