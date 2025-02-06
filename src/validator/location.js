import vine from "@vinejs/vine";

const locationToAddSchema = vine.object({
    label: vine.string().trim().minLength(1).maxLength(250),
    postal_code: vine.number()
});

const locationToUpdateSchema = vine.object({
    id: vine.number(),
    label: vine.string().trim().minLength(1).maxLength(250).optional(),
    postal_code: vine.number().optional()
});


export const
    locationToAdd = vine.compile(locationToAddSchema),
    locationToUpdate = vine.compile(locationToUpdateSchema);