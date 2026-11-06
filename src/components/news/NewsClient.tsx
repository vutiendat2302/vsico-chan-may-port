"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  Search,
  Tag,
  Newspaper,
  ChevronRight,
} from "lucide-react";
import { Link, type AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { chanMayNewsList, chanMayNewsCategories } from "@/data/news-chanmay";

type NewsClientProps = {
  locale: AppLocale;
  translations: {
    backHome: string;
    eyebrow: string;
    pageTitle: string;
    pageSubtitle: string;
    searchPlaceholder: string;
    readMore: string;
    noResults: string;
    featuredTag: string;
  };
};

export function NewsClient({ locale, translations: t }: NewsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const isVi = locale === "vi";

  // Lọc bài viết theo danh mục & từ khóa
  const filteredNews = chanMayNewsList.filter((article) => {
    const matchesCategory =
      selectedCategory === "all" || article.category === selectedCategory;

    const query = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !query ||
      (isVi ? article.titleVi : article.titleEn).toLowerCase().includes(query) ||
      (isVi ? article.summaryVi : article.summaryEn).toLowerCase().includes(query);

    return matchesCategory && matchesQuery;
  });

  const featuredArticle = filteredNews[0];
  const remainingArticles = filteredNews.slice(1);

  return (
    <div className="min-h-screen bg-surface text-ink">
      {/* Top Banner / Breadcrumb */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-[#250942] via-[#350F5C] to-[#250942] pt-32 pb-20 text-white lg:pt-40 lg:pb-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/3 h-96 w-96 rounded-full bg-primary/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-10 h-80 w-80 rounded-full bg-highlight/15 blur-3xl"
        />

        <div className="container relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-body text-xs font-semibold tracking-wider text-highlight-light uppercase transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{t.backHome}</span>
          </Link>

          <div className="mt-8 max-w-4xl">
            <span className="font-label text-xs font-bold tracking-[0.26em] text-highlight-light uppercase">
              {t.eyebrow}
            </span>
            <h1 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {t.pageTitle}
            </h1>
            <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-white/80 sm:text-lg">
              {t.pageSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container py-14 lg:py-20">
        {/* Bộ lọc danh mục & Ô tìm kiếm */}
        <div className="flex flex-col justify-between gap-6 border-b border-border pb-8 lg:flex-row lg:items-center">
          {/* Tabs danh mục */}
          <div className="flex flex-wrap items-center gap-2">
            {chanMayNewsCategories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    "rounded-[2px] px-4 py-2 font-body text-xs font-semibold tracking-wide transition-all",
                    isActive
                      ? "border border-primary bg-primary text-white shadow-xs"
                      : "border border-border/80 bg-white text-ink/75 hover:border-primary hover:text-primary",
                  )}
                >
                  {isVi ? cat.labelVi : cat.labelEn}
                </button>
              );
            })}
          </div>

          {/* Ô tìm kiếm */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full rounded-[2px] border border-border bg-white pl-10 pr-4 py-2 font-body text-xs text-ink placeholder:text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Danh sách bài viết */}
        {filteredNews.length === 0 ? (
          <div className="py-20 text-center">
            <Newspaper className="mx-auto h-12 w-12 text-muted/50" />
            <p className="mt-4 font-body text-base font-medium text-muted">
              {t.noResults}
            </p>
          </div>
        ) : (
          <div className="mt-12 space-y-14">
            {/* Bài viết tiêu điểm (Featured Hero Article) */}
            {featuredArticle && (
              <article className="group grid grid-cols-1 gap-8 overflow-hidden rounded-[2px] border border-border bg-white transition-all hover:border-primary hover:shadow-lg lg:grid-cols-12">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 lg:col-span-7 lg:aspect-auto">
                  <Image
                    src={featuredArticle.imageUrl}
                    alt={isVi ? featuredArticle.titleVi : featuredArticle.titleEn}
                    fill
                    sizes="(max-width: 1024px) 100vw, 700px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-[2px] bg-primary px-3 py-1 font-label text-[10px] font-bold tracking-widest text-white uppercase shadow-sm">
                    <Tag className="h-3 w-3" />
                    <span>{t.featuredTag}</span>
                  </div>
                </div>

                <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-5">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-muted">
                      <span className="font-semibold text-primary">
                        {isVi ? featuredArticle.categoryNameVi : featuredArticle.categoryNameEn}
                      </span>
                      <span>·</span>
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{featuredArticle.date}</span>
                      </span>
                    </div>

                    <h2 className="mt-4 font-heading text-xl font-bold tracking-tight text-ink sm:text-2xl lg:text-3xl group-hover:text-primary transition-colors">
                      {isVi ? featuredArticle.titleVi : featuredArticle.titleEn}
                    </h2>

                    <p className="mt-4 font-body text-sm leading-relaxed text-ink/75">
                      {isVi ? featuredArticle.summaryVi : featuredArticle.summaryEn}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-border/60 pt-4">
                    <a
                      href={featuredArticle.externalUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-body text-xs font-bold text-primary transition-colors hover:text-primary-dark"
                    >
                      <span>{t.readMore}</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </article>
            )}

            {/* Lưới các bài viết còn lại */}
            {remainingArticles.length > 0 && (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {remainingArticles.map((article) => (
                  <article
                    key={article.id}
                    className="group flex flex-col justify-between overflow-hidden rounded-[2px] border border-border bg-white transition-all hover:border-primary hover:shadow-md"
                  >
                    <div>
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                        <Image
                          src={article.imageUrl}
                          alt={isVi ? article.titleVi : article.titleEn}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="absolute top-3 left-3 rounded-[2px] bg-ink/80 px-2.5 py-0.5 font-label text-[10px] font-semibold tracking-wider text-white uppercase backdrop-blur-xs">
                          {isVi ? article.categoryNameVi : article.categoryNameEn}
                        </span>
                      </div>

                      <div className="p-5 sm:p-6">
                        <div className="flex items-center gap-1.5 text-xs text-muted">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{article.date}</span>
                        </div>

                        <h3 className="mt-2.5 line-clamp-2 font-heading text-lg font-bold tracking-tight text-ink group-hover:text-primary transition-colors">
                          {isVi ? article.titleVi : article.titleEn}
                        </h3>

                        <p className="mt-2.5 line-clamp-3 font-body text-xs leading-relaxed text-ink/75">
                          {isVi ? article.summaryVi : article.summaryEn}
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-border/60 p-5 sm:p-6 pt-3">
                      <a
                        href={article.externalUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-body text-xs font-semibold text-primary transition-colors hover:text-primary-dark"
                      >
                        <span>{t.readMore}</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
