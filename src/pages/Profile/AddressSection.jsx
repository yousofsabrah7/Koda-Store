import React, { useState, useEffect } from "react";
import { FiMapPin, FiPlus, FiTrash2, FiCheckCircle } from "react-icons/fi";

export default function AddressSection() {
  const [formData, setFormData] = useState({
    country: "",
    city: "",
    street: "",
    building: "",
    postalCode: "",
  });

  const [addresses, setAddresses] = useState(() => {
    const savedAddresses = localStorage.getItem("E-Hub_user_addresses");
    return savedAddresses ? JSON.parse(savedAddresses) : [];
  });

  useEffect(() => {
    localStorage.setItem("E-Hub_user_addresses", JSON.stringify(addresses));
  }, [addresses]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFillDemoData = () => {
    setFormData({
      country: "Egypt",
      city: "Cairo",
      street: "Tahrir Street",
      building: "Building 12",
      postalCode: "11511",
    });
  };

  const handleAddAddress = (e) => {
    e.preventDefault();

    if (!formData.country || !formData.city || !formData.street) {
      alert("من فضلك ادخل على الأقل الدولة والمدينة والشارع!");
      return;
    }

    const newAddress = { id: Date.now(), ...formData };
    setAddresses((prev) => [...prev, newAddress]);

    setFormData({
      country: "",
      city: "",
      street: "",
      building: "",
      postalCode: "",
    });
  };

  const handleDeleteAddress = (id) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  return (
    <div className="mb-8 rounded-3xl border border-border-subtle bg-surface-card p-6 shadow-[0_20px_50px_-18px_rgba(0,0,0,0.18)] transition-all sm:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FiMapPin size={22} className="text-accent" />
          <h3 className="text-xl font-bold text-text-primary">Addresses</h3>
        </div>

        <button
          type="button"
          onClick={handleFillDemoData}
          className="flex items-center gap-1 rounded-xl bg-accent-light px-3 py-1.5 text-xs font-semibold text-accent shadow-sm transition-colors hover:bg-accent hover:text-white"
        >
          <FiCheckCircle size={14} />
          <span>Demo Data</span>
        </button>
      </div>

      {/* Added addresses */}
      <div className="mb-6">
        {addresses.length === 0 ? (
          <p className="text-sm italic text-text-muted">No addresses yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className="group relative rounded-2xl border border-border-subtle bg-surface-elevated p-4 shadow-sm transition-all hover:border-border-strong"
              >
                <p className="text-sm font-semibold text-text-primary">
                  {addr.street}, Building: {addr.building || "N/A"}
                </p>

                <p className="mt-1 text-xs text-text-secondary">
                  {addr.city}, {addr.country} - {addr.postalCode}
                </p>

                <button
                  onClick={() => handleDeleteAddress(addr.id)}
                  className="absolute left-3 top-3 text-red-500 opacity-80 transition-opacity hover:text-red-600 hover:opacity-100"
                  title="Delete Address"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Address form */}
      <form onSubmit={handleAddAddress} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            className="w-full rounded-2xl border border-border-subtle bg-surface-card px-4 py-3 text-sm text-text-primary shadow-sm placeholder:text-text-muted transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent-light"
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full rounded-2xl border border-border-subtle bg-surface-card px-4 py-3 text-sm text-text-primary shadow-sm placeholder:text-text-muted transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent-light"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="text"
            name="street"
            placeholder="Street"
            value={formData.street}
            onChange={handleChange}
            className="w-full rounded-2xl border border-border-subtle bg-surface-card px-4 py-3 text-sm text-text-primary shadow-sm placeholder:text-text-muted transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent-light"
          />

          <input
            type="text"
            name="building"
            placeholder="Building"
            value={formData.building}
            onChange={handleChange}
            className="w-full rounded-2xl border border-border-subtle bg-surface-card px-4 py-3 text-sm text-text-primary shadow-sm placeholder:text-text-muted transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent-light"
          />
        </div>

        <input
          type="text"
          name="postalCode"
          placeholder="Postal code"
          value={formData.postalCode}
          onChange={handleChange}
          className="w-full rounded-2xl border border-border-subtle bg-surface-card px-4 py-3 text-sm text-text-primary shadow-sm placeholder:text-text-muted transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent-light"
        />

        <div>
          <button
            type="submit"
            className="flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(209,109,59,0.28)] transition-all duration-300 hover:bg-accent-hover"
          >
            <FiPlus size={18} />
            <span>Add Address</span>
          </button>
        </div>
      </form>
    </div>
  );
}
