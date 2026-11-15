"use client";

import { useEffect, useRef, useState } from "react";
import { ClickGuiIcon, type ClickGuiIconName } from "./clickgui-icon";
import { moduleCategories, type DemoModule } from "./modules";

const categories = [
  { id: "combat", title: "Бой", icon: "combat" },
  { id: "movement", title: "Движение", icon: "movement" },
  { id: "render", title: "Визуал", icon: "render" },
  { id: "player", title: "Игрок", icon: "player" },
  { id: "misc", title: "Разное", icon: "misc" },
  { id: "cosmetics", title: "Косметика", icon: "cosmetics" },
] as const;
const tools = [
  { id: "configs", title: "Конфиги", icon: "folder", empty: "Нет сохранённых конфигов." },
  { id: "friends", title: "Друзья", icon: "friends", empty: "Список друзей пуст." },
  { id: "waypoints", title: "Метки", icon: "pin", empty: "Нет сохранённых меток." },
  { id: "macros", title: "Макросы", icon: "keyboard", empty: "Нет сохранённых макросов." },
] as const;
const navigation = [...categories, ...tools];
const cosmetics = ["Шляпы", "Очки", "Крылья", "Рюкзаки", "Питомцы", "Плащи", "Мечи"];

function normalizeSearch(value: string) {
  return value.toLowerCase().replace(/[\s_-]+/g, "");
}

const modules = moduleCategories
  .flatMap(({ id: category, modules }) => (modules as readonly DemoModule[]).map((module) => ({
    category: category === "cosmetics" && module[0] !== "CosmeticsFunction" ? "render" : category,
    module,
    searchText: module.map((value) => typeof value === "string" ? normalizeSearch(value) : "").join(" "),
  })))
  .sort((a, b) => Number(!a.module[2]) - Number(!b.module[2]) || a.module[1].localeCompare(b.module[1], "en"));

function NavButton({ title, icon, active, onClick }: { title: string; icon: ClickGuiIconName; active: boolean; onClick: () => void }) {
  return (
    <button className="demo-category" type="button" aria-pressed={active} onClick={onClick}>
      <ClickGuiIcon name={icon} />
      {title}
    </button>
  );
}

export function ClickGuiPreview() {
  const figure = useRef<HTMLElement>(null);
  const moduleList = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [page, setPage] = useState<(typeof navigation)[number]>(categories[0]);
  const [direction, setDirection] = useState<"forward" | "backward">();
  const [search, setSearch] = useState("");
  const [enabled, setEnabled] = useState<ReadonlySet<string>>(() => new Set());
  const [details, setDetails] = useState<DemoModule | null>(null);

  useEffect(() => {
    const preview = figure.current;
    if (!preview) return;

    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    let frame: number | null = null;
    let previous = -1;

    function update() {
      frame = null;
      if (!motion.matches || !preview) return;

      // Measure the figure so the panel's own tilt cannot affect scroll progress.
      const top = preview.getBoundingClientRect().top;
      const start = Math.min(window.innerHeight * 0.65, top + window.scrollY - 24);
      const end = Math.min(window.innerHeight * 0.22, start - 120);
      const reveal = Math.max(0, Math.min(1, (start - top) / (start - end)));
      if (reveal !== previous) {
        preview.style.setProperty("--gui-reveal", String(reveal));
        previous = reveal;
      }
    }

    function schedule() {
      if (motion.matches && frame === null) frame = window.requestAnimationFrame(update);
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

  useEffect(() => {
    const modal = dialog.current;
    if (details && modal && !modal.open) modal.showModal();
  }, [details]);

  const term = normalizeSearch(search);
  const isCosmetics = page.id === "cosmetics";
  const isTool = "empty" in page;
  const searchLabel = isCosmetics ? "Поиск косметики" : isTool ? `Поиск: ${page.title}` : "Поиск модулей";
  const visibleModules = modules.filter(({ category, searchText }) => (
    term ? searchText.includes(term) : category === page.id
  ));
  const visibleCosmetics = cosmetics.filter((name) => normalizeSearch(name).includes(term));

  function selectPage(next: typeof page) {
    if (next.id !== page.id) {
      setDirection(navigation.indexOf(next) > navigation.indexOf(page) ? "forward" : "backward");
      setPage(next);
    }
    setSearch("");
    moduleList.current?.scrollTo({ top: 0 });
  }

  function toggleModule(id: string) {
    setEnabled((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <figure className="clickgui-figure" id="clickgui" ref={figure}>
      <div className="clickgui-window" role="group" aria-label="Интерактивное демо ClickGUI">
        <aside className="demo-sidebar">
          <div className="demo-brand">
            <span className="brand-mark" aria-hidden="true" />
            <div>ArtemikDLC<small>3.0.14</small></div>
          </div>
          <nav className="demo-categories" aria-label="Категории ClickGUI">
            {categories.map((category) => <NavButton key={category.id} title={category.title} icon={category.icon} active={page.id === category.id} onClick={() => selectPage(category)} />)}
          </nav>
          <nav className="demo-categories demo-tools" aria-label="Инструменты ClickGUI">
            {tools.map((tool) => <NavButton key={tool.id} title={tool.title} icon={tool.icon} active={page.id === tool.id} onClick={() => selectPage(tool)} />)}
          </nav>
        </aside>

        <div className="demo-toolbar">
          <div className="demo-current">
            <ClickGuiIcon name="layers" size={24} />
            <span>Клиент</span>
            <ClickGuiIcon name="chevron" size={13} />
            <strong>{term && !isTool && !isCosmetics ? "Поиск" : page.title}</strong>
          </div>
          <label className="demo-search">
            <ClickGuiIcon name="search" size={18} />
            <input
              aria-label={searchLabel}
              type="search"
              placeholder={isTool ? "Поиск…" : searchLabel}
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                moduleList.current?.scrollTo({ top: 0 });
              }}
            />
          </label>
        </div>

        <div className="demo-modules" ref={moduleList} tabIndex={0} role="region" aria-label={isTool || isCosmetics ? page.title : "Список модулей ClickGUI"}>
          <div className="demo-module-page" key={page.id} data-direction={direction}>
            {isTool ? (
              <p className="demo-empty" role="status">{term ? "Ничего не найдено." : page.empty}</p>
            ) : isCosmetics ? (
              visibleCosmetics.length ? <div className="demo-module-grid">
                {visibleCosmetics.map((name) => <div className="demo-cosmetic" key={name}><ClickGuiIcon name="cosmetics" />{name}</div>)}
              </div> : <p className="demo-empty" role="status">Косметика не найдена.</p>
            ) : visibleModules.length ? (
              <div className="demo-module-grid">
                {visibleModules.map(({ module }) => {
                  const [id, name, description, hasSettings] = module;
                  return (
                    <article className="demo-module" key={id} data-enabled={enabled.has(id)}>
                      <div className="demo-module-copy">
                        <div className="demo-module-heading">
                          <h3>{name}</h3>
                          <ClickGuiIcon name="keyboard" size={18} />
                        </div>
                        {description && <p>{description}</p>}
                      </div>
                      {hasSettings && <button
                        className="demo-settings"
                        type="button"
                        aria-label={`Настройки: ${name}`}
                        aria-haspopup="dialog"
                        title={`Настройки: ${name}`}
                        onClick={() => setDetails(module)}
                      >
                        <ClickGuiIcon name="settings" size={18} />
                      </button>}
                      <button
                        className="demo-toggle"
                        type="button"
                        role="switch"
                        aria-label={name}
                        aria-checked={enabled.has(id)}
                        title={description}
                        onClick={() => toggleModule(id)}
                      ><span className="demo-switch" aria-hidden="true" /></button>
                    </article>
                  );
                })}
              </div>
            ) : (
              <p className="demo-empty" role="status">Модули не найдены. Попробуй другое название.</p>
            )}
          </div>
        </div>
      </div>
      <dialog className="demo-dialog" ref={dialog} aria-labelledby="demo-dialog-title" aria-describedby="demo-dialog-description" onClose={() => setDetails(null)}>
        <button className="demo-settings demo-dialog-close" type="button" aria-label="Закрыть" onClick={() => dialog.current?.close()}><ClickGuiIcon name="close" size={18} /></button>
        {details && <>
          <small>Настройки модуля · демо</small>
          <h2 id="demo-dialog-title">{details[1]}</h2>
          <p id="demo-dialog-description">{details[2]}</p>
          <button className="demo-dialog-toggle" type="button" role="switch" aria-label={details[1]} aria-checked={enabled.has(details[0])} onClick={() => toggleModule(details[0])}>
            {enabled.has(details[0]) ? "Включён" : "Выключен"}
            <span className="demo-switch" aria-hidden="true" />
          </button>
        </>}
      </dialog>
      <figcaption className="clickgui-caption">
        <span className="showcase-label"><i aria-hidden="true" /> ClickGUI <span className="showcase-detail">/ интерактивное демо</span></span>
        <div className="showcase-links">
          <div className="hero-meta mono" aria-label="Совместимость">
            <a href="#release-1-21-4">1.21.4</a>
            <a href="#release-26-3">26.3</a>
          </div>
        </div>
      </figcaption>
    </figure>
  );
}
