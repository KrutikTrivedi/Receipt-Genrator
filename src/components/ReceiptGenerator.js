import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
// Removed import for firebaseConfig
import { db } from '../firebaseConfig';

export default function ReceiptGenerator() {
  const { currentUser } = useAuth();
  const [items, setItems] = useState([
    { id: Date.now(), name: '', quantity: '', price: '' }
  ]);

  function handleItemChange(id, field, value) {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  }

  function addItem() {
    setItems(prevItems => [
      ...prevItems,
      { id: Date.now(), name: '', quantity: '', price: '' }
    ]);
  }

  function removeItem(id) {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  }

  function generatePDF() {
    const doc = new jsPDF();
    doc.setFont('Courier');
    doc.setFontSize(16);
    doc.text('Receipt', 10, 20);
    let y = 30;
    doc.setFontSize(12);
    items.forEach((item, index) => {
      const line = `${index + 1}. ${item.name} - Qty: ${item.quantity} - Price: $${item.price}`;
      doc.text(line, 10, y);
      y += 10;
    });
    doc.save('receipt.pdf');
  }

  async function saveReceipt() {
    try {
      await addDoc(collection(db, 'receipts'), { // db reference needs to be defined
        userId: currentUser.uid,
        items,
        createdAt: serverTimestamp()
      });
      alert('Receipt saved successfully!');
    } catch (error) {
      alert('Failed to save receipt: ' + error.message);
    }
  }

  function handleDownload() {
    generatePDF();
    saveReceipt();
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Generate Receipt</h2>
      {items.map((item, index) => (
        <div key={item.id} style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Name"
            value={item.name}
            onChange={e => handleItemChange(item.id, 'name', e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            value={item.quantity}
            onChange={e => handleItemChange(item.id, 'quantity', e.target.value)}
            required
            min="1"
          />
          <input
            type="number"
            placeholder="Price per Each"
            value={item.price}
            onChange={e => handleItemChange(item.id, 'price', e.target.value)}
            required
            min="0"
            step="0.01"
          />
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
      <button onClick={addItem}>Add New Item</button>
      <button onClick={handleDownload} style={{ marginLeft: '10px' }}>
        Download as PDF
      </button>
    </div>
  );
}