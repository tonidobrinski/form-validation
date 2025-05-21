import { z } from "zod";

export const step2Schema = z.object({
  avatar: z
    .custom<FileList>((val) => val instanceof FileList, {
      message: "You must select a file.",
    })
    .refine((files) => files.length === 1, {
      message: "You must select exactly one file.",
    })
    .refine((files) => files[0]?.type.startsWith("image/"), {
      message: "Only image files are allowed.",
    }),
});
