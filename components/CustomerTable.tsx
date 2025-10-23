import React, { useState, useMemo } from 'react';
import type { Customer } from '../types';
import { CustomerStatus } from '../types';
import { SearchIcon, PencilIcon, TrashIcon } from './icons';

interface CustomerTableProps {
  customers: Customer[];
}

const statusColorMap: Record<CustomerStatus, string> = {
  [CustomerStatus.Active]: 'bg-green-100 text-green-800',
  [CustomerStatus.Inactive]: 'bg-slate-100 text-slate-800',
  [CustomerStatus.New]: 'bg-blue-100 text-blue-800',
};

const getPurchaseStatusStyle = (count: number): { label: string; className: string } => {
  if (count === 0) return { label: 'بدون خرید', className: 'bg-yellow-100 text-yellow-800' };
  if (count === 1) return { label: 'اولین خرید', className: 'bg-green-100 text-green-800' };
  return { label: 'تکرار خرید', className: 'bg-blue-100 text-blue-800' };
};

const CustomerTable: React.FC<CustomerTableProps> = ({ customers }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = useMemo(() => {
    if (!searchTerm) return customers;
    return customers.filter(c => 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [customers, searchTerm]);

  return (
    <div>
      <div className="mb-4">
        <div className="relative">
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            <SearchIcon className="h-5 w-5 text-slate-400" />
          </span>
          <input
            type="text"
            placeholder="جستجوی مشتری..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-3 pr-10 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500 text-sm"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">نام</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">شهر</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">وضعیت خرید</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">آخرین تماس</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">عملیات</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {filteredCustomers.map((customer) => {
              const purchaseStatus = getPurchaseStatusStyle(customer.purchaseCount);
              return (
                <tr key={customer.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-slate-900">{customer.name}</div>
                    <div className="text-xs text-slate-500">{customer.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{customer.city}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${purchaseStatus.className}`}>
                      {purchaseStatus.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{customer.lastContact}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-x-4">
                      <button className="text-slate-400 hover:text-slate-600"><PencilIcon /></button>
                      <button className="text-slate-400 hover:text-red-600"><TrashIcon /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerTable;
