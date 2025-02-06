

const routes= {
    event: {
        nbElem : "/event/nbEvents/search?",
        totalCount: "/event/nbEvents/count/",
        keys: "/get/allTitle",
        delete: "/event/many/deleteEvent/",
        search: "/search/events/search?",
        searchedTotalCount : "/search/events/count?",
        searchedPublicEvents : "/search/events/type/public?",
        searchPublicEventTotalCount : "/search/nbRows/type/public",
        searchCombinePublicEvent : "/search/events/publicAndSearch?",
        countRowsGetCombineSearchPublicTotalCount : "/search/nbRows/publicAndSearch?"
    },
    notification: {
        nbElem: "/notification/nbNotifications/search?",
        totalCount: "/notification/nbNotifications/count/",
        keys: "/get/allTitle",
        delete : "/notification/many/deleteNotification/"
    },
    category : {
        nbElem : "/category/nbCategories/search?",
        totalCount: "/category/nbCategories/count/",
        delete: "/category/many/deleteCategory/"
    },
    location : {
        nbElem : "/location/nbLocations/search?",
        totalCount: "/location/nbLocations/count/",
        delete : "/location/many/deleteLocation/"
    },
    admin: {
        nbElem : "/admin/nbUsers/search?",
        totalCount: "/admin/nbUsers/count/",
        keys : "/get/allTitle",
        delete : "/admin/many/deleteUser/"
    },
    linkUserEvent : {
        nbElem : "/linkUserEvent/nbLinkUserEvents/search?",
        totalCount: "/linkUserEvent/nbLinkUserEvents/count/",
        keys: "/get/allTitle",
        delete: "/linkUserEvent/many/deleteLinkUserEvent/"
    },
    message : {
        nbElem: "/message/nbMessages/search?",
        totalCount: "/message/nbMessages/count/",
        keys: "/get/allTitle",
        delete: "/message/many/deleteMessages/"
    },
    discussionEvent : {
        nbElem : "/discussionEvent/nbDiscussionsEvent/search?",
        totalCount: "/discussionEvent/nbDiscussionsEvent/count/",
        keys: "/get/allTitle",
        delete: "/discussionEvent/many/deleteDiscussionEvent/"
    }
};

export default routes;