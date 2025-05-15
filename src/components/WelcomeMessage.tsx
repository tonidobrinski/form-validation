import { Box, Heading, Text, Stack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "../styles/WelcomeMessage.scss";
import labelStrings from "../utils/labelStrings.json";

const WelcomeMessage = () => {
  return (
    <Box id="welcome-message">
      <Stack spacing={4}>
        <Heading as="h1" size="2xl">
          Welcome to the Form Submission Project
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }} maxW="600px" mx="auto">
          {labelStrings.welcomeMessage}
        </Text>
        <Box>
          <Link to="/form">
            <Button colorScheme="teal" size="lg" mt={4}>
              {labelStrings.getStartedButton}
            </Button>
          </Link>
        </Box>
      </Stack>
    </Box>
  );
};

export default WelcomeMessage;
