import vine from "@vinejs/vine";

const notificationToAddSchema = vine.object({
    title: vine.string().trim().minLength(1).maxLength(250),
    content: vine.string().trim().minLength(1).maxLength(250),
    event_id: vine.number(),
    creation_date: vine.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    type: vine.string().trim().minLength(1).maxLength(250)
});

const notificationToUpdateSchema = vine.object({
    id: vine.number(),
    title: vine.string().trim().minLength(1).maxLength(250).optional(),
    content: vine.string().trim().minLength(1).maxLength(250).optional(),
    event_id: vine.number().optional(),
    creation_date: vine.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    type: vine.string().trim().minLength(1).maxLength(250).optional()
});

export const
    notificationToAdd = vine.compile(notificationToAddSchema),
    notificationToUpdate = vine.compile(notificationToUpdateSchema);