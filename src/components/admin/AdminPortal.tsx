import React, { useState, useRef } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { CmsProduct, CATEGORY_LABELS } from '../../types/cms';
import { OrderManager } from './OrderManager';
import { ProductFormModal } from './ProductFormModal';
import { WorkshopSlipModal } from './WorkshopSlipModal';
import {
  Sliders,
  Package,
  Layers,
  Plus,
  Download,
  Upload,
  Cloud,
  LogOut,
  X,
  RefreshCw,
  Search,
  Edit,
  Trash2,
  Check,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Terminal,
  Copy,
  Info
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const {
    isAdminPortalOpen,
    setIsAdminPortalOpen,
    logout,
    staffName,
    sessionExpiresAt,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    exportCatalogJson,
    importCatalogJson,
    resetCatalogToFactory,
    activeSlipOrder,
    closeWorkshopSlip,
    adminToast,
  } = useAdmin();

  const [activeTab, setActiveTab] = useState<'catalog' | 'orders' | 's3-sync'>('orders');
  const [productSearch, setProductSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<CmsProduct | null>(null);

  const [s3Copied, setS3Copied] = useState(false);
  const importFileInputRef = useRef<HTMLInputElement>(null);

  if (!isAdminPortalOpen) return null;

  // Filter products
  const filteredProducts = products.filter((prod) => {
    const matchesCat = categoryFilter === 'all' || prod.category === categoryFilter;
    const query = productSearch.toLowerCase().trim();
    const matchesQuery =
      !query ||
      prod.name.toLowerCase().includes(query) ||
      prod.sku.toLowerCase().includes(query) ||
      prod.subtitle.toLowerCase().includes(query);
    return matchesCat && matchesQuery;
  });

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: CmsProduct) => {
    setEditingProduct(prod);
    setIsProductModalOpen(true);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      importCatalogJson(content);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const s3Command = 'aws s3 sync dist s3://saint-joe-skimboards --delete';

  const handleCopyS3Command = () => {
    navigator.clipboard.writeText(s3Command);
    setS3Copied(true);
    setTimeout(() => setS3Copied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col overflow-hidden animate-fade-in">
      {/* Background Subtle Carbon Grid */}
      <div className="absolute inset-0 carbon-bg opacity-10 pointer-events-none" />

      {/* ADMIN TOP NAVIGATION BAR */}
      <header className="relative z-20 bg-slate-900 border-b border-slate-800 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Staff Details */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 p-1 flex items-center justify-center shrink-0">
            <img src="/saintjoeskim_logo_white.png" alt="Logo" className="w-full h-full object-contain" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-base uppercase tracking-tight text-white">
                Saint Joe CMS Portal
              </span>
              <span className="text-[10px] font-mono bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full border border-sky-500/30">
                Tacloban Bay v2.4
              </span>
            </div>
            <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
              <span>Signed in as <strong className="text-white">{staffName}</strong></span>
              <span>•</span>
              <span className="text-slate-500">12h Session Active</span>
            </div>
          </div>
        </div>

        {/* Global Action Tools */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={exportCatalogJson}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-mono text-xs transition-colors flex items-center gap-1.5 border border-slate-700"
            title="Download products JSON for backup or S3 static hosting"
          >
            <Download className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Export JSON</span>
          </button>

          <input
            type="file"
            ref={importFileInputRef}
            accept=".json,application/json"
            className="hidden"
            onChange={handleImportFile}
          />

          <button
            onClick={() => importFileInputRef.current?.click()}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-mono text-xs transition-colors flex items-center gap-1.5 border border-slate-700"
            title="Import products JSON"
          >
            <Upload className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Import JSON</span>
          </button>

          <button
            onClick={logout}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-950/60 text-slate-300 hover:text-rose-400 font-mono text-xs transition-colors flex items-center gap-1.5 border border-slate-700"
            title="Log out of staff session"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Log Out</span>
          </button>

          <button
            onClick={() => setIsAdminPortalOpen(false)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors ml-1"
            title="Return to Storefront"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* TAB NAVIGATION STRIP */}
      <div className="relative z-10 bg-slate-900/60 border-b border-slate-800 px-4 sm:px-8 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Order &amp; GCash Tracking</span>
          </button>

          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
              activeTab === 'catalog'
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Skimboard Catalog ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('s3-sync')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
              activeTab === 's3-sync'
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Cloud className="w-4 h-4" />
            <span>AWS S3 Sync &amp; Backup</span>
          </button>
        </div>

        {activeTab === 'catalog' && (
          <button
            onClick={handleOpenAddProduct}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-display font-black text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add New Board</span>
          </button>
        )}
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="relative z-10 flex-1 overflow-y-auto p-4 sm:p-8 max-w-7xl mx-auto w-full">
        {/* TAB 1: ORDERS & GCASH MANAGEMENT */}
        {activeTab === 'orders' && <OrderManager />}

        {/* TAB 2: SKIMBOARD CATALOG */}
        {activeTab === 'catalog' && (
          <div className="space-y-6">
            {/* Search and Category Filter */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter boards by name, SKU, or specs..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto text-xs font-mono">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-sky-500"
                >
                  <option value="all">All Categories</option>
                  {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Catalog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between transition-all space-y-4 shadow-sm"
                >
                  <div className="space-y-3">
                    {/* Top image & badges */}
                    <div className="relative aspect-4/3 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center p-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain"
                      />

                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md bg-slate-900/90 text-sky-400 border border-slate-700">
                          {product.category}
                        </span>
                        {product.featured && (
                          <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md bg-amber-500/90 text-slate-950">
                            Featured
                          </span>
                        )}
                      </div>

                      <div className="absolute top-2 right-2">
                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${
                            product.inStock
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                              : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                          }`}
                        >
                          {product.inStock ? `${product.stockQty} in stock` : 'Out of Stock'}
                        </span>
                      </div>
                    </div>

                    {/* Details */}
                    <div>
                      <div className="text-[11px] font-mono text-slate-500 uppercase">{product.sku}</div>
                      <h3 className="font-display font-black text-lg text-white uppercase tracking-tight">
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-0.5">{product.subtitle}</p>
                    </div>

                    {/* Skimboard Physical Specs Snippet */}
                    <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] font-mono space-y-1 text-slate-400">
                      <div className="flex justify-between">
                        <span>Dims:</span>
                        <span className="text-white">
                          {product.specs.lengthInches} × {product.specs.widthInches}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rider Weight:</span>
                        <span className="text-sky-300">{product.specs.weightCapacityKg}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Core:</span>
                        <span className="text-slate-300 truncate max-w-[150px]">{product.specs.coreMaterial}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing & Controls */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-mono font-bold text-base text-emerald-400">
                        ₱{product.pricePHP.toLocaleString()} PHP
                      </div>
                      {product.compareAtPricePHP && (
                        <div className="text-[11px] font-mono text-slate-500 line-through">
                          ₱{product.compareAtPricePHP.toLocaleString()}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEditProduct(product)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 hover:text-sky-300 font-mono text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Remove "${product.name}" from catalog?`)) {
                            deleteProduct(product.id);
                          }
                        }}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 border border-slate-700 transition-colors"
                        title="Delete product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: AWS S3 SYNC & DEPLOYMENT UTILITY */}
        {activeTab === 's3-sync' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                  <Cloud className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-black text-xl text-white uppercase tracking-tight">
                    AWS S3 Deployment &amp; Static Architecture
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Host: saint-joe-skimboards.s3.ap-southeast-2.amazonaws.com
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-xs font-mono text-slate-300 leading-relaxed">
                <p>
                  Saint Joe Skimboards is engineered as a zero-backend Single Page Application (SPA). Changes saved in this CMS persist automatically in your local browser’s <code className="text-sky-400">localStorage</code>.
                </p>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="text-[11px] uppercase font-bold text-amber-400 flex items-center justify-between">
                    <span>One-Click AWS S3 Sync Command</span>
                    <button
                      onClick={handleCopyS3Command}
                      className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 font-mono lowercase"
                    >
                      {s3Copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> copy command
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-3 bg-slate-900 rounded-xl text-sky-300 text-xs overflow-x-auto border border-slate-800">
                    {s3Command}
                  </pre>
                </div>

                <div className="space-y-2">
                  <div className="font-bold text-white uppercase text-[11px]">Static Deployment Workflow:</div>
                  <ol className="list-decimal list-inside space-y-1.5 text-slate-400">
                    <li>Add, update, or remove boards in the Catalog tab.</li>
                    <li>Click <strong className="text-white">Export JSON</strong> in the top header to backup your changes.</li>
                    <li>Commit to your git repo or save as <code className="text-sky-300">src/data/products.ts</code>.</li>
                    <li>Run <code className="text-white">npm run build</code> to produce production chunks in <code className="text-white">dist/</code>.</li>
                    <li>Sync directly to Amazon S3 bucket with the sync command.</li>
                  </ol>
                </div>
              </div>

              {/* Danger Zone: Factory Reset */}
              <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white uppercase">Reset Catalog to Factory Defaults</div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    Restores the original 6 Saint Joe skimboard models and specifications.
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (confirm('Reset all catalog boards to original factory defaults?')) {
                      resetCatalogToFactory();
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs font-mono font-semibold transition-all"
                >
                  Reset Defaults
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Product Add / Edit Modal */}
      <ProductFormModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        initialProduct={editingProduct}
        onSave={(productData) => {
          if (editingProduct) {
            return updateProduct(editingProduct.id, productData);
          } else {
            return addProduct(productData);
          }
        }}
      />

      {/* Workshop Shaping Bay Slip Modal */}
      <WorkshopSlipModal order={activeSlipOrder} onClose={closeWorkshopSlip} />

      {/* Non-intrusive Toast Notification */}
      {adminToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
          <div
            className={`px-4 py-3 rounded-2xl shadow-2xl border text-xs font-mono font-bold flex items-center gap-2 ${
              adminToast.type === 'error'
                ? 'bg-rose-950/90 text-rose-200 border-rose-500/50'
                : adminToast.type === 'info'
                ? 'bg-slate-900/90 text-slate-200 border-slate-700'
                : 'bg-emerald-950/90 text-emerald-200 border-emerald-500/50'
            }`}
          >
            {adminToast.type === 'error' ? (
              <X className="w-4 h-4 text-rose-400" />
            ) : adminToast.type === 'info' ? (
              <Info className="w-4 h-4 text-sky-400" />
            ) : (
              <Check className="w-4 h-4 text-emerald-400" />
            )}
            <span>{adminToast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};
