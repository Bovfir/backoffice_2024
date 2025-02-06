const typeDectector = (value) => {

    // Vérifier si la valeur est une chaîne de type date au format 'YYYY-MM-DD'
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // 'YYYY-MM-DD'

    // Vérifier si la valeur est au format 'YYYY-MM-DD HH:MM' (format que datetime-local utilise)
    const dateTimeLocalRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/; // 'YYYY-MM-DD HH:MM'

    // Vérifier si la valeur est au format ISO 8601 (avec les millisecondes et le 'Z')
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/; // 'YYYY-MM-DDTHH:MM:SS.SSSZ'

    // Détecter le type
    const type = typeof value === "boolean" ? "boolean"
        : typeof value === "number" ? "number"
            : (typeof value === "string" && dateRegex.test(value)) ? "date" // 'YYYY-MM-DD'
                : (typeof value === "string" && dateTimeLocalRegex.test(value)) ? "datetime-local" // 'YYYY-MM-DD HH:MM'
                    : (typeof value === "string" && isoDateRegex.test(value)) ? "date" // ISO 8601 format
                        : "text";


    return type;
};


const initValues = (initialValues,type,columns) => {
    let initData;
    if (type === "Update") {
        initData = initialValues;
    } else {
        initData = {}
        Object.keys(columns).forEach((key) => {
            initData[key] = columns[key];
        });
    }
    return initData;
};

export { typeDectector , initValues };
