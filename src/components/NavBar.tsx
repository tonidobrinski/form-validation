import { Box, Flex, Button, Spacer } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "../styles/NavBar.scss";
import RegistrationForm from "./RegistrationForm";
import labelStrings from "../utils/labelStrings.json";

const NavBar = () => {
  return (
    <Box as="nav" p={4} className="navbar">
      <Flex align="center">
        <Link to="/">
          <Button colorScheme="teal" variant="link" fontSize="xl">
            {labelStrings.homeButton}
          </Button>
        </Link>
        <Spacer />
        <RegistrationForm />
      </Flex>
    </Box>
  );
};

export default NavBar;
