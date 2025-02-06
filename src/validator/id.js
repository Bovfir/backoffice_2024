import vine from "@vinejs/vine";

const IDSchema = vine.object({
    id: vine.number()
});

export const
    idDelete = vine.compile(IDSchema);
