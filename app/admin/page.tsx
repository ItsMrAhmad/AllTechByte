'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Upload,
  Check,
  AlertCircle,
  Key,
  Plus,
  Trash2,
  Settings,
  RefreshCw,
  ExternalLink,
  Lock,
  Unlock,
  LogOut,
  Hash,
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowLeft,
  Sparkles,
  Zap,
  Tag,
  Search,
  Package,
  Sliders,
  CheckCircle2,
  Clock,
  Layers,
  Edit3,
  Save,
  ArrowUp,
  ArrowDown,
  Flame,
  X
} from 'lucide-react';
import { Product, CATEGORIES, PRODUCTS } from '@/data/products';

interface SpecRow {
  key: string;
  value: string;
}

interface ImageState {
  file: File | null;
  previewUrl: string | null;
  blob: Blob | null;
}

function GithubIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export default function AdminPortalPage() {
  // Authentication Lock State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [enteredPassword, setEnteredPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [newAdminPassword, setNewAdminPassword] = useState('');

  // Tabs
  const [activeTab, setActiveTab] = useState<'add' | 'manage' | 'flash' | 'settings'>('add');

  // Edit Product Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editComparePrice, setEditComparePrice] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editSku, setEditSku] = useState('');
  const [editInStock, setEditInStock] = useState(true);
  const [editSpecs, setEditSpecs] = useState<SpecRow[]>([]);
  const [editImage, setEditImage] = useState<ImageState>({ file: null, previewUrl: null, blob: null });
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const [editSuccess, setEditSuccess] = useState<string | null>(null);

  // Flash Sale Manager State
  const [flashSelectedIds, setFlashSelectedIds] = useState<string[]>([]);
  const [flashSearch, setFlashSearch] = useState('');
  const [isSavingFlash, setIsSavingFlash] = useState(false);
  const [flashMessage, setFlashMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // GitHub Configuration (stored in localStorage)
  const [githubToken, setGithubToken] = useState('');
  const [githubRepo, setGithubRepo] = useState('ItsMrAhmad/AllTechByte');
  const [githubBranch, setGithubBranch] = useState('add-products-batch-1');
  const [showToken, setShowToken] = useState(false);
  const [connStatus, setConnStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [connMessage, setConnMessage] = useState('');

  // Product Form State
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<string>('');
  const [comparePrice, setComparePrice] = useState<string>('');
  const [category, setCategory] = useState<string>('Microcontrollers & Boards');
  const [description, setDescription] = useState('');
  const [sku, setSku] = useState('');
  const [isFlashSale, setIsFlashSale] = useState(false);
  const [inStock, setInStock] = useState(true);

  // Technical Specifications Key-Value rows
  const [specs, setSpecs] = useState<SpecRow[]>([
    { key: 'Operating Voltage', value: '' },
    { key: 'Package Includes', value: '' }
  ]);

  // Image Upload States
  const [primaryImage, setPrimaryImage] = useState<ImageState>({ file: null, previewUrl: null, blob: null });
  const [galleryImage, setGalleryImage] = useState<ImageState>({ file: null, previewUrl: null, blob: null });
  const [isProcessingImage, setIsProcessingImage] = useState(false);

  // Publishing State
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishStep, setPublishStep] = useState<string>('');
  const [publishProgress, setPublishProgress] = useState<number>(0);
  const [publishError, setPublishError] = useState<string | null>(null);
  const [publishSuccess, setPublishSuccess] = useState<{ commitUrl: string; productTitle: string } | null>(null);

  // Catalog Browser State
  const [catalogProducts, setCatalogProducts] = useState<Product[]>(PRODUCTS);
  const [catalogSearch, setCatalogSearch] = useState('');
  const [catalogCategory, setCatalogCategory] = useState('all');
  const [loadingCatalog, setLoadingCatalog] = useState(false);
  const [actionInProgressId, setActionInProgressId] = useState<string | null>(null);

  // Load GitHub Settings and Auth on Mount
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('atb_admin_session');
    if (sessionAuth === 'authenticated') {
      setIsAuthenticated(true);
    }

    const savedToken = localStorage.getItem('atb_github_token') || '';
    const savedRepo = localStorage.getItem('atb_github_repo') || 'ItsMrAhmad/AllTechByte';
    const savedBranch = localStorage.getItem('atb_github_branch') || 'add-products-batch-1';

    setGithubToken(savedToken);
    setGithubRepo(savedRepo);
    setGithubBranch(savedBranch);

    if (!savedToken) {
      setActiveTab('settings');
    }
  }, []);

  // Sync Flash Sale Selected IDs from catalog
  useEffect(() => {
    const flashFromCatalog = catalogProducts.filter((p) => p.isFlashSale).map((p) => p.id);
    if (flashFromCatalog.length > 0) {
      setFlashSelectedIds(flashFromCatalog);
    } else {
      setFlashSelectedIds(catalogProducts.slice(0, 4).map((p) => p.id));
    }
  }, [catalogProducts]);

  // Admin Portal Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const currentPass = localStorage.getItem('atb_admin_pass') || 'AllTechByte@786';
    if (enteredPassword.trim() === currentPass.trim()) {
      setIsAuthenticated(true);
      sessionStorage.setItem('atb_admin_session', 'authenticated');
      setLoginError('');
      setEnteredPassword('');
    } else {
      setLoginError('Incorrect password. Please verify and try again.');
    }
  };

  // Admin Portal Logout
  const handleLogout = () => {
    sessionStorage.removeItem('atb_admin_session');
    setIsAuthenticated(false);
    setEnteredPassword('');
  };

  // Change Admin Password
  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminPassword.trim()) {
      alert('Password cannot be blank.');
      return;
    }
    localStorage.setItem('atb_admin_pass', newAdminPassword.trim());
    setNewAdminPassword('');
    alert('Admin password updated successfully! Please keep this password in a safe place.');
  };

  // Auto-generate SKU based on Category and Title
  useEffect(() => {
    if (!title.trim()) return;
    const catPrefixMap: Record<string, string> = {
      'Microcontrollers & Boards': 'MCU',
      'Sensors & Displays': 'SNS',
      'Robotics & Motors': 'MOT',
      'Power & Converters': 'PWR',
      'Electronic Components & ICs': 'CMP',
      'Tools, Cables & Wires': 'TLS'
    };
    const prefix = catPrefixMap[category] || 'GEN';
    const cleanWord = title
      .replace(/[^a-zA-Z0-9]/g, ' ')
      .trim()
      .split(/\s+/)
      .slice(0, 3)
      .join('-')
      .toUpperCase();
    setSku(`ATB-${prefix}-${cleanWord}`);
  }, [title, category]);

  // Test GitHub Connection
  const testGitHubConnection = async () => {
    if (!githubToken.trim()) {
      setConnStatus('error');
      setConnMessage('Please enter your GitHub Personal Access Token.');
      return;
    }

    setConnStatus('testing');
    setConnMessage('Connecting to GitHub repository...');

    try {
      const res = await fetch(`https://api.github.com/repos/${githubRepo.trim()}`, {
        headers: {
          Authorization: `Bearer ${githubToken.trim()}`,
          Accept: 'application/vnd.github.v3+json'
        }
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `HTTP ${res.status}: Repository access denied`);
      }

      const data = await res.json();
      setConnStatus('success');
      setConnMessage(`Successfully connected to ${data.full_name} (${data.default_branch} branch)`);

      // Save to localStorage
      localStorage.setItem('atb_github_token', githubToken.trim());
      localStorage.setItem('atb_github_repo', githubRepo.trim());
      localStorage.setItem('atb_github_branch', githubBranch.trim());
    } catch (err: any) {
      setConnStatus('error');
      setConnMessage(err.message || 'Connection failed. Verify your token permissions.');
    }
  };

  // Convert uploaded image to 900x900 studio WebP with pure white background
  const processImageToWebp = async (file: File): Promise<{ blob: Blob; previewUrl: string }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = 900;
          canvas.height = 900;
          const ctx = canvas.getContext('2d');
          if (!ctx) return reject(new Error('Canvas context unavailable'));

          // 1. Fill clean white canvas background
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, 900, 900);

          // 2. Scale image with 8% padding to maintain aspect ratio
          const maxW = 900 * 0.84;
          const maxH = 900 * 0.84;
          const scale = Math.min(maxW / img.width, maxH / img.height);
          const drawW = img.width * scale;
          const drawH = img.height * scale;
          const drawX = (900 - drawW) / 2;
          const drawY = (900 - drawH) / 2;

          ctx.drawImage(img, drawX, drawY, drawW, drawH);

          // 3. Export as high-quality WebP
          canvas.toBlob(
            (blob) => {
              if (!blob) return reject(new Error('WebP encoding failed'));
              const previewUrl = canvas.toDataURL('image/webp', 0.9);
              resolve({ blob, previewUrl });
            },
            'image/webp',
            0.9
          );
        };
        img.onerror = () => reject(new Error('Failed to load image file'));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  // Handle Primary Image Selection
  const handlePrimaryImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessingImage(true);
    try {
      const { blob, previewUrl } = await processImageToWebp(file);
      setPrimaryImage({ file, previewUrl, blob });
    } catch (err: any) {
      alert(`Image processing error: ${err.message}`);
    } finally {
      setIsProcessingImage(false);
    }
  };

  // Handle Secondary Image Selection
  const handleGalleryImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessingImage(true);
    try {
      const { blob, previewUrl } = await processImageToWebp(file);
      setGalleryImage({ file, previewUrl, blob });
    } catch (err: any) {
      alert(`Gallery image processing error: ${err.message}`);
    } finally {
      setIsProcessingImage(false);
    }
  };

  // Add Spec Row
  const handleAddSpec = () => {
    setSpecs([...specs, { key: '', value: '' }]);
  };

  // Update Spec Row
  const handleUpdateSpec = (index: number, field: 'key' | 'value', val: string) => {
    const updated = [...specs];
    updated[index][field] = val;
    setSpecs(updated);
  };

  // Remove Spec Row
  const handleRemoveSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  // Convert Blob to Base64 string for GitHub API
  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        const base64 = dataUrl.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  // Upload a file to GitHub via Contents API
  const uploadFileToGitHub = async (
    path: string,
    contentBase64: string,
    commitMessage: string,
    existingSha?: string
  ) => {
    const body: Record<string, any> = {
      message: commitMessage,
      content: contentBase64,
      branch: githubBranch.trim()
    };
    if (existingSha) {
      body.sha = existingSha;
    }

    const res = await fetch(
      `https://api.github.com/repos/${githubRepo.trim()}/contents/${path}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${githubToken.trim()}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }
    );

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Failed to commit ${path} (HTTP ${res.status})`);
    }

    return await res.json();
  };

  // Fetch current data/products.json from GitHub
  const fetchProductsJsonFromGitHub = async () => {
    const res = await fetch(
      `https://api.github.com/repos/${githubRepo.trim()}/contents/data/products.json?ref=${githubBranch.trim()}`,
      {
        headers: {
          Authorization: `Bearer ${githubToken.trim()}`,
          Accept: 'application/vnd.github.v3+json'
        }
      }
    );

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Failed to fetch data/products.json (HTTP ${res.status})`);
    }

    const data = await res.json();
    const rawContent = decodeURIComponent(
      escape(atob(data.content.replace(/\n/g, '')))
    );
    const products: Product[] = JSON.parse(rawContent);
    return { products, sha: data.sha };
  };

  // Publish New Product
  const handlePublishProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!githubToken.trim()) {
      setActiveTab('settings');
      alert('Please configure your GitHub Personal Access Token first.');
      return;
    }

    if (!title.trim() || !price || isNaN(Number(price))) {
      alert('Please enter a valid product title and price.');
      return;
    }

    if (!primaryImage.blob) {
      alert('Please upload a product photo.');
      return;
    }

    setIsPublishing(true);
    setPublishError(null);
    setPublishSuccess(null);
    setPublishProgress(10);
    setPublishStep('Connecting to GitHub repository...');

    try {
      // 1. Fetch current products database to determine next ID
      setPublishProgress(25);
      setPublishStep('Fetching current products catalog from GitHub...');
      const { products, sha: productsSha } = await fetchProductsJsonFromGitHub();

      // Determine next product ID
      const numericIds = products
        .map((p) => parseInt(p.id, 10))
        .filter((n) => !isNaN(n));
      const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 15469000000157;
      const newProductId = (maxId + 1).toString();
      const secondaryId = (maxId + 2).toString();

      // 2. Upload Primary Image to public/products/product-[id].webp
      setPublishProgress(45);
      setPublishStep(`Uploading optimized WebP image for ${title}...`);
      const primaryBase64 = await blobToBase64(primaryImage.blob);
      const primaryImagePath = `public/products/product-${newProductId}.webp`;

      await uploadFileToGitHub(
        primaryImagePath,
        primaryBase64,
        `feat(assets): upload primary image for ${title} (SKU: ${sku})`
      );

      // 3. Upload Secondary Image if provided
      let galleryPaths: string[] | undefined = undefined;
      if (galleryImage.blob) {
        setPublishProgress(60);
        setPublishStep('Uploading secondary pinout/gallery image...');
        const galleryBase64 = await blobToBase64(galleryImage.blob);
        const galleryImagePath = `public/products/product-${secondaryId}.webp`;

        await uploadFileToGitHub(
          galleryImagePath,
          galleryBase64,
          `feat(assets): upload gallery image for ${title}`
        );

        galleryPaths = [
          `/products/product-${newProductId}.webp`,
          `/products/product-${secondaryId}.webp`
        ];
      }

      // 4. Construct New Product Object
      setPublishProgress(75);
      setPublishStep('Adding product to catalog database...');

      const validSpecs: Record<string, string> = {};
      specs.forEach((s) => {
        if (s.key.trim() && s.value.trim()) {
          validSpecs[s.key.trim()] = s.value.trim();
        }
      });

      const handleSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      const parsedPrice = parseInt(price, 10);
      const parsedCompare = comparePrice ? parseInt(comparePrice, 10) : null;

      const newProduct: Product = {
        id: newProductId,
        title: title.trim(),
        handle: handleSlug,
        price: parsedPrice,
        comparePrice: parsedCompare,
        category: category,
        tags: [
          category.split(' ')[0],
          ...title.split(/\s+/).slice(0, 4)
        ],
        image: `/products/product-${newProductId}.webp`,
        gallery: galleryPaths,
        description: description.trim() || `${title} engineered for robotics, embedded electronics, and maker workbench applications.`,
        inStock: inStock,
        rating: '5.0',
        reviewsCount: 0,
        sku: sku.trim() || undefined,
        specs: Object.keys(validSpecs).length > 0 ? validSpecs : undefined
      };

      // 5. Insert Product into Catalog
      let updatedProducts: Product[];
      if (isFlashSale) {
        // Place in top 4 (positions 2 or 3 below top priority core items)
        updatedProducts = [
          products[0],
          products[1],
          newProduct,
          ...products.slice(2)
        ];
      } else {
        // Normal addition right after the 4 flash sale items
        updatedProducts = [
          ...products.slice(0, 4),
          newProduct,
          ...products.slice(4)
        ];
      }

      // 6. Commit updated data/products.json to GitHub
      setPublishProgress(90);
      setPublishStep('Committing updated catalog to GitHub...');

      const updatedJsonString = JSON.stringify(updatedProducts, null, 2);
      const encodedJsonBase64 = btoa(unescape(encodeURIComponent(updatedJsonString)));

      const commitResult = await uploadFileToGitHub(
        'data/products.json',
        encodedJsonBase64,
        `feat(catalog): publish product "${title}" (Rs ${parsedPrice}) via Admin Portal`,
        productsSha
      );

      setPublishProgress(100);
      setPublishStep('Product successfully published!');
      setPublishSuccess({
        commitUrl: commitResult.commit?.html_url || `https://github.com/${githubRepo}/commits/${githubBranch}`,
        productTitle: title
      });

      // Reset form
      setTitle('');
      setPrice('');
      setComparePrice('');
      setDescription('');
      setPrimaryImage({ file: null, previewUrl: null, blob: null });
      setGalleryImage({ file: null, previewUrl: null, blob: null });
    } catch (err: any) {
      setPublishError(err.message || 'An error occurred while publishing to GitHub.');
    } finally {
      setIsPublishing(false);
    }
  };

  // Load Catalog for Catalog Management Tab
  const loadCatalogFromGitHub = async () => {
    if (!githubToken.trim()) return;
    setLoadingCatalog(true);
    try {
      const { products } = await fetchProductsJsonFromGitHub();
      setCatalogProducts(products);
    } catch (err: any) {
      alert(`Failed to load catalog: ${err.message}`);
    } finally {
      setLoadingCatalog(false);
    }
  };

  // Toggle in-stock status directly from Manage Catalog Tab
  const handleToggleStock = async (productToToggle: Product) => {
    if (!githubToken.trim()) {
      setActiveTab('settings');
      alert('Please configure your GitHub Personal Access Token in the GitHub Setup tab first.');
      return;
    }

    if (!confirm(`Are you sure you want to mark "${productToToggle.title}" as ${productToToggle.inStock ? 'Out of Stock' : 'In Stock'}?`)) {
      return;
    }

    setActionInProgressId(productToToggle.id);
    try {
      const { products, sha } = await fetchProductsJsonFromGitHub();
      const updated = products.map((p) => {
        if (p.id === productToToggle.id) {
          return { ...p, inStock: !p.inStock };
        }
        return p;
      });

      const updatedJsonString = JSON.stringify(updated, null, 2);
      const encodedJsonBase64 = btoa(unescape(encodeURIComponent(updatedJsonString)));

      await uploadFileToGitHub(
        'data/products.json',
        encodedJsonBase64,
        `chore(inventory): toggle stock status for ${productToToggle.title} (${!productToToggle.inStock ? 'In Stock' : 'Out of Stock'})`,
        sha
      );

      setCatalogProducts(updated);
      alert(`Stock status for "${productToToggle.title}" updated and committed to GitHub successfully!`);
    } catch (err: any) {
      alert(`Failed to update stock: ${err.message}`);
    } finally {
      setActionInProgressId(null);
    }
  };

  // Delete product directly from Manage Catalog Tab
  const handleDeleteProduct = async (productToDelete: Product) => {
    if (!githubToken.trim()) {
      setActiveTab('settings');
      alert('Please configure your GitHub Personal Access Token in the GitHub Setup tab first.');
      return;
    }

    const confirmText = `Are you sure you want to permanently delete this product?\n\n"${productToDelete.title}" (ID: ${productToDelete.id}, Rs ${productToDelete.price})\n\nThis will remove it from the catalog and commit the change to GitHub.`;
    if (!window.confirm(confirmText)) {
      return;
    }

    setActionInProgressId(productToDelete.id);
    try {
      const { products, sha } = await fetchProductsJsonFromGitHub();
      const updated = products.filter((p) => p.id !== productToDelete.id);

      const updatedJsonString = JSON.stringify(updated, null, 2);
      const encodedJsonBase64 = btoa(unescape(encodeURIComponent(updatedJsonString)));

      await uploadFileToGitHub(
        'data/products.json',
        encodedJsonBase64,
        `chore(catalog): remove product "${productToDelete.title}" (ID: ${productToDelete.id}) via Admin Portal`,
        sha
      );

      setCatalogProducts(updated);
      alert(`"${productToDelete.title}" has been deleted from the catalog and committed to GitHub successfully!`);
    } catch (err: any) {
      alert(`Failed to delete product: ${err.message}`);
    } finally {
      setActionInProgressId(null);
    }
  };

  // Open Product Edit Modal
  const handleStartEditProduct = (p: Product) => {
    setEditingProduct(p);
    setEditTitle(p.title);
    setEditPrice(p.price.toString());
    setEditComparePrice(p.comparePrice ? p.comparePrice.toString() : '');
    setEditCategory(p.category);
    setEditDescription(p.description || '');
    setEditSku(p.sku || '');
    setEditInStock(p.inStock);
    setEditSpecs(
      p.specs && Object.keys(p.specs).length > 0
        ? Object.entries(p.specs).map(([key, value]) => ({ key, value }))
        : [
            { key: 'Operating Voltage', value: '' },
            { key: 'Package Includes', value: '' }
          ]
    );
    setEditImage({ file: null, previewUrl: p.image, blob: null });
    setEditError(null);
    setEditSuccess(null);
  };

  // Handle Edit Image Upload
  const handleEditImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const { blob, previewUrl } = await processImageToWebp(file);
      setEditImage({ file, previewUrl, blob });
    } catch (err: any) {
      alert(`Image processing error: ${err.message}`);
    }
  };

  // Add/Remove/Update Edit Specs
  const handleAddEditSpec = () => {
    setEditSpecs([...editSpecs, { key: '', value: '' }]);
  };
  const handleUpdateEditSpec = (index: number, field: 'key' | 'value', val: string) => {
    const updated = [...editSpecs];
    updated[index][field] = val;
    setEditSpecs(updated);
  };
  const handleRemoveEditSpec = (index: number) => {
    setEditSpecs(editSpecs.filter((_, i) => i !== index));
  };

  // Save Product Edits & Commit to GitHub
  const handleSaveEditProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    if (!githubToken.trim()) {
      setActiveTab('settings');
      alert('Please configure your GitHub Personal Access Token in the GitHub Setup tab first.');
      return;
    }

    if (!editTitle.trim() || !editPrice.trim() || Number(editPrice) <= 0) {
      setEditError('Valid product title and price are required.');
      return;
    }

    setIsSavingEdit(true);
    setEditError(null);
    setEditSuccess(null);

    try {
      // 1. If replacement image provided, upload it to GitHub
      let imagePath = editingProduct.image;
      if (editImage.blob) {
        const imageBase64 = await blobToBase64(editImage.blob);
        const githubImgPath = `public/products/product-${editingProduct.id}.webp`;
        await uploadFileToGitHub(
          githubImgPath,
          imageBase64,
          `feat(assets): update image for product ${editingProduct.id} via Admin Portal`
        );
        imagePath = `/products/product-${editingProduct.id}.webp`;
      }

      // 2. Fetch current catalog JSON from GitHub
      const { products, sha } = await fetchProductsJsonFromGitHub();

      // 3. Build valid specs dictionary
      const validSpecs: Record<string, string> = {};
      editSpecs.forEach((s) => {
        if (s.key.trim() && s.value.trim()) {
          validSpecs[s.key.trim()] = s.value.trim();
        }
      });

      const parsedPrice = parseInt(editPrice, 10);
      const parsedCompare = editComparePrice ? parseInt(editComparePrice, 10) : null;

      // 4. Update the target product in the catalog
      const updatedProducts = products.map((p) => {
        if (p.id === editingProduct.id) {
          return {
            ...p,
            title: editTitle.trim(),
            handle: editTitle.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
            price: parsedPrice,
            comparePrice: parsedCompare,
            category: editCategory,
            sku: editSku.trim() || undefined,
            inStock: editInStock,
            description: editDescription.trim() || p.description,
            image: imagePath,
            specs: Object.keys(validSpecs).length > 0 ? validSpecs : undefined
          };
        }
        return p;
      });

      // 5. Commit updated JSON to GitHub
      const updatedJsonString = JSON.stringify(updatedProducts, null, 2);
      const encodedJsonBase64 = btoa(unescape(encodeURIComponent(updatedJsonString)));

      await uploadFileToGitHub(
        'data/products.json',
        encodedJsonBase64,
        `feat(catalog): update product "${editTitle.trim()}" (Rs ${parsedPrice}) via Admin Portal`,
        sha
      );

      setCatalogProducts(updatedProducts);
      setEditSuccess(`Product "${editTitle.trim()}" updated and committed to GitHub successfully!`);
      setTimeout(() => {
        setEditingProduct(null);
        setEditSuccess(null);
      }, 1200);
    } catch (err: any) {
      setEditError(err.message || 'Failed to update product on GitHub.');
    } finally {
      setIsSavingEdit(false);
    }
  };

  // Flash Sale Manager Reorder & Toggle Handlers
  const handleMoveFlashItem = (index: number, direction: 'up' | 'down') => {
    const updated = [...flashSelectedIds];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= updated.length) return;
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setFlashSelectedIds(updated);
  };

  const handleRemoveFlashItem = (productId: string) => {
    if (flashSelectedIds.length <= 1) {
      alert('You must have at least 1 product in the Flash Sale.');
      return;
    }
    setFlashSelectedIds(flashSelectedIds.filter((id) => id !== productId));
  };

  const handleAddFlashItem = (productId: string) => {
    if (flashSelectedIds.includes(productId)) return;
    if (flashSelectedIds.length >= 8) {
      alert('Maximum 8 products recommended for the Flash Sale banner.');
      return;
    }
    setFlashSelectedIds([...flashSelectedIds, productId]);
  };

  // Save Flash Sale lineup to GitHub
  const handleSaveFlashSale = async () => {
    if (!githubToken.trim()) {
      setActiveTab('settings');
      alert('Please configure your GitHub Personal Access Token in the GitHub Setup tab first.');
      return;
    }

    setIsSavingFlash(true);
    setFlashMessage(null);

    try {
      const { products, sha } = await fetchProductsJsonFromGitHub();

      // 1. Separate flash items and regular items
      const flashMap = new Map(products.map((p) => [p.id, p]));
      const selectedFlashItems: Product[] = [];

      flashSelectedIds.forEach((id) => {
        const item = flashMap.get(id);
        if (item) {
          selectedFlashItems.push({
            ...item,
            isFlashSale: true
          });
        }
      });

      // 2. Remaining products (clear isFlashSale)
      const remainingItems = products
        .filter((p) => !flashSelectedIds.includes(p.id))
        .map((p) => ({
          ...p,
          isFlashSale: false
        }));

      // 3. Put flash sale items at the top so both index order and flag match
      const updatedCatalog = [...selectedFlashItems, ...remainingItems];

      const updatedJsonString = JSON.stringify(updatedCatalog, null, 2);
      const encodedJsonBase64 = btoa(unescape(encodeURIComponent(updatedJsonString)));

      await uploadFileToGitHub(
        'data/products.json',
        encodedJsonBase64,
        `feat(flash-sale): update active Flash Sale products (${selectedFlashItems.length} items) via Admin Portal`,
        sha
      );

      setCatalogProducts(updatedCatalog);
      setFlashMessage({
        type: 'success',
        text: `Flash Sale updated with ${selectedFlashItems.length} products and committed to GitHub successfully!`
      });
    } catch (err: any) {
      setFlashMessage({
        type: 'error',
        text: err.message || 'Failed to update Flash Sale on GitHub.'
      });
    } finally {
      setIsSavingFlash(false);
    }
  };

  // Calculate live preview discount
  const previewDiscount =
    comparePrice && Number(comparePrice) > Number(price) && Number(price) > 0
      ? Math.round(((Number(comparePrice) - Number(price)) / Number(comparePrice)) * 100)
      : null;

  // Render Password Lock Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#07132F] via-[#0B1E48] to-[#0A1633] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl border border-white/20 shadow-2xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              All Tech Byte
            </h1>
            <p className="text-xs font-bold uppercase tracking-wider text-[#0066CC]">
              Admin Portal Security
            </p>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              This area is restricted to store administrators. Enter your password to access catalog controls.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  required
                  value={enteredPassword}
                  onChange={(e) => setEnteredPassword(e.target.value)}
                  placeholder="Enter admin password..."
                  className="w-full pl-4 pr-11 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium bg-slate-50"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-black text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Admin Portal</span>
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#0066CC] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Storefront</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Admin Header */}
      <header className="bg-[#0B1E48] text-white border-b border-blue-950 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-slate-300 hover:text-white text-xs font-bold transition-colors bg-white/10 px-3 py-1.5 rounded-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Store</span>
            </Link>
            <div className="h-4 w-px bg-slate-700 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <h1 className="text-base sm:text-lg font-black tracking-tight text-white">
                All Tech Byte <span className="text-blue-400 font-semibold text-xs ml-1">Admin Portal</span>
              </h1>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('add')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'add'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Product</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('manage');
                loadCatalogFromGitHub();
              }}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'manage'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Manage Catalog</span>
              <span className="sm:hidden">Catalog</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('flash');
                loadCatalogFromGitHub();
              }}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'flash'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Zap className="w-3.5 h-3.5 fill-current text-yellow-300" />
              <span className="hidden sm:inline">Flash Sale &amp; Deals</span>
              <span className="sm:hidden">Flash Sale</span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'settings'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">GitHub Setup</span>
              <span className="sm:hidden">Setup</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-xl text-rose-300 hover:text-rose-100 hover:bg-rose-950/40 text-xs font-bold transition-all flex items-center gap-1.5 ml-1 border border-rose-900/40 cursor-pointer"
              title="Log Out of Admin Portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Log Out</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {/* ================= TAB 1: ADD PRODUCT ================= */}
        {activeTab === 'add' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Input Form (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <div className="inline-flex items-center gap-1.5 bg-blue-50 text-[#0066CC] px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3 h-3" />
                  <span>Instant GitHub Publisher</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">Add New Product to Store</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Upload an image, fill details, and hit publish. The photo is automatically squared and compressed to WebP, and committed directly to GitHub.
                </p>
              </div>

              {/* Success Notification Banner */}
              {publishSuccess && (
                <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 text-emerald-900 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="flex-1 text-xs">
                    <p className="font-bold text-sm">Product Published Successfully!</p>
                    <p className="mt-1 text-emerald-800">
                      <strong>&quot;{publishSuccess.productTitle}&quot;</strong> has been committed to GitHub. Your website host will finish building and publishing the update in 1–2 minutes.
                    </p>
                    <a
                      href={publishSuccess.commitUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-bold text-emerald-700 underline mt-2 hover:text-emerald-900"
                    >
                      <span>View Commit on GitHub</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}

              {/* Error Notification Banner */}
              {publishError && (
                <div className="bg-rose-50 border border-rose-300 rounded-2xl p-4 text-rose-900 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div className="flex-1 text-xs">
                    <p className="font-bold text-sm">Failed to Publish</p>
                    <p className="mt-1 text-rose-800">{publishError}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handlePublishProduct} className="space-y-6">
                {/* Product Title */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Product Title / Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. ESP32 Development Board 38 Pin – WiFi + Bluetooth Dual-Core"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium bg-slate-50/50"
                  />
                </div>

                {/* Pricing & Category Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Selling Price */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Selling Price (PKR) <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-xs font-bold text-slate-500">Rs</span>
                      <input
                        type="number"
                        required
                        min="1"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="1280"
                        className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-bold bg-slate-50/50"
                      />
                    </div>
                  </div>

                  {/* Compare Price */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Original Price (Optional)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-xs font-bold text-slate-400">Rs</span>
                      <input
                        type="number"
                        min="1"
                        value={comparePrice}
                        onChange={(e) => setComparePrice(e.target.value)}
                        placeholder="1600"
                        className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium bg-slate-50/50"
                      />
                    </div>
                  </div>

                  {/* Category Selector */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Category <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-bold bg-slate-50/50"
                    >
                      <option value="Microcontrollers & Boards">Microcontrollers & Boards</option>
                      <option value="Sensors & Displays">Sensors & Displays</option>
                      <option value="Robotics & Motors">Robotics & Motors</option>
                      <option value="Power & Converters">Power & Converters</option>
                      <option value="Electronic Components & ICs">Electronic Components & ICs</option>
                      <option value="Tools, Cables & Wires">Tools, Cables & Wires</option>
                    </select>
                  </div>
                </div>

                {/* SKU and Flash Sale Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                      SKU Code (Auto-Generated)
                    </label>
                    <input
                      type="text"
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                      placeholder="ATB-MCU-ESP32"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-mono font-bold bg-white"
                    />
                  </div>

                  <div className="space-y-2 pt-1 sm:pt-0">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isFlashSale}
                        onChange={(e) => setIsFlashSale(e.target.checked)}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 text-yellow-500 fill-current" />
                        Feature in Flash Sale (Top 4 on Homepage)
                      </span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={inStock}
                        onChange={(e) => setInStock(e.target.checked)}
                        className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-xs font-bold text-slate-800">
                        In Stock (Instant WhatsApp Orders Available)
                      </span>
                    </label>
                  </div>
                </div>

                {/* Image Upload Zone */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Primary Product Photo <span className="text-rose-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-6 text-center bg-slate-50/50 transition-colors relative cursor-pointer group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePrimaryImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                        <Upload className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-bold text-slate-800">
                        {primaryImage.file ? primaryImage.file.name : 'Click or Drag & Drop Product Image here'}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        JPG, PNG, WEBP from Mobile or Desktop. Automatically centered on white 900×900 WebP canvas.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Secondary Gallery Image (Optional) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Secondary Image (Optional / Back Silkscreen / Pinout)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleGalleryImageChange}
                    className="text-xs text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                  />
                  {galleryImage.file && (
                    <span className="text-xs text-emerald-600 font-bold block mt-1">
                      ✓ Secondary image loaded: {galleryImage.file.name}
                    </span>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Product Description
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide a clear, factual overview of the board, controller, sensor, or module..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                  />
                </div>

                {/* Technical Specifications Key-Value Builder */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Technical Specifications
                    </label>
                    <button
                      type="button"
                      onClick={handleAddSpec}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#0066CC] hover:text-blue-800"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Spec Row</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {specs.map((row, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={row.key}
                          onChange={(e) => handleUpdateSpec(idx, 'key', e.target.value)}
                          placeholder="Spec Name (e.g. Operating Voltage)"
                          className="w-1/2 px-3 py-2 rounded-lg border border-slate-200 text-xs font-bold bg-slate-50/50"
                        />
                        <input
                          type="text"
                          value={row.value}
                          onChange={(e) => handleUpdateSpec(idx, 'value', e.target.value)}
                          placeholder="Value (e.g. 3.3V DC)"
                          className="w-1/2 px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50/50"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveSpec(idx)}
                          className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Publish Button */}
                <div className="pt-4 border-t border-slate-100">
                  <button
                    type="submit"
                    disabled={isPublishing || isProcessingImage}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white font-black text-sm sm:text-base shadow-lg shadow-blue-500/25 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPublishing ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>Publishing to GitHub ({publishProgress}%)...</span>
                      </>
                    ) : (
                      <>
                        <GithubIcon className="w-5 h-5" />
                        <span>Publish Product to GitHub</span>
                      </>
                    )}
                  </button>
                  {isPublishing && (
                    <p className="text-xs text-slate-500 text-center mt-2 animate-pulse font-medium">
                      {publishStep}
                    </p>
                  )}
                </div>
              </form>
            </div>

            {/* Right Column: Live Storefront Card Preview (5 cols) */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Live Preview</h3>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">Store Card</span>
                </div>

                {/* Product Card as it appears on Storefront */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-md max-w-sm mx-auto relative">
                  {/* Badges container */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                    {previewDiscount ? (
                      <span className="bg-rose-600 text-white text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-sm">
                        SAVE {previewDiscount}%
                      </span>
                    ) : (
                      <span className="bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                        New Arrival
                      </span>
                    )}
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      {inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>

                  {/* Image Container */}
                  <div className="relative h-56 w-full bg-slate-50 flex items-center justify-center p-4 border-b border-slate-100 overflow-hidden">
                    {primaryImage.previewUrl ? (
                      <img
                        src={primaryImage.previewUrl}
                        alt="Preview"
                        className="object-contain w-full h-full p-2"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-slate-300">
                        <Package className="w-12 h-12 stroke-[1.2]" />
                        <span className="text-xs mt-2 font-medium">Image Preview</span>
                      </div>
                    )}
                  </div>

                  {/* Card Details */}
                  <div className="p-4 space-y-3">
                    <div>
                      <span className="text-[11px] font-bold text-[#0066CC] uppercase tracking-wider block">
                        {category}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2 mt-1">
                        {title.trim() || 'Product Name Example Title'}
                      </h4>
                    </div>

                    {/* Price */}
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-black text-slate-900">
                          Rs {price ? Number(price).toLocaleString() : '0'}
                        </span>
                        {comparePrice && Number(comparePrice) > 0 && (
                          <span className="text-xs text-slate-500 line-through">
                            Rs {Number(comparePrice).toLocaleString()}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500 block mt-0.5">
                        Prices include GST / Cash on Delivery
                      </span>
                    </div>

                    {/* WhatsApp Button Preview */}
                    <div className="pt-2 border-t border-slate-100">
                      <div className="w-full py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2">
                        <span>Order on WhatsApp</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Specs Preview List */}
                <div className="mt-6 pt-4 border-t border-slate-100 text-xs">
                  <span className="font-bold text-slate-700 block mb-2 uppercase text-[10px] tracking-wider">
                    Specs Attached:
                  </span>
                  <div className="space-y-1">
                    {specs.filter((s) => s.key && s.value).length > 0 ? (
                      specs
                        .filter((s) => s.key && s.value)
                        .map((s, i) => (
                          <div key={i} className="flex justify-between text-slate-600 bg-slate-50 px-2 py-1 rounded">
                            <span className="font-medium text-slate-500">{s.key}:</span>
                            <span className="font-bold text-slate-800">{s.value}</span>
                          </div>
                        ))
                    ) : (
                      <p className="text-slate-400 italic">No specs added yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: MANAGE CATALOG ================= */}
        {activeTab === 'manage' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-black text-slate-900">Manage Store Catalog</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  View existing products, search by SKU or title, and toggle stock availability.
                </p>
              </div>
              <button
                onClick={loadCatalogFromGitHub}
                disabled={loadingCatalog}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingCatalog ? 'animate-spin' : ''}`} />
                <span>Refresh from GitHub</span>
              </button>
            </div>

            {/* Filter and Search Bar */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={catalogSearch}
                    onChange={(e) => setCatalogSearch(e.target.value)}
                    placeholder="Search all products by title, SKU, ID, or keyword..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50/50"
                  />
                </div>
                <select
                  value={catalogCategory}
                  onChange={(e) => setCatalogCategory(e.target.value)}
                  className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold bg-slate-50/50"
                >
                  <option value="all">All Categories ({catalogProducts.length})</option>
                  <option value="Microcontrollers & Boards">Microcontrollers & Boards</option>
                  <option value="Sensors & Displays">Sensors & Displays</option>
                  <option value="Robotics & Motors">Robotics & Motors</option>
                  <option value="Power & Converters">Power & Converters</option>
                  <option value="Electronic Components & ICs">Electronic Components & ICs</option>
                  <option value="Tools, Cables & Wires">Tools, Cables & Wires</option>
                </select>
              </div>

              {/* Product Count & Filter Summary */}
              <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                <span>
                  Showing{' '}
                  <strong className="text-slate-900 font-bold">
                    {
                      catalogProducts.filter((p) => {
                        const matchesText =
                          !catalogSearch ||
                          p.title.toLowerCase().includes(catalogSearch.toLowerCase()) ||
                          (p.sku && p.sku.toLowerCase().includes(catalogSearch.toLowerCase())) ||
                          p.id.includes(catalogSearch);
                        const matchesCat =
                          catalogCategory === 'all' ||
                          p.category.toLowerCase() === catalogCategory.toLowerCase();
                        return matchesText && matchesCat;
                      }).length
                    }
                  </strong>{' '}
                  of <strong className="text-slate-900 font-bold">{catalogProducts.length}</strong> total products
                </span>
                {catalogSearch && (
                  <button
                    type="button"
                    onClick={() => setCatalogSearch('')}
                    className="text-[#0066CC] hover:underline font-bold"
                  >
                    Clear search filter
                  </button>
                )}
              </div>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-2xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 uppercase tracking-wider font-bold">
                    <th className="py-3 px-3 w-12 text-center">#</th>
                    <th className="py-3 px-3">Item</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Price</th>
                    <th className="py-3 px-3">Stock Status</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {catalogProducts
                    .filter((p) => {
                      const matchesText =
                        !catalogSearch ||
                        p.title.toLowerCase().includes(catalogSearch.toLowerCase()) ||
                        (p.sku && p.sku.toLowerCase().includes(catalogSearch.toLowerCase())) ||
                        p.id.includes(catalogSearch);
                      const matchesCat =
                        catalogCategory === 'all' ||
                        p.category.toLowerCase() === catalogCategory.toLowerCase();
                      return matchesText && matchesCat;
                    })
                    .map((product, idx) => (
                      <tr key={product.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-3 text-center">
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 font-mono text-xs font-bold text-slate-700">
                            {idx + 1}
                          </span>
                        </td>
                        <td className="py-3 px-3 flex items-center gap-3">
                          <div className="relative w-11 h-11 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                            <Image
                              src={product.image}
                              alt={product.title}
                              fill
                              className="object-contain p-1"
                            />
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block line-clamp-1 max-w-xs sm:max-w-md">
                              {product.title}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              Product #{idx + 1} • ID: {product.id} {product.sku ? `• SKU: ${product.sku}` : ''}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-3 font-medium text-slate-600">
                          {product.category}
                        </td>
                        <td className="py-3 px-3 font-bold text-slate-900">
                          Rs {product.price.toLocaleString()}
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              product.inStock
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-rose-50 text-rose-700 border border-rose-200'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                product.inStock ? 'bg-emerald-500' : 'bg-rose-500'
                              }`}
                            ></span>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleStartEditProduct(product)}
                              className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-[#0066CC] border border-blue-200 hover:bg-blue-50 transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                              title={`Edit ${product.title}`}
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleToggleStock(product)}
                              disabled={actionInProgressId === product.id}
                              className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer disabled:opacity-50"
                            >
                              {actionInProgressId === product.id
                                ? 'Saving...'
                                : product.inStock
                                ? 'Mark Out of Stock'
                                : 'Mark In Stock'}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteProduct(product)}
                              disabled={actionInProgressId === product.id}
                              className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-rose-600 border border-rose-200 hover:bg-rose-50 transition-colors cursor-pointer flex items-center gap-1 disabled:opacity-50"
                              title={`Delete ${product.title}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

              {catalogProducts.length === 0 && !loadingCatalog && (
                <div className="text-center py-12 text-slate-400 text-xs">
                  Click &quot;Refresh from GitHub&quot; to fetch your current catalog.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 3: FLASH SALE & HOMEPAGE MANAGER ================= */}
        {activeTab === 'flash' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-600 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider mb-1">
                  <Zap className="w-3.5 h-3.5 fill-current text-rose-600" />
                  <span>Homepage Promotional Manager</span>
                </div>
                <h2 className="text-xl font-black text-slate-900">Flash Sale &amp; Hot Deals Lineup</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Choose the products that appear in the &quot;Our Flash Sale Is On!&quot; banner on the homepage. Reorder them or add new items.
                </p>
              </div>

              <button
                type="button"
                onClick={handleSaveFlashSale}
                disabled={isSavingFlash}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-xs font-bold text-white transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSavingFlash ? 'Saving to GitHub...' : 'Publish Flash Sale to GitHub'}</span>
              </button>
            </div>

            {flashMessage && (
              <div
                className={`p-4 rounded-2xl text-xs flex items-start gap-2.5 border ${
                  flashMessage.type === 'success'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}
              >
                {flashMessage.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                )}
                <span className="font-medium">{flashMessage.text}</span>
              </div>
            )}

            {/* Current Flash Sale Lineup (Ordered Cards) */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <span>Active Flash Sale Items</span>
                  <span className="bg-rose-100 text-rose-700 text-[10px] font-black px-2 py-0.5 rounded-full">
                    {flashSelectedIds.length} Products
                  </span>
                </h3>
                <span className="text-xs text-slate-400">
                  Top 4 appear prominently in the homepage carousel
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {flashSelectedIds.map((id, index) => {
                  const prod = catalogProducts.find((p) => p.id === id);
                  if (!prod) return null;

                  return (
                    <div
                      key={id}
                      className="bg-white rounded-2xl border-2 border-rose-200 p-3.5 flex flex-col justify-between shadow-xs relative group"
                    >
                      {/* Priority Badge */}
                      <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1">
                        <span className="bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-2xs">
                          Slot #{index + 1}
                        </span>
                        {index < 4 && (
                          <span className="bg-yellow-400 text-slate-900 text-[9px] font-black px-1.5 py-0.5 rounded-full">
                            ★ Home
                          </span>
                        )}
                      </div>

                      <div className="relative h-32 w-full bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center p-2 mb-2 border border-slate-100">
                        <Image
                          src={prod.image}
                          alt={prod.title}
                          fill
                          className="object-contain p-1"
                        />
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-[#0066CC] uppercase truncate block">
                          {prod.category}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-tight">
                          {prod.title}
                        </h4>
                        <div className="flex items-baseline gap-2 pt-1">
                          <span className="text-sm font-black text-slate-900">
                            Rs {prod.price.toLocaleString()}
                          </span>
                          {prod.comparePrice && (
                            <span className="text-[11px] text-slate-400 line-through">
                              Rs {prod.comparePrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Reorder and Remove Actions */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={() => handleMoveFlashItem(index, 'up')}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                            title="Move Left / Earlier"
                          >
                            <ArrowUp className="w-3.5 h-3.5 rotate-[-90deg]" />
                          </button>
                          <button
                            type="button"
                            disabled={index === flashSelectedIds.length - 1}
                            onClick={() => handleMoveFlashItem(index, 'down')}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                            title="Move Right / Later"
                          >
                            <ArrowDown className="w-3.5 h-3.5 rotate-[-90deg]" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveFlashItem(id)}
                          className="text-[11px] font-bold text-rose-600 hover:text-rose-800 hover:bg-rose-50 px-2 py-1 rounded transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Add More Items to Flash Sale */}
            <div className="pt-6 border-t border-slate-200 space-y-3">
              <h3 className="text-sm font-bold text-slate-900">
                Add More Products from Catalog to Flash Sale
              </h3>

              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={flashSearch}
                  onChange={(e) => setFlashSearch(e.target.value)}
                  placeholder="Search catalog to add to flash sale..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50/50"
                />
              </div>

              <div className="max-h-60 overflow-y-auto border border-slate-200 rounded-xl divide-y divide-slate-100 bg-white">
                {catalogProducts
                  .filter((p) => !flashSelectedIds.includes(p.id))
                  .filter(
                    (p) =>
                      !flashSearch ||
                      p.title.toLowerCase().includes(flashSearch.toLowerCase()) ||
                      p.category.toLowerCase().includes(flashSearch.toLowerCase())
                  )
                  .slice(0, 15)
                  .map((product) => (
                    <div
                      key={product.id}
                      className="p-3 flex items-center justify-between hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-slate-900 block truncate">
                            {product.title}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {product.category} &bull; Rs {product.price.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAddFlashItem(product.id)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3 py-1.5 rounded-lg transition-colors shrink-0 ml-3 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Flash Sale</span>
                      </button>
                    </div>
                  ))}
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 4: GITHUB SETUP ================= */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <div className="inline-flex items-center gap-1.5 bg-blue-50 text-[#0066CC] px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                <Key className="w-3 h-3" />
                <span>Direct GitHub Integration</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">GitHub Access Settings</h2>
              <p className="text-xs text-slate-500 mt-1">
                This token is stored only in your private browser storage. It authorizes your browser to commit new product images and catalog entries directly into your GitHub repository.
              </p>
            </div>

            {/* Connection Test Status */}
            {connStatus !== 'idle' && (
              <div
                className={`p-4 rounded-2xl text-xs flex items-start gap-3 border ${
                  connStatus === 'success'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : connStatus === 'error'
                    ? 'bg-rose-50 border-rose-200 text-rose-900'
                    : 'bg-blue-50 border-blue-200 text-blue-900'
                }`}
              >
                {connStatus === 'success' && <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />}
                {connStatus === 'error' && <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />}
                {connStatus === 'testing' && <RefreshCw className="w-5 h-5 text-blue-600 animate-spin shrink-0" />}
                <div>
                  <p className="font-bold text-sm">
                    {connStatus === 'success' ? 'Connected Successfully' : connStatus === 'error' ? 'Connection Error' : 'Testing Connection...'}
                  </p>
                  <p className="mt-0.5">{connMessage}</p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {/* Token Input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  GitHub Personal Access Token (PAT)
                </label>
                <div className="relative">
                  <input
                    type={showToken ? 'text' : 'password'}
                    value={githubToken}
                    onChange={(e) => setGithubToken(e.target.value)}
                    placeholder="github_pat_... or ghp_..."
                    className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono bg-slate-50/50 focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowToken(!showToken)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Required permission: <strong>Contents: Read and write</strong>
                </p>
              </div>

              {/* Target Repository */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    GitHub Repository
                  </label>
                  <input
                    type="text"
                    value={githubRepo}
                    onChange={(e) => setGithubRepo(e.target.value)}
                    placeholder="ItsMrAhmad/AllTechByte"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Target Branch
                  </label>
                  <input
                    type="text"
                    value={githubBranch}
                    onChange={(e) => setGithubBranch(e.target.value)}
                    placeholder="add-products-batch-1 or main"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono bg-slate-50/50"
                  />
                </div>
              </div>

              {/* Test and Save Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={testGitHubConnection}
                  disabled={connStatus === 'testing'}
                  className="w-full py-3.5 rounded-2xl bg-[#0B1E48] hover:bg-blue-900 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Save Settings &amp; Test Connection</span>
                </button>
              </div>
            </div>

            {/* Quick 1-Minute Token Guide */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-xs space-y-2 text-slate-600">
              <span className="font-bold text-slate-800 block text-sm">
                How to create a free GitHub Token in 1 minute:
              </span>
              <ol className="list-decimal pl-4 space-y-1 text-slate-600">
                <li>
                  Open{' '}
                  <a
                    href="https://github.com/settings/tokens?type=beta"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0066CC] font-bold underline inline-flex items-center gap-0.5"
                  >
                    GitHub Fine-Grained Tokens
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>Click <strong>&quot;Generate new token&quot;</strong>.</li>
                <li>Set Token Name: <code>AllTechByte Admin Portal</code>.</li>
                <li>Under <strong>Repository access</strong>, choose <code>Only select repositories</code> and select <strong>AllTechByte</strong>.</li>
                <li>Under <strong>Repository permissions</strong>, find <strong>Contents</strong> and set it to <strong>Read and write</strong>.</li>
                <li>Click <strong>Generate token</strong>, copy the key, and paste it into the box above!</li>
              </ol>
            </div>

            {/* Admin Password Management */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#0066CC]" />
                <span className="font-bold text-slate-800 text-sm">
                  Change Portal Password
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Update the password required to unlock and open this Admin Portal on this browser. (Default: <code>AllTechByte@786</code>)
              </p>
              <form onSubmit={handleUpdatePassword} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="password"
                  value={newAdminPassword}
                  onChange={(e) => setNewAdminPassword(e.target.value)}
                  placeholder="Enter new admin password..."
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer shrink-0"
                >
                  Save New Password
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ================= EDIT PRODUCT MODAL ================= */}
        {editingProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 space-y-6 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-bold text-[#0066CC] uppercase tracking-wider block">
                    Editing Product ID: {editingProduct.id}
                  </span>
                  <h3 className="text-xl font-black text-slate-900">
                    Edit Product Details
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {editError && (
                <div className="bg-rose-50 border border-rose-300 rounded-2xl p-4 text-rose-900 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{editError}</span>
                </div>
              )}

              {editSuccess && (
                <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 text-emerald-900 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{editSuccess}</span>
                </div>
              )}

              <form onSubmit={handleSaveEditProduct} className="space-y-5">
                {/* Title */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold bg-slate-50 focus:bg-white focus:border-[#0066CC] outline-none"
                  />
                </div>

                {/* Price, Compare Price, Category, SKU Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Selling Price (Rs) *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-bold bg-slate-50 focus:bg-white focus:border-[#0066CC] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Original Price (Rs)
                    </label>
                    <input
                      type="number"
                      value={editComparePrice}
                      onChange={(e) => setEditComparePrice(e.target.value)}
                      placeholder="Optional"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50 focus:bg-white focus:border-[#0066CC] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Category *
                    </label>
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50 focus:bg-white focus:border-[#0066CC] outline-none"
                    >
                      <option value="Microcontrollers & Boards">Microcontrollers & Boards</option>
                      <option value="Sensors & Displays">Sensors & Displays</option>
                      <option value="Robotics & Motors">Robotics & Motors</option>
                      <option value="Power & Converters">Power & Converters</option>
                      <option value="Electronic Components & ICs">Electronic Components & ICs</option>
                      <option value="Tools, Cables & Wires">Tools, Cables & Wires</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      SKU Code
                    </label>
                    <input
                      type="text"
                      value={editSku}
                      onChange={(e) => setEditSku(e.target.value)}
                      placeholder="e.g. ATB-MCU-01"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-mono bg-slate-50 focus:bg-white focus:border-[#0066CC] outline-none"
                    />
                  </div>
                </div>

                {/* Stock Status Toggle */}
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <input
                    type="checkbox"
                    id="editStockCheck"
                    checked={editInStock}
                    onChange={(e) => setEditInStock(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                  <label htmlFor="editStockCheck" className="text-xs font-bold text-slate-800 cursor-pointer">
                    In Stock (Available for Instant Order / Pickup)
                  </label>
                </div>

                {/* Image Replacement */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Product Image (Keep current or upload new replacement)
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                      <Image
                        src={editImage.previewUrl || editingProduct.image}
                        alt={editTitle}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleEditImageChange}
                        className="text-xs text-slate-600 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                      />
                      <span className="text-[11px] text-slate-400 block mt-1">
                        Uploaded replacement photos will be automatically converted to 900×900 studio WebP.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Product Description
                  </label>
                  <textarea
                    rows={3}
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50 focus:bg-white focus:border-[#0066CC] outline-none"
                  />
                </div>

                {/* Specifications */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Specifications
                    </label>
                    <button
                      type="button"
                      onClick={handleAddEditSpec}
                      className="text-xs font-bold text-[#0066CC] hover:underline cursor-pointer"
                    >
                      + Add Spec
                    </button>
                  </div>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {editSpecs.map((s, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Feature (e.g. Operating Voltage)"
                          value={s.key}
                          onChange={(e) => handleUpdateEditSpec(idx, 'key', e.target.value)}
                          className="w-1/2 text-xs p-2 rounded-lg border border-slate-200 bg-slate-50"
                        />
                        <input
                          type="text"
                          placeholder="Value (e.g. 3.3V - 5V DC)"
                          value={s.value}
                          onChange={(e) => handleUpdateEditSpec(idx, 'value', e.target.value)}
                          className="w-1/2 text-xs p-2 rounded-lg border border-slate-200 bg-slate-50"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveEditSpec(idx)}
                          className="p-2 text-slate-400 hover:text-rose-600 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingEdit}
                    className="px-6 py-2.5 rounded-xl bg-[#0066CC] hover:bg-[#0052a3] text-white text-xs font-bold flex items-center gap-1.5 shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isSavingEdit ? 'Saving & Committing...' : 'Save & Commit to GitHub'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
