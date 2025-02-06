
const errorToString = (error) => {
    if (error.response) {
        const status = error.response.status;
        switch (status) {
            case 400:
                return "Bad input. Please try again.";
            case 401:
                return "Unauthorized. Please check your credentials.";
            case 403:
                return "Forbidden. You do not have access.";
            case 404:
                return "Wrong values. Please try again.";
            case 409:
                return "Value already exists. Please, try again.";
            case 500:
                return "Internal server error. Please try again later.";
            default:
                return `Unexpected error (Code: ${status}).`;
        }
    } else if (error.request) {
        return "No response from the server. Please check your connection.";
    } else {
        return `Request failed. Please try again.`;
    }
};


export {errorToString};