import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CmsProduct, CmsCategory, CATEGORY_LABELS } from '../../types/cms';
import { compressImageFile, formatBytes, CompressionResult, getFileFromClipboard } from '../../utils/imageCompression';
import {
  X,
  Upload,
  Camera,
  Link as LinkIcon,
  Sparkles,
  Sliders,
  Check,
  AlertCircle,
  Image as ImageIcon,
  Trash2,
  RefreshCw,
  Info,
  DollarSign
} from 'lucide-react';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (productData: Omit<CmsProduct, 'id' | 'updatedAt'>) => { success: boolean; errors?: string[] };
  initialProduct?: CmsProduct | null;
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialProduct,
}) => {
  const isEditing = Boolean(initialProduct);

  // Form State
  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<CmsCategory>('carbon-pro');
  const [sku, setSku] = useState('');
  const [pricePHP, setPricePHP] = useState<number>(12500);
  const [compareAtPricePHP, setCompareAtPricePHP] = useState<number | undefined>(14500);
  const [inStock, setInStock] = useState(true);
  const [stockQty, setStockQty] = useState(10);
  const [featured, setFeatured] = useState(true);
  const [bestSeller, setBestSeller] = useState(false);
  const [description, setDescription] = useState('');
  const [freeInclusions, setFreeInclusions] = useState('FREE Arch Bar + Kick Tail Traction Pad Included');
  const [signatureRider, setSignatureRider] = useState('');

  // Specs
  const [lengthInches, setLengthInches] = useState('52.0" Standard');
  const [widthInches, setWidthInches] = useState('20.25"');
  const [thicknessInches, setThicknessInches] = useState('5/8" Tapered Foil');
  const [weightCapacityKg, setWeightCapacityKg] = useState('65 – 85 kg');
  const [rockerProfile, setRockerProfile] = useState('Continuous Hybrid 2.25" Nose Rocker');
  const [coreMaterial, setCoreMaterial] = useState('Closed-Cell High-Density Structural Foam Core');
  const [lamination, setLamination] = useState('Dual Layer Toray 3K Carbon + UV Stable Marine Epoxy');
  const [railContour, setRailContour] = useState('Boxy 60/40 Rail Contour with Clean Release Tail');

  // Image & Compression Pipeline
  const [imageTab, setImageTab] = useState<'upload' | 'url'>('upload');
  const [imageUrl, setImageUrl] = useState('');
  const [imageWebLinkInput, setImageWebLinkInput] = useState('');
  const [compressing, setCompressing] = useState(false);
  const [compressionStats, setCompressionStats] = useState<CompressionResult | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Validation
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Load initial product when editing or reset on open
  useEffect(() => {
    if (initialProduct) {
      setName(initialProduct.name);
      setSubtitle(initialProduct.subtitle);
      setCategory(initialProduct.category);
      setSku(initialProduct.sku);
      setPricePHP(initialProduct.pricePHP);
      setCompareAtPricePHP(initialProduct.compareAtPricePHP);
      setInStock(initialProduct.inStock);
      setStockQty(initialProduct.stockQty);
      setFeatured(initialProduct.featured);
      setBestSeller(initialProduct.bestSeller);
      setDescription(initialProduct.description);
      setImageUrl(initialProduct.image);
      setFreeInclusions(initialProduct.freeInclusions || '');
      setSignatureRider(initialProduct.signatureRider || '');

      setLengthInches(initialProduct.specs.lengthInches);
      setWidthInches(initialProduct.specs.widthInches);
      setThicknessInches(initialProduct.specs.thicknessInches);
      setWeightCapacityKg(initialProduct.specs.weightCapacityKg);
      setRockerProfile(initialProduct.specs.rockerProfile);
      setCoreMaterial(initialProduct.specs.coreMaterial);
      setLamination(initialProduct.specs.lamination);
      setRailContour(initialProduct.specs.railContour);

      setCompressionStats(null);
    } else {
      // Default clean board for new creation
      setName('');
      setSubtitle('');
      setCategory('carbon-pro');
      setSku(`SJ-BRD-${Math.floor(100 + Math.random() * 900)}`);
      setPricePHP(11500);
      setCompareAtPricePHP(13500);
      setInStock(true);
      setStockQty(5);
      setFeatured(false);
      setBestSeller(false);
      setDescription('');
      setImageUrl('/saint_apex_pro_carbon.png');
      setFreeInclusions('FREE Arch Bar + Kick Tail Pad Included');
      setSignatureRider('');

      setLengthInches('51.5" Custom');
      setWidthInches('20.0"');
      setThicknessInches('5/8" Foil');
      setWeightCapacityKg('60 – 80 kg');
      setRockerProfile('Continuous Hybrid Nose Rocker');
      setCoreMaterial('High-Density Closed-Cell PVC Foam');
      setLamination('Toray 3K Carbon Weave + Marine Epoxy');
      setRailContour('60/40 Boxy Performance Rails');

      setCompressionStats(null);
    }
    setErrors({});
  }, [initialProduct, isOpen]);

  // Handle image compression from File
  const processImageFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPEG, PNG, WebP)');
      return;
    }

    try {
      setCompressing(true);
      const result = await compressImageFile(file, 1200, 0.82);
      setImageUrl(result.dataUrl);
      setCompressionStats(result);
      setErrors((prev) => ({ ...prev, image: '' }));
    } catch (err: any) {
      alert(`Image compression failed: ${err.message}`);
    } finally {
      setCompressing(false);
    }
  };

  // Clipboard Paste Listener (Ctrl+V anywhere in modal)
  const handlePaste = useCallback((e: ClipboardEvent) => {
    const file = getFileFromClipboard(e.clipboardData);
    if (file) {
      e.preventDefault();
      processImageFile(file);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('paste', handlePaste);
      return () => window.removeEventListener('paste', handlePaste);
    }
  }, [isOpen, handlePaste]);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim() || name.length < 3) newErrors.name = 'Name must be at least 3 characters';
    if (!subtitle.trim() || subtitle.length < 5) newErrors.subtitle = 'Subtitle must be at least 5 characters';
    if (!sku.trim()) newErrors.sku = 'SKU is required';
    if (!pricePHP || pricePHP <= 0) newErrors.pricePHP = 'Price in PHP must be greater than 0';
    if (!description.trim() || description.length < 10) newErrors.description = 'Description must be at least 10 characters';
    if (!imageUrl) newErrors.image = 'Product photo is required';
    if (!lengthInches) newErrors.lengthInches = 'Length specification required';
    if (!rockerProfile) newErrors.rockerProfile = 'Rocker profile required';
    if (!coreMaterial) newErrors.coreMaterial = 'Core material required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload: Omit<CmsProduct, 'id' | 'updatedAt'> = {
      name,
      subtitle,
      category,
      sku: sku.toUpperCase(),
      pricePHP: Number(pricePHP),
      compareAtPricePHP: compareAtPricePHP ? Number(compareAtPricePHP) : undefined,
      inStock,
      stockQty: Number(stockQty),
      featured,
      bestSeller,
      image: imageUrl,
      description,
      specs: {
        lengthInches,
        widthInches,
        thicknessInches,
        weightCapacityKg,
        rockerProfile,
        coreMaterial,
        lamination,
        railContour,
      },
      freeInclusions: freeInclusions.trim() || undefined,
      signatureRider: signatureRider.trim() || undefined,
    };

    const res = onSave(payload);
    if (res.success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-6 text-white max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-900/95 sticky top-0 z-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-amber-500 p-0.5 flex items-center justify-center">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <Sliders className="w-5 h-5 text-sky-400" />
              </div>
            </div>
            <div>
              <h2 className="font-display font-black text-lg sm:text-xl text-white uppercase tracking-tight">
                {isEditing ? `Edit Board: ${initialProduct?.name}` : 'Shaping Bay: Add New Skimboard'}
              </h2>
              <p className="text-xs font-mono text-slate-400">
                Full Specs • Client-Side Canvas Compression • Zod Runtime Validation
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-8 overflow-y-auto space-y-8 flex-1">
          {/* SECTION 1: PHOTO UPLOAD & ZERO-LAG COMPRESSION */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  <span>Product Board Image &amp; Camera Pipeline</span>
                </label>
                <p className="text-[11px] text-slate-400">
                  Drag &amp; drop, snap live with phone camera, or press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">Ctrl+V</kbd> anywhere to paste screenshot.
                </p>
              </div>

              {/* Tabs */}
              <div className="flex bg-slate-800/80 p-1 rounded-xl border border-slate-700/80 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setImageTab('upload')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    imageTab === 'upload' ? 'bg-sky-600 text-white font-bold shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Upload / Camera
                </button>
                <button
                  type="button"
                  onClick={() => setImageTab('url')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    imageTab === 'url' ? 'bg-sky-600 text-white font-bold shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Web URL
                </button>
              </div>
            </div>

            {/* Upload & Dropzone Mode */}
            {imageTab === 'upload' ? (
              <div className="space-y-3">
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      processImageFile(e.dataTransfer.files[0]);
                    }
                  }}
                  className={`relative border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
                    isDragging
                      ? 'border-sky-400 bg-sky-950/30'
                      : 'border-slate-700/80 bg-slate-900/50 hover:border-slate-600'
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/png,image/jpeg,image/webp"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        processImageFile(e.target.files[0]);
                      }
                    }}
                  />

                  {/* Mobile Camera Input */}
                  <input
                    type="file"
                    ref={cameraInputRef}
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        processImageFile(e.target.files[0]);
                      }
                    }}
                  />

                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                      <Upload className="w-6 h-6" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-white">
                        Drop raw workshop board photo here, or browse device
                      </p>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">
                        Supports PNG, JPEG, WebP • Auto-downscaled to 1200px @ 82% quality
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={compressing}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-semibold border border-slate-700 transition-all flex items-center gap-1.5"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Browse Files</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => cameraInputRef.current?.click()}
                        disabled={compressing}
                        className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-mono text-xs font-semibold border border-amber-500/40 transition-all flex items-center gap-1.5"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>Snap with Workshop Camera</span>
                      </button>
                    </div>
                  </div>

                  {compressing && (
                    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center rounded-2xl gap-2 text-sky-400 font-mono text-xs">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Optimizing with HTML5 canvas downscaler...</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="https://saint-joe-skimboards.s3.ap-southeast-2.amazonaws.com/... or relative URL"
                  value={imageWebLinkInput}
                  onChange={(e) => setImageWebLinkInput(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-sky-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (imageWebLinkInput.trim()) {
                      setImageUrl(imageWebLinkInput.trim());
                      setCompressionStats(null);
                      setErrors((prev) => ({ ...prev, image: '' }));
                    }
                  }}
                  className="px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-mono text-xs font-bold rounded-xl transition-all"
                >
                  Set URL
                </button>
              </div>
            )}

            {/* Current Image Preview & Compression Stats */}
            {imageUrl && (
              <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="relative w-28 h-28 bg-slate-950 rounded-xl overflow-hidden border border-slate-700 flex items-center justify-center p-1.5 shrink-0">
                  <img
                    src={imageUrl}
                    alt="Board Preview"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                <div className="flex-1 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-slate-300 font-bold">Active Image Slot</span>
                    <button
                      type="button"
                      onClick={() => {
                        setImageUrl('');
                        setCompressionStats(null);
                      }}
                      className="text-rose-400 hover:text-rose-300 flex items-center gap-1 font-mono text-[11px]"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>

                  {compressionStats ? (
                    <div className="space-y-1 bg-slate-950/70 p-2.5 rounded-lg border border-slate-800 font-mono text-[11px]">
                      <div className="flex items-center justify-between text-emerald-400 font-bold">
                        <span className="flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Canvas Optimized
                        </span>
                        <span className="bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-300">
                          {compressionStats.reductionPercentage}% Smaller
                        </span>
                      </div>
                      <div className="text-slate-400 flex justify-between">
                        <span>Original: {formatBytes(compressionStats.originalBytes)}</span>
                        <span className="text-sky-300">New: {formatBytes(compressionStats.compressedBytes)}</span>
                      </div>
                      <div className="text-slate-500 text-[10px]">
                        Clamped resolution: {compressionStats.width} × {compressionStats.height}px
                      </div>
                    </div>
                  ) : (
                    <div className="text-[11px] font-mono text-slate-400">
                      Using direct asset path / URL.
                    </div>
                  )}
                </div>
              </div>
            )}

            {errors.image && (
              <p className="text-xs font-mono text-rose-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.image}
              </p>
            )}
          </div>

          {/* SECTION 2: CORE DETAILS & PRICING */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Board Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Saint Apex Pro Toray Carbon"
                className={`w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl text-sm font-semibold text-white focus:outline-none focus:ring-1 focus:ring-sky-500 ${
                  errors.name ? 'border-rose-500' : 'border-slate-700'
                }`}
              />
              {errors.name && <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CmsCategory)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm font-semibold text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
              >
                {Object.entries(CATEGORY_LABELS).map(([catKey, label]) => (
                  <option key={catKey} value={catKey}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                SKU / Batch Code *
              </label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="e.g. SJ-CBN-APEX"
                className={`w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl text-sm font-mono text-sky-400 uppercase focus:outline-none focus:ring-1 focus:ring-sky-500 ${
                  errors.sku ? 'border-rose-500' : 'border-slate-700'
                }`}
              />
              {errors.sku && <p className="text-[11px] text-rose-400 mt-1">{errors.sku}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                  Price (PHP ₱) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 text-xs font-mono">₱</span>
                  <input
                    type="number"
                    value={pricePHP}
                    onChange={(e) => setPricePHP(Number(e.target.value))}
                    placeholder="12500"
                    className={`w-full pl-7 pr-3 py-2.5 bg-slate-950 border rounded-xl text-sm font-mono font-bold text-emerald-400 focus:outline-none focus:ring-1 focus:ring-sky-500 ${
                      errors.pricePHP ? 'border-rose-500' : 'border-slate-700'
                    }`}
                  />
                </div>
                {errors.pricePHP && <p className="text-[11px] text-rose-400 mt-1">{errors.pricePHP}</p>}
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                  Compare At (₱)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-500 text-xs font-mono">₱</span>
                  <input
                    type="number"
                    value={compareAtPricePHP || ''}
                    onChange={(e) => setCompareAtPricePHP(e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="14500"
                    className="w-full pl-7 pr-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm font-mono text-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Subtitle &amp; Construction Tagline *
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="e.g. Toray 3K Carbon Weave • Ultra-Rigid Competition Weapon"
                className={`w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-sky-500 ${
                  errors.subtitle ? 'border-rose-500' : 'border-slate-700'
                }`}
              />
              {errors.subtitle && <p className="text-[11px] text-rose-400 mt-1">{errors.subtitle}</p>}
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Comprehensive Shaping Bay Description *
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detailed explanation of the flex pattern, rocker profile, shorebreak performance, and Philippine manufacturing craftsmanship..."
                className={`w-full p-3.5 bg-slate-950 border rounded-xl text-xs text-white leading-relaxed focus:outline-none focus:ring-1 focus:ring-sky-500 ${
                  errors.description ? 'border-rose-500' : 'border-slate-700'
                }`}
              />
              {errors.description && <p className="text-[11px] text-rose-400 mt-1">{errors.description}</p>}
            </div>
          </div>

          {/* SECTION 3: SKIMBOARD SHAPING & HYDRODYNAMIC SPECS */}
          <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-xs font-mono font-bold uppercase text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span>Shaping Bay Physical Specifications</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-[11px] font-mono uppercase text-slate-400 block mb-1">Length</label>
                <input
                  type="text"
                  value={lengthInches}
                  onChange={(e) => setLengthInches(e.target.value)}
                  placeholder='e.g. 52.0" Standard'
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-slate-400 block mb-1">Width</label>
                <input
                  type="text"
                  value={widthInches}
                  onChange={(e) => setWidthInches(e.target.value)}
                  placeholder='e.g. 20.25"'
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-slate-400 block mb-1">Thickness</label>
                <input
                  type="text"
                  value={thicknessInches}
                  onChange={(e) => setThicknessInches(e.target.value)}
                  placeholder='e.g. 5/8" Foil'
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-slate-400 block mb-1">Rider Weight Capacity</label>
                <input
                  type="text"
                  value={weightCapacityKg}
                  onChange={(e) => setWeightCapacityKg(e.target.value)}
                  placeholder="e.g. 65 – 85 kg"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-sky-300"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[11px] font-mono uppercase text-slate-400 block mb-1">Rocker Profile</label>
                <input
                  type="text"
                  value={rockerProfile}
                  onChange={(e) => setRockerProfile(e.target.value)}
                  placeholder='e.g. 2.25" Continuous Hybrid Rocker'
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[11px] font-mono uppercase text-slate-400 block mb-1">Core Material Blank</label>
                <input
                  type="text"
                  value={coreMaterial}
                  onChange={(e) => setCoreMaterial(e.target.value)}
                  placeholder="e.g. Closed-Cell High-Density Structural Foam Core"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[11px] font-mono uppercase text-slate-400 block mb-1">Layup / Lamination</label>
                <input
                  type="text"
                  value={lamination}
                  onChange={(e) => setLamination(e.target.value)}
                  placeholder="e.g. Toray 3K Carbon + Marine Epoxy"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[11px] font-mono uppercase text-slate-400 block mb-1">Rail Contour</label>
                <input
                  type="text"
                  value={railContour}
                  onChange={(e) => setRailContour(e.target.value)}
                  placeholder="e.g. Boxy 60/40 Rails with Clean Water Release Edge"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>
            </div>
          </div>

          {/* SECTION 4: INVENTORY, BADGES & HIGHLIGHTS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Stock Quantity (Units)
              </label>
              <input
                type="number"
                min="0"
                value={stockQty}
                onChange={(e) => setStockQty(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm font-mono text-white"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Free Inclusions / Promo
              </label>
              <input
                type="text"
                value={freeInclusions}
                onChange={(e) => setFreeInclusions(e.target.value)}
                placeholder="FREE Arch Bar + Traction"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Signature Rider Stamp
              </label>
              <input
                type="text"
                value={signatureRider}
                onChange={(e) => setSignatureRider(e.target.value)}
                placeholder="e.g. Ding Fariñas (Zambales)"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-amber-300"
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-slate-800 text-xs font-mono">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStock}
                onChange={(e) => setInStock(e.target.checked)}
                className="w-4 h-4 rounded text-sky-600 bg-slate-950 border-slate-700 focus:ring-sky-500"
              />
              <span className={inStock ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                {inStock ? 'In Stock (Available for Order)' : 'Out of Stock / Backorder'}
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 rounded text-sky-600 bg-slate-950 border-slate-700 focus:ring-sky-500"
              />
              <span className={featured ? 'text-sky-300 font-bold' : 'text-slate-400'}>
                Featured Quiver Item
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={bestSeller}
                onChange={(e) => setBestSeller(e.target.checked)}
                className="w-4 h-4 rounded text-sky-600 bg-slate-950 border-slate-700 focus:ring-sky-500"
              />
              <span className={bestSeller ? 'text-amber-400 font-bold' : 'text-slate-400'}>
                Best Seller Badge
              </span>
            </label>
          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono font-semibold transition-all"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-7 py-3 rounded-xl bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-display font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-sky-600/30 flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>{isEditing ? 'Save & Commit Changes' : 'Publish Board to Catalog'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
