import React, { useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';

const PlaceOrder = () => {
  const [formData, setFormData] = useState({
    clothType: '',
    dyeColor: '',
    weight: '',
    quantity: '',
    garmentTypes: [],
    sizes: [],
    notes: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const garmentOptions = ['T-Shirt', 'Pants', 'Shorts', 'Jacket'];
  const sizeOptions = ['Small (S)', 'Medium (M)', 'Large (L)', 'Extra Large (XL)'];

  // Assuming the user ID is retrieved from a global state, context, or any other method.
  const userId = localStorage.getItem("id"); // Replace with the actual user ID source.
console.log(userId);
  const handleCheckboxChange = (e, key) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const updated = checked
        ? [...prev[key], value]
        : prev[key].filter(item => item !== value);
      return { ...prev, [key]: updated };
    });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateUniqueId = (prefix) => `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const garmentMap = {
        'T-Shirt': 'tshirt',
        'Shorts': 'shorts',
        'Pants': 'pants',
        'Jacket': 'jacket',
      };

      const sizeMap = {
        'Small (S)': 's',
        'Medium (M)': 'm',
        'Large (L)': 'l',
        'Extra Large (XL)': 'xl',
      };

      const garmentCounts = { tshirt: 0, shorts: 0, pants: 0, jacket: 0 };
      const sizeCounts = { s: 0, m: 0, l: 0, xl: 0 };

      formData.garmentTypes.forEach(type => {
        const key = garmentMap[type];
        if (key) garmentCounts[key] += 1;
      });

      formData.sizes.forEach(size => {
        const key = sizeMap[size];
        if (key) sizeCounts[key] += 1;
      });

      const orderPayload = {
        order_id: generateUniqueId('ORD'),
        packing_id: generateUniqueId('PACK'),
        user: userId, // User ID sourced from context or another method
        clothType: formData.clothType,
        dyeColor: formData.dyeColor,
        weight: Number(formData.weight),
        quantity: Number(formData.quantity),
        garmentTypes: garmentCounts,
        sizes: sizeCounts,
        notes: formData.notes,
      };
      

      const response = await axios.post(
        'http://localhost:5000/api/orders/place',
        orderPayload
      );

      if (response.status === 200 || response.status === 201) {
        alert('Order placed successfully!');
        setFormData({
          clothType: '',
          dyeColor: '',
          weight: '',
          quantity: '',
          garmentTypes: [],
          sizes: [],
          notes: '',
        });
      } else {
        setError('Failed to place the order. Please try again.');
      }
    } catch (err) {
      setError('Error occurred while placing the order. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar />
      <div className="p-10 text-white flex-1">
        <h2 className="text-3xl font-bold mb-2">Place New Order</h2>
        <p className="text-gray-400 mb-6">Fill out the form below to place a new garment order.</p>

        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-zinc-800 p-8 rounded-xl border border-zinc-700"
        >
          <h3 className="text-xl font-semibold mb-4">Order Details</h3>
          <p className="text-sm text-gray-400 mb-6">Provide the specifications for your garment order.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block mb-2">Type of Cloth</label>
              <select
                name="clothType"
                value={formData.clothType}
                onChange={handleChange}
                className="w-full bg-zinc-700 text-white p-2 rounded"
              >
                <option value="">Select cloth type</option>
                <option value="Cotton">Cotton</option>
                <option value="Polyester">Polyester</option>
                <option value="Silk">Silk</option>
              </select>
            </div>

            <div>
              <label className="block mb-2">Number of Garments</label>
              <input
                type="number"
                name="quantity"
                placeholder="Enter total quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full bg-zinc-700 text-white p-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-2">Total Weight (kg)</label>
              <input
                type="text"
                name="weight"
                placeholder="Enter total weight in kg"
                value={formData.weight}
                onChange={handleChange}
                className="w-full bg-zinc-700 text-white p-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-2">Color of Dye</label>
              <select
                name="dyeColor"
                value={formData.dyeColor}
                onChange={handleChange}
                className="w-full bg-zinc-700 text-white p-2 rounded"
              >
                <option value="">Select dye color</option>
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
                <option value="Black">Black</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block mb-2">Types of Garments</label>
              <div className="flex flex-col space-y-2">
                {garmentOptions.map(type => (
                  <label key={type} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      value={type}
                      checked={formData.garmentTypes.includes(type)}
                      onChange={e => handleCheckboxChange(e, 'garmentTypes')}
                      className="form-checkbox mr-2"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-2">Sizes</label>
              <div className="flex flex-col space-y-2">
                {sizeOptions.map(size => (
                  <label key={size} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      value={size}
                      checked={formData.sizes.includes(size)}
                      onChange={e => handleCheckboxChange(e, 'sizes')}
                      className="form-checkbox mr-2"
                    />
                    {size}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block mb-2">Additional Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any special instructions or requirements"
              className="w-full bg-zinc-700 text-white p-2 rounded"
              rows="3"
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => setFormData({
                clothType: '', dyeColor: '', weight: '', quantity: '',
                garmentTypes: [], sizes: [], notes: ''
              })}
              className="px-4 py-2 border border-zinc-600 rounded hover:bg-zinc-700"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-white text-black font-semibold px-6 py-2 rounded hover:bg-gray-300"
              disabled={isLoading}
            >
              {isLoading ? 'Placing Order...' : 'Submit Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlaceOrder;
