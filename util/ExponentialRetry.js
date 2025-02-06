const exponentialRetry = async (fn, retries = 3, delay = 500, factor = 2) => {
    let attempt = 0;

    while (attempt < retries) {
        try {
            return await fn();
        } catch (error) {
            if (!error.status || error.status < 500) {
                throw error;
            }

            attempt++;

            if (attempt >= retries) {
                throw error;
            }

            const backoff = delay * Math.pow(factor, attempt);
            await new Promise((resolve) => setTimeout(resolve, backoff));
        }
    }
};

export { exponentialRetry };

