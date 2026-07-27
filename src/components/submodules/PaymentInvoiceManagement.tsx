import React, { useState } from 'react';
import { Booking, PaymentInvoice, PaymentRecord } from '../../types';
import { 
  CreditCard, 
  Search, 
  Printer, 
  CheckCircle2, 
  Clock, 
  X, 
  FileText, 
  DollarSign, 
  Plus, 
  ShieldCheck, 
  QrCode,
  Building2,
  Send
} from 'lucide-react';

interface PaymentInvoiceManagementProps {
  bookings: Booking[];
  onAddPaymentRecord: (bookingId: string, payment: PaymentRecord) => void;
  isOperatorView: boolean;
}

export const PaymentInvoiceManagement: React.FC<PaymentInvoiceManagementProps> = ({
  bookings,
  onAddPaymentRecord,
  isOperatorView
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [viewingInvoiceBooking, setViewingInvoiceBooking] = useState<Booking | null>(null);

  // New Payment Modal
  const [recordingBooking, setRecordingBooking] = useState<Booking | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<'GCash' | 'PayMaya' | 'Credit Card' | 'Bank Transfer' | 'Cash'>('GCash');
  const [referenceNo, setReferenceNo] = useState('');

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.bookingRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || b.paymentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenueCollected = bookings.reduce((sum, b) => sum + b.invoice.amountPaid, 0);
  const totalBalancePending = bookings.reduce((sum, b) => sum + b.invoice.balanceDue, 0);

  const handleOpenPaymentModal = (b: Booking) => {
    setRecordingBooking(b);
    setPaymentAmount(b.invoice.balanceDue);
    setReferenceNo(`PAY-${Math.floor(100000 + Math.random() * 900000)}`);
  };

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recordingBooking || paymentAmount <= 0) return;

    const newPayment: PaymentRecord = {
      id: `pmt-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      amount: paymentAmount,
      method: paymentMethod,
      referenceNo: referenceNo || `REF-${Date.now()}`,
      status: 'Verified',
      notes: 'Payment recorded by Tour Operations'
    };

    onAddPaymentRecord(recordingBooking.id, newPayment);
    setRecordingBooking(null);
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Submodule Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <CreditCard className="w-4 h-4" />
              <span>Submodule 05</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Payment & Invoice Management
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Track payment ledgers, record deposits & final balances, verify reference numbers, and issue printable official invoices.
            </p>
          </div>
        </div>

        {/* Ledger Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-5 border-t border-slate-800">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 text-[11px] font-semibold uppercase block">Total Revenue Collected</span>
            <span className="text-2xl font-black text-emerald-400">₱{totalRevenueCollected.toLocaleString()}</span>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 text-[11px] font-semibold uppercase block">Accounts Receivable / Pending</span>
            <span className="text-2xl font-black text-amber-400">₱{totalBalancePending.toLocaleString()}</span>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 text-[11px] font-semibold uppercase block">Total Invoices Issued</span>
            <span className="text-2xl font-black text-cyan-400">{bookings.length} Invoices</span>
          </div>
        </div>
      </div>

      {/* Ledger Table Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <span>Billing & Payment Ledger</span>
          </h2>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search invoice no, ref code, customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Paid">Fully Paid</option>
              <option value="Partial">Partial Deposit</option>
              <option value="Unpaid">Unpaid</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 text-[11px] font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-3.5 rounded-l-xl">Invoice No</th>
                <th className="p-3.5">Booking Ref</th>
                <th className="p-3.5">Customer Name</th>
                <th className="p-3.5">Total Amount</th>
                <th className="p-3.5">Amount Paid</th>
                <th className="p-3.5">Balance Due</th>
                <th className="p-3.5">Payment Status</th>
                <th className="p-3.5 rounded-r-xl text-right">Invoice & Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredBookings.map((b) => {
                const inv = b.invoice;
                return (
                  <tr key={b.id} className="hover:bg-slate-800/40 transition">
                    <td className="p-3.5 font-mono font-bold text-cyan-400">
                      {inv.invoiceNumber}
                    </td>
                    <td className="p-3.5 font-mono text-slate-300">
                      {b.bookingRef}
                    </td>
                    <td className="p-3.5 font-semibold text-white">
                      {b.customer.fullName}
                    </td>
                    <td className="p-3.5 font-bold text-white">
                      ₱{inv.totalAmount.toLocaleString()}
                    </td>
                    <td className="p-3.5 font-bold text-emerald-400">
                      ₱{inv.amountPaid.toLocaleString()}
                    </td>
                    <td className="p-3.5 font-bold text-amber-400">
                      ₱{inv.balanceDue.toLocaleString()}
                    </td>
                    <td className="p-3.5">
                      <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                        inv.status === 'Paid' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                        inv.status === 'Partial' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                        'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => setViewingInvoiceBooking(b)}
                        className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition"
                      >
                        View Official Invoice
                      </button>

                      {isOperatorView && inv.balanceDue > 0 && (
                        <button
                          onClick={() => handleOpenPaymentModal(b)}
                          className="px-3 py-1 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 text-xs font-bold rounded-lg border border-emerald-500/30 transition"
                        >
                          + Record Payment
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official Printable Invoice Modal */}
      {viewingInvoiceBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 text-slate-100 shadow-2xl relative max-h-[90vh] overflow-y-auto print:max-w-none print:w-full print:bg-white print:text-black print:p-0">
            <button
              onClick={() => setViewingInvoiceBooking(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition print:hidden"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Invoice Printable Document */}
            <div className="p-6 bg-slate-950 border border-slate-800 rounded-xl space-y-6 print:border-none print:bg-white print:p-4">
              {/* Header */}
              <div className="flex justify-between items-start border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-black text-cyan-400 tracking-wider uppercase">HOLIDAY TRAVELERS TRAVEL & TOURS INC</h2>
                  <p className="text-[11px] text-slate-400 mt-1">Licensed Tour Operator & Travel Agency</p>
                  <p className="text-[11px] text-slate-400">Tax ID: 902-182-9381-000 • Manila, Philippines</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-white block">OFFICIAL INVOICE</span>
                  <span className="font-mono text-cyan-400 font-bold text-xs">{viewingInvoiceBooking.invoice.invoiceNumber}</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">Date: {viewingInvoiceBooking.invoice.issueDate}</p>
                </div>
              </div>

              {/* Billed To */}
              <div className="grid grid-cols-2 gap-4 text-xs bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px] block mb-1">Customer Details</span>
                  <div className="font-bold text-white">{viewingInvoiceBooking.customer.fullName}</div>
                  <div className="text-slate-300">{viewingInvoiceBooking.customer.email}</div>
                  <div className="text-slate-300">{viewingInvoiceBooking.customer.phone}</div>
                </div>

                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px] block mb-1">Tour Booking Info</span>
                  <div className="font-bold text-cyan-400">Ref: {viewingInvoiceBooking.bookingRef}</div>
                  <div className="text-slate-300">{viewingInvoiceBooking.tourTitle}</div>
                  <div className="text-slate-300">Travel Date: {viewingInvoiceBooking.travelDate} ({viewingInvoiceBooking.numPax} Pax)</div>
                </div>
              </div>

              {/* Items Breakdown */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-slate-400 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-2.5">Description</th>
                      <th className="p-2.5 text-center">Pax</th>
                      <th className="p-2.5 text-right">Unit Price</th>
                      <th className="p-2.5 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {viewingInvoiceBooking.invoice.items.map((item, idx) => (
                      <tr key={idx}>
                        <td className="p-2.5 font-medium text-white">{item.description}</td>
                        <td className="p-2.5 text-center font-bold text-slate-300">{item.quantity}</td>
                        <td className="p-2.5 text-right text-slate-300">₱{item.unitPrice.toLocaleString()}</td>
                        <td className="p-2.5 text-right font-bold text-white">₱{item.totalPrice.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Transaction Payments Log */}
              <div className="border-t border-slate-800 pt-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase block mb-2">Verified Payment Transactions</span>
                <div className="space-y-1.5 text-xs">
                  {viewingInvoiceBooking.invoice.payments.map((pmt) => (
                    <div key={pmt.id} className="flex justify-between items-center bg-slate-900 p-2 rounded-lg border border-slate-800">
                      <div>
                        <span className="font-bold text-emerald-400">{pmt.method}</span>
                        <span className="text-slate-400 ml-2 font-mono text-[11px]">(Ref: {pmt.referenceNo})</span>
                      </div>
                      <div className="font-bold text-white">₱{pmt.amount.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Invoice Totals */}
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Invoice Amount:</span>
                  <span className="font-bold text-white">₱{viewingInvoiceBooking.invoice.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Amount Paid:</span>
                  <span className="font-bold text-emerald-400">₱{viewingInvoiceBooking.invoice.amountPaid.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-800 text-sm font-extrabold">
                  <span className="text-slate-200">Remaining Balance Due:</span>
                  <span className="text-amber-400">₱{viewingInvoiceBooking.invoice.balanceDue.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between gap-3 print:hidden">
              <button
                onClick={handlePrintInvoice}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl transition"
              >
                <Printer className="w-4 h-4 text-cyan-400" />
                <span>Print Official Receipt</span>
              </button>

              <button
                onClick={() => setViewingInvoiceBooking(null)}
                className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-xl transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Record Payment Modal */}
      {recordingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 text-slate-100 shadow-2xl relative">
            <button
              onClick={() => setRecordingBooking(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-base font-bold text-white mb-4">
              Record Payment for {recordingBooking.bookingRef}
            </h2>

            <form onSubmit={handleRecordPayment} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Payment Amount (₱)</label>
                <input
                  type="number"
                  required
                  min={1}
                  max={recordingBooking.invoice.balanceDue}
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="GCash">GCash</option>
                  <option value="PayMaya">PayMaya</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Reference No.</label>
                <input
                  type="text"
                  required
                  value={referenceNo}
                  onChange={(e) => setReferenceNo(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRecordingBooking(null)}
                  className="px-4 py-2 bg-slate-800 text-slate-200 text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl"
                >
                  Save & Verify Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
