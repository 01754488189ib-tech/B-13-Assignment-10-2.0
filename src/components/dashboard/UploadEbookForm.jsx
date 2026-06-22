"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card } from "@heroui/react";
import { ArrowLeft, ArrowUpToLine, Sparkles } from "@gravity-ui/icons";
import { createEbook } from "@/lib/actions/ebooks";

export default function UploadEbookForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("Sci-Fi");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [coverUrl, setCoverUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("File exceeds 5MB size limit.");
      return;
    }

    setIsUploading(true);
    setErrorMsg("");

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
        setCoverUrl(payload.data.url);
      } else {
        setErrorMsg("ImgBB upload failed. Verify your API key.");
      }
    } catch (err) {
      setErrorMsg("Network error occurred during image upload.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!coverUrl) {
      setErrorMsg("A manuscript cover artwork image is required.");
      return;
    }

    setIsSaving(true);
    setErrorMsg("");

    const data = {
      title,
      genre,
      price: parseFloat(price),
      description,
      coverGradient: "from-amber-600 via-orange-700 to-red-800", // Default backing gradient
      coverImage: coverUrl,
    };

    try {
      const res = await createEbook(data);
      if (res.insertedId) {
        router.push("/dashboard/writer");
        router.refresh();
      } else {
        setErrorMsg(res.message || "Could not publish ebook.");
      }
    } catch (err) {
      setErrorMsg("Unexpected communication error.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto p-6 sm:p-8 bg-[#0b0b0f] border border-white/5 rounded-3xl shadow-2xl">
      <div className="border-b border-white/5 pb-6 mb-8 flex items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold tracking-wider text-amber-500 uppercase flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Fable Publishing Room
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-white mt-1">
            Publish New Manuscript
          </h1>
          <p className="text-zinc-500 text-xs mt-1">
            Provide literature coordinates to release your creation.
          </p>
        </div>
        <Button
          onClick={() => router.push("/dashboard/writer")}
          variant="flat"
          className="bg-white/5 hover:bg-white/10 text-xs font-semibold rounded-xl text-zinc-300"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back
        </Button>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-400">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-zinc-400">
              Manuscript Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Chronicles of Sector 9"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white/[0.02] border border-white/5 text-zinc-300 rounded-xl h-12 px-3 text-sm focus:border-amber-500/50 outline-none transition"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-zinc-400">
              Genre / Category
            </label>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="bg-[#0b0b0f] border border-white/5 text-zinc-300 rounded-xl h-12 px-3 text-sm outline-none cursor-pointer focus:border-amber-500/50 transition"
            >
              {[
                "Sci-Fi",
                "Fantasy",
                "Romance",
                "Mystery",
                "Horror",
                "Fiction",
              ].map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-zinc-400">
              Ebook Price (USD)
            </label>
            <input
              type="number"
              step="0.01"
              required
              placeholder="12.99"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="bg-white/[0.02] border border-white/5 text-zinc-300 rounded-xl h-12 px-3 text-sm focus:border-amber-500/50 outline-none transition"
            />
          </div>

          {/* ImgBB Artwork Uploader */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-zinc-400">
              Cover Artwork (ImgBB)
            </label>
            <div className="flex items-center gap-4">
              <label className="w-12 h-12 border border-dashed border-white/20 hover:border-amber-500 bg-white/[0.02] rounded-xl flex items-center justify-center cursor-pointer transition-colors relative overflow-hidden shrink-0">
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                {coverUrl ? (
                  <img
                    src={coverUrl}
                    alt="Artwork"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ArrowUpToLine className="w-4 h-4 text-zinc-400" />
                )}
              </label>
              <div className="min-w-0 flex-1">
                <span className="text-xs font-semibold text-zinc-300 block">
                  {isUploading
                    ? "Uploading to ImgBB..."
                    : "Upload Cover PNG, JPG"}
                </span>
                <span className="text-[10px] text-zinc-500 block mt-0.5">
                  Upload image size up to 5MB
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-zinc-400">
            Manuscript Description / Synopsis
          </label>
          <textarea
            required
            rows={6}
            placeholder="Write a compelling summary preview for prospective readers..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-white/[0.02] border border-white/5 text-zinc-300 rounded-2xl p-4 text-sm focus:border-amber-500/50 outline-none transition resize-none"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
          <Button
            type="button"
            onClick={() => router.push("/dashboard/writer")}
            className="bg-white/5 hover:bg-white/10 text-xs font-semibold rounded-xl text-zinc-300 px-5"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={isSaving}
            disabled={isSaving || isUploading}
            className="bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold rounded-xl px-6 shadow-xl shadow-amber-500/10"
          >
            Publish Manuscript
          </Button>
        </div>
      </form>
    </Card>
  );
}
