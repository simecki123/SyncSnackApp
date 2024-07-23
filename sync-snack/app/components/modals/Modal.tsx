// components/Modal.jsx
export default function Modal({ isOpen, onClose, children }: any) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 max-w-3xl w-full">
          <button onClick={onClose} className="float-right text-2xl">&times;</button>
          {children}
        </div>
      </div>
    );
  }