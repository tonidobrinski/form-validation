import { z } from "zod";

export const step2Schema = z.object({
  avatar: z
    .instanceof(FileList)
    .refine((files) => files.length === 1, "You must select exactly one file.")
    .refine(
      (files) => files[0]?.type.startsWith("image/"),
      "Only image files are allowed."
    ),
});
