import vine from "@vinejs/vine";

const messageToAddSchema = vine.object({
    content: vine.string().minLength(1).maxLength(250),
    type: vine.number().max(10),
    user_id: vine.number(),
    discussion_event_id: vine.number()
});

const messageToUpdateSchema = vine.object({
    id: vine.number(),
    content: vine.string().minLength(1).maxLength(250).optional(),
    type: vine.number().max(10).optional(),
    user_id: vine.number().optional(),
    discussion_event_id: vine.number().optional()
});

export const
    messageToAdd = vine.compile(messageToAddSchema),
    messageToUpdate = vine.compile(messageToUpdateSchema);