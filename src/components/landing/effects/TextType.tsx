"use client";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";
import { gsap } from "gsap";
import { useMotionAllowed } from "./useMotionAllowed";
import "./TextType.css";
interface Props {
  text: string | string[];
  as?: ElementType;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  className?: string;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorCharacter?: ReactNode;
  cursorClassName?: string;
  cursorBlinkDuration?: number;
  textColors?: string[];
  variableSpeed?: { min: number; max: number };
  onSentenceComplete?: (sentence: string, index: number) => void;
  startOnVisible?: boolean;
  reverseMode?: boolean;
}
export default function TextType({
  text,
  as: Tag = "div",
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 1800,
  deletingSpeed = 30,
  loop = true,
  className = "",
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = "|",
  cursorClassName = "",
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
}: Props) {
  const sentences = useMemo(
    () => (Array.isArray(text) ? text : [text]).filter(Boolean),
    [text],
  );
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [visible, setVisible] = useState(!startOnVisible);
  const root = useRef<HTMLElement>(null);
  const cursor = useRef<HTMLSpanElement>(null);
  const allowed = useMotionAllowed();
  const current = sentences[index % Math.max(sentences.length, 1)] ?? "";
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let inView = !startOnVisible;
    const refresh = () => setVisible(inView && !document.hidden);
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      refresh();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", refresh);
    };
  }, [startOnVisible]);
  useEffect(() => {
    if (!allowed || !visible || !current) return;
    const finished = length >= current.length;
    const delay = deleting
      ? deletingSpeed
      : finished
        ? pauseDuration
        : length === 0
          ? initialDelay
          : variableSpeed
            ? variableSpeed.min +
              Math.random() * (variableSpeed.max - variableSpeed.min)
            : typingSpeed;
    const timer = setTimeout(
      () => {
        if (deleting) {
          if (length > 0) setLength(length - 1);
          else {
            setDeleting(false);
            setIndex((index + 1) % sentences.length);
          }
        } else if (finished) {
          onSentenceComplete?.(current, index);
          if (loop || index < sentences.length - 1) setDeleting(true);
        } else setLength(length + 1);
      },
      Math.max(16, delay),
    );
    return () => clearTimeout(timer);
  }, [
    allowed,
    visible,
    current,
    index,
    length,
    deleting,
    typingSpeed,
    initialDelay,
    pauseDuration,
    deletingSpeed,
    loop,
    variableSpeed,
    onSentenceComplete,
    sentences.length,
  ]);
  useEffect(() => {
    if (!allowed || !visible || !showCursor || !cursor.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cursor.current,
        { opacity: 1 },
        { opacity: 0, duration: cursorBlinkDuration, repeat: -1, yoyo: true },
      );
    }, root);
    return () => ctx.revert();
  }, [allowed, visible, showCursor, cursorBlinkDuration]);
  const value = allowed
    ? (reverseMode ? current.split("").reverse().join("") : current).slice(
        0,
        length,
      )
    : current;
  return (
    <Tag ref={root} className={`text-type ${className}`}>
      <span className="sr-only">{sentences.join(" ")}</span>
      <span
        aria-hidden="true"
        className="text-type__content"
        style={{
          color: textColors.length
            ? textColors[index % textColors.length]
            : undefined,
        }}
      >
        {value}
      </span>
      {showCursor &&
        allowed &&
        !(hideCursorWhileTyping && (deleting || length < current.length)) && (
          <span
            aria-hidden="true"
            ref={cursor}
            className={`text-type__cursor ${cursorClassName}`}
          >
            {cursorCharacter}
          </span>
        )}
    </Tag>
  );
}
