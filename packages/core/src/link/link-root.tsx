/*!
 * Portions of this file are based on code from react-spectrum.
 * Apache License Version 2.0, Copyright 2020 Adobe.
 *
 * Credits to the React Spectrum team:
 * https://github.com/adobe/react-spectrum/blob/b35d5c02fe900badccd0cf1a8f23bb593419f238/packages/@react-aria/link/src/useLink.ts
 */

import { callHandler, mergeRefs, OverrideProps } from "@kobalte/utils";
import { ComponentProps, JSX, splitProps } from "solid-js";

import { Polymorphic } from "../polymorphic";
import { createTagName } from "../primitives";

export interface LinkRootOptions {
  /** Whether the link is disabled. */
  isDisabled?: boolean;
}

/**
 * Link allows a user to navigate to another page or resource within a web page or application.
 */
export function LinkRoot(props: OverrideProps<ComponentProps<"a">, LinkRootOptions>) {
  let ref: HTMLAnchorElement | undefined;

  const [local, others] = splitProps(props, ["ref", "type", "isDisabled", "onClick"]);

  const tagName = createTagName(
    () => ref,
    () => "a"
  );

  const onClick: JSX.EventHandlerUnion<any, MouseEvent> = e => {
    if (local.isDisabled) {
      e.preventDefault();
      return;
    }

    callHandler(e, local.onClick);
  };

  return (
    <Polymorphic
      fallbackComponent="a"
      ref={mergeRefs(el => (ref = el), local.ref)}
      role={tagName() !== "a" ? "link" : undefined}
      tabIndex={tagName() !== "a" && !local.isDisabled ? 0 : undefined}
      aria-disabled={local.isDisabled ? true : undefined}
      data-disabled={local.isDisabled ? "" : undefined}
      onClick={onClick}
      {...others}
    />
  );
}
