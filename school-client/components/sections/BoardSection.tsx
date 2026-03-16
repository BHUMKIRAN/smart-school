"use client";

import React, { useEffect, useMemo, useState } from "react";
import { getCommittee } from "@/api/useCommittee";

// ... (Types and toAssetUrl remain exactly as you provided)
type BoardMember = {
  name: string;
  position: string;
  description?: string;
  image?: string;
  facebook?: string;
  twitter?: string;
};

type ContentfulAsset = {
  fields?: {
    title?: string;
    file?: {
      url?: string;
    };
  };
};

type CommitteeEntry = {
  sys?: { id?: string };
  fields?: Record<string, any>;
};

const toAssetUrl = (asset?: ContentfulAsset) => {
  const url = asset?.fields?.file?.url;
  if (!url) return undefined;
  return url.startsWith("//") ? `https:${url}` : url;
};

const toMember = (entry: CommitteeEntry): BoardMember => {
  const fields = entry?.fields ?? {};
  return {
    name: fields.name ?? fields.fullName ?? fields.title ?? "Member",
    position: fields.subtitle ?? "",
    description: fields.description ?? fields.bio ?? fields.summary ?? fields.education ?? "",
    image: toAssetUrl(fields.image ?? fields.photo ?? fields.avatar),
    facebook: fields.facebook ?? "#",
    twitter: fields.twitter ?? "#",
  };
};

export default function BoardSection() {
  const [committeeItems, setCommitteeItems] = useState<CommitteeEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getCommittee()
      .then((items) => {
        if (!isMounted) return;
        setCommitteeItems(items ?? []);
      })
      .catch(() => {
        if (!isMounted) return;
        setCommitteeItems([]);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const { title, members } = useMemo(() => {
    const first = committeeItems[0];
    const heading = first?.fields?.title ?? "विद्यालय व्यवस्थापन समिति";
    
    const rawMembers = Array.isArray(first?.fields?.cards)
      ? (first?.fields?.cards as CommitteeEntry[])
      : Array.isArray(first?.fields?.subtitle)
        ? (first?.fields?.members as CommitteeEntry[])
        : committeeItems;

    const mapped = rawMembers.map((entry) => toMember(entry));

    // --- SORTING LOGIC ADDED HERE ---
    const sorted = [...mapped].sort((a, b) => {
      const getPriority = (pos: string) => {
        // Higher priority (lower number) comes first
        if (pos.includes("अध्यक्ष")) return 1;
        if (pos.includes("सह-अध्यक्ष")) return 2;
        if (pos.includes("सचिव")) return 3;
        if (pos.includes("कोषाध्यक्ष")) return 4;
        if (pos.includes("सदस्य")) return 5;
        return 6; // Others
      };
      return getPriority(a.position) - getPriority(b.position);
    });
    
    return { title: heading, members: sorted };
  }, [committeeItems]);

  if (loading) return null;

  return (
    <section
      id="board"
      className="py-12 px-6 dark:bg-slate-950 transition-colors duration-500 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-900/10"></div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white nepali-text leading-tight">
            विद्यालय <span className="text-blue-600 relative inline-block">{title}
              <svg
                className="absolute -bottom-1 left-0 w-full h-1.5 text-yellow-400"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 25 0, 50 5 T 100 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                />
              </svg>
            </span>
          </h2>
        </div>

        {/* Board Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
          {members.map((member, index) => (
            <div
              key={index}
              className="group bg-secondary dark:bg-slate-900 rounded-[2rem] p-4 border border-slate-100 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 text-center max-w-[280px] w-full"
            >
              {/* Profile Image */}
              <div className="relative w-24 h-24 mx-auto mb-4 overflow-hidden rounded-2xl shadow-md border-2 border-slate-50 dark:border-slate-800 bg-slate-100 flex items-center justify-center">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  />
                ) : (
                  <span className="text-2xl font-black text-slate-600 dark:text-slate-300">
                    {member.name.charAt(0)}
                  </span>
                )}
              </div>

              {/* Details */}
              <div className="space-y-2">
                <h3 className="font-black text-lg nepali-text text-slate-800 dark:text-white group-hover:text-blue-600 transition-colors">
                  {member.name}
                </h3>

                <div className="inline-block px-3 py-0.5 rounded-full bg-yellow-400/15 text-yellow-700 dark:text-yellow-500 text-[9px] font-black uppercase tracking-wider border border-yellow-400/20">
                  {member.position}
                </div>

                <p className="text-slate-500 dark:text-slate-400 text-[11px] nepali-text leading-relaxed line-clamp-2">
                  {member.description}
                </p>

                {/* Social Links */}
                <div className="pt-3 flex items-center justify-center gap-3 border-t border-slate-50 dark:border-slate-800 mt-3">
                  <a href={member.facebook} className="text-slate-400 hover:text-blue-600 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.675 0h-21.35C.595 0 0 .595 0 1.326v21.348C0 23.405.595 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.325-.595 1.325-1.326V1.326C24 .595 23.405 0 22.675 0z" />
                    </svg>
                  </a>
                  <a href={member.twitter} className="text-slate-400 hover:text-sky-500 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="text-[11px] text-slate-400 dark:text-slate-500 nepali-text">
            * समितिको बैठक प्रत्येक महिनाको अन्तिम शुक्रबार बस्ने गर्दछ।
          </p>
        </div>
      </div>
    </section>
  );
}