import React, { useState, useEffect } from 'react';
import { CheckCircle, Loader, Search, AlertCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TestAutomationShowcase: React.FC = () => {
    const navigate = useNavigate();
    // Dynamic Content
    const [dynamicText, setDynamicText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    
    // Form States
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        country: '',
        agreeTerms: false
    });
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [formSubmitted, setFormSubmitted] = useState(false);
    
    // Table Data
    const [tableData, setTableData] = useState([
        { id: 1, name: 'Selenium WebDriver', category: 'Browser Automation', status: 'Active' },
        { id: 2, name: 'Playwright', category: 'E2E Testing', status: 'Active' },
        { id: 3, name: 'Cypress', category: 'E2E Testing', status: 'Active' },
        { id: 4, name: 'Jest', category: 'Unit Testing', status: 'Active' },
        { id: 5, name: 'TestNG', category: 'Test Framework', status: 'Inactive' }
    ]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [filterStatus, setFilterStatus] = useState<'all' | 'Active' | 'Inactive'>('all');
    
    // Toast Notification
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    
    // Counter for testing state
    const [counter, setCounter] = useState(0);
    
    // Search with debounce
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<string[]>([]);
    
    const mockSearchData = [
        'Selenium', 'Playwright', 'Cypress', 'Jest', 'Mocha', 'Jasmine',
        'TestNG', 'JUnit', 'PyTest', 'Robot Framework', 'Cucumber', 'SpecFlow'
    ];

    useEffect(() => {
        if (searchTerm.length > 0) {
            const results = mockSearchData.filter(item =>
                item.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    }, [searchTerm]);

    const handleLoadDynamicContent = () => {
        setIsLoading(true);
        setTimeout(() => {
            setDynamicText('Dynamic content loaded successfully! This text appeared after 2 seconds.');
            setIsLoading(false);
        }, 2000);
    };

    const validateForm = () => {
        const errors: Record<string, string> = {};
        
        if (!formData.username || formData.username.length < 3) {
            errors.username = 'Username must be at least 3 characters';
        }
        
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Please enter a valid email';
        }
        
        if (!formData.password || formData.password.length < 8) {
            errors.password = 'Password must be at least 8 characters';
        }
        
        if (!formData.country) {
            errors.country = 'Please select a country';
        }
        
        if (!formData.agreeTerms) {
            errors.agreeTerms = 'You must agree to the terms';
        }
        
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmitForm = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setFormSubmitted(true);
            showToastNotification('Form submitted successfully!');
            setTimeout(() => setFormSubmitted(false), 3000);
        }
    };

    const showToastNotification = (message: string) => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleSort = () => {
        const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newOrder);
        const sorted = [...tableData].sort((a, b) => {
            if (newOrder === 'asc') {
                return a.name.localeCompare(b.name);
            }
            return b.name.localeCompare(a.name);
        });
        setTableData(sorted);
    };

    const filteredTableData = filterStatus === 'all' 
        ? tableData 
        : tableData.filter(item => item.status === filterStatus);

    return (
        <div className="w-full bg-vscode-editor text-[#cccccc]">
            {/* Header with Back Button */}
            <div className="sticky top-0 z-50 bg-[#1e1e1e] border-b border-[#3c3c3c] px-6 py-4">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <button
                        data-testid="back-to-cv-btn"
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 px-4 py-2 bg-[#252526] hover:bg-[#2a2d2e] text-white rounded transition-colors"
                    >
                        <ArrowLeft size={18} />
                        <span>Back to CV</span>
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-white">🎯 Test Automation Showcase</h1>
                    </div>
                    <div className="w-32"></div> {/* Spacer for centering */}
                </div>
            </div>

            <div className="p-6 max-w-6xl mx-auto pb-20">
                <div className="mb-8">
                    <p className="text-[#858585]">Interactive components designed for comprehensive test automation</p>
                </div>

            {/* Toast Notification */}
            {showToast && (
                <div 
                    data-testid="toast-notification"
                    className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in"
                >
                    <div className="flex items-center gap-2">
                        <CheckCircle size={20} />
                        <span>{toastMessage}</span>
                    </div>
                </div>
            )}

            {/* Section 1: Dynamic Content Loading */}
            <div data-testid="section-dynamic-content" className="mb-8 p-6 bg-[#1e1e1e] rounded-lg border border-[#3c3c3c]">
                <h2 className="text-xl font-semibold text-white mb-4">1. Dynamic Content Loading</h2>
                <button
                    data-testid="load-dynamic-btn"
                    onClick={handleLoadDynamicContent}
                    disabled={isLoading}
                    className="px-4 py-2 bg-[#007acc] text-white rounded hover:bg-[#005a9e] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <Loader className="animate-spin" size={16} />
                            Loading...
                        </>
                    ) : (
                        'Load Dynamic Content'
                    )}
                </button>
                {dynamicText && (
                    <div data-testid="dynamic-content" className="mt-4 p-4 bg-[#252526] rounded border border-green-500">
                        {dynamicText}
                    </div>
                )}
            </div>

            {/* Section 2: Counter (State Testing) */}
            <div data-testid="section-counter" className="mb-8 p-6 bg-[#1e1e1e] rounded-lg border border-[#3c3c3c]">
                <h2 className="text-xl font-semibold text-white mb-4">2. State Management</h2>
                <div className="flex items-center gap-4">
                    <button
                        data-testid="counter-decrement"
                        onClick={() => setCounter(counter - 1)}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        -
                    </button>
                    <span data-testid="counter-value" className="text-2xl font-bold text-white min-w-[60px] text-center">
                        {counter}
                    </span>
                    <button
                        data-testid="counter-increment"
                        onClick={() => setCounter(counter + 1)}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        +
                    </button>
                    <button
                        data-testid="counter-reset"
                        onClick={() => setCounter(0)}
                        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                    >
                        Reset
                    </button>
                </div>
            </div>

            {/* Section 3: Form Validation */}
            <div data-testid="section-form" className="mb-8 p-6 bg-[#1e1e1e] rounded-lg border border-[#3c3c3c]">
                <h2 className="text-xl font-semibold text-white mb-4">3. Form Validation</h2>
                <form onSubmit={handleSubmitForm} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm mb-1">Username *</label>
                        <input
                            data-testid="form-username"
                            id="username"
                            type="text"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            className="w-full px-3 py-2 bg-[#252526] border border-[#3c3c3c] rounded text-white focus:border-[#007acc] outline-none"
                            placeholder="Enter username"
                        />
                        {formErrors.username && (
                            <span data-testid="error-username" className="text-red-500 text-sm flex items-center gap-1 mt-1">
                                <AlertCircle size={14} />
                                {formErrors.username}
                            </span>
                        )}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm mb-1">Email *</label>
                        <input
                            data-testid="form-email"
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-3 py-2 bg-[#252526] border border-[#3c3c3c] rounded text-white focus:border-[#007acc] outline-none"
                            placeholder="Enter email"
                        />
                        {formErrors.email && (
                            <span data-testid="error-email" className="text-red-500 text-sm flex items-center gap-1 mt-1">
                                <AlertCircle size={14} />
                                {formErrors.email}
                            </span>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm mb-1">Password *</label>
                        <input
                            data-testid="form-password"
                            id="password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full px-3 py-2 bg-[#252526] border border-[#3c3c3c] rounded text-white focus:border-[#007acc] outline-none"
                            placeholder="Enter password"
                        />
                        {formErrors.password && (
                            <span data-testid="error-password" className="text-red-500 text-sm flex items-center gap-1 mt-1">
                                <AlertCircle size={14} />
                                {formErrors.password}
                            </span>
                        )}
                    </div>

                    <div>
                        <label htmlFor="country" className="block text-sm mb-1">Country *</label>
                        <select
                            data-testid="form-country"
                            id="country"
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            className="w-full px-3 py-2 bg-[#252526] border border-[#3c3c3c] rounded text-white focus:border-[#007acc] outline-none"
                        >
                            <option value="">Select a country</option>
                            <option value="USA">United States</option>
                            <option value="UK">United Kingdom</option>
                            <option value="Canada">Canada</option>
                            <option value="Australia">Australia</option>
                            <option value="Germany">Germany</option>
                        </select>
                        {formErrors.country && (
                            <span data-testid="error-country" className="text-red-500 text-sm flex items-center gap-1 mt-1">
                                <AlertCircle size={14} />
                                {formErrors.country}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            data-testid="form-terms"
                            id="terms"
                            type="checkbox"
                            checked={formData.agreeTerms}
                            onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                            className="w-4 h-4"
                        />
                        <label htmlFor="terms" className="text-sm">I agree to the terms and conditions *</label>
                    </div>
                    {formErrors.agreeTerms && (
                        <span data-testid="error-terms" className="text-red-500 text-sm flex items-center gap-1">
                            <AlertCircle size={14} />
                            {formErrors.agreeTerms}
                        </span>
                    )}

                    <button
                        data-testid="form-submit"
                        type="submit"
                        className="px-6 py-2 bg-[#007acc] text-white rounded hover:bg-[#005a9e]"
                    >
                        Submit Form
                    </button>

                    {formSubmitted && (
                        <div data-testid="form-success" className="p-4 bg-green-900/30 border border-green-500 rounded flex items-center gap-2">
                            <CheckCircle className="text-green-500" size={20} />
                            <span className="text-green-400">Form submitted successfully!</span>
                        </div>
                    )}
                </form>
            </div>

            {/* Section 4: Search with Autocomplete */}
            <div data-testid="section-search" className="mb-8 p-6 bg-[#1e1e1e] rounded-lg border border-[#3c3c3c]">
                <h2 className="text-xl font-semibold text-white mb-4">4. Search with Autocomplete</h2>
                <div className="relative">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#858585]" size={18} />
                        <input
                            data-testid="search-input"
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search test frameworks..."
                            className="w-full pl-10 pr-3 py-2 bg-[#252526] border border-[#3c3c3c] rounded text-white focus:border-[#007acc] outline-none"
                        />
                    </div>
                    {searchResults.length > 0 && (
                        <div data-testid="search-results" className="absolute w-full mt-1 bg-[#252526] border border-[#3c3c3c] rounded shadow-lg z-10">
                            {searchResults.map((result, index) => (
                                <div
                                    key={result}
                                    data-testid={`search-result-${index}`}
                                    className="px-4 py-2 hover:bg-[#37373d] cursor-pointer"
                                    onClick={() => {
                                        setSearchTerm(result);
                                        setSearchResults([]);
                                    }}
                                >
                                    {result}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Section 5: Data Table with Sorting and Filtering */}
            <div data-testid="section-table" className="mb-8 p-6 bg-[#1e1e1e] rounded-lg border border-[#3c3c3c]">
                <h2 className="text-xl font-semibold text-white mb-4">5. Data Table (Sort & Filter)</h2>
                
                <div className="mb-4 flex gap-2">
                    <button
                        data-testid="filter-all"
                        onClick={() => setFilterStatus('all')}
                        className={`px-4 py-2 rounded ${filterStatus === 'all' ? 'bg-[#007acc] text-white' : 'bg-[#252526] text-[#cccccc]'}`}
                    >
                        All
                    </button>
                    <button
                        data-testid="filter-active"
                        onClick={() => setFilterStatus('Active')}
                        className={`px-4 py-2 rounded ${filterStatus === 'Active' ? 'bg-[#007acc] text-white' : 'bg-[#252526] text-[#cccccc]'}`}
                    >
                        Active
                    </button>
                    <button
                        data-testid="filter-inactive"
                        onClick={() => setFilterStatus('Inactive')}
                        className={`px-4 py-2 rounded ${filterStatus === 'Inactive' ? 'bg-[#007acc] text-white' : 'bg-[#252526] text-[#cccccc]'}`}
                    >
                        Inactive
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table data-testid="data-table" className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-[#3c3c3c]">
                                <th className="text-left p-3">ID</th>
                                <th className="text-left p-3">
                                    <button
                                        data-testid="sort-name"
                                        onClick={handleSort}
                                        className="flex items-center gap-2 hover:text-white"
                                    >
                                        Name {sortOrder === 'asc' ? '↑' : '↓'}
                                    </button>
                                </th>
                                <th className="text-left p-3">Category</th>
                                <th className="text-left p-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTableData.map((row) => (
                                <tr
                                    key={row.id}
                                    data-testid={`table-row-${row.id}`}
                                    className="border-b border-[#3c3c3c] hover:bg-[#252526]"
                                >
                                    <td className="p-3">{row.id}</td>
                                    <td className="p-3">{row.name}</td>
                                    <td className="p-3">{row.category}</td>
                                    <td className="p-3">
                                        <span
                                            data-testid={`status-${row.id}`}
                                            className={`px-2 py-1 rounded text-xs ${
                                                row.status === 'Active'
                                                    ? 'bg-green-900/30 text-green-400'
                                                    : 'bg-gray-700 text-gray-400'
                                            }`}
                                        >
                                            {row.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Section 6: Modal Dialog */}
            <div data-testid="section-modal" className="mb-8 p-6 bg-[#1e1e1e] rounded-lg border border-[#3c3c3c]">
                <h2 className="text-xl font-semibold text-white mb-4">6. Modal Dialog</h2>
                <button
                    data-testid="open-modal-btn"
                    onClick={() => setShowModal(true)}
                    className="px-4 py-2 bg-[#007acc] text-white rounded hover:bg-[#005a9e]"
                >
                    Open Modal
                </button>

                {showModal && (
                    <div data-testid="modal-overlay" className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div data-testid="modal-content" className="bg-[#1e1e1e] p-6 rounded-lg border border-[#3c3c3c] max-w-md w-full mx-4">
                            <h3 className="text-xl font-semibold text-white mb-4">Test Modal</h3>
                            <p className="text-[#cccccc] mb-6">
                                This is a modal dialog for testing overlay interactions and focus management.
                            </p>
                            <div className="flex gap-2 justify-end">
                                <button
                                    data-testid="modal-cancel"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    data-testid="modal-confirm"
                                    onClick={() => {
                                        setShowModal(false);
                                        showToastNotification('Modal action confirmed!');
                                    }}
                                    className="px-4 py-2 bg-[#007acc] text-white rounded hover:bg-[#005a9e]"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            </div>
        </div>
    );
};

export default TestAutomationShowcase;
