import React, { useState, useEffect } from 'react';

const QualityChecked = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showQCForm, setShowQCForm] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [qcResult, setQCResult] = useState('passed');
  const [failedCount, setFailedCount] = useState(0);
  const [issueDescription, setIssueDescription] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/quality-check');
        const data = await response.json();
        
        const processedOrders = data.orders.map(order => ({
          ...order,
          passed: order.passed || 0,
          failed: order.failed || 0,
          status: order.status || 'Pending QC'
        }));
        
        setOrders(processedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, []);

  // Filter orders based on the active tab
  const filteredOrders =
    activeTab === 'active'
      ? orders.filter(order => order.status !== 'Completed')
      : orders.filter(order => order.status === 'Completed');

  // Count orders by status
  const statusCounts = {
    'Pending QC': orders.filter(order => order.status === 'Pending QC').length,
    'In Progress': orders.filter(order => order.status === 'In Progress').length,
    'Completed': orders.filter(order => order.status === 'Completed').length,
  };

  const handleStartQC = async (order) => {
    // Update the order status to In Progress in the database
    try {
      const response = await fetch(`http://localhost:5000/api/quality-check/${order._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'In Progress' }),
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        const updatedOrders = orders.map(o =>
          o._id === order._id ? updatedOrder : o
        );
        setOrders(updatedOrders);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }

    console.log(`Started QC for order ${order._id}`);
  };

  const handleOpenQCForm = (order) => {
    setCurrentOrder(order);
    setShowQCForm(true);
    setQCResult('passed');
    setFailedCount(0);
    setIssueDescription('');
  };

  const handleCompleteQC = async () => {
    if (!currentOrder) return;

    const updatedPassed = qcResult === 'passed' ? (currentOrder.quantity - failedCount) : 0;
    const updatedFailed = qcResult === 'passed' ? failedCount : currentOrder.quantity;

    try {
      const response = await fetch(`http://localhost:5000/api/quality-check/${currentOrder._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'Completed',
          passed: updatedPassed,
          failed: updatedFailed,
        }),
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        const updatedOrders = orders.map(o =>
          o._id === currentOrder._id ? updatedOrder : o
        );
        setOrders(updatedOrders);
        setShowQCForm(false);
        setCurrentOrder(null);
      }
    } catch (error) {
      console.error('Error completing QC:', error);
    }
  };

  const handleCancelQCForm = () => {
    setShowQCForm(false);
    setCurrentOrder(null);
  };

  // Get the status badge color
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Pending QC':
        return 'bg-yellow-100 text-yellow-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Render the action button based on the order status
  const renderActionButton = (order) => {
    switch (order.status) {
      case 'Pending QC':
        return (
          <button
            onClick={() => handleStartQC(order)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
          >
            Start QC
          </button>
        );
      case 'In Progress':
        return (
          <button
            onClick={() => handleOpenQCForm(order)}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
          >
            Complete QC
          </button>
        );
      case 'Completed':
        return (
          <button
            className="bg-gray-200 text-gray-500 px-3 py-1 rounded text-sm cursor-not-allowed"
            disabled
          >
            Completed
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Quality Check</h2>
          <p className="text-gray-600">Manage Quality checks for completed garment Orders</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 text-center rounded-lg shadow">
            <div className="text-lg font-semibold">Pending QC</div>
            <div className="text-2xl font-bold">{statusCounts['Pending QC']}</div>
          </div>
          <div className="bg-white p-4 text-center rounded-lg shadow">
            <div className="text-lg font-semibold">In Progress</div>
            <div className="text-2xl font-bold">{statusCounts['In Progress']}</div>
          </div>
          <div className="bg-white p-4 text-center rounded-lg shadow">
            <div className="text-lg font-semibold">Completed</div>
            <div className="text-2xl font-bold">{statusCounts['Completed']}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 rounded ${activeTab === 'active' ? 'bg-black text-white' : 'bg-gray-200'}`}
          >
            Active QC
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 rounded ${activeTab === 'completed' ? 'bg-black text-white' : 'bg-gray-200'}`}
          >
            Completed QC
          </button>
        </div>

        {/* Table */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="text-center text-gray-500">Loading orders...</div>
            ) : (
              <table className="min-w-full text-sm border-collapse">
                <thead>
                  <tr className="text-left border-b bg-gray-100">
                    <th className="py-3 px-4 font-medium text-gray-600">Order ID</th>
                    <th className="py-3 px-4 font-medium text-gray-600">Customer</th>
                    <th className="py-3 px-4 font-medium text-gray-600">Category</th>
                    <th className="py-3 px-4 font-medium text-gray-600">Total Items</th>
                    <th className="py-3 px-4 font-medium text-gray-600">QC Passed</th>
                    <th className="py-3 px-4 font-medium text-gray-600">QC Failed</th>
                    <th className="py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="py-3 px-4 font-medium text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                {filteredOrders.map((order) => (
                      <tr key={order._id || order.id} className="border-b hover:bg-gray-50 transition">
                        <td className="py-3 px-4">{order.id}</td>
                        <td className="py-3 px-4 font-medium text-gray-900">{order.name}</td>
                        <td className="py-3 px-4">{order.category}</td>
                        <td className="py-3 px-4">{order.quantity}</td>
                        <td className="py-3 px-4">{order.passed}</td>
                        <td className="py-3 px-4">{order.failed}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs ${getStatusBadgeClass(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {renderActionButton(order)}
                        </td>
                      </tr>
                    ))}
                  {filteredOrders.length === 0 && (
                    <tr>
                      <td className="py-4 px-4 text-gray-500" colSpan="8">No orders found for this tab.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* QC Form Modal */}
      {showQCForm && currentOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Complete Quality Check</h3>
              <button 
                onClick={handleCancelQCForm}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            
            <div className="mb-4">
              <p className="font-medium text-gray-700">Order: {currentOrder.id}</p>
              <p className="text-gray-600">Customer: {currentOrder.name}</p>
              <p className="text-gray-600">Total Items: {currentOrder.quantity}</p>
            </div>
            
            <div className="mb-4">
              <label className="block font-medium text-gray-700 mb-2">QC Result</label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="passed"
                    name="qcResult"
                    value="passed"
                    checked={qcResult === 'passed'}
                    onChange={() => setQCResult('passed')}
                    className="mr-2"
                  />
                  <label htmlFor="passed">Passed with Issues</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="failed"
                    name="qcResult"
                    value="failed"
                    checked={qcResult === 'failed'}
                    onChange={() => setQCResult('failed')}
                    className="mr-2"
                  />
                  <label htmlFor="failed">Failed (All items rejected)</label>
                </div>
              </div>
            </div>
            
            {qcResult === 'passed' && (
              <div className="mb-4">
                <label className="block font-medium text-gray-700 mb-2">
                  Number of Failed Items
                </label>
                <div className="flex items-center space-x-2">
                  <button 
                    type="button"
                    onClick={() => setFailedCount(prev => Math.max(0, prev - 1))}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-gray-800"
                  >
                    -
                  </button>
                  <div className="px-4 py-2 bg-gray-100 rounded text-center min-w-16">
                    {failedCount}
                  </div>
                  <button 
                    type="button"
                    onClick={() => setFailedCount(prev => prev + 1)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-gray-800"
                  >
                    +
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {failedCount > 0 
                    ? `${failedCount} items failed, ${currentOrder?.quantity - failedCount} items passed` 
                    : 'All items passed quality check'}
                </p>
              </div>
            )}
            
            <div className="mb-4">
              <label className="block font-medium text-gray-700 mb-2">Issues Found</label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="no-issues"
                    name="issueDescription"
                    checked={issueDescription === ''}
                    onChange={() => setIssueDescription('')}
                    className="mr-2"
                  />
                  <label htmlFor="no-issues">No Issues</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="stitching"
                    name="issueDescription"
                    checked={issueDescription === 'Stitching Problems'}
                    onChange={() => setIssueDescription('Stitching Problems')}
                    className="mr-2"
                  />
                  <label htmlFor="stitching">Stitching Problems</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="fabric"
                    name="issueDescription"
                    checked={issueDescription === 'Fabric Defects'}
                    onChange={() => setIssueDescription('Fabric Defects')}
                    className="mr-2"
                  />
                  <label htmlFor="fabric">Fabric Defects</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="size"
                    name="issueDescription"
                    checked={issueDescription === 'Size Inconsistency'}
                    onChange={() => setIssueDescription('Size Inconsistency')}
                    className="mr-2"
                  />
                  <label htmlFor="size">Size Inconsistency</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="other"
                    name="issueDescription"
                    checked={issueDescription === 'Other Issues'}
                    onChange={() => setIssueDescription('Other Issues')}
                    className="mr-2"
                  />
                  <label htmlFor="other">Other Issues</label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancelQCForm}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleCompleteQC}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Complete QC
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QualityChecked;