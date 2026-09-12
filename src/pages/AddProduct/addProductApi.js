export const addProductApi = async (newProduct) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true, data: newProduct });
        }, 1000);
    });
};
