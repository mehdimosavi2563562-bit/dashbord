import React, { useState, useMemo } from 'react';
import type { Customer } from '../types';
import { CustomerStatus } from '../types';
import MetricCard from './MetricCard';
import CustomerTable from './CustomerTable';
import CustomerChart from './CustomerChart';
import AddCustomerModal from './AddCustomerModal';
import ProvinceDistributionChart from './ProvinceDistributionChart';
import { UsersIcon, UserPlusIcon, ActivityIcon, PlusIcon, ShoppingCartIcon, UserXIcon } from './icons';

const mockCustomers: Customer[] = [
  { id: 1, name: 'آریا محمدی', email: 'aria.mohammadi@example.com', phone: '09123456781', province: 'تهران', city: 'تهران', address: 'خیابان ولیعصر', taxCode: '1234567890', businessLicenseUrl: 'license-aria.pdf', status: CustomerStatus.Active, lastContact: '2023-10-22', joinDate: '2023-01-15', purchaseCount: 5 },
  { id: 2, name: 'زهرا احمدی', email: 'zahra.ahmadi@example.com', phone: '09123456782', province: 'اصفهان', city: 'اصفهان', address: 'میدان نقش جهان', taxCode: '1234567891', businessLicenseUrl: 'license-zahra.pdf', status: CustomerStatus.Active, lastContact: '2023-10-20', joinDate: '2023-02-20', purchaseCount: 2 },
  { id: 3, name: 'علی رضایی', email: 'ali.rezaei@example.com', phone: '09123456783', province: 'فارس', city: 'شیراز', address: 'خیابان زند', taxCode: '1234567892', status: CustomerStatus.Inactive, lastContact: '2023-05-10', joinDate: '2023-03-05', purchaseCount: 0 },
  { id: 4, name: 'سارا کریمی', email: 'sara.karimi@example.com', phone: '09123456784', province: 'آذربایجان شرقی', city: 'تبریز', address: 'بازار بزرگ', taxCode: '1234567893', status: CustomerStatus.New, lastContact: '2023-10-25', joinDate: '2023-10-01', purchaseCount: 1 },
  { id: 5, name: 'حسین حسینی', email: 'hossein.hosseini@example.com', phone: '09123456785', province: 'خراسان رضوی', city: 'مشهد', address: 'حرم مطهر', taxCode: '1234567894', status: CustomerStatus.Active, lastContact: '2023-10-18', joinDate: '2023-04-12', purchaseCount: 10 },
  { id: 6, name: 'فاطمه نوری', email: 'fatemeh.nouri@example.com', phone: '09123456786', province: 'تهران', city: 'تهران', address: 'سعادت آباد', taxCode: '1234567895', status: CustomerStatus.Active, lastContact: '2023-10-24', joinDate: '2023-05-21', purchaseCount: 1 },
  { id: 7, name: 'محمد جوادی', email: 'mohammad.javadi@example.com', phone: '09123456787', province: 'یزد', city: 'یزد', address: 'بافت تاریخی', taxCode: '1234567896', status: CustomerStatus.Inactive, lastContact: '2023-08-01', joinDate: '2023-06-30', purchaseCount: 0 },
  { id: 8, name: 'نرگس قاسمی', email: 'narges.ghasemi@example.com', phone: '09123456788', province: 'البرز', city: 'کرج', address: 'عظیمیه', taxCode: '1234567897', status: CustomerStatus.New, lastContact: '2023-10-15', joinDate: '2023-10-11', purchaseCount: 1 },
  { id: 9, name: 'رضا مرادی', email: 'reza.moradi@example.com', phone: '09123456789', province: 'خوزستان', city: 'اهواز', address: 'کیانپارس', taxCode: '1234567898', status: CustomerStatus.Active, lastContact: '2023-09-30', joinDate: '2023-07-07', purchaseCount: 3 },
  { id: 10, name: 'مریم اکبری', email: 'maryam.akbari@example.com', phone: '09123456790', province: 'گیلان', city: 'رشت', address: 'گلسار', taxCode: '1234567899', status: CustomerStatus.Active, lastContact: '2023-10-21', joinDate: '2023-08-19', purchaseCount: 0 },
  { id: 11, name: 'امیر قاسمی', email: 'amir.ghasemi@example.com', phone: '09123456791', province: 'مازندران', city: 'ساری', address: 'مرکز شهر', taxCode: '1234567880', status: CustomerStatus.New, lastContact: '2023-09-05', joinDate: '2023-09-02', purchaseCount: 1 },
  { id: 12, name: 'لیلا سعیدی', email: 'leila.saeedi@example.com', phone: '09123456792', province: 'همدان', city: 'همدان', address: 'آرامگاه بوعلی', taxCode: '1234567881', status: CustomerStatus.Active, lastContact: '2023-10-26', joinDate: '2023-09-15', purchaseCount: 2 },
];

export type NewCustomerData = Omit<Customer, 'id' | 'status' | 'lastContact' | 'joinDate' | 'businessLicenseUrl' | 'purchaseCount'> & {
  businessLicense?: File;
};

const Dashboard: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddCustomer = (data: NewCustomerData) => {
    const newCustomer: Customer = {
      id: Math.max(...customers.map(c => c.id), 0) + 1,
      ...data,
      businessLicenseUrl: data.businessLicense?.name,
      status: CustomerStatus.New,
      joinDate: new Date().toISOString().split('T')[0],
      lastContact: new Date().toISOString().split('T')[0],
      purchaseCount: 0,
    };
    setCustomers(prevCustomers => [...prevCustomers, newCustomer]);
  };

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === CustomerStatus.Active).length;
  const newCustomersThisMonth = customers.filter(c => {
    const today = new Date();
    const joinDate = new Date(c.joinDate);
    return joinDate.getMonth() === today.getMonth() && joinDate.getFullYear() === today.getFullYear();
  }).length;
  const firstTimeBuyers = customers.filter(c => c.purchaseCount === 1).length;
  const noPurchaseCustomers = customers.filter(c => c.purchaseCount === 0).length;

  const monthlyChartData = useMemo(() => {
    const monthNames = ["ژانویه", "فوریه", "مارس", "آوریل", "مه", "ژوئن", "ژوئیه", "اوت", "سپتامبر", "اکتبر", "نوامبر", "دسامبر"];
    const monthlySignups: { [key: number]: number } = {};
    
    customers.forEach(customer => {
      const month = new Date(customer.joinDate).getMonth();
      monthlySignups[month] = (monthlySignups[month] || 0) + 1;
    });

    const chartData = monthNames.map((name, index) => ({
      name,
      'مشتریان جدید': monthlySignups[index] || 0,
    }));
    
    // Only show months up to the current month for the current year
    const currentMonth = new Date().getMonth();
    return chartData.slice(0, currentMonth + 1);

  }, [customers]);

  const provinceChartData = useMemo(() => {
    const provinceCounts: { [key: string]: number } = {};
    customers.forEach(customer => {
        provinceCounts[customer.province] = (provinceCounts[customer.province] || 0) + 1;
    });
    return Object.entries(provinceCounts).map(([name, value]) => ({ name, value }));
  }, [customers]);


  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <MetricCard title="تعداد کل مشتریان" value={totalCustomers.toString()} icon={<UsersIcon />} trend="+5.2%" />
        <MetricCard title="مشتریان فعال" value={activeCustomers.toString()} icon={<ActivityIcon />} trend="+1.8%" />
        <MetricCard title="مشتریان جدید (این ماه)" value={newCustomersThisMonth.toString()} icon={<UserPlusIcon />} trend="+12%" />
        <MetricCard title="مشتریان در اولین خرید" value={firstTimeBuyers.toString()} icon={<ShoppingCartIcon />} trend="-3.1%" isNegative />
        <MetricCard title="مشتریان بدون خرید" value={noPurchaseCustomers.toString()} icon={<UserXIcon />} trend="-1.5%" isNegative />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <h2 className="text-xl font-semibold text-slate-800 mb-3 sm:mb-0">لیست مشتریان</h2>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors text-sm font-semibold"
              >
                <PlusIcon />
                <span>افزودن مشتری</span>
              </button>
            </div>
            <CustomerTable customers={customers} />
        </div>
        <div className="space-y-6">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-slate-800">پراکندگی استانی</h2>
                <ProvinceDistributionChart data={provinceChartData} />
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-slate-800">روند رشد مشتریان</h2>
                <CustomerChart data={monthlyChartData} />
            </div>
        </div>
      </div>

      <AddCustomerModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCustomer={handleAddCustomer}
      />
    </div>
  );
};

export default Dashboard;