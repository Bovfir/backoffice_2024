export const columnsNames = {
    event: {
        general: {
            id: "ID",
            title: "Title",
            category: "Category",
            user_name: "Creator",
            locality: "Location",
        },
        details : {
            id: "ID",
            title: "Title",
            description: "Description",
            event_start: "Event Start",
            event_end : "Event End",
            street_number: "Street Number",
            picture_path: "Image",
            is_private: "Private",
            user_name: "Creator",
            location_id: "Location",
            category_id: "Category",
        },
        ignore : {
            id: "id",
            user_name: "user_name"
        },
        add : {
            title : "",
            description : "",
            event_start: new Date().toISOString().slice(0,16).replace('T',' '),
            event_end: new Date().toISOString().slice(0,16).replace('T',' '),
            street_number: "",
            picture_path: "",
            is_private: false,
            user_id: null,
            location_id: null,
            category_id: null,
        },
    },
    categoryName: {
        general : {
            id: "ID",
            title: "Name",
        },
        details : {
            id: "ID",
            title: "Name",
            icon_name : "Icon Name",
            icon_component_name : "Icon Component",
        },
        ignore : {
            id: "id"
        },
        add : {
            title : "",
            icon_name : "",
            icon_component_name : "",
        },
    },
    userName : {
        general : {
            id: "ID",
            email: "Email",
            user_name: "User name",
            bio: "Biographie"
        },
        details : {
            id : "ID",
            email: "Email",
            last_name: "Last Name",
            first_name: "First Name",
            user_name: "User name",
            bio: "Biographie",
            picture_path: "Avatar"
        },
        ignore : {
            id: "id",
        },
        add : {
            email : "",
            password: "",
            last_name: "",
            first_name: "",
            user_name: "",
            bio: "",
            picture_path : ""
        },
    },
    locationName: {
        general : {
            id : "ID",
            label : "Label"
        },
        details : {
            id : "ID",
            label : "Label",
            postal_code : "Postal Code"
        },
        ignore : {
            id : "id"
        },
        add : {
            label : "",
            postal_code : 0
        },
    },
    linkUserEvent : {
        general : {
            id : "ID",
            user_name : "User Name",
            event: "Event",
            is_waiting : "Waiting",
            is_accepted: "Accepted"
        },
        details : {
            id : "ID",
            user_name : "User Name",
            event: "Event",
            is_waiting : "Waiting",
            is_accepted: "Accepted",
        },
        ignore : {
            id : "ID",
            user_name : "user_name",
            event: "event",
        },
        add : {
            user_id : null,
            event_id : null,
            is_waiting : true,
            is_accepted: false
        },
    },
    notificationName: {
        general : {
            id: "ID",
            title: "Title",
            event: "Event",
        },
        details : {
            id: "ID",
            title: "Title",
            content: "Content",
            event: "Event",
            creation_date: "Creation Date",
            type: "Type",
        },
        ignore : {
            id: "id",
            event: "event"
        },
        add : {
            title : "",
            content : "",
            event_id : null,
            creation_date : new Date().toISOString().slice(0, 10),
            type : ""
        },
    },
    messageName : {
        general : {
            id : "ID",
            content : "Content",
            user_name : "User name",
            discussion_event : "Discussion Event",
        },
        details : {
            id : "ID",
            content : "Content",
            type : "Type",
            sending_date : "Sending Date",
            user_name : "User name",
            discussion_event : "Discussion Event",
        },
        ignore : {
            id : "id",
            user_name : "user_name",
            sending_date:"sending_date",
            discussion_event : "discussion_event_id",
        },
        add : {
            content : "",
            type : 0,
            sending_date: new Date().toISOString().slice(0, 10),
            user_id : null,
            discussion_event_id : null,
        },
    },
    discussionEventName : {
        general : {
            id : "ID",
            title: "Title",
            event : "Event"
        },
        details : {
            id : "ID",
            title: "Title",
            is_writable : "Writable",
            event : "Event"
        },
        ignore : {
            id : "id",
            event : "event"
        },
        add : {
            title : "",
            is_writable : false,
            event_id : null
        },
    }
};