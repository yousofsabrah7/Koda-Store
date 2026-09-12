export const validateProductForm = (formData) => {
    const newErrors = {};

    // 1. التحقق من اسم المنتج
    if (!formData.name || !formData.name.trim()) {
        newErrors.name = 'Product name is required';
    }

    // 2. التحقق من الوصف القصير
    if (!formData.shortDesc || !formData.shortDesc.trim()) {
        newErrors.shortDesc = 'Short description is required';
    } else if (formData.shortDesc.trim().length < 10) {
        newErrors.shortDesc = 'Minimum 10 characters required';
    }

    // 3. التحقق من الوصف التفصيلي
    if (!formData.description || !formData.description.trim()) {
        newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 20) {
        newErrors.description = 'Minimum 20 characters required';
    }

    // 4. التحقق من السعر الأساسي
    if (!formData.price) {
        newErrors.price = 'Price is required';
    } else if (
        !Number.isFinite(Number(formData.price)) ||
        Number(formData.price) <= 0
    ) {
        newErrors.price = 'Price must be a valid number greater than 0';
    }

    // 5. التحقق من السعر بعد الخصم
    if (formData.discountPrice) {
        const discountPrice = Number(formData.discountPrice);
        const price = Number(formData.price);

        if (
            !Number.isFinite(discountPrice) ||
            discountPrice < 0
        ) {
            newErrors.discountPrice =
                'Discount price must be a valid number';
        } else if (discountPrice >= price) {
            newErrors.discountPrice =
                'Discount price must be less than regular price';
        }
    }

    // 6. التحقق من المخزون (Stock)
    if (
        formData.stock === '' ||
        formData.stock === undefined
    ) {
        newErrors.stock = 'Stock quantity is required';
    } else if (
        !Number.isFinite(Number(formData.stock)) ||
        Number(formData.stock) < 0
    ) {
        newErrors.stock =
            'Stock must be a valid number and cannot be negative';
    }

    // 7. التحقق من كود المنتج (SKU)
    if (!formData.sku || !formData.sku.trim()) {
        newErrors.sku = 'SKU is required';
    }

    return newErrors;
};