import React from 'react';
import { createRoot } from 'react-dom/client';
import StaffList from './StaffList.js';
const container = document.getElementById('admin-root');
if (container) {
  createRoot(container).render(<StaffList />);
}
