import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { createStep1Schema } from "../schemas/FormSchema";
import { z } from "zod";
import { Step1FormData } from "../types/types";
import bcrypt from "bcryptjs";
import "../styles/Step1Form.scss";

interface Step1FormProps {
  onNext: (data: Step1FormData) => void;
  onClose: () => void;
}

const Step1Form = ({ onNext, onClose }: Step1FormProps) => {
  const [interestsOptions, setInterestsOptions] = useState<string[]>([]);
  const [schema, setSchema] = useState<z.ZodTypeAny>(() =>
    createStep1Schema([])
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<Step1FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: sessionStorage.getItem("step1DataFirstName") ?? "",
      lastName: sessionStorage.getItem("step1DataLastName") ?? "",
      password: "",
      confirmPassword: "",
      interests: sessionStorage.getItem("step1DataInterests")?.split(",") ?? [],
    },
  });

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const res = await fetch("/interests.json");
        const data = await res.json();
        setInterestsOptions(data);
        setSchema(() => createStep1Schema(data));
        reset((prev) => ({ ...prev }));
      } catch (error) {
        console.error("Failed to load interests", error);
      }
    };

    fetchInterests();
  }, [reset]);

  const onSubmit: SubmitHandler<Step1FormData> = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const hashedConfirmPassword = await bcrypt.hash(data.confirmPassword, 10);

    onNext({
      ...data,
      password: hashedPassword,
      confirmPassword: hashedConfirmPassword,
    });
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} id="step1-form">
      <FormLabel className="form-control step1-form__title">Account Info</FormLabel>
      <FormControl isInvalid={!!errors.firstName} className="form-control">
        <Input placeholder="First name" {...register("firstName")} />
        <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.lastName} className="form-control">
        <Input placeholder="Last name" {...register("lastName")} />
        <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.password} className="form-control">
        <Input
          placeholder="Your password"
          type="password"
          {...register("password")}
        />
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>

      <FormControl
        isInvalid={!!errors.confirmPassword}
        className="form-control"
      >
        <Input
          placeholder="Confirm your password"
          type="password"
          {...register("confirmPassword")}
        />
        <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.interests} className="form-control">
        <FormLabel>Select your interests (max 2)</FormLabel>
        <Controller
          name="interests"
          control={control}
          render={({ field }) => (
            <CheckboxGroup value={field.value} onChange={field.onChange}>
              <Stack direction="row" wrap="wrap" className="checkbox-group">
                {interestsOptions.map((interest) => (
                  <Checkbox
                    key={interest}
                    value={interest}
                    isDisabled={
                      field.value.length >= 2 && !field.value.includes(interest)
                    }
                  >
                    {interest}
                  </Checkbox>
                ))}
              </Stack>
            </CheckboxGroup>
          )}
        />
        <FormErrorMessage>{errors.interests?.message}</FormErrorMessage>
      </FormControl>
      <div className="buttons-group">
        <Button onClick={onClose} colorScheme="gray">
          Close
        </Button>
        <Button type="submit" colorScheme="teal" className="form-button">
          Next
        </Button>
      </div>
    </Box>
  );
};

export default Step1Form;
