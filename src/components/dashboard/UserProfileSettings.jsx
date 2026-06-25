"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Button } from "@heroui/react";
import { ArrowUpToLine, Gear, Person, Pencil } from "@gravity-ui/icons";
import { updateProfile } from "@/lib/actions/users";

export default function UserProfileSettings({ user, stats = [] }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name || "");
  const [imageUrl, setImageUrl] = useState(user.image || "");
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setMessage({ text: "Profile image must be under 2MB.", type: "error" });
      return;
    }

    setIsUploading(true);
    setMessage({ text: "", type: "" });

    const formData = new FormData();
    formData.append("image", file);

    try {
      const apiKey = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      const payload = await res.json();
      if (payload.success) {
        setImageUrl(payload.data.url);
        setMessage({
          text: "Image uploaded. Click Save to apply changes.",
          type: "success",
        });
      } else {
        setMessage({ text: "Failed to upload image to ImgBB.", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "Network error during image upload.", type: "error" });
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setName(user.name || "");
    setImageUrl(user.image || "");
    setMessage({ text: "", type: "" });
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ text: "", type: "" });

    try {
      const res = await updateProfile({ name, image: imageUrl });
      if (res.success || res.result?.acknowledged) {
        setMessage({ text: "Profile updated successfully.", type: "success" });
        setIsEditing(false);
        router.refresh();
      } else {
        setMessage({ text: "Could not record updates.", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "Unexpected connection error.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-5 space-y-6">
        <Card className="bg-[#0b0b0f] border border-white/5 p-6 rounded-[24px] shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-r from-amber-500/10 via-orange-600/5 to-purple-800/10 blur-xl" />

          <div className="relative mt-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/5 bg-zinc-900 flex items-center justify-center relative group">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl font-serif font-black text-amber-500">
                  {user.name ? user.name[0].toUpperCase() : "U"}
                </span>
              )}
              {isUploading && (
                <div className="absolute inset-0 bg-black/75 flex items-center justify-center text-[10px] text-white font-bold">
                  Uploading...
                </div>
              )}
            </div>

            {isEditing && (
              <label className="absolute bottom-0 right-0 h-8 w-8 bg-amber-500 hover:bg-amber-400 text-black rounded-full flex items-center justify-center cursor-pointer shadow-md transition group">
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <ArrowUpToLine className="w-3.5 h-3.5" />
              </label>
            )}
          </div>

          <div className="mt-5 space-y-1">
            <h2 className="text-xl font-bold text-white">{user.name}</h2>
            <span className="text-xs text-zinc-500 block">{user.email}</span>
            <span className="inline-block mt-3 px-3 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold uppercase tracking-wider">
              {user.role}
            </span>
          </div>

          <div className="w-full grid grid-cols-2 gap-3 mt-8 pt-6 border-t border-white/5">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-white/[0.01] border border-white/5 rounded-xl p-3 text-left"
              >
                <span className="text-[9px] text-zinc-500 block uppercase font-bold tracking-wider">
                  {s.label}
                </span>
                <span className="text-sm font-bold text-white mt-1 block">
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="lg:col-span-7">
        <Card className="bg-[#0b0b0f] border border-white/5 p-6 sm:p-8 rounded-[24px] shadow-2xl space-y-6">
          <div className="border-b border-white/5 pb-5 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Gear className="w-4 h-4 text-amber-500" /> Account Settings
              </h2>
              <p className="text-xs text-zinc-500 mt-1">
                Manage your personal credentials and profile.
              </p>
            </div>
            {!isEditing && (
              <Button
                onClick={() => setIsEditing(true)}
                variant="flat"
                className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-bold rounded-xl h-9"
              >
                <Pencil className="w-3.5 h-3.5 mr-1" /> Edit Profile
              </Button>
            )}
          </div>

          {message.text && (
            <div
              className={`p-4 rounded-xl text-xs font-semibold border ${
                message.type === "success"
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                  : "bg-red-500/10 border-red-500/20 text-red-400"
              }`}
            >
              {message.text}
            </div>
          )}

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-zinc-400">
                  Full Name
                </label>
                <div className="relative flex items-center bg-white/[0.02] border border-white/5 rounded-xl px-3.5 h-12 focus-within:border-amber-500/50 transition">
                  <Person className="text-zinc-500 shrink-0 mr-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-transparent text-white placeholder-zinc-700 text-sm outline-none w-full h-full"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 opacity-40">
                <label className="text-xs font-semibold text-zinc-400">
                  Email Address (Read-only)
                </label>
                <div className="relative flex items-center bg-white/[0.01] border border-white/5 rounded-xl px-3.5 h-12">
                  <AtIcon className="text-zinc-500 shrink-0 mr-3" />
                  <input
                    type="email"
                    disabled
                    value={user.email}
                    className="bg-transparent text-zinc-500 text-sm outline-none w-full h-full cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex justify-end gap-3">
                <Button
                  type="button"
                  onClick={handleCancel}
                  className="bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-bold rounded-xl h-11 px-5"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  isLoading={isSaving}
                  disabled={isSaving || isUploading}
                  className="bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold rounded-xl px-6 h-11 shadow-lg shadow-amber-500/10"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-5">
              <div className="flex flex-col gap-1.5 border-b border-white/[0.02] pb-4">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                  Full Name
                </span>
                <span className="text-sm font-semibold text-white">
                  {user.name}
                </span>
              </div>

              <div className="flex flex-col gap-1.5 border-b border-white/[0.02] pb-4">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                  Email Address
                </span>
                <span className="text-sm font-semibold text-zinc-300">
                  {user.email}
                </span>
              </div>

              <div className="flex flex-col gap-1.5 border-b border-white/[0.02] pb-4">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                  Account Role
                </span>
                <span className="text-sm font-semibold text-zinc-300 capitalize">
                  {user.role}
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                  Security clearance
                </span>
                <span className="text-sm font-semibold text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />{" "}
                  Active System Node
                </span>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function AtIcon({ className }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
    </svg>
  );
}
