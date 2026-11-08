"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./icon";
import { moduleCategories } from "./modules";

type CategoryPage = { index: number; direction: "forward" | "backward" | null };

const categoryOptions = [{ id: "all", label: "All", icon: "grid" }, ...moduleCategories] as const;

function normalizeSearch(value: string) {
  return value.toLowerCase().replace(/[\s_-]+/g, "");
}

export function ClickGuiPreview() {
  const figureRef = useRef<HTMLElement>(null);
  const moduleListRef = useRef<HTMLDivElement>(null);
  const [categoryPage, setCategoryPage] = useState<CategoryPage>({ index: 0, direction: null });
  const [search, setSearch] = useState("");
  const [enabled, setEnabled] = useState<ReadonlySet<string>>(() => new Set());

  const term = normalizeSearch(search);
  const selected = categoryOptions[categoryPage.index];
  const groups = moduleCategories
    .filter((category) => selected.id === "all" || category.id === selected.id)
    .map((category) => ({
      id: category.id,
      label: category.label,
      modules: category.modules.filter(([id, name]) => normalizeSearch(name).includes(term) || normalizeSearch(id).includes(term)),
    }))
    .filter((category) => category.modules.length > 0);

  function toggleModule(key: string) {
    setEnabled((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  useEffect(() => {
    const figure = figureRef.current;
    if (!figure) return;

    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    let frame: number | null = null;
    let previousReveal = -1;

    const update = () => {
      frame = null;
      if (!motion.matches) return;

      const viewportHeight = window.innerHeight;
      const top = figure.getBoundingClientRect().top;
      const documentTop = top + window.scrollY;
      const start = Math.min(viewportHeight * 0.65, documentTop - 24);
      const end = Math.min(viewportHeight * 0.22, start - 120);
      const reveal = Math.min(1, Math.max(0, (start - top) / (start - end)));

      if (reveal !== previousReveal) {
        figure.style.setProperty("--gui-reveal", reveal.toString());
        previousReveal = reveal;
      }
    };

    function schedule() {
      if (motion.matches && frame === null) {
        frame = window.requestAnimationFrame(update);
      }
    }

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    motion.addEventListener("change", schedule);
    schedule();

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      motion.removeEventListener("change", schedule);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <figure className="clickgui-figure" id="clickgui" ref={figureRef}>
      <div className="clickgui-window" role="group" aria-label="Интерактивное демо ClickGUI">
        <aside className="demo-sidebar">
          <div className="demo-brand">
            <span className="brand-mark" aria-hidden="true" /> ArtemikDLC
          </div>
          <p className="demo-sidebar-label">Client categories</p>
          <nav className="demo-categories" aria-label="Категории ClickGUI">
            {categoryOptions.map((category, index) => (
              <button
                className="demo-category"
                key={category.id}
                type="button"
                aria-pressed={category.id === selected.id}
                onClick={() => {
                  setCategoryPage((current) => current.index === index ? current : {
                    index,
                    direction: index > current.index ? "forward" : "backward",
                  });
                  moduleListRef.current?.scrollTo({ top: 0 });
                }}
              >
                <Icon name={category.icon} size={17} />
                {category.label}
              </button>
            ))}
          </nav>
          <div className="demo-profile">
            <span className="brand-mark" aria-hidden="true" />
            <div><strong>ArtemikDLC</strong><span>Демо интерфейса</span></div>
          </div>
        </aside>

        <div className="demo-toolbar">
          <span className="demo-current"><Icon name="grid" size={17} />{selected.label}</span>
          <label className="demo-search">
            <Icon name="search" size={17} />
            <input
              aria-label="Поиск модулей"
              type="search"
              placeholder="Search modules..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                moduleListRef.current?.scrollTo({ top: 0 });
              }}
            />
          </label>
          <span className="demo-count mono"><i aria-hidden="true" /> {enabled.size} <span>включено</span></span>
        </div>

        <div className="demo-modules" ref={moduleListRef} tabIndex={0} role="region" aria-label="Список модулей ClickGUI">
          <div className="demo-module-page" key={selected.id} data-direction={categoryPage.direction ?? undefined}>
            {groups.length ? groups.map((group) => (
              <section className="demo-group" key={group.id} aria-label={group.label}>
                <h2>{group.label}</h2>
                <div className="demo-module-grid">
                  {group.modules.map(([id, name]) => {
                    return (
                      <button
                        className="demo-module"
                        type="button"
                        role="switch"
                        aria-checked={enabled.has(id)}
                        key={id}
                        onClick={() => toggleModule(id)}
                      >
                        <Icon name="box" size={16} />
                        <span>{name}</span>
                        <span className="demo-switch" aria-hidden="true" />
                      </button>
                    );
                  })}
                </div>
              </section>
            )) : (
              <p className="demo-empty">Модули не найдены. Попробуй другое название или категорию.</p>
            )}
          </div>
        </div>
      </div>
      <figcaption className="clickgui-caption">
        <span className="showcase-label"><i aria-hidden="true" /> ClickGUI <span className="showcase-detail">/ интерактивное демо</span></span>
        <div className="showcase-links">
          <a className="showcase-original" href="/media/clickgui.png" target="_blank" rel="noreferrer">
            Скриншот <Icon name="external" size={13} />
          </a>
          <div className="hero-meta mono" aria-label="Совместимость">
            <a href="#release-1-21-4">1.21.4</a>
            <a href="#release-26-3">26.3</a>
          </div>
        </div>
      </figcaption>
    </figure>
  );
}
