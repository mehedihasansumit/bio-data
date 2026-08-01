"use client";

import { useCallback, useRef } from "react";

/**
 * The keyboard half of `role="radiogroup"`.
 *
 * Declaring the role is a promise about behavior, and two groups in this app —
 * the template chips and the Document Settings segments — were making it
 * without keeping it: every radio was in the tab order and arrow keys did
 * nothing. Someone navigating by keyboard had to Tab through four templates to
 * reach the control after them, and the arrow keys they'd expect from every
 * other radio group on the web were dead.
 *
 * What the pattern actually requires (WAI-ARIA APG, Radio Group):
 *   - exactly one radio in the tab order, the checked one — so Tab enters the
 *     group once and leaves it once;
 *   - Arrow keys move focus *and* selection, wrapping at both ends;
 *   - Home/End jump to the first and last.
 *
 * Space and Enter need no handling: these are `<button>`s, so the platform
 * already fires click for both.
 *
 * The tab strip in `BuilderClient` implements the same idea by hand for
 * `role="tab"`. It is deliberately left alone — tabs and radios share key
 * handling but not activation semantics, and merging them would mean one hook
 * with a mode flag serving two different ARIA contracts.
 */
export function useRovingRadio<T extends string>(
  options: readonly T[],
  selected: T,
  onSelect: (value: T) => void,
) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      const last = options.length - 1;
      let next: number | null = null;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next = index === last ? 0 : index + 1;
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = index === 0 ? last : index - 1;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = last;
      if (next === null) return;
      e.preventDefault();
      onSelect(options[next]);
      refs.current[next]?.focus();
    },
    [options, onSelect],
  );

  /** Spread onto each radio; the caller still owns className and children. */
  const radioProps = (option: T, index: number) => {
    const isSelected = selected === option;
    return {
      ref: (el: HTMLButtonElement | null) => {
        refs.current[index] = el;
      },
      type: "button" as const,
      role: "radio",
      "aria-checked": isSelected,
      // The roving part: only the checked radio is tabbable. Falling back to
      // the first when nothing matches keeps the group reachable if `selected`
      // is ever out of range.
      tabIndex: isSelected || (index === 0 && !options.includes(selected)) ? 0 : -1,
      onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => onKeyDown(e, index),
      onClick: () => onSelect(option),
    };
  };

  return { radioProps };
}
