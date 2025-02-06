import vine from "@vinejs/vine";

const linkUserEventToAddSchema = vine.object({
    event_id: vine.number(),
    user_id: vine.number(),
    is_waiting: vine.boolean(),
    is_accepted: vine.boolean(),
});

const linkUserEventToUpdateSchema = vine.object({
    id: vine.number(),
    event_id: vine.number().optional(),
    user_id: vine.number().optional(),
    is_waiting: vine.boolean().optional(),
    is_accepted: vine.boolean().optional(),
});

export const
    linkUserEventToAdd = vine.compile(linkUserEventToAddSchema),
    linkUserEventToUpdate = vine.compile(linkUserEventToUpdateSchema);