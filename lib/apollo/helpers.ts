export const getErrors = (error: any) => {
    let errors: any = [];
    if (error.graphQLErrors && error.graphQLErrors.length) {
        errors = error.graphQLErrors.map((error: any) => error.message.message || error.message.error);
    } else if (error.networkError && error.networkError.result.errors.length) {
        errors = error.networkError.result.errors.map((error: any) => error.message || error.error);
    }

    return errors;
};
