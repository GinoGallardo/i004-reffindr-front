import { Box, Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

import { SearchWithFiltersAndNotification } from '@/app/UI/components/search/Search'
import Sidebar from '@/app/UI/components/Sidebar/Sidebar'
import { Breadcrumb } from '@/app/UI/components/breadcrumb/Breadcrumb'

export const HomeLayout = () => {
  return (
    <Flex >
      <Box flexShrink={0} zIndex={'100'}>
        <Sidebar />
      </Box>
      <Box h={'100vh'} flexGrow={1} ml={{base:'55px', lg:'277px'}} p={{base: '15px', md: '20px'}} bgColor={'#edf2f7'}>
        <Box mb={3}>
          <SearchWithFiltersAndNotification />
            <Breadcrumb />
        </Box>
        <Outlet />
      </Box>
    </Flex>
  )
}