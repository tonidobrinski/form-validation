import { Box, Heading, Text, Stack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "../styles/WelcomeMessage.scss";

const WelcomeMessage = () => {
  return (
    <Box id="welcome-message">
      <Stack spacing={4}>
        <Heading as="h1" size="2xl">
          Welcome to the Form Submission Project
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }} maxW="600px" mx="auto">
          This project showcases a modern multi-step form built with React,
          Chakra UI, and form validation tools. Upload files, select interests,
          and enjoy a responsive UI.
        </Text>
        <Box>
          <Link to="/form">
            <Button colorScheme="teal" size="lg" mt={4}>
              Get Started
            </Button>
          </Link>
        </Box>
      </Stack>
    </Box>
  );
};

export default WelcomeMessage;
