import React, { useState, useEffect, useRef } from 'react';
import { 
  Save, Upload, ChevronRight, ChevronDown, 
  Image as ImageIcon, Loader2, CheckCircle2, 
  AlertCircle, FileCode, Search, RefreshCcw
} from 'lucide-react';

const API_URL = 'http://localhost:3001/api';

export default function AdminPage() {
  const [xmlDoc, setXmlDoc] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    setLoading(true);
    try {
      const response = await fetch('/website-config.xml?t=' + Date.now());
      const text = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/xml');
      setXmlDoc(doc);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching config:', error);
      setStatus({ type: 'error', message: 'Failed to load configuration.' });
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!xmlDoc) return;
    setSaving(true);
    setStatus(null);
    try {
      const serializer = new XMLSerializer();
      const xmlString = serializer.serializeToString(xmlDoc);
      
      // Basic formatting for better readability (since XMLSerializer strips indentation)
      const formattedXml = xmlString.replace(/></g, '>\n<');

      const response = await fetch(`${API_URL}/save-config`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ xml: formattedXml }),
      });
      const data = await response.json();
      if (data.success) {
        setStatus({ type: 'success', message: 'Configuration saved successfully!' });
        setTimeout(() => setStatus(null), 5000);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Error saving config:', error);
      setStatus({ type: 'error', message: 'Failed to save configuration. Is the backend server running?' });
    } finally {
      setSaving(false);
    }
  };

  const toggleGroup = (id: string) => {
    setExpandedGroups(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 font-sans">
        <div className="relative">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
          <div className="absolute inset-0 flex items-center justify-center">
            <FileCode className="w-5 h-5 text-primary" />
          </div>
        </div>
        <span className="mt-4 text-lg font-medium text-gray-600 animate-pulse">Initializing Editor...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-bg font-sans pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <FileCode className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-none">Content Manager</h1>
              <p className="text-sm text-gray-500 mt-1">website-config.xml</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={fetchConfig}
              className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-xl transition-all"
              title="Refresh Content"
            >
              <RefreshCcw className="w-5 h-5" />
            </button>
            <div className="h-8 w-[1px] bg-gray-100 mx-2" />
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center px-6 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-sm"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 mt-8">
        {/* Alerts */}
        {status && (
          <div className={`mb-8 flex items-center p-4 rounded-2xl border ${status.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-rose-50 border-rose-100 text-rose-800'} animate-in fade-in slide-in-from-top-4 duration-300`}>
            {status.type === 'success' ? <CheckCircle2 className="w-5 h-5 mr-3" /> : <AlertCircle className="w-5 h-5 mr-3" />}
            <span className="font-medium">{status.message}</span>
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-8 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search configuration items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all shadow-sm text-gray-600"
          />
        </div>

        {/* Dynamic Form */}
        <div className="space-y-6">
          {xmlDoc && Array.from(xmlDoc.documentElement.children)
            .filter(child => !searchTerm || child.tagName.toLowerCase().includes(searchTerm.toLowerCase()) || child.textContent?.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((child, idx) => (
              <ConfigSection 
                key={idx} 
                node={child as Element} 
                level={0} 
                path={child.tagName}
                toggleGroup={toggleGroup}
                expandedGroups={expandedGroups}
              />
            ))}
        </div>
      </main>
    </div>
  );
}

function ConfigSection({ node, level, path, toggleGroup, expandedGroups }: { 
  node: Element, 
  level: number, 
  path: string,
  toggleGroup: (id: string) => void,
  expandedGroups: Record<string, boolean>
}) {
  const hasChildren = node.children.length > 0;
  const hasAttributes = node.attributes.length > 0;
  const isExpanded = expandedGroups[path] ?? (level < 1);
  const label = node.tagName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  const isPureLeaf = !hasChildren && !hasAttributes;

  if (isPureLeaf) {
    return <ConfigField node={node} label={label} />;
  }

  return (
    <div className={`bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm transition-all duration-300 ${level > 0 ? 'mt-4 ml-6' : ''}`}>
      <div className={`flex items-center justify-between p-4 px-6 ${isExpanded ? 'bg-gray-50/50' : ''} transition-colors`}>
        <button 
          onClick={() => toggleGroup(path)}
          className="flex items-center flex-grow text-left group"
        >
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-colors ${isExpanded ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'}`}>
            {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </div>
          <span className={`text-lg font-bold transition-colors ${isExpanded ? 'text-gray-900' : 'text-gray-700'}`}>{label}</span>
        </button>
        
        {hasAttributes && (
          <div className="flex flex-wrap gap-2 justify-end ml-4">
            {Array.from(node.attributes).map((attr, idx) => (
              <AttributeField key={idx} node={node} attrName={attr.name} />
            ))}
          </div>
        )}
      </div>
      
      {isExpanded && (
        <div className="p-6 pt-2 border-t border-gray-50 space-y-6 bg-white">
          {!hasChildren && node.textContent && (
             <div className="bg-gray-50/50 p-4 rounded-2xl">
               <ConfigField node={node} label="Value" hideLabel />
             </div>
          )}
          {Array.from(node.children).map((child, idx) => (
            <ConfigSection 
              key={idx} 
              node={child as Element} 
              level={level + 1} 
              path={`${path}.${child.tagName}.${idx}`}
              toggleGroup={toggleGroup}
              expandedGroups={expandedGroups}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function AttributeField({ node, attrName }: { node: Element, attrName: string }) {
  const [val, setVal] = useState(node.getAttribute(attrName) || '');
  return (
    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-gray-200 shadow-sm">
      <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">{attrName}</span>
      <input 
        type="text" 
        value={val} 
        onChange={(e) => { 
          setVal(e.target.value); 
          node.setAttribute(attrName, e.target.value); 
        }}
        className="text-xs font-semibold text-gray-700 focus:outline-none w-24 bg-transparent"
      />
    </div>
  );
}

function ConfigField({ node, label, hideLabel }: { node: Element, label: string, hideLabel?: boolean }) {
  const [value, setValue] = useState(node.textContent || '');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newVal = e.target.value;
    setValue(newVal);
    node.textContent = newVal;
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setValue(data.url);
        node.textContent = data.url;
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Is the backend server running?');
    } finally {
      setUploading(false);
    }
  };

  const isImageField = node.tagName.toLowerCase().includes('image') || 
                       node.tagName.toLowerCase().includes('icon') ||
                       node.tagName.toLowerCase().includes('logo') ||
                       node.tagName.toLowerCase().includes('avatar') ||
                       /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(value) ||
                       value.includes('images.unsplash.com');

  const isTextArea = value.length > 50 || node.tagName.toLowerCase().includes('desc') || node.tagName.toLowerCase().includes('content');
  const isBoolean = value.toLowerCase() === 'true' || value.toLowerCase() === 'false';

  return (
    <div className="group space-y-2.5">
      {!hideLabel && (
        <label className="block text-xs font-bold text-gray-500 group-focus-within:text-primary transition-colors uppercase tracking-wider ml-1">
          {label}
        </label>
      )}
      <div className="flex gap-4 items-center">
        {isImageField && value && (/\.(jpg|jpeg|png|gif|svg|webp)$/i.test(value) || value.includes('images.unsplash.com') || value.startsWith('data:image/')) && (
          <div className="w-14 h-14 rounded-2xl border border-gray-200 overflow-hidden bg-white shrink-0 shadow-sm group-focus-within:border-primary/30 transition-colors flex items-center justify-center p-1">
            <img 
              src={value.startsWith('http') || value.startsWith('data:') ? value : `/${value}`} 
              alt="Preview" 
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        )}
        <div className="flex-grow relative">
          {isBoolean ? (
            <div className="flex items-center h-[52px]">
              <button
                onClick={() => {
                  const newVal = value === 'true' ? 'false' : 'true';
                  setValue(newVal);
                  node.textContent = newVal;
                }}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-4 focus:ring-primary/10 ${
                  value === 'true' ? 'bg-primary' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform shadow-sm ${
                    value === 'true' ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className="ml-3 text-sm font-bold text-gray-500 uppercase tracking-wider">
                {value === 'true' ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          ) : isTextArea ? (
            <textarea
              value={value}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all resize-none text-gray-700 leading-relaxed"
            />
          ) : (
            <input
              type="text"
              value={value}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-gray-700 font-medium"
            />
          )}
          {isImageField && (
             <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
               <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center border border-gray-100">
                <ImageIcon className="w-4 h-4 text-gray-400" />
               </div>
             </div>
          )}
        </div>
        
        {isImageField && (
          <div className="flex flex-col gap-2">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleUpload} 
              className="hidden" 
              accept="image/*"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex-grow flex items-center justify-center px-4 bg-white border border-gray-200 text-gray-600 rounded-2xl hover:bg-gray-50 hover:border-primary/30 transition-all shadow-sm active:scale-95"
              title="Upload New Image"
            >
              {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
            </button>
            {value && (
               <a 
                 href={value.startsWith('http') ? value : `/${value}`} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="p-2 bg-gray-100 text-gray-400 rounded-lg hover:bg-primary/10 hover:text-primary transition-all flex items-center justify-center"
                 title="Preview Image"
               >
                 <ImageIcon className="w-3.5 h-3.5" />
               </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
