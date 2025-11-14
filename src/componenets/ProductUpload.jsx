

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
// import { Input, TextArea, Select, ImageUpload } from '../ui';
import './ProductUpload.css';
import ImageUpload from '../components/ui/ImageUpload';
import Input from '../components/ui/Input';
import TextArea from '../components/ui/TextArea';
import Select from '../components/ui/Select';

function ProductUpload() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        sku: '',
    });

    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const categories = [
        'Electronics',
        'Clothing',
        'Home & Garden',
        'Sports',
        'Books',
        'Toys',
        'Beauty',
        'Food',
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }));
        }
    };

    const handleImageChange = (e) => {
        const files = e.target.files;
        if (!files) return;

        const newFiles = Array.from(files);
        const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

        setImages((prev) => [...prev, ...newFiles]);
        setImagePreviews((prev) => [...prev, ...newPreviews]);
    };

    const removeImage = (index) => {
        URL.revokeObjectURL(imagePreviews[index]);
        setImagePreviews((prev) => prev.filter((_, i) => i !== index));
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = 'Product name is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.price || parseFloat(formData.price) <= 0) {
            newErrors.price = 'Valid price is required';
        }
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.stock || parseInt(formData.stock) < 0) {
            newErrors.stock = 'Valid stock quantity is required';
        }
        if (!formData.sku.trim()) newErrors.sku = 'SKU is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const formDataToSend = new FormData();

            Object.keys(formData).forEach(key => {
                formDataToSend.append(key, formData[key]);
            });

            images.forEach((image) => {
                formDataToSend.append('images', image);
            });

            const response = await fetch('/api/admin/products', {
                method: 'POST',
                body: formDataToSend,
            });

            if (!response.ok) throw new Error('Failed to upload product');

            const result = await response.json();
            console.log('Product uploaded:', result);

            alert('Product uploaded successfully!');
            handleClear();
            setTimeout(() => navigate('/products'), 1500);
        } catch (error) {
            console.error('Error uploading product:', error);
            alert('Failed to upload product. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClear = () => {
        setFormData({
            name: '',
            description: '',
            price: '',
            category: '',
            stock: '',
            sku: '',
        });
        imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
        setImagePreviews([]);
        setImages([]);
        setErrors({});
    };

    return (
        <Layout activeTab="products">
            <div className="product-upload-main">
                <div className="upload-container">
                    <div className="upload-header">
                        <h1 className="upload-title">Upload New Product</h1>
                        <button onClick={() => navigate('/home')} className="back-btn">
                            ← Back to Dashboard
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="product-form">
                        <Input
                            label="Product Name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            error={errors.name}
                            placeholder="Enter product name"
                            required
                        />

                        <TextArea
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            error={errors.description}
                            placeholder="Enter product description"
                            required
                            rows={4}
                        />

                        <div className="form-row">
                            <Input
                                label="Price ($)"
                                name="price"
                                type="number"
                                value={formData.price}
                                onChange={handleInputChange}
                                error={errors.price}
                                placeholder="0.00"
                                step="0.01"
                                min="0"
                                required
                            />

                            <Input
                                label="Stock Quantity"
                                name="stock"
                                type="number"
                                value={formData.stock}
                                onChange={handleInputChange}
                                error={errors.stock}
                                placeholder="0"
                                min="0"
                                required
                            />
                        </div>

                        <div className="form-row">
                            <Select
                                label="Category"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                error={errors.category}
                                options={categories}
                                placeholder="Select a category"
                                required
                            />

                            <Input
                                label="SKU"
                                name="sku"
                                value={formData.sku}
                                onChange={handleInputChange}
                                error={errors.sku}
                                placeholder="SKU-001"
                                required
                            />
                        </div>

                        <ImageUpload
                            label="Product Images"
                            name="images"
                            onChange={handleImageChange}
                            previews={imagePreviews}
                            onRemove={removeImage}
                        />

                        <div className="form-actions">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="submit-btn"
                            >
                                {isSubmitting ? 'Uploading...' : 'Upload Product'}
                            </button>
                            <button
                                type="button"
                                onClick={handleClear}
                                className="clear-btn"
                            >
                                Clear
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default ProductUpload;

