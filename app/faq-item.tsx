"use client";

import { useId, useState } from "react";
import { Icon } from "./icon";

export function FaqItem({ question, answer, number }: { question: string; answer: string; number: string }) {
  const [expanded, setExpanded] = useState(false);
  const answerId = useId();

  return (
    <div className="faq-item">
      <button
        className="faq-question"
        type="button"
        aria-expanded={expanded}
        aria-controls={answerId}
        onClick={() => setExpanded((current) => !current)}
      >
        <span className="mono faq-number" aria-hidden="true">{number}</span>
        <span>{question}</span>
        <Icon name="plus" size={18} />
      </button>
      <div className="faq-answer" id={answerId} aria-hidden={!expanded}>
        <div className="faq-answer-inner"><p>{answer}</p></div>
      </div>
    </div>
  );
}
