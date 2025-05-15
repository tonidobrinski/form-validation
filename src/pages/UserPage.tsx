import { Box, Button, Heading, Text, VStack, Avatar } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import labelStrings from "../utils/labelStrings.json";

const UserPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    localStorage.clear();
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      p={4}
    >
      <VStack
        spacing={6}
        bg="white"
        p={8}
        borderRadius="md"
        boxShadow="lg"
        width="100%"
        maxWidth="400px"
        align="center"
      >
        {(localStorage.getItem("userImage") as string) ? (
          <Avatar
            size="xl"
            name="User"
            src={localStorage.getItem("userImage") as string}
          />
        ) : (
          <Avatar size="xl" name="User" src="src\assets\danAbramov.webp" />
        )}
        <Heading as="h1" size="lg" color="teal.600">
          Hello, {localStorage.getItem("userFirstName")}{" "}
          {localStorage.getItem("userLastName")}!
        </Heading>
        <Text fontSize="lg" color="gray.500">
          {labelStrings.welcomeMessageAfterSignUp}
        </Text>
        <Button colorScheme="teal" width="full" onClick={handleLogout}>
          {labelStrings.logoutButton}
        </Button>
      </VStack>
    </Box>
  );
};

export default UserPage;
