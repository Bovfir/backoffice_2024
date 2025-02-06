const foreignKeyEditable = {
    event: {
        location_id : "location",
        category_id : "category",
        user_id :  "user",
    },
    notification: {
        event_id: "event",
    },
    linkUserEvent : {
        user_id:  "user",
        event_id: "event",
    },
    message : {
        user_id:  "user",
        discussion_event_id : "discussionEvent"
    },
    discussionEvent : {
        event_id: "event",
    }
};


export default foreignKeyEditable;