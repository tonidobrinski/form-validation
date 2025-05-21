import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Step1FormData, Step2FormData } from "../types/types";
import labelStrings from "../utils/labelStrings.json";
import "../styles/Step2Form.scss";
import userProfilePreview from "../assets/userProfilePreview.png";
import { step2Schema } from "../schemas/FileUploadSchema";

interface Step2FormProps {
  onSubmit: (data: Step1FormData & Step2FormData) => void;
  onBack: () => void;
}

const Step2Form = ({ onSubmit, onBack }: Step2FormProps) => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [fileSelected, setFileSelected] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
        localStorage.setItem("userImage", reader.result as string);
      };
      reader.readAsDataURL(file);

      // Add delay to allow mobile browsers to update the file input fully
      setTimeout(() => {
        setFileSelected(true);
        trigger("avatar");
      }, 100);
    }
  };

  const onSubmitHandler: SubmitHandler<Step2FormData> = (data) => {
    if (!fileSelected) return;
    onSubmit(data as Step1FormData & Step2FormData);
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmitHandler)} id="step2-form">
      <VStack spacing={4}>
        <FormControl isInvalid={!!errors.avatar} className="form-control">
          {avatarPreview ? (
            <div className="image-container">
              <Image
                src={avatarPreview}
                className="avatar-image"
                alt="Avatar Preview"
                boxSize="125px"
                objectFit="cover"
                rounded="full"
                mt={2}
              />
            </div>
          ) : (
            <Image
              src={userProfilePreview}
              className="avatar-image"
              alt="Avatar Preview"
              boxSize="125px"
              objectFit="cover"
              mt={2}
            />
          )}
          <div>
            <FormLabel className="form-control__title" cursor="pointer">
              {labelStrings.uploadAvatar}
            </FormLabel>
          </div>
          <Input
            className="form-control__input"
            type="file"
            accept="image/*"
            {...register("avatar")}
            onChange={handleFileChange}
            cursor="pointer"
          />
          <FormErrorMessage>{errors.avatar?.message}</FormErrorMessage>
        </FormControl>

        <div className="buttons-group">
          <Button onClick={onBack} colorScheme="gray">
            {labelStrings.backButton}
          </Button>
          <Button type="submit" colorScheme="teal">
            {labelStrings.signUpButton}
          </Button>
        </div>
      </VStack>
    </Box>
  );
};

export default Step2Form;
