import React from 'react';
import { X, Eye, Edit3, CheckSquare, BadgeIndianRupee } from 'lucide-react';
import ViewChoices from './ViewChoices';
import ModifyChoices from './ModifyChoices';
import FinalChoices from './FinalChoices';
import PaymentUpdate from './PaymentUpdate';

interface VoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
  voucher: any;
}

const VoucherModal: React.FC<VoucherModalProps> = ({
  isOpen,
  onClose,
  voucher,
}) => {
  const [activeTab, setActiveTab] = React.useState('view');

  if (!isOpen) return null;

  const tabs = [
    { id: 'view', label: 'View Choices', icon: Eye },
    { id: 'modify', label: 'Add / Modify Choices', icon: Edit3 },
    { id: 'final', label: 'Final Choices', icon: CheckSquare },
    {
      id: 'paymentUpdate',
      label: 'Payment Update',
      icon: BadgeIndianRupee,
    },
  ];

  return (
    <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50'>
      <div className='bg-white rounded-xl shadow-2xl w-full max-w-3xl transform transition-all'>
        {/* Header */}
        <div className='flex justify-between items-center p-6 border-b'>
          <h3 className='text-2xl font-bold text-gray-900'>Voucher Status</h3>
          <button
            onClick={onClose}
            className='p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 group'
            aria-label='Close modal'>
            <X className='h-6 w-6 text-gray-500 group-hover:text-red-500 transition-colors duration-200' />
          </button>
        </div>

        {/* Tabs */}
        <div className='border-b bg-gray-50'>
          <div className='flex items-center justify-center gap-2 p-2'>
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`
                  flex items-center gap-2 px-4 py-3 rounded-lg font-medium text-sm
                  transition-all duration-200 
                  ${
                    activeTab === id
                      ? 'bg-white text-blue-600 shadow-sm ring-1 ring-gray-200'
                      : 'text-gray-600 hover:bg-white/50 hover:text-gray-900'
                  }
                `}>
                <Icon className='h-4 w-4' />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className='max-h-[calc(100vh-20rem)] overflow-y-auto'>
          {activeTab === 'view' && <ViewChoices voucher={voucher} />}
          {activeTab === 'modify' && <ModifyChoices voucher={voucher} />}
          {activeTab === 'final' && <FinalChoices voucher={voucher} />}
          {activeTab === 'paymentUpdate' && <PaymentUpdate voucher={voucher} />}
        </div>

        {/* Footer */}
        <div className='p-6 border-t bg-gray-50'>
          <div className='flex justify-end'>
            <button
              onClick={onClose}
              className='
                px-6 py-2.5 rounded-lg font-medium text-gray-700
                bg-white border border-gray-300 shadow-sm
                hover:bg-gray-50 active:bg-gray-100
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                transition-all duration-200
              '>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherModal;
