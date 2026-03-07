"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { updateProfile } from "@/lib/api";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Loader2,
  User,
  Mail,
  Camera,
  Save,
  Pencil,
  Fingerprint,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PasskeySetup } from "@/components/shared/PasskeySetup";
import {
  AuthenticatedPageContainer,
  PageHeader,
} from "@/components/shared/AuthenticatedPageLayout";

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    avatarUrl: user?.avatarUrl || "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        bio: user.bio || "",
        avatarUrl: user.avatarUrl || "",
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const updatedUser = await updateProfile(formData);
      updateUser(updatedUser);
      setIsEditing(false);
      setStatus({ type: "success", message: "Profile updated successfully!" });
    } catch (err) {
      console.error("Failed to update profile:", err);
      setStatus({
        type: "error",
        message: "Failed to update profile. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-amber-700" />
      </div>
    );
  }

  return (
    <AuthenticatedPageContainer maxWidth="5xl">
      <PageHeader
        title="Account Settings"
        description="Manage your personal information and profile appearance."
      />

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card className="border-none shadow-2xl shadow-stone-200/50 rounded-3xl overflow-hidden bg-white">
            <div className="h-24 bg-linear-to-r from-amber-600 to-amber-800" />
            <CardContent className="pt-0 -mt-12 flex flex-col items-center text-center px-6 pb-8">
              <div className="relative group">
                <div className="w-24 h-24 rounded-3xl border-4 border-white overflow-hidden shadow-xl bg-stone-100 flex items-center justify-center">
                  {formData.avatarUrl ? (
                    <Image
                      src={formData.avatarUrl}
                      alt={formData.name || "User"}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  ) : (
                    <User className="w-10 h-10 text-stone-300" />
                  )}
                </div>
                {isEditing && (
                  <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-3xl cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-6 h-6" />
                    <input
                      type="text"
                      className="hidden"
                      placeholder="Paste image URL here"
                      onChange={(e) =>
                        setFormData({ ...formData, avatarUrl: e.target.value })
                      }
                    />
                  </label>
                )}
              </div>

              <h2 className="text-xl font-bold text-[#1c1917] mt-4">
                {user.name || "Tosi Farmer"}
              </h2>
              <p className="text-[10px] text-amber-700 font-black uppercase tracking-[0.2em] mt-2 bg-amber-50 px-3 py-1 rounded-full">
                {user.role}
              </p>

              <div className="mt-8 w-full space-y-4 pt-6 border-t border-stone-100">
                <div className="flex items-center gap-3 text-stone-600">
                  <Mail className="w-4 h-4 text-stone-400" />
                  <span className="text-sm truncate font-medium">
                    {user.email}
                  </span>
                </div>
              </div>

              {!isEditing && (
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  className="w-full mt-8 rounded-xl border-stone-200 text-stone-600 hover:bg-stone-50 gap-2 h-11 text-[10px] font-black uppercase tracking-widest shadow-sm"
                >
                  <Pencil className="w-4 h-4" />
                  Edit Profile
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="border shadow-none rounded-xl p-6 bg-white">
            <CardHeader className="px-0">
              <CardTitle className="text-xl font-bold text-[#1c1917]">
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-[10px] font-black uppercase tracking-widest text-stone-500"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    disabled={!isEditing}
                    placeholder="Enter your full name"
                    className="h-12 rounded-xl border-stone-200 focus:ring-amber-500 focus:border-amber-500 disabled:bg-stone-50 disabled:text-stone-500 text-sm font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="avatarUrl"
                    className="text-[10px] font-black uppercase tracking-widest text-stone-500"
                  >
                    Profile Picture URL
                  </Label>
                  <Input
                    id="avatarUrl"
                    value={formData.avatarUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, avatarUrl: e.target.value })
                    }
                    disabled={!isEditing}
                    placeholder="Paste a link to your profile picture"
                    className="h-12 rounded-xl border-stone-200 focus:ring-amber-500 focus:border-amber-500 disabled:bg-stone-50 disabled:text-stone-500 text-sm font-medium"
                  />
                  {isEditing && (
                    <p className="text-[11px] text-stone-400 italic font-medium">
                      Use a direct image URL (e.g., Unsplash) for best result.
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="bio"
                    className="text-[10px] font-black uppercase tracking-widest text-stone-500"
                  >
                    Bio
                  </Label>
                  <textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    disabled={!isEditing}
                    rows={4}
                    placeholder="Tell us a bit about yourself..."
                    className="w-full p-4 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:bg-stone-50 disabled:text-stone-500 text-sm font-medium resize-none transition-all"
                  />
                </div>

                {status && (
                  <div
                    className={cn(
                      "p-4 rounded-xl text-xs font-black uppercase tracking-widest",
                      status.type === "success"
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700",
                    )}
                  >
                    {status.message}
                  </div>
                )}

                {isEditing && (
                  <div className="flex gap-4 pt-4 border-t border-stone-100">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => {
                        setIsEditing(false);
                        if (user) {
                          setFormData({
                            name: user.name || "",
                            bio: user.bio || "",
                            avatarUrl: user.avatarUrl || "",
                          });
                        }
                        setStatus(null);
                      }}
                      className="flex-1 h-12 rounded-xl text-stone-500 font-black uppercase tracking-widest text-[10px]"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 h-12 rounded-xl bg-amber-700 hover:bg-amber-600 text-white font-black uppercase tracking-widest text-[10px] shadow-lg shadow-amber-900/20 gap-2"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      Save Changes
                    </Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Security & Passkeys */}
          <Card className="border shadow-none rounded-xl p-6 bg-white">
            <CardHeader className="px-0">
              <CardTitle className="text-xl font-bold text-[#1c1917]">
                Security & Passkeys
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 space-y-6">
              <div className="flex items-start gap-5 p-6 rounded-[2rem] bg-stone-50/50 border border-stone-100 transition-colors hover:bg-stone-50">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center shrink-0 shadow-lg shadow-amber-700/5">
                  <Fingerprint className="w-6 h-6 text-amber-700" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-black text-[#1c1917] uppercase tracking-tight">
                    Passkey Authentication
                  </h4>
                  <p className="text-xs text-stone-500 leading-relaxed font-medium italic">
                    Passkeys are a safer replacement for passwords. Use
                    biometrics like fingerprint or face recognition to sign in.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <PasskeySetup
                  onSuccess={() => {
                    setStatus({
                      type: "success",
                      message: "Passkey added successfully!",
                    });
                  }}
                  variant="outline"
                  className="w-full"
                />
                <p className="text-[9px] text-center text-stone-400 font-black uppercase tracking-[0.2em]">
                  Supports across your mobile and desktop devices
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthenticatedPageContainer>
  );
}
