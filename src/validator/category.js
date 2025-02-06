import vine from "@vinejs/vine";

const categoryToAddSchema = vine.object({
    title: vine.string().trim().minLength(1).maxLength(250),
    icon_component_name: vine.string().trim().minLength(1).maxLength(250),
    icon_name: vine.string().trim().minLength(1).maxLength(250),
});

const categoryToUpdateSchema = vine.object({
    id: vine.number(),
    title: vine.string().trim().minLength(1).maxLength(250).optional(),
    icon_component_name: vine.string().trim().minLength(1).maxLength(250).optional(),
    icon_name: vine.string().trim().minLength(1).maxLength(250).optional(),
});

export const
    categoryToAdd = vine.compile(categoryToAddSchema),
    categoryToUpdate = vine.compile(categoryToUpdateSchema);
