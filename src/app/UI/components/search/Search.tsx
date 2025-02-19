import { Box, Flex, HStack, Input } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FaSortAmountDownAlt } from 'react-icons/fa'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { IoSearch } from 'react-icons/io5'
import { Link } from 'react-router-dom'

import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from '@/components/ui/menu'
import { TenantRoles } from '@/constants/tenant-constants'
import { useTenantStore } from '@/stores/tenantStore'

export const SearchWithFiltersAndNotification = () => {
  const { t } = useTranslation()
  const tenantRole = useTenantStore((state) => state.tenantRole)

  return (
    <HStack display={'flex'} flexDirection={{base: 'column', md: 'row'}} gap={{base: '1', md: '6'}} width='full' align='center' bg={'white'} mb={2} py={2} px={{base: '2', md: '2'}}>
      {/* este es mi inputt de búsqueda */}
      <Flex width={{md: '50%'}}>
        <Input
          placeholder={t('search')}
          variant={'outline'}
          pr={{base: '60px', md: '20px'}}
          _placeholder={{ color: 'black.500' }}
          _hover={{ borderColor: 'black.400' }}
        />

        <Button bg={'#1e3a8a'}>
          <IoSearch />
        </Button>
      </Flex>

      {/* este es mi menu de filtros*/}
      <Box width={{base: '100%', md: '50%'}} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
        <MenuRoot>
          <MenuTrigger asChild>
            <Button variant='outline' size='sm' display='flex' alignItems='center' gap='8px' borderColor='gray.300'>
              {t('filter')}
              <FaSortAmountDownAlt size='16px' color='black' />
            </Button>
          </MenuTrigger>
          <MenuContent>
            <MenuItem value='new-txt'>{t('minorPrice')}</MenuItem>
            <MenuItem value='new-file'>{t('majorPrice')}</MenuItem>
          </MenuContent>
        </MenuRoot>
        {tenantRole == TenantRoles.outgoing && (
          <Button asChild bg={'#1e3a8a'}>
            <Link to='create-property'>{t('createAd')}</Link>
          </Button>
        )}
        <IoMdNotificationsOutline fontSize='24px' color='gray.700' cursor='pointer' />
      </Box>
    </HStack>
  )
}
