import React, { useState, useEffect } from 'react';
import type { NewCustomerData } from './Dashboard';
import { provincesData } from '../data/iranCities';

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCustomer: (data: NewCustomerData) => void;
}

const AddCustomerModal: React.FC<AddCustomerModalProps> = ({ isOpen, onClose, onAddCustomer }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [cities, setCities] = useState<string[]>([]);
  const [address, setAddress] = useState('');
  const [taxCode, setTaxCode] = useState('');
  const [businessLicense, setBusinessLicense] = useState<File | undefined>();
  const [error, setError] = useState('');

  useEffect(() => {
    if (province) {
      const selectedProvince = provincesData.find(p => p.name === province);
      setCities(selectedProvince ? selectedProvince.cities : []);
      setCity('');
    } else {
      setCities([]);
      setCity('');
    }
  }, [province]);


  if (!isOpen) return null;

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setProvince('');
    setCity('');
    setAddress('');
    setTaxCode('');
    setBusinessLicense(undefined);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !province || !city) {
      setError('پر کردن فیلدهای نام، ایمیل، تلفن، استان و شهر اجباری است.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        setError('فرمت ایمیل نامعتبر است.');
        return;
    }
    
    onAddCustomer({ name, email, phone, province, city, address, taxCode, businessLicense });
    resetForm();
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBusinessLicense(e.target.files[0]);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-customer-title"
    >
      <div 
        className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="add-customer-title" className="text-xl font-bold mb-6 text-slate-800">افزودن مشتری جدید</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">نام و نام خانوادگی</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500" required aria-required="true" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">ایمیل</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500" required aria-required="true" />
            </div>
            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">تلفن</label>
                <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500" required aria-required="true" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
                <label htmlFor="province" className="block text-sm font-medium text-slate-700 mb-1">استان</label>
                <select id="province" value={province} onChange={(e) => setProvince(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500" required aria-required="true">
                    <option value="">انتخاب کنید</option>
                    {provincesData.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
                </select>
            </div>
             <div>
                <label htmlFor="city" className="block text-sm font-medium text-slate-700 mb-1">شهر</label>
                <select id="city" value={city} onChange={(e) => setCity(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500" required aria-required="true" disabled={!province}>
                    <option value="">انتخاب کنید</option>
                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-1">ادامه آدرس</label>
            <textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500"></textarea>
          </div>
          <div>
            <label htmlFor="taxCode" className="block text-sm font-medium text-slate-700 mb-1">کد مالیاتی</label>
            <input type="text" id="taxCode" value={taxCode} onChange={(e) => setTaxCode(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500" />
          </div>
          <div>
            <label htmlFor="businessLicense" className="block text-sm font-medium text-slate-700 mb-1">جواز کسب</label>
            <input type="file" id="businessLicense" onChange={handleFileChange} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-50 file:text-slate-700 hover:file:bg-slate-100" />
            {businessLicense && <span className="text-xs text-slate-500 mt-1 block">فایل انتخاب شده: {businessLicense.name}</span>}
          </div>
          
          {error && <p className="text-red-500 text-sm" role="alert">{error}</p>}
          
          <div className="flex justify-end space-x-2 space-x-reverse pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-200 text-slate-800 rounded-md hover:bg-slate-300">انصراف</button>
            <button type="submit" className="px-4 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-700">افزودن</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomerModal;