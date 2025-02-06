import * as eventValidator from "./event.js";
import * as categoryValidator from "./category.js";
import * as userValidator from "./user.js";
import * as locationValidator from "./location.js";
import * as linkUserEventValidator from "./linkUserEvent.js";
import * as notificationValidator from "./notification.js";
import * as discussionEventValidator from "./discussionEvent.js";
import * as messageValidator from "./message.js";
import * as idValidator from "./id.js";

const validate = async (data, validator) => {
    try {
        return await validator.validate(data);
    } catch (error) {
        const validationErrors = error.messages.map((err) => ({
            field: err.field,
            message: err.message,
        }));
        throw new Error(
            JSON.stringify({
                message: 'Validation failed',
                errors: validationErrors,
            })
        );
    }
};

export const validation = {
    event: {
        add: async (data) => {
            return await validate(data, eventValidator.eventToAdd);
        },
        update: async (data) => {
            return await validate(data, eventValidator.eventToUpdate);
        }
    },
    category: {
        add: async (data) => {
            return await validate(data, categoryValidator.categoryToAdd);
        },
        update: async (data) => {
            return await validate(data, categoryValidator.categoryToUpdate);
        }
    },
    admin: {
        add: async (data) => {
            return await validate(data, userValidator.userToAdd);
        },
        update: async (data) => {
            return await validate(data, userValidator.userToUpdate);
        }
    },
    location : {
        add : async (data) => {
            return await validate(data, locationValidator.locationToAdd);
        },
        update : async (data) => {
            return await validate(data, locationValidator.locationToUpdate);
        }
    },
    linkUserEvent : {
        add : async (data) => {
            return await validate(data, linkUserEventValidator.linkUserEventToAdd);
        },
        update : async (data) => {
            return await validate(data, linkUserEventValidator.linkUserEventToUpdate);
        }
    },
    notification : {
        add : async (data) => {
            return await validate(data, notificationValidator.notificationToAdd);
        },
        update : async (data) => {
            return await validate(data, notificationValidator.notificationToUpdate);
        }
    },
    discussionEvent : {
        add : async (data) => {
            return await validate (data,discussionEventValidator.discussionEventToAdd);
        },
        update : async (data) => {
            return await validate(data, discussionEventValidator.discussionEventToUpdate);
        }
    },
    message : {
        add : async (data) => {
            return await validate (data, messageValidator.messageToAdd);
        },
        update : async (data) => {
            return await validate(data, messageValidator.messageToUpdate);
        }
    },
    identifiant : {
        delete : async (data) => {
            return await validate (data, idValidator.idDelete);
        }
    }
};
