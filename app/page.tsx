import { ClickGuiPreview } from "./clickgui-preview";
import { FaqItem } from "./faq-item";
import { Icon } from "./icon";
import { moduleCategories, moduleCount } from "./modules";
import { distribution } from "./distribution";
import { releases } from "./releases";

const accessSteps = [
  {
    id: "buy-key",
    title: "Ключ на FunPay",
    description: "Купи ключ доступа к ArtemikDLC на FunPay.",
    icon: "key",
    action: {
      url: distribution.funPayProductUrl,
      label: "Купить ключ на FunPay",
      pending: "Ссылка на товар появится здесь.",
      download: false,
    },
  },
  {
    id: "launcher",
    title: "Лаунчер ArtemikDLC",
    description: "Скачай лаунчер ArtemikDLC с этого сайта.",
    icon: "download",
    action: {
      url: distribution.launcherPath,
      label: "Скачать лаунчер",
      pending: "Файл лаунчера пока недоступен.",
      download: true,
    },
  },
  {
    id: "activate-key",
    title: "Введи ключ",
    description: "Открой лаунчер и введи в нём ключ, который получил на FunPay.",
    icon: "lock",
  },
] as const;

const featuredCategories = moduleCategories.slice(0, 4);
const featuredModuleIds = new Set([
  "AimAssistant", "AutoTotem", "Sprint", "SafeWalk", "FullBright", "Crosshair", "AutoEat", "AutoTool",
]);

const questions = [
  {
    question: "Где купить ключ ArtemikDLC?",
    answer: "Ключ продаётся на FunPay. Ссылка на карточку товара будет в разделе «Получить доступ».",
  },
  {
    question: "Где скачать лаунчер?",
    answer: "Лаунчер будет доступен на этом сайте в разделе «Получить доступ».",
  },
  {
    question: "Где вводить ключ ArtemikDLC?",
    answer: "В лаунчере ArtemikDLC. Открой его и введи ключ, купленный на FunPay.",
  },
  {
    question: "Какие версии Minecraft поддерживает клиент?",
    answer: "ArtemikDLC рассчитан на Minecraft Java Edition 1.21.4 и 26.3. Требования Fabric и Java указаны в карточках версий.",
  },
  {
    question: "Можно ли использовать клиент на сервере?",
    answer: "Проверь правила конкретного сервера. Если модификации с такими функциями запрещены, используй клиент в одиночной игре или на своём сервере.",
  },
];

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="ArtemikDLC, наверх">
      <span className="brand-mark" aria-hidden="true" />
      <span>ArtemikDLC</span>
    </a>
  );
}

export default function Home() {
  return (
    <div id="top">
      <a className="skip-link" href="#content">К содержанию</a>
      <header className="site-header">
        <div className="wrap header-inner">
          <Brand />
          <nav aria-label="Основная навигация">
            <a href="#modules">Возможности</a>
            <a href="#access">Доступ</a>
            <a href="#versions">Версии</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className="header-actions">
            <a className="header-download" href="#launcher">Лаунчер</a>
            <a className="button button-primary button-header" href="#buy-key">
              Купить ключ <Icon name="external" size={14} />
            </a>
          </div>
        </div>
      </header>

      <main id="content">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-backdrop" aria-hidden="true">
            <div className="hud-fragment hud-combat">
              <span><Icon name="swords" size={14} /> Combat</span>
              <span>AimAssistant <i /></span>
              <span>AutoTotem <i /></span>
            </div>
            <div className="hud-fragment hud-versions mono">
              <span>ARTEMIKDLC / JAVA EDITION</span>
              <span>01 / 1.21.4</span>
              <span>02 / 26.3</span>
            </div>
            <div className="hud-fragment hud-player">
              <span><Icon name="bag" size={14} /> Player</span>
              <span>AutoEat <i /></span>
              <span>AutoTool <i /></span>
            </div>
            <div className="hud-fragment hud-render">
              <span><Icon name="eye" size={14} /> Render</span>
              <span>Crosshair <i /></span>
              <span>FullBright <i /></span>
            </div>
          </div>
          <div className="wrap hero-inner">
            <div className="hero-content">
              <p className="eyebrow hero-kicker"><i aria-hidden="true" /> MINECRAFT JAVA EDITION</p>
              <h1 id="hero-title">ArtemikDLC <em>для Minecraft</em></h1>
              <p className="hero-description">Платный клиент на Fabric с игровым меню ClickGUI и модулями для боя, движения и визуальных настроек.</p>
              <a className="button button-primary hero-button" href="#clickgui">
                Смотреть интерфейс <Icon name="external" size={16} />
              </a>
            </div>

            <ClickGuiPreview />
          </div>
        </section>

        <section className="wrap section" id="modules" aria-labelledby="modules-title">
          <div className="section-head">
            <p className="eyebrow">01 / ВОЗМОЖНОСТИ</p>
            <h2 id="modules-title">Модули клиента</h2>
            <p>В демо ClickGUI показан полный реестр ArtemikDLC. Всего записей — {moduleCount}.</p>
          </div>
          <div className="module-grid">
            {featuredCategories.map((module, index) => (
              <article className="module-card" key={module.title}>
                <div className="module-copy">
                  <span className="module-number mono">0{index + 1}</span>
                  <div>
                    <h3>{module.title}</h3>
                    <p>{module.description}</p>
                  </div>
                </div>
                <div className="module-visual">
                  <div className="module-window">
                    <div className="module-window-title" aria-hidden="true">
                      <Icon name={module.icon} size={17} /> {module.title}<i />
                    </div>
                    <ul className="module-examples" aria-label="Примеры модулей">
                      {module.modules.filter(([id]) => featuredModuleIds.has(id)).map(([id, name]) => (
                        <li key={id}><span>{name}</span><i aria-hidden="true" /></li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="wrap section access-section" id="access" aria-labelledby="access-title">
          <div className="section-head">
            <p className="eyebrow">02 / КЛЮЧ И ЛАУНЧЕР</p>
            <h2 id="access-title">Получить доступ</h2>
            <p>Купи ключ на FunPay, скачай лаунчер с сайта и введи ключ в лаунчере.</p>
          </div>
          <div className="access-grid">
            {accessSteps.map((step, index) => (
              <article className="access-card" id={step.id} key={step.id}>
                <div className="access-card-top">
                  <span className="mono access-brand">ARTEMIKDLC</span>
                  <span className="mono step-label">ШАГ 0{index + 1}</span>
                </div>
                <span className="access-icon"><Icon name={step.icon} size={25} /></span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                {"action" in step && (step.action.url ? (
                  <a
                    className="button button-primary access-button"
                    href={step.action.url}
                    download={step.action.download || undefined}
                    target={step.action.download ? undefined : "_blank"}
                    rel={step.action.download ? undefined : "noreferrer"}
                  >
                    {step.action.label}<Icon name={step.action.download ? "download" : "external"} size={17} />
                  </a>
                ) : (
                  <>
                    <button className="button access-button" type="button" disabled aria-describedby={step.id + "-pending"}>
                      {step.action.label}<Icon name={step.action.download ? "download" : "external"} size={17} />
                    </button>
                    <p className="access-pending" id={step.id + "-pending"}>{step.action.pending}</p>
                  </>
                ))}
              </article>
            ))}
          </div>
        </section>

        <section className="wrap section" id="versions" aria-labelledby="versions-title">
          <div className="section-head">
            <p className="eyebrow">03 / СОВМЕСТИМОСТЬ</p>
            <h2 id="versions-title">Версии клиента</h2>
            <p>Требования для каждой версии Minecraft.</p>
          </div>

          <div className="release-grid">
            {releases.map((release, index) => (
              <article className="release-card" id={`release-${release.minecraft.replaceAll(".", "-")}`} key={release.minecraft}>
                <p className="mono release-tag">MINECRAFT JAVA / 0{index + 1}</p>
                <h3>{release.minecraft}</h3>
                <p className="release-description">{release.description}</p>
                <dl className="release-specs">
                  <div><dt>Клиент</dt><dd>v{release.client}</dd></div>
                  <div><dt>Fabric Loader</dt><dd>{release.loader}+</dd></div>
                  <div><dt>Java</dt><dd>{release.java}+</dd></div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section className="wrap section" id="faq" aria-labelledby="faq-title">
          <div className="section-head">
            <p className="eyebrow">04 / ПОМОЩЬ</p>
            <h2 id="faq-title">Частые вопросы</h2>
          </div>
          <div className="faq-list">
            {questions.map(({ question, answer }, index) => (
              <FaqItem key={question} question={question} answer={answer} number={`0${index + 1}`} />
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-inner">
          <Brand />
          <p>Независимый проект для Minecraft Java Edition.</p>
          <a className="back-top" href="#top">Наверх <Icon name="up" size={16} /></a>
        </div>
      </footer>
    </div>
  );
}
