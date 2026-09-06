import React, { useState } from 'react';
import {
  X,
  Save,
  Download,
  RotateCcw,
  Sliders,
  User,
  FileText,
  Activity,
  FolderGit2,
  Gamepad2,
  Layers,
  Link as LinkIcon,
  Check,
  Copy,
  Upload,
} from 'lucide-react';
import { ProfileConfig, ProjectItem, GameItem, SocialLink } from '../types/profile';
import { exportProfileConfigToTypeScript } from '../lib/storage';
import { copyToClipboard } from '../lib/clipboard';
import { CommaInput } from './CommaInput';

interface OwnerPanelProps {
  isOpen: boolean;
  onClose: () => void;
  config: ProfileConfig;
  onSave: (newConfig: ProfileConfig) => void;
  onReset: () => void;
}

type TabType =
  | 'identity'
  | 'about'
  | 'currently'
  | 'projects'
  | 'games'
  | 'skills'
  | 'links'
  | 'sections';

export const OwnerPanel: React.FC<OwnerPanelProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
  onReset,
}) => {
  const [formData, setFormData] = useState<ProfileConfig>(config);
  const [activeTab, setActiveTab] = useState<TabType>('identity');
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [copiedExport, setCopiedExport] = useState<boolean>(false);
  const [saveSuccessToast, setSaveSuccessToast] = useState<boolean>(false);

  // Sync if external config changes while closed
  React.useEffect(() => {
    setFormData(config);
  }, [config]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(formData);
    setSaveSuccessToast(true);
    setTimeout(() => setSaveSuccessToast(false), 2200);
  };

  const handleExportDownload = () => {
    const tsCode = exportProfileConfigToTypeScript(formData);
    const blob = new Blob([tsCode], { type: 'text/typescript;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'profile.ts');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyCode = async () => {
    const tsCode = exportProfileConfigToTypeScript(formData);
    const success = await copyToClipboard(tsCode);
    if (success) {
      setCopiedExport(true);
      setTimeout(() => setCopiedExport(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm transition-all"
      role="dialog"
      aria-modal="true"
      aria-labelledby="owner-panel-title"
    >
      <div className="bg-[#0e1017] border border-[rgba(255,255,255,0.1)] w-full max-w-4xl h-[90vh] max-h-[820px] rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[rgba(255,255,255,0.06)] bg-[#12141d]">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#5865F2]" />
            <h2 id="owner-panel-title" className="text-sm font-semibold text-[#f0f2f5]">
              Owner Profile Editor
            </h2>
            <span className="text-[10px] font-mono text-[#5e6678] bg-[#1a1d28] px-1.5 py-0.5 rounded ml-1">
              Live Preview
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowExportModal(true)}
              className="inline-flex items-center gap-1 text-xs text-[#8e95a5] hover:text-[#f0f2f5] bg-[#181b26] hover:bg-[#202434] px-2.5 py-1.5 rounded-lg border border-[rgba(255,255,255,0.06)] transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export profile.ts</span>
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-[#5865F2] hover:bg-[#4752c4] px-3 py-1.5 rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save & Apply</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close editor"
              className="p-1.5 rounded-lg text-[#5e6678] hover:text-[#f0f2f5] hover:bg-[#1c202d] transition-colors ml-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Save success banner */}
        {saveSuccessToast && (
          <div className="bg-[#23a55a]/15 text-[#23a55a] border-b border-[#23a55a]/30 px-4 py-1.5 text-xs text-center font-medium flex items-center justify-center gap-1.5">
            <Check className="w-3.5 h-3.5" />
            Changes saved and applied to your live profile!
          </div>
        )}

        {/* Body Layout: Sidebar navigation + Active tab form */}
        <div className="flex-1 flex overflow-hidden">
          {/* Navigation Sidebar */}
          <aside className="w-48 sm:w-52 border-r border-[rgba(255,255,255,0.06)] bg-[#0b0c13] p-2 space-y-0.5 overflow-y-auto flex-shrink-0">
            {[
              { id: 'identity', label: 'Identity & Banner', icon: User },
              { id: 'about', label: 'About Bio', icon: FileText },
              { id: 'currently', label: 'Currently', icon: Activity },
              { id: 'projects', label: 'Projects', icon: FolderGit2 },
              { id: 'games', label: 'Games', icon: Gamepad2 },
              { id: 'skills', label: 'Skills & Interests', icon: Layers },
              { id: 'links', label: 'Find Me Online', icon: LinkIcon },
              { id: 'sections', label: 'Section Visibility', icon: Sliders },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id as TabType)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors cursor-pointer ${
                  activeTab === id
                    ? 'bg-[#181b28] text-white font-semibold'
                    : 'text-[#8e95a5] hover:text-[#f0f2f5] hover:bg-[#12141e]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${activeTab === id ? 'text-[#5865F2]' : 'opacity-70'}`} />
                <span className="truncate">{label}</span>
              </button>
            ))}

            <div className="pt-4 mt-4 border-t border-[rgba(255,255,255,0.05)] px-2">
              <button
                type="button"
                onClick={() => {
                  if (confirm('Reset all changes back to the default profile configuration?')) {
                    onReset();
                  }
                }}
                className="w-full inline-flex items-center gap-1.5 text-[11px] text-[#717684] hover:text-[#f23f43] transition-colors py-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset to Defaults</span>
              </button>
            </div>
          </aside>

          {/* Form Content Area */}
          <main className="flex-1 p-5 overflow-y-auto space-y-4 bg-[#0e1017]">
            {/* 1. Identity & Banner Tab */}
            {activeTab === 'identity' && (
              <div className="space-y-4 max-w-xl">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#5e6678] mb-3">
                    Identity & Header
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="space-y-1">
                    <label className="block text-[#8e95a5]">Display Name</label>
                    <input
                      type="text"
                      value={formData.displayName}
                      onChange={(e) =>
                        setFormData({ ...formData, displayName: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#141722] border border-[rgba(255,255,255,0.08)] text-[#f0f2f5] focus:border-[#5865F2] outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[#8e95a5]">Discord Username (without @)</label>
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#141722] border border-[rgba(255,255,255,0.08)] text-[#f0f2f5] focus:border-[#5865F2] outline-none font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[#8e95a5]">Pronouns (optional)</label>
                    <input
                      type="text"
                      value={formData.pronouns || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, pronouns: e.target.value })
                      }
                      placeholder="e.g. he/him"
                      className="w-full px-3 py-2 rounded-lg bg-[#141722] border border-[rgba(255,255,255,0.08)] text-[#f0f2f5] focus:border-[#5865F2] outline-none font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[#8e95a5]">Discord User ID (Optional)</label>
                    <input
                      type="text"
                      value={formData.discord.id || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          discord: { ...formData.discord, id: e.target.value },
                        })
                      }
                      placeholder="e.g. 308323056592486420"
                      className="w-full px-3 py-2 rounded-lg bg-[#141722] border border-[rgba(255,255,255,0.08)] text-[#f0f2f5] focus:border-[#5865F2] outline-none font-mono text-xs"
                    />
                    <span className="text-[10px] text-[#636c80] block">
                      Syncs your live Discord status, game playing, and Spotify via Lanyard. Leave blank if not needed.
                    </span>
                  </div>
                </div>

                {/* Avatar with direct file upload and live thumbnail preview */}
                <div className="space-y-2 text-xs bg-[#12151f] p-3 rounded-xl border border-[rgba(255,255,255,0.06)]">
                  <div className="flex items-center justify-between">
                    <label className="block text-[#8e95a5] font-medium">Avatar Picture</label>
                    <label className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#181b28] hover:bg-[#232738] text-[11px] text-[#f0f2f5] border border-[rgba(255,255,255,0.08)] transition-colors cursor-pointer">
                      <Upload className="w-3 h-3 text-[#5865F2]" />
                      <span>Upload from PC</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              if (event.target?.result) {
                                setFormData({ ...formData, avatar: event.target.result as string });
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#161822] border border-[rgba(255,255,255,0.1)] flex-shrink-0 flex items-center justify-center">
                      {formData.avatar ? (
                        <img
                          src={formData.avatar}
                          alt="Avatar preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <span className="text-[10px] font-mono text-[#5e6678]">None</span>
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <input
                        type="text"
                        value={formData.avatar}
                        onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                        placeholder="Paste image URL (or click Upload from PC)"
                        className="w-full px-3 py-1.5 rounded-lg bg-[#161925] border border-[rgba(255,255,255,0.08)] text-[#f0f2f5] focus:border-[#5865F2] outline-none font-mono text-xs"
                      />
                      <span className="text-[10px] text-[#636c80] block">
                        Direct web image URL (.png, .jpg, .webp) or click Upload to select any photo from your computer.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Banner with direct file upload and color picker */}
                <div className="space-y-2 text-xs bg-[#12151f] p-3 rounded-xl border border-[rgba(255,255,255,0.06)]">
                  <div className="flex items-center justify-between">
                    <label className="block text-[#8e95a5] font-medium">Header Banner</label>
                    <label className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#181b28] hover:bg-[#232738] text-[11px] text-[#f0f2f5] border border-[rgba(255,255,255,0.08)] transition-colors cursor-pointer">
                      <Upload className="w-3 h-3 text-[#5865F2]" />
                      <span>Upload Banner from PC</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              if (event.target?.result) {
                                setFormData({ ...formData, banner: event.target.result as string });
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="space-y-1">
                      <label className="block text-[10px] text-[#8e95a5]">Banner Color (Hex)</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={formData.bannerColor || '#181b26'}
                          onChange={(e) =>
                            setFormData({ ...formData, bannerColor: e.target.value })
                          }
                          className="w-8 h-8 rounded border-none bg-transparent cursor-pointer"
                        />
                        <input
                          type="text"
                          value={formData.bannerColor || '#181b26'}
                          onChange={(e) =>
                            setFormData({ ...formData, bannerColor: e.target.value })
                          }
                          className="flex-1 px-3 py-1.5 rounded-lg bg-[#161925] border border-[rgba(255,255,255,0.08)] text-[#f0f2f5] font-mono text-xs"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] text-[#8e95a5]">Banner Image URL</label>
                      <input
                        type="text"
                        value={formData.banner || ''}
                        onChange={(e) =>
                          setFormData({ ...formData, banner: e.target.value })
                        }
                        placeholder="https://... or uploaded image"
                        className="w-full px-3 py-1.5 rounded-lg bg-[#161925] border border-[rgba(255,255,255,0.08)] text-[#f0f2f5] font-mono text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <label className="block text-[#8e95a5]">Tagline</label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#141722] border border-[rgba(255,255,255,0.08)] text-[#f0f2f5] focus:border-[#5865F2] outline-none"
                  />
                </div>

                <div className="space-y-1 text-xs">
                  <label className="block text-[#8e95a5]">Status Text</label>
                  <input
                    type="text"
                    value={formData.status || ''}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#141722] border border-[rgba(255,255,255,0.08)] text-[#f0f2f5] focus:border-[#5865F2] outline-none"
                  />
                </div>

                <div className="space-y-1 text-xs pt-1">
                  <label className="block text-[#8e95a5]">Background Animated Effect</label>
                  <select
                    value={formData.theme?.backgroundEffect || 'stars'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        theme: {
                          ...formData.theme,
                          backgroundEffect: e.target.value as 'stars' | 'aurora' | 'grid' | 'none',
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#141722] border border-[rgba(255,255,255,0.08)] text-[#f0f2f5] focus:border-[#5865F2] outline-none text-xs"
                  >
                    <option value="stars">✨ Night Sky Stars & Shooting Stars (Recommended)</option>
                    <option value="aurora">🌌 Cosmic Ambient Aurora Waves</option>
                    <option value="grid">📐 Developer Cyber Grid with Cursor Spotlight</option>
                    <option value="none">🌑 Minimal Pitch Black (No Animation)</option>
                  </select>
                </div>
              </div>
            )}

            {/* 2. About Bio Tab */}
            {activeTab === 'about' && (
              <div className="space-y-4 max-w-xl text-xs">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#5e6678]">
                    About Bio Paragraphs
                  </h3>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        about: [...formData.about, 'New paragraph...'],
                      })
                    }
                    className="text-xs text-[#5865F2] hover:underline cursor-pointer"
                  >
                    + Add Paragraph
                  </button>
                </div>

                {formData.about.map((para, idx) => (
                  <div key={idx} className="space-y-1 bg-[#12151f] p-2.5 rounded-lg border border-[rgba(255,255,255,0.05)]">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#5e6678]">
                        Paragraph {idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            about: formData.about.filter((_, i) => i !== idx),
                          })
                        }
                        className="text-[10px] text-[#f23f43] hover:underline cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                    <textarea
                      rows={3}
                      value={para}
                      onChange={(e) => {
                        const updated = [...formData.about];
                        updated[idx] = e.target.value;
                        setFormData({ ...formData, about: updated });
                      }}
                      className="w-full px-2.5 py-1.5 rounded bg-[#161925] border border-[rgba(255,255,255,0.08)] text-[#f0f2f5] leading-relaxed text-xs focus:border-[#5865F2] outline-none"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* 3. Currently Tab */}
            {activeTab === 'currently' && (
              <div className="space-y-3 max-w-xl text-xs">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#5e6678]">
                  Currently Activity Fields
                </h3>
                <p className="text-[#8e95a5] text-xs">
                  Empty fields will automatically be hidden on the public profile.
                </p>

                {(['playing', 'building', 'learning', 'listening', 'watching'] as const).map(
                  (field) => (
                    <div key={field} className="space-y-1">
                      <label className="block text-[#8e95a5] uppercase font-mono text-[10px]">
                        {field}
                      </label>
                      <input
                        type="text"
                        value={formData.currently?.[field] || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            currently: {
                              ...formData.currently,
                              [field]: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-[#141722] border border-[rgba(255,255,255,0.08)] text-[#f0f2f5] focus:border-[#5865F2] outline-none"
                      />
                    </div>
                  )
                )}
              </div>
            )}

            {/* 4. Projects Tab */}
            {activeTab === 'projects' && (
              <div className="space-y-3 max-w-xl text-xs">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#5e6678]">
                    Selected Projects
                  </h3>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        projects: [
                          ...formData.projects,
                          {
                            name: 'New Project',
                            description: 'Description here',
                            status: 'Active',
                            tags: ['TypeScript'],
                            github: '',
                            link: '',
                          },
                        ],
                      })
                    }
                    className="text-xs text-[#5865F2] hover:underline cursor-pointer"
                  >
                    + Add Project
                  </button>
                </div>

                {formData.projects.map((proj, idx) => (
                  <div
                    key={idx}
                    className="bg-[#12151f] p-3 rounded-lg border border-[rgba(255,255,255,0.05)] space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={proj.name}
                        onChange={(e) => {
                          const updated = [...formData.projects];
                          updated[idx].name = e.target.value;
                          setFormData({ ...formData, projects: updated });
                        }}
                        className="font-semibold text-sm bg-transparent border-b border-[rgba(255,255,255,0.1)] text-[#f0f2f5] outline-none py-0.5"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            projects: formData.projects.filter((_, i) => i !== idx),
                          })
                        }
                        className="text-[10px] text-[#f23f43] hover:underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>

                    <div>
                      <label className="block text-[10px] text-[#8e95a5]">Description</label>
                      <input
                        type="text"
                        value={proj.description}
                        onChange={(e) => {
                          const updated = [...formData.projects];
                          updated[idx].description = e.target.value;
                          setFormData({ ...formData, projects: updated });
                        }}
                        className="w-full px-2.5 py-1.5 rounded bg-[#161925] border border-[rgba(255,255,255,0.06)] text-[#f0f2f5] text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] text-[#8e95a5]">Status</label>
                        <select
                          value={proj.status}
                          onChange={(e) => {
                            const updated = [...formData.projects];
                            updated[idx].status = e.target.value as ProjectItem['status'];
                            setFormData({ ...formData, projects: updated });
                          }}
                          className="w-full px-2 py-1.5 rounded bg-[#161925] border border-[rgba(255,255,255,0.06)] text-[#f0f2f5] text-xs"
                        >
                          <option value="Active">Active</option>
                          <option value="Experiment">Experiment</option>
                          <option value="Finished">Finished</option>
                          <option value="Paused">Paused</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] text-[#8e95a5]">
                          Tags (comma-separated)
                        </label>
                        <CommaInput
                          value={proj.tags}
                          onChange={(tags) => {
                            const updated = [...formData.projects];
                            updated[idx].tags = tags;
                            setFormData({ ...formData, projects: updated });
                          }}
                          placeholder="TypeScript, WebGL, Algorithms"
                          className="w-full px-2.5 py-1.5 rounded bg-[#161925] border border-[rgba(255,255,255,0.06)] text-[#f0f2f5] text-xs font-mono focus:border-[#5865F2] outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] text-[#8e95a5]">GitHub URL</label>
                        <input
                          type="text"
                          value={proj.github || ''}
                          onChange={(e) => {
                            const updated = [...formData.projects];
                            updated[idx].github = e.target.value;
                            setFormData({ ...formData, projects: updated });
                          }}
                          placeholder="https://github.com/..."
                          className="w-full px-2.5 py-1.5 rounded bg-[#161925] border border-[rgba(255,255,255,0.06)] text-[#f0f2f5] text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-[#8e95a5]">Live URL</label>
                        <input
                          type="text"
                          value={proj.link || ''}
                          onChange={(e) => {
                            const updated = [...formData.projects];
                            updated[idx].link = e.target.value;
                            setFormData({ ...formData, projects: updated });
                          }}
                          placeholder="https://..."
                          className="w-full px-2.5 py-1.5 rounded bg-[#161925] border border-[rgba(255,255,255,0.06)] text-[#f0f2f5] text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 5. Games Tab */}
            {activeTab === 'games' && (
              <div className="space-y-3 max-w-xl text-xs">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#5e6678]">
                    Games Backlog
                  </h3>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        games: [
                          ...formData.games,
                          {
                            name: 'New Game',
                            platform: 'PC',
                            status: 'Playing',
                            note: '',
                          },
                        ],
                      })
                    }
                    className="text-xs text-[#5865F2] hover:underline cursor-pointer"
                  >
                    + Add Game
                  </button>
                </div>

                {formData.games.map((game, idx) => (
                  <div
                    key={idx}
                    className="bg-[#12151f] p-3 rounded-lg border border-[rgba(255,255,255,0.05)] space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={game.name}
                        onChange={(e) => {
                          const updated = [...formData.games];
                          updated[idx].name = e.target.value;
                          setFormData({ ...formData, games: updated });
                        }}
                        className="font-semibold text-sm bg-transparent border-b border-[rgba(255,255,255,0.1)] text-[#f0f2f5] outline-none py-0.5"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            games: formData.games.filter((_, i) => i !== idx),
                          })
                        }
                        className="text-[10px] text-[#f23f43] hover:underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] text-[#8e95a5]">Platform</label>
                        <select
                          value={game.platform}
                          onChange={(e) => {
                            const updated = [...formData.games];
                            updated[idx].platform = e.target.value as GameItem['platform'];
                            setFormData({ ...formData, games: updated });
                          }}
                          className="w-full px-2 py-1.5 rounded bg-[#161925] border border-[rgba(255,255,255,0.06)] text-[#f0f2f5] text-xs"
                        >
                          <option value="PC">PC</option>
                          <option value="Steam">Steam</option>
                          <option value="PlayStation">PlayStation</option>
                          <option value="Xbox">Xbox</option>
                          <option value="Switch">Switch</option>
                          <option value="Mobile">Mobile</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] text-[#8e95a5]">Status</label>
                        <select
                          value={game.status}
                          onChange={(e) => {
                            const updated = [...formData.games];
                            updated[idx].status = e.target.value as GameItem['status'];
                            setFormData({ ...formData, games: updated });
                          }}
                          className="w-full px-2 py-1.5 rounded bg-[#161925] border border-[rgba(255,255,255,0.06)] text-[#f0f2f5] text-xs"
                        >
                          <option value="Playing">Playing</option>
                          <option value="Favorite">Favorite</option>
                          <option value="Finished">Finished</option>
                          <option value="Occasionally">Occasionally</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] text-[#8e95a5]">Personal Note</label>
                      <input
                        type="text"
                        value={game.note || ''}
                        onChange={(e) => {
                          const updated = [...formData.games];
                          updated[idx].note = e.target.value;
                          setFormData({ ...formData, games: updated });
                        }}
                        placeholder="e.g. rank, favorite class, 100% completed..."
                        className="w-full px-2.5 py-1.5 rounded bg-[#161925] border border-[rgba(255,255,255,0.06)] text-[#f0f2f5] text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 6. Skills & Interests Tab */}
            {activeTab === 'skills' && (
              <div className="space-y-4 max-w-xl text-xs">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#5e6678] mb-2">
                    Interests (Tags)
                  </h3>
                  <CommaInput
                    isTextarea
                    rows={3}
                    value={formData.interests}
                    onChange={(interests) =>
                      setFormData({
                        ...formData,
                        interests,
                      })
                    }
                    placeholder="Distributed Systems, Game Dev, Open Source, Compilers"
                    className="w-full px-3 py-2 rounded-lg bg-[#141722] border border-[rgba(255,255,255,0.08)] text-[#f0f2f5] text-xs font-mono leading-relaxed focus:border-[#5865F2] outline-none"
                  />
                  <span className="text-[10px] text-[#636c80] block mt-1">
                    Separate interests with commas.
                  </span>
                </div>

                <div className="pt-3 border-t border-[rgba(255,255,255,0.06)] space-y-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#5e6678]">
                    Skill Groups
                  </h3>

                  {formData.skills.map((group, idx) => (
                    <div
                      key={idx}
                      className="bg-[#12151f] p-3 rounded-lg border border-[rgba(255,255,255,0.05)] space-y-2"
                    >
                      <input
                        type="text"
                        value={group.category}
                        onChange={(e) => {
                          const updated = [...formData.skills];
                          updated[idx].category = e.target.value;
                          setFormData({ ...formData, skills: updated });
                        }}
                        className="font-semibold text-xs text-[#f0f2f5] bg-transparent border-b border-[rgba(255,255,255,0.1)] outline-none py-0.5 w-full"
                      />

                      <div>
                        <label className="block text-[10px] text-[#8e95a5]">
                          Items (comma-separated)
                        </label>
                        <CommaInput
                          value={group.items}
                          onChange={(items) => {
                            const updated = [...formData.skills];
                            updated[idx].items = items;
                            setFormData({ ...formData, skills: updated });
                          }}
                          placeholder="TypeScript, Rust, Go, Python"
                          className="w-full px-2.5 py-1.5 rounded bg-[#161925] border border-[rgba(255,255,255,0.06)] text-[#f0f2f5] text-xs font-mono focus:border-[#5865F2] outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. Links Tab */}
            {activeTab === 'links' && (
              <div className="space-y-3 max-w-xl text-xs">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#5e6678]">
                    External Social Links
                  </h3>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        links: [
                          ...formData.links,
                          {
                            label: 'Website',
                            url: 'https://',
                            icon: 'web',
                          },
                        ],
                      })
                    }
                    className="text-xs text-[#5865F2] hover:underline cursor-pointer"
                  >
                    + Add Link
                  </button>
                </div>

                {formData.links.map((link, idx) => (
                  <div
                    key={idx}
                    className="bg-[#12151f] p-3 rounded-lg border border-[rgba(255,255,255,0.05)] grid grid-cols-[1fr_1fr_90px_auto] gap-2 items-center"
                  >
                    <input
                      type="text"
                      value={link.label}
                      onChange={(e) => {
                        const updated = [...formData.links];
                        updated[idx].label = e.target.value;
                        setFormData({ ...formData, links: updated });
                      }}
                      placeholder="Label"
                      className="px-2 py-1 rounded bg-[#161925] border border-[rgba(255,255,255,0.06)] text-[#f0f2f5] text-xs"
                    />

                    <input
                      type="text"
                      value={link.url}
                      onChange={(e) => {
                        const updated = [...formData.links];
                        updated[idx].url = e.target.value;
                        setFormData({ ...formData, links: updated });
                      }}
                      placeholder="URL"
                      className="px-2 py-1 rounded bg-[#161925] border border-[rgba(255,255,255,0.06)] text-[#f0f2f5] text-xs font-mono"
                    />

                    <select
                      value={link.icon}
                      onChange={(e) => {
                        const updated = [...formData.links];
                        updated[idx].icon = e.target.value as SocialLink['icon'];
                        setFormData({ ...formData, links: updated });
                      }}
                      className="px-2 py-1 rounded bg-[#161925] border border-[rgba(255,255,255,0.06)] text-[#f0f2f5] text-xs"
                    >
                      <option value="github">GitHub</option>
                      <option value="steam">Steam</option>
                      <option value="twitch">Twitch</option>
                      <option value="youtube">YouTube</option>
                      <option value="spotify">Spotify</option>
                      <option value="x">X / Twitter</option>
                      <option value="mail">Email</option>
                      <option value="web">Web</option>
                    </select>

                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          links: formData.links.filter((_, i) => i !== idx),
                        })
                      }
                      className="text-[#f23f43] hover:underline text-xs cursor-pointer px-1"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* 8. Sections Visibility Tab */}
            {activeTab === 'sections' && (
              <div className="space-y-3 max-w-xl text-xs">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#5e6678]">
                  Section Visibility Toggles
                </h3>
                <p className="text-[#8e95a5] text-xs">
                  Toggle off any section to completely hide it from the public profile.
                </p>

                <div className="space-y-2 pt-1">
                  {(Object.keys(formData.sections) as Array<keyof typeof formData.sections>).map(
                    (sectionKey) => {
                      const sec = formData.sections[sectionKey];
                      return (
                        <div
                          key={sectionKey}
                          className="flex items-center justify-between p-2.5 rounded-lg bg-[#141722] border border-[rgba(255,255,255,0.06)]"
                        >
                          <div>
                            <span className="font-medium text-[#f0f2f5] capitalize block">
                              {sectionKey}
                            </span>
                            <span className="text-[10px] text-[#636c80] font-mono">
                              Title: &quot;{sec.title}&quot;
                            </span>
                          </div>

                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={sec.enabled}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  sections: {
                                    ...formData.sections,
                                    [sectionKey]: {
                                      ...sec,
                                      enabled: e.target.checked,
                                    },
                                  },
                                })
                              }
                              className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-[#202434] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#5865F2]" />
                          </label>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Export profile.ts Modal */}
      {showExportModal && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-100"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-[#10121a] border border-[rgba(255,255,255,0.12)] w-full max-w-2xl rounded-xl p-5 shadow-2xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#f0f2f5] flex items-center gap-1.5">
                <Download className="w-4 h-4 text-[#5865F2]" />
                Export profile.ts
              </h3>
              <button
                type="button"
                onClick={() => setShowExportModal(false)}
                className="text-[#5e6678] hover:text-[#f0f2f5] text-lg leading-none cursor-pointer"
              >
                ×
              </button>
            </div>

            <p className="text-xs text-[#8e95a5] leading-relaxed">
              Copy this code into your repository at <code>src/config/profile.ts</code> to make your changes permanent in Git!
            </p>

            <pre className="p-3 bg-[#08090d] border border-[rgba(255,255,255,0.06)] rounded-lg text-[11px] font-mono text-[#d1d5db] overflow-x-auto max-h-80 leading-snug">
              {exportProfileConfigToTypeScript(formData)}
            </pre>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181b26] hover:bg-[#202434] text-xs font-medium text-[#f0f2f5] border border-[rgba(255,255,255,0.08)] cursor-pointer"
              >
                {copiedExport ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#23a55a]" />
                    <span className="text-[#23a55a]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy to Clipboard</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleExportDownload}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#5865F2] hover:bg-[#4752c4] text-xs font-medium text-white shadow-sm cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download profile.ts</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
