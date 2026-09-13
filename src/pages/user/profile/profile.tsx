import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  MapPin,
  Home,
  Building2,
  Globe2,
  Hash,
  Pencil,
  Check,
  Camera,
  Loader2,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { useGetMe } from "../../../api/queries/useUser";
import {
  useUpdateProfile,
  useUploadAvatar,
} from "../../../api/mutations/userMutations";
import userService from "../../../api/services/userService";
import type {
  PlaceSuggestion,
  UpdateProfileRequest,
  UserGender,
  UserProfile,
} from "../../../types/user";
import Button from "../../../components/ui/Button";

function isoToDdMmYyyy(iso: string | null): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return "";
  return `${d}-${m}-${y}`;
}

function hmsToHm(hms: string | null): string {
  if (!hms) return "";
  return hms.slice(0, 5);
}

function formatDisplayDate(iso: string | null): string {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${d}-${m}-${y}`;
}

export default function UserProfile() {
  const { data, isLoading, isError, refetch } = useGetMe();
  const [editOpen, setEditOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1000);
    return () => clearTimeout(t);
  }, [toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-primary-500" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="bg-white rounded-2xl border border-ink-100 p-10 text-center">
        <AlertCircle className="h-7 w-7 text-danger-500 mx-auto mb-3" />
        <h2 className="text-base font-bold text-ink-900 mb-1">
          Couldn't load your profile
        </h2>
        <p className="text-xs text-ink-500 mb-4">
          Please try again in a moment.
        </p>
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-ink-900">
            Profile
          </h1>
          <p className="text-ink-500 mt-1 text-sm">
            Manage your personal information
          </p>
        </div>
        <button
          onClick={() => setEditOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2 bg-gradient-to-r from-primary-600 to-accent-500 text-white text-xs font-semibold hover:shadow-md transition-all"
        >
          <Pencil className="h-3.5 w-3.5" />
          Edit Profile
        </button>
      </div>

      <ViewMode profile={data} />

      <EditProfileModal
        open={editOpen}
        profile={data}
        onClose={() => setEditOpen(false)}
        onSuccess={() => {
          setEditOpen(false);
          refetch();
          setToast("Profile updated successfully!");
        }}
      />

      {/* Toast — PORTAL */}
      {createPortal(
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -20, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: -20, x: 20 }}
              className="fixed top-6 right-6 z-[9999] flex items-center gap-3 bg-white border border-success-200 shadow-xl rounded-lg px-3.5 py-2.5 max-w-xs"
            >
              <div className="p-1 rounded bg-success-100">
                <CheckCircle className="h-3.5 w-3.5 text-success-600" />
              </div>
              <span className="text-xs font-medium text-ink-900">{toast}</span>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  );
}

// ============================================================
// VIEW MODE
// ============================================================
function ViewMode({ profile }: { profile: UserProfile }) {
  const avatarSrc = userService.absoluteAvatarUrl(profile.avatarUrl);
  const [imgFailed, setImgFailed] = useState(false);

  const fields = [
    { icon: User, label: "Full Name", value: profile.name },
    { icon: Mail, label: "Email", value: profile.email },
    { icon: Phone, label: "Phone", value: profile.phone || "—" },
    { icon: User, label: "Gender", value: profile.gender || "—" },
    {
      icon: Calendar,
      label: "Date of Birth",
      value: formatDisplayDate(profile.dateOfBirth),
    },
    {
      icon: Clock,
      label: "Time of Birth",
      value: hmsToHm(profile.timeOfBirth) || "—",
    },
    {
      icon: MapPin,
      label: "Place of Birth",
      value: profile.placeOfBirth || "—",
    },
    {
      icon: Home,
      label: "Current Address",
      value: profile.currentAddress || "—",
    },
    { icon: Building2, label: "City", value: profile.city || "—" },
    { icon: Globe2, label: "State", value: profile.state || "—" },
    { icon: Globe2, label: "Country", value: profile.country || "—" },
    { icon: Hash, label: "Pincode", value: profile.pincode || "—" },
  ];

  const showImage = avatarSrc && !imgFailed;

  return (
    <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
      <div className="relative h-24 bg-gradient-to-br from-primary-600 to-accent-500">
        <div className="absolute inset-0 grid-bg-dark opacity-20" />
      </div>

      <div className="px-5 lg:px-6 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-10 mb-6">
          <div className="relative h-24 w-24 rounded-2xl bg-white shadow-lg border-4 border-white overflow-hidden shrink-0">
            {showImage ? (
              <img
                src={avatarSrc}
                alt={profile.name}
                className="h-full w-full object-cover"
                onError={() => setImgFailed(true)}
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-white text-3xl font-bold">
                {profile.name?.[0]?.toUpperCase() || "U"}
              </div>
            )}
          </div>
          <div className="pb-1">
            <h2 className="text-lg lg:text-xl font-bold text-ink-900">
              {profile.name}
            </h2>
            <p className="text-xs text-ink-500">{profile.email}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {fields.map((f) => (
            <div
              key={f.label}
              className="bg-ink-50 rounded-xl p-4 border border-ink-100"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <f.icon className="h-3.5 w-3.5 text-ink-400" />
                <span className="text-xs text-ink-500 uppercase tracking-wide">
                  {f.label}
                </span>
              </div>
              <div className="text-sm font-semibold text-ink-900 truncate">
                {f.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// EDIT MODAL — with portal
// ============================================================
function EditProfileModal({
  open,
  profile,
  onClose,
  onSuccess,
}: {
  open: boolean;
  profile: UserProfile;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const updateMutation = useUpdateProfile();
  const uploadMutation = useUploadAvatar();

  const [form, setForm] = useState<UpdateProfileRequest>({});
  const [pendingAvatarFile, setPendingAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      setForm({
        name: profile.name,
        phone: profile.phone || "",
        email: profile.email,
        gender: (profile.gender as UserGender) || "",
        dateOfBirth: isoToDdMmYyyy(profile.dateOfBirth),
        timeOfBirth: hmsToHm(profile.timeOfBirth),
        placeOfBirth: profile.placeOfBirth || "",
        currentAddress: profile.currentAddress || "",
        city: profile.city || "",
        state: profile.state || "",
        country: profile.country || "",
        pincode: profile.pincode || "",
      });
      setPendingAvatarFile(null);
      setAvatarPreview(userService.absoluteAvatarUrl(profile.avatarUrl));
      setError(null);
      setConfirmOpen(false);
    }
  }, [open, profile]);

  // Hide the site header while modal is open
  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;
    if (open) {
      header.style.visibility = "hidden";
      header.style.pointerEvents = "none";
    } else {
      header.style.visibility = "";
      header.style.pointerEvents = "";
    }
    return () => {
      header.style.visibility = "";
      header.style.pointerEvents = "";
    };
  }, [open]);

  const onField =
    (key: keyof UpdateProfileRequest) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
    };

  const handlePickFile = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!/^image\/(png|jpe?g|webp)$/i.test(file.type)) {
      setError("Only PNG, JPG, or WEBP images allowed");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5 MB");
      return;
    }

    setError(null);
    setPendingAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setConfirmOpen(true);
  };

  const handleConfirmSave = async () => {
    try {
      if (pendingAvatarFile) {
        await uploadMutation.mutateAsync(pendingAvatarFile);
        setPendingAvatarFile(null);
      }
      await updateMutation.mutateAsync(form);
      setConfirmOpen(false);
      onSuccess();
    } catch (err: any) {
      setConfirmOpen(false);
      setError(err?.response?.data?.message || "Update failed");
    }
  };

  const saving = updateMutation.isPending || uploadMutation.isPending;

  return (
    <>
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="fixed inset-0 z-[9998] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
              onClick={onClose}
            >
              <motion.div
                initial={{ scale: 0.96, opacity: 0, y: 12 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.96, opacity: 0, y: 12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[92vh] overflow-hidden flex flex-col"
              >
                {/* Header */}
                <div className="px-5 py-3.5 border-b border-ink-100 shrink-0">
                  <h2 className="text-base font-bold text-ink-900">
                    Edit Your Profile
                  </h2>
                  <p className="text-[11px] text-ink-500 mt-0.5">
                    Update your information and save changes
                  </p>
                </div>

                {/* Body */}
                <form
                  onSubmit={handleRequestSubmit}
                  className="flex-1 overflow-y-auto px-6 py-5 space-y-3.5 scrollbar-hide"
                  id="edit-profile-form"
                >
                  {error && (
                    <div className="flex items-start gap-2 p-2.5 rounded-lg bg-danger-50 border border-danger-200 text-danger-600 text-xs">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                      {error}
                    </div>
                  )}

                  {/* Avatar */}
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-white text-xl font-bold overflow-hidden">
                        {avatarPreview ? (
                          <img
                            src={avatarPreview}
                            alt="avatar"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          form.name?.[0]?.toUpperCase() || "U"
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={handlePickFile}
                        className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-white border border-ink-200 flex items-center justify-center shadow-sm hover:bg-ink-50 transition"
                        aria-label="Change avatar"
                      >
                        <Camera className="h-3 w-3 text-ink-700" />
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-ink-900">
                        Profile picture
                      </div>
                      <div className="text-[11px] text-ink-500 mt-0.5">
                        PNG, JPG or WEBP. Max 5 MB.
                        {pendingAvatarFile && (
                          <span className="block text-primary-600 font-medium mt-0.5">
                            Will upload on save
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Row 1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-ink-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={form.name ?? ""}
                        onChange={onField("name")}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-ink-200 text-sm text-ink-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-ink-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={form.phone ?? ""}
                        onChange={onField("phone")}
                        placeholder="+91 98765 43210"
                        className="w-full px-3 py-2 rounded-lg bg-white border border-ink-200 text-sm text-ink-900 placeholder-ink-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-ink-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={form.email ?? ""}
                        onChange={onField("email")}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-ink-200 text-sm text-ink-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-ink-700 mb-1">
                        Gender
                      </label>
                      <select
                        value={form.gender ?? ""}
                        onChange={onField("gender")}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-ink-200 text-sm text-ink-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 appearance-none"
                      >
                        <option value="">Select</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-ink-700 mb-1">
                        Date of Birth
                      </label>
                      <input
                        type="text"
                        value={form.dateOfBirth ?? ""}
                        onChange={onField("dateOfBirth")}
                        placeholder="dd-MM-yyyy"
                        className="w-full px-3 py-2 rounded-lg bg-white border border-ink-200 text-sm text-ink-900 placeholder-ink-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-ink-700 mb-1">
                        Time of Birth
                      </label>
                      <input
                        type="time"
                        value={form.timeOfBirth ?? ""}
                        onChange={onField("timeOfBirth")}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-ink-200 text-sm text-ink-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20"
                      />
                    </div>
                  </div>

                  {/* Row 3 — autocomplete */}
                  <PlaceAutocomplete
                    value={form.placeOfBirth || ""}
                    onChange={(v) =>
                      setForm((f) => ({ ...f, placeOfBirth: v }))
                    }
                    onSelect={(place) =>
                      setForm((f) => ({
                        ...f,
                        placeOfBirth: place.displayName,
                        city: place.city || f.city || "",
                        state: place.state || f.state || "",
                        country: place.country || f.country || "",
                        pincode: place.postcode || f.pincode || "",
                      }))
                    }
                  />

                  {/* Row 4 */}
                  <div>
                    <label className="block text-xs font-medium text-ink-700 mb-1">
                      Current Address
                    </label>
                    <textarea
                      rows={2}
                      value={form.currentAddress ?? ""}
                      onChange={onField("currentAddress")}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-ink-200 text-sm text-ink-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 resize-none"
                    />
                  </div>

                  {/* Row 5 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-ink-700 mb-1">
                        Pincode
                      </label>
                      <input
                        type="text"
                        value={form.pincode ?? ""}
                        onChange={onField("pincode")}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-ink-200 text-sm text-ink-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-ink-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={form.city ?? ""}
                        onChange={onField("city")}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-ink-200 text-sm text-ink-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20"
                      />
                    </div>
                  </div>

                  {/* Row 6 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-ink-700 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        value={form.state ?? ""}
                        onChange={onField("state")}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-ink-200 text-sm text-ink-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-ink-700 mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        value={form.country ?? ""}
                        onChange={onField("country")}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-ink-200 text-sm text-ink-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20"
                      />
                    </div>
                  </div>
                </form>

                {/* Footer */}
                <div className="flex gap-2.5 px-5 py-3.5 border-t border-ink-100 shrink-0">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 inline-flex items-center justify-center rounded-lg px-4 py-2.5 border border-ink-200 text-ink-700 text-xs font-semibold hover:border-ink-300 hover:bg-ink-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    form="edit-profile-form"
                    disabled={saving}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 bg-gradient-to-r from-primary-600 to-accent-500 text-white text-xs font-semibold hover:shadow-lg disabled:opacity-60 transition"
                  >
                    <Check className="h-3.5 w-3.5" />
                    Update Profile
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}

      {/* Confirm — PORTAL */}
      {createPortal(
        <ConfirmDialog
          open={confirmOpen}
          saving={saving}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={handleConfirmSave}
        />,
        document.body,
      )}
    </>
  );
}

function ConfirmDialog({
  open,
  saving,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  saving: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={onCancel}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl p-5 w-full max-w-sm shadow-2xl"
          >
            <div className="flex items-center gap-2.5 mb-2">
              <div className="p-1.5 rounded-lg bg-primary-50">
                <AlertTriangle className="h-4 w-4 text-primary-600" />
              </div>
              <h3 className="text-sm font-bold text-ink-900">Save changes?</h3>
            </div>
            <p className="text-xs text-ink-500 mb-5">
              Your profile will be updated with the new information.
            </p>
            <div className="flex gap-2.5">
              <button
                onClick={onCancel}
                disabled={saving}
                className="flex-1 inline-flex items-center justify-center rounded-lg px-4 py-2 border border-ink-200 text-ink-700 text-xs font-semibold hover:border-ink-300 hover:bg-ink-50 disabled:opacity-60 transition"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={saving}
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 bg-gradient-to-r from-primary-600 to-accent-500 text-white text-xs font-semibold hover:shadow-lg disabled:opacity-60 transition"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Confirm"
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PlaceAutocomplete({
  value,
  onChange,
  onSelect,
}: {
  value: string;
  onChange: (v: string) => void;
  onSelect: (place: PlaceSuggestion) => void;
}) {
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleInput = (v: string) => {
    onChange(v);
    if (debounceRef.current) window.clearTimeout(debounceRef.current);

    if (v.trim().length < 3) {
      setSuggestions([]);
      setOpen(false);
      return;
    }

    debounceRef.current = window.setTimeout(async () => {
      setLoading(true);
      try {
        const results = await userService.searchPlaces(v);
        setSuggestions(results);
        setOpen(true);
      } catch {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 400);
  };

  return (
    <div ref={wrapRef} className="relative">
      <label className="block text-xs font-medium text-ink-700 mb-1">
        Place of Birth
      </label>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-ink-400" />
        <input
          type="text"
          value={value}
          onChange={(e) => handleInput(e.target.value)}
          placeholder="Start typing a city (e.g. Mumbai)"
          className="w-full pl-9 pr-9 py-2 rounded-lg bg-white border border-ink-200 text-sm text-ink-900 placeholder-ink-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20"
        />
        {loading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 animate-spin text-ink-400" />
        )}
      </div>

      {open && suggestions.length > 0 && (
        <div className="absolute z-30 top-full left-0 right-0 mt-1 bg-white border border-ink-200 rounded-lg shadow-lg overflow-hidden max-h-64 overflow-y-auto">
          {suggestions.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                onSelect(s);
                setOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs text-ink-700 hover:bg-ink-50 hover:text-primary-700 transition"
            >
              <div className="font-medium truncate">{s.displayName}</div>
              {(s.city || s.state || s.country) && (
                <div className="text-[10px] text-ink-400 truncate">
                  {[s.city, s.state, s.country].filter(Boolean).join(", ")}
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
