const detailsTableStyles = {
    formContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "80%",
        maxWidth: "800px",
        margin: "0 auto",
    },
    formField: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 0",
    },
    label: {
        width: "30%",
        fontSize: "1rem",
        fontWeight: "bold",
        color: "#333",
        marginRight: "20px",
    },
    input: {
        width: "65%",
        padding: "8px",
        fontSize: "1rem",
        border: "1px solid #ccc",
        borderRadius: "4px",
        backgroundColor: "#f9f9f9",
        outline: "none",
        transition: "border-color 0.3s ease",
    },
    select: {
        width: "65%",
        padding: "8px",
        fontSize: "1rem",
        border: "1px solid #ccc",
        borderRadius: "4px",
        backgroundColor: "#f9f9f9",
        outline: "none",
        transition: "border-color 0.3s ease",
    },
    button: {
        padding: "10px 20px",
        fontSize: "1rem",
        backgroundColor: "#8947B8",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        marginTop: "20px",
        transition: "background-color 0.3s ease",
    },
    error: {
        color: "red",
        fontSize: "0.9rem",
        marginTop: "10px",
    },
};

export default detailsTableStyles;
