import vine from "@vinejs/vine";

const discussionEventToAddSchema = vine.object({
    title: vine.string().trim().minLength(1).maxLength(250),
    is_writable: vine.boolean(),
    event_id: vine.number()
});

const discussionEventToUpdateSchema = vine.object({
    id: vine.number(),
    title: vine.string().trim().minLength(1).maxLength(250).optional(),
    is_writable: vine.boolean().optional(),
    event_id: vine.number().optional()
});


export const
    discussionEventToAdd = vine.compile(discussionEventToAddSchema),
    discussionEventToUpdate = vine.compile(discussionEventToUpdateSchema);