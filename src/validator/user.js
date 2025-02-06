import vine from "@vinejs/vine";


const userToAddSchema = vine.object({
    email: vine.string().email().trim().minLength(1).maxLength(250),
    password: vine
        .string()
        .minLength(8)
        .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&]).{8,}$/)
        .maxLength(250),
    last_name: vine.string().trim().minLength(1).maxLength(250),
    first_name: vine.string().trim().minLength(1).maxLength(250),
    user_name: vine.string().trim().minLength(1).maxLength(250),
    bio: vine.string().maxLength(500),
    picture_path: vine.string().minLength(1).maxLength(250)
});


const userToUpdateSchema = vine.object({
    id: vine.number(),
    email: vine.string().email().trim().maxLength(250).optional(),
    password: vine
        .string()
        .minLength(8)
        .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&]).{8,}$/,)
        .maxLength(250)
        .optional(),
    last_name: vine.string().trim().minLength(1).maxLength(250).optional(),
    first_name: vine.string().trim().minLength(1).maxLength(250).optional(),
    user_name: vine.string().trim().minLength(1).maxLength(250).optional(),
    bio: vine.string().minLength(1).maxLength(500).optional(),
    picture_path: vine.string().maxLength(250).optional()
});


export const
    userToAdd = vine.compile(userToAddSchema),
    userToUpdate = vine.compile(userToUpdateSchema);
