"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Upload,
  Camera,
  X,
  Image as ImageIcon,
} from "lucide-react";
import Link from "next/link";
import StandardCard from "@/components/ui/StandardCard";
import ProtectedPageWrapper from "@/components/layout/ProtectedPageWrapper";
import { useAuth } from "@/components/auth";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-hot-toast";
import { convertToWebP, supportsWebP } from "@/lib/imageUtils";
import Image from "next/image";
import { EditPattern } from "@/components/ui/FloatingActionPresets";
import PhotoUpload from "@/components/ui/PhotoUpload";
import Header from "@/components/layout/Header";
import PageContainer from "@/components/layout/PageContainer";

interface ManualSection {
  id: string;
  title: string;
}

export default function NewItemPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const sectionId = params.id as string;

  const [section, setSection] = useState<ManualSection | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [important, setImportant] = useState(false);

  // Photo upload states (matching dashboard pattern)
  const [photos, setPhotos] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    media_urls: [] as string[],
    important: false,
  });

  useEffect(() => {
    if (sectionId) {
      loadSection();
    }
  }, [sectionId]);

  const loadSection = async () => {
    try {
      const { data: sectionData, error } = await supabase
        .from("manual_sections")
        .select("id, title")
        .eq("id", sectionId)
        .single();

      if (error) throw error;
      setSection(sectionData);
    } catch (error) {
      console.error("Error loading section:", error);
      toast.error("Error loading section");
    }
  };

  // Photo upload handler (EXACT dashboard pattern)
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    for (const file of files) {
      if (!file.type.match(/image\/(jpeg|jpg|png|webp|gif)/i)) {
        toast.error("Please select valid image files");
        continue;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be less than 5MB");
        continue;
      }

      setIsUploading(true);
      setUploadProgress(0);

      try {
        let fileToUpload = file;
        let fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg";

        // EXACT SAME WebP conversion as dashboard
        const webpSupported = await supportsWebP();
        if (webpSupported) {
          const optimizedBlob = await convertToWebP(file, 1200, 0.8);
          fileToUpload = new File([optimizedBlob], `manual-item.webp`, {
            type: "image/webp",
          });
          fileExt = "webp";
        }

        const tempId = uuidv4();
        const fileName = `manual-items/temp-${tempId}/${uuidv4()}.${fileExt}`;

        // EXACT SAME upload pattern as dashboard
        const { error: uploadError } = await supabase.storage
          .from("property-images")
          .upload(fileName, fileToUpload, {
            cacheControl: "31536000",
            upsert: false,
          });

        setUploadProgress(100);

        if (uploadError) throw uploadError;

        // EXACT SAME URL generation
        const { data: publicUrlData } = supabase.storage
          .from("property-images")
          .getPublicUrl(fileName);

        setPhotos((prev) => [...prev, publicUrlData.publicUrl]);
        toast.success("Photo uploaded successfully!");
      } catch (error) {
        console.error("Error uploading photo:", error);
        toast.error("Failed to upload photo");
      } finally {
        setIsUploading(false);
        setTimeout(() => setUploadProgress(0), 1000);
      }
    }
  };

  // Photo removal handler
  const removePhoto = (photoUrl: string) => {
    setPhotos((prev) => prev.filter((url) => url !== photoUrl));
    toast.success("Photo removed");
  };

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    if (!content.trim()) {
      toast.error("Please enter content");
      return;
    }

    try {
      // Get the highest order_index for this section
      const { data: lastItem } = await supabase
        .from("manual_items")
        .select("order_index")
        .eq("section_id", sectionId)
        .order("order_index", { ascending: false })
        .limit(1)
        .single();

      const nextOrderIndex = (lastItem?.order_index || 0) + 1;

      const { data, error } = await supabase
        .from("manual_items")
        .insert({
          title: title.trim(),
          content: content.trim(),
          important: important,
          section_id: sectionId,
          order_index: nextOrderIndex,
          media_urls: photos, // Include photos
        })
        .select()
        .single();

      if (error) throw error;

      toast.success("Item created successfully!");
      router.push(`/manual/sections/${sectionId}/items/${data.id}`);
    } catch (error: any) {
      console.error("Error creating item:", error);
      toast.error("Error creating item");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!section) {
    return (
      <ProtectedPageWrapper title="Section Not Found">
        <StandardCard>
          <div className="text-center py-8">
            <p className="text-red-600">Section not found</p>
            <Link href="/manual" className="text-blue-600 hover:underline">
              Back to Manual
            </Link>
          </div>
        </StandardCard>
      </ProtectedPageWrapper>
    );
  }

  return (
    <div className="p-6">
      <Header title="New Manual Item" />
      <PageContainer>
        <div className="space-y-6">
          <StandardCard
            title="Create New Item"
            subtitle="Add a new item to this manual section"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Item Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter item title..."
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content *
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                  placeholder="Enter item content...

You can use line breaks to format your content.
Each new line will be preserved when displayed."
                />
                <p className="text-sm text-gray-500 mt-1">
                  Line breaks will be preserved in the display
                </p>
              </div>

              {/* Photo Upload Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Photos
                </label>

                {/* Upload Buttons */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <label className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Photos
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      disabled={isUploading}
                    />
                  </label>

                  <label className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer transition-colors md:hidden">
                    <Camera className="h-4 w-4 mr-2" />
                    Take Photo
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      disabled={isUploading}
                    />
                  </label>
                </div>

                {/* Upload Progress */}
                {isUploading && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Photo Grid */}
                {photos.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <Image
                          src={photo}
                          alt={`Item photo ${index + 1}`}
                          width={200}
                          height={96}
                          className="w-full h-24 object-cover rounded-lg border"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(photo)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">No photos added yet</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Upload photos or take new ones to document this item
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="important"
                  checked={important}
                  onChange={(e) => setImportant(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="important"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Mark as important
                </label>
              </div>
            </div>
          </StandardCard>
        </div>
      </PageContainer>
    </div>
  );
}
