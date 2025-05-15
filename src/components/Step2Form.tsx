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
import { z } from "zod";
import { Step1FormData, Step2FormData } from "../types/types";
import "../styles/Step2Form.scss";

interface Step2FormProps {
  onSubmit: (data: Step1FormData & Step2FormData) => void;
  onBack: () => void;
}

const Step2Form = ({ onSubmit, onBack }: Step2FormProps) => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step2FormData>({
    resolver: zodResolver(
      z.object({
        avatar: z
          .instanceof(FileList)
          .refine(
            (files) => files.length === 1,
            "You must select exactly one file."
          )
          .refine(
            (files) => files[0]?.type.startsWith("image/"),
            "Only image files are allowed."
          ),
      })
    ),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setAvatarPreview(fileReader.result as string);
        localStorage.setItem("userImage", fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const onSubmitHandler: SubmitHandler<Step2FormData> = (data) => {
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
              src="src\assets/userProfilePreview.png"
              className="avatar-image"
              alt="Avatar Preview"
              boxSize="125px"
              objectFit="cover"
              mt={2}
            />
          )}
          <div className="asd">
            <FormLabel className="form-control__title" cursor="pointer">
              Upload Avatar
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
            Back
          </Button>
          <Button type="submit" colorScheme="teal">
            Sign Up
          </Button>
        </div>
      </VStack>
    </Box>
  );
};

export default Step2Form;
