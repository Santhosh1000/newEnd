

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout';
import ImageUpload from '../../components/ui/ImageUpload';
import Input from '../../components/ui/Input';
import TextArea from '../../components/ui/TextArea';
import Select from '../../components/ui/Select';
import { createProduct } from '../../api/productApi';
import './ProductUpload.css';

function ProductUpload() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category_id: '',
        stock: '',
        image_url: '',
    });

    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    // Categories - these should match your database
    const categories = [
        { id: '1', name: 'Electronics' },
        { id: '2', name: 'Clothing' },
        { id: '3', name: 'Home & Garden' },
        { id: '4', name: 'Sports' },
        { id: '5', name: 'Books' },
        { id: '6', name: 'Toys' },
        { id: '7', name: 'Beauty' },
        { id: '8', name: 'Food' },
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
        if (!formData.category_id) newErrors.category_id = 'Category is required';
        if (!formData.stock || parseInt(formData.stock) < 0) {
            newErrors.stock = 'Valid stock quantity is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Helper function to upload images
    const uploadImages = async (imageFiles) => {
        // TODO: Implement image upload to your storage solution
        // For now, returning a placeholder URL
        if (imageFiles.length > 0) {
            return 'https://via.placeholder.com/400';
        }
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            // Upload images first (if any)
            const imageUrl = await uploadImages(images);

            // Prepare payload matching backend expectations
            const payload = {
                name: formData.name,
                description: formData.description,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                category_id: parseInt(formData.category_id), // ✅ Fixed: Use selected category
                image_url: imageUrl || null,
                created_at: new Date().toISOString(),
            };

            // Call the API using the service
            const result = await createProduct(payload);

            console.log('Product uploaded:', result);
            alert('Product uploaded successfully!');
            handleClear();
            setTimeout(() => navigate('/products'), 1500);

        } catch (error) {
            console.error('Error uploading product:', error);

            // Handle specific error cases
            if (error.message.includes('401') || error.message.includes('403')) {
                alert('You are not authorized to perform this action. Please login as admin.');
                navigate('/login');
            } else if (error.message.includes('foreign key constraint')) {
                alert('Invalid category selected. Please choose a valid category.');
            } else {
                alert(error.message || 'Failed to upload product. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClear = () => {
        setFormData({
            name: '',
            description: '',
            price: '',
            category_id: '',
            stock: '',
            image_url: '',
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
                                name="category_id"
                                value={formData.category_id}
                                onChange={handleInputChange}
                                error={errors.category_id}
                                options={categories.map(cat => cat.name)}
                                placeholder="Select a category"
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