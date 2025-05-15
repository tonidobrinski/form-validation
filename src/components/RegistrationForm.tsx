import { useState } from "react";
import Step1Form from "./Step1Form";
import Step2Form from "./Step2Form";
import { Step1FormData, Step2FormData } from "../types/types";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Button,
  Box,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import labelStrings from "../utils/labelStrings.json";
import "../styles/RegistrationForm.scss";

const RegistrationForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [step, setStep] = useState(1);
  const [step1Data, setStep1Data] = useState<Step1FormData | null>(null);
  const navigate = useNavigate();

  const handleStep1Submit = (data: Step1FormData) => {
    sessionStorage.setItem("step1DataFirstName", data.firstName);
    sessionStorage.setItem("step1DataLastName", data.lastName);
    sessionStorage.setItem("step1DataInterests", data.interests.toString());
    setStep1Data(data);
    console.log(step1Data);
    setStep(2);
  };

  const handleFinalSubmit = (step2Data: Step2FormData) => {
    const finalData = { ...step1Data, ...step2Data };
    localStorage.setItem(
      "userFirstName",
      finalData.firstName?.toString() as string
    );
    localStorage.setItem(
      "userLastName",
      finalData.lastName?.toString() as string
    );
    console.log("Final form submission:", finalData);
    onClose();
    clearFormState();
    navigate("/user");
  };

  const clearFormState = () => {
    setStep(1);
    setStep1Data(null);
    sessionStorage.clear();
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="teal">
        {labelStrings.signUpButton}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent id="registration-modal">
          <Box px={6} pt={4}>
            <Flex justify="space-between" align="center">
              <Flex direction="column" align="center" flex={1}>
                <Box
                  boxSize="8"
                  borderRadius="full"
                  bg="teal.500"
                  color="white"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontWeight="bold"
                  fontSize="1.1rem"
                  padding="1.3rem"
                >
                  {step > 1 ? "✓" : "1"}
                </Box>
              </Flex>
              <Box
                flex={1}
                height="2px"
                bg={step === 2 ? "teal.500" : "gray.300"}
                mx={2}
              />
              <Flex direction="column" align="center" flex={1}>
                <Box
                  boxSize="8"
                  borderRadius="full"
                  bg={step === 2 ? "teal.500" : "gray.300"}
                  color="white"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontWeight="bold"
                  fontSize="1.1rem"
                  padding="1.3rem"
                >
                  2
                </Box>
              </Flex>
            </Flex>
          </Box>
          <ModalBody>
            {step === 1 && (
              <Step1Form onNext={handleStep1Submit} onClose={onClose} />
            )}
            {step === 2 && (
              <Step2Form
                onSubmit={handleFinalSubmit}
                onBack={() => setStep(1)}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RegistrationForm;
