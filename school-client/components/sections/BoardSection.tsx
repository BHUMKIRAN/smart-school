"use client";

import React, { useEffect, useState } from "react";
import { getCommittee } from "@/Backend/getCommittee";

type BoardMember = {
  name: string;
  position: string;
  description?: string;
  image?: string;
  facebook?: string;
  twitter?: string;
};

export default function BoardSection() {
  const [members, setMembers] = useState<BoardMember[]>([]);
  const title = "विद्यालय व्यवस्थापन समिति";

  useEffect(() => {
    getCommittee()
      .then((res) => {
        const cards = Array.isArray(res[0]?.fields?.cards) ? res[0].fields.cards : [];

        const mappedMembers: BoardMember[] = cards.map((card: any) => {
          const rawUrl = card.fields?.image?.fields?.file?.url;
          return {
            name: card.fields?.title ?? "Unnamed",
            position: card.fields?.subtitle ?? "",
            description: card.fields?.education ?? "",
            image: rawUrl ? (rawUrl.startsWith("//") ? `https:${rawUrl}` : rawUrl) : undefined,
            facebook: card.fields?.facebook || "#",
            twitter: card.fields?.twitter || "#",
          };
        });

        const sortedMembers = mappedMembers.sort((a, b) => {
          const getPriority = (pos: string) => {
            if (pos.includes("अध्यक्ष")) return 1;
            if (pos.includes("सह-अध्यक्ष")) return 2;
            if (pos.includes("सचिव")) return 3;
            if (pos.includes("कोषाध्यक्ष")) return 4;
            if (pos.includes("सदस्य")) return 5;
            return 6;
          };
          return getPriority(a.position) - getPriority(b.position);
        });

        setMembers(sortedMembers);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section
      id="board"
      className="py-10 px-6 bg-[var(--background)] transition-colors duration-500 relative overflow-hidden"
    >
      {/* Decorative top gradient using --primary */}
      <div className="absolute top-0 left-0 w-full h-30 bg-gradient-to-b from-[var(--primary)] opacity-[0.03] to-transparent"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 space-y-4 animate-fadeIn">
          <h2 className="text-3xl md:text-5xl font-black text-[var(--foreground)] nepali-text leading-tight">
            {title}
          </h2>
          <div className="accent-bar mx-auto shadow-sm"></div>
        </div>

        {/* Board Members Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-4 gap-5 justify-items-center">
          {members.map((member, index) => (
            <div
              key={index}
              className="card group p-2 text-center w-full h-[300px] hover:border-[var(--primary)] transition-all duration-500"
            >
              {/* Profile Image / Avatar Box */}
              <div className="relative w-28 h-28 mx-auto mb-6 overflow-hidden rounded-[2rem] shadow-md  bg-[var(--muted-bg)] flex items-center justify-center">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />
                ) : (
                  <span className="text-3xl font-black text-[var(--primary)] opacity-40">
                    {member.name.charAt(0)}
                  </span>
                )}
              </div>

              {/* Member Details */}
              <div className="space-y-1">
                <h3 className="font-black text-xl nepali-text text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                  {member.name}
                </h3>

                <div className="inline-block px-4 py-1  text-[var(--primary)] text-[10px] font-black uppercase tracking-widest border border-[var(--card-border)]">
                  {member.position}
                </div>

                <p className="text-[var(--muted-text)] text-sm nepali-text leading-relaxed line-clamp-2 min-h-[40px]">
                  {member.description}
                </p>

                {/* Social Links using custom hover colors */}
                <div className="pt-2 flex items-center justify-center gap-4 border-t border-[var(--card-border)] mt-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  <a
                    href={member.facebook}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-[var(--muted-bg)] text-[var(--muted-text)] hover:bg-[var(--primary)] hover:text-white transition-all"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.675 0h-21.35C.595 0 0 .595 0 1.326v21.348C0 23.405.595 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.325-.595 1.325-1.326V1.326C24 .595 23.405 0 22.675 0z" />
                    </svg>
                  </a>
                  <a
                    href={member.twitter}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-[var(--muted-bg)] text-[var(--muted-text)] hover:bg-[var(--info)] hover:text-white transition-all"
                  >
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
        <div className="mt-16 text-center">
          <p className="text-xs text-[var(--muted-text)] nepali-text opacity-70 italic">
            * समितिको बैठक प्रत्येक महिनाको अन्तिम शुक्रबार बस्ने गर्दछ।
          </p>
        </div>
      </div>
    </section>
  );
}