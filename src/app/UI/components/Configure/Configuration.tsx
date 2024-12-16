import { useState } from "react";
import { Flex, Stack, Box, Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { TbMenuDeep } from "react-icons/tb";
import { Outlet, Link, useLocation } from "react-router-dom";

export const Configuration = () => {
  const { t } = useTranslation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const viewConfigure = [
    { path: "", title: t("configure.language.title") },
    { path: "notificationSetting", title: t("configure.notificationSetting.title") },
    { path: "passwordManagement", title: t("configure.passwordManagement.title") },
    { path: "deleteAccount", title: t("configure.delete-account.title") },
  ];

  const location = useLocation();
  const partialPathname = location.pathname.split("/").slice(2);
  const pathname = partialPathname.length === 0 ? "" : partialPathname[0];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <Flex flexDirection="column">
      <Box display={{ base: "flex", lg: "none" }} flexDirection="column">
        <Button bg="white" justifyContent={'start'} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <TbMenuDeep size={24} color="black"/>
        </Button>
        {isMenuOpen && (
          <Box position="absolute" w="19em" mt="40px" bg="white" boxShadow="md" p={2} borderRadius="md">
            <Stack display={'flex'} wrap="wrap" alignItems={'start'} direction="column">
              {viewConfigure.map((item) => (
                <Link key={item.path} to={`${item.path}`} onClick={handleLinkClick}>
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
        {viewConfigure.map((item) => (
          <Link key={item.path} to={`${item.path}`}>
            <Button
              size={{ base: "sm", lg: "md" }}
              variant="outline"
              borderColor={pathname === item.path ? "blue.500" : "gray.300"}
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
  );
};
