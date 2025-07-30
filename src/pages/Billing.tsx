import React, { useState, useEffect } from 'react';
import { Plus, Search, Eye, CreditCard, DollarSign, Pencil, Trash2 } from 'lucide-react';
import { Bill, Patient } from '../types';
import { apiService } from '../services/api';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { format } from 'date-fns';

export const Billing: React.FC = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBill, setEditingBill] = useState<Bill | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    patientId: '',
    description: '',
    amount: '',
    status: 'pending',
    dueDate: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [billsData, patientsData] = await Promise.all([
        apiService.getBills(),
        apiService.getPatients()
      ]);
      setBills(billsData);
      setPatients(patientsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdateBill = async (e: React.FormEvent) => {
    e.preventDefault();
    const { patientId, description, amount, status, dueDate } = formData;
    if (!patientId || !description || !amount || !dueDate) return;

    if (editingBill) {
      await apiService.updateBill(editingBill.id, {
        patientId,
        description,
        amount: parseFloat(amount),
        status,
        dueDate
      });
    } else {
      await apiService.createBill({
        patientId,
        description,
        amount: parseFloat(amount),
        status,
        dueDate
      });
    }

    setIsFormOpen(false);
    setEditingBill(null);
    setFormData({ patientId: '', description: '', amount: '', status: 'pending', dueDate: '' });
    fetchData();
  };

  const handleEdit = (bill: Bill) => {
    setEditingBill(bill);
    setFormData({
      patientId: bill.patientId,
      description: bill.description,
      amount: bill.amount.toString(),
      status: bill.status,
      dueDate: bill.dueDate.slice(0, 10),
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this bill?')) return;
    await apiService.deleteBill(id);
    fetchData();
  };

  const getPatientName = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    return patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredBills = bills.filter(bill => {
    const patientName = getPatientName(bill.patientId).toLowerCase();
    const search = searchTerm.toLowerCase();
    return patientName.includes(search) || bill.description.toLowerCase().includes(search);
  });

  const totalAmount = bills.reduce((sum, bill) => sum + bill.amount, 0);
  const paidAmount = bills.filter(bill => bill.status === 'paid').reduce((sum, bill) => sum + bill.amount, 0);
  const pendingAmount = bills.filter(bill => bill.status === 'pending').reduce((sum, bill) => sum + bill.amount, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
          <p className="text-gray-600">Manage patient bills and payments</p>
        </div>
        <Button onClick={() => {
          setIsFormOpen(true);
          setEditingBill(null);
          setFormData({ patientId: '', description: '', amount: '', status: 'pending', dueDate: '' });
        }}>
          <Plus size={20} className="mr-2" />
          Create Bill
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{totalAmount.toFixed(2)} FCFA</p>
            </div>
            <div className="p-3 rounded-full bg-blue-500">
              <DollarSign size={24} className="text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Paid</p>
              <p className="text-2xl font-bold text-green-600">{paidAmount.toFixed(0)} FCFA</p>
            </div>
            <div className="p-3 rounded-full bg-green-500">
              <CreditCard size={24} className="text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingAmount.toFixed(0)} FCFA</p>
            </div>
            <div className="p-3 rounded-full bg-yellow-500">
              <CreditCard size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-md">
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search bills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Bills Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBills.map((bill) => (
              <tr key={bill.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{getPatientName(bill.patientId)}</td>
                <td className="px-6 py-4">{bill.description}</td>
                <td className="px-6 py-4 font-medium">{bill.amount.toFixed(0)} FCFA</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(bill.status)}`}>
                    {bill.status}
                  </span>
                </td>
                <td className="px-6 py-4">{format(new Date(bill.dueDate), 'MMM dd, yyyy')}</td>
                <td className="px-6 py-4 flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => handleEdit(bill)}>
                    <Pencil size={16} className="mr-1" /> Edit
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(bill.id)}>
                    <Trash2 size={16} className="mr-1" /> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create/Edit Bill Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {editingBill ? 'Edit Bill' : 'Create New Bill'}
            </h2>
            <form onSubmit={handleCreateOrUpdateBill} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Patient</label>
                <select
                  value={formData.patientId}
                  onChange={e => setFormData({ ...formData, patientId: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                  required
                >
                  <option value="">Select Patient</option>
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.firstName} {p.lastName}
                    </option>
                  ))}
                </select>
              </div>
              <Input
                label="Description"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                required
              />
              <Input
                label="Amount (FCFA)"
                type="number"
                value={formData.amount}
                onChange={e => setFormData({ ...formData, amount: e.target.value })}
                required
              />
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
              <Input
                label="Due Date"
                type="date"
                value={formData.dueDate}
                onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
                required
              />
              <div className="flex justify-end space-x-2">
                <Button type="button" onClick={() => { setIsFormOpen(false); setEditingBill(null); }} variant="secondary">
                  Cancel
                </Button>
                <Button type="submit">{editingBill ? 'Update Bill' : 'Save Bill'}</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
