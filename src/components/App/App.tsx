import { Component, createEffect } from "solid-js";

import styles from "./App.module.css";
import { init } from "../../google";

export const App: Component = () => {
  createEffect(() => {
    init();
  });
  return (
    <div class={styles.App}>
      <header class={styles.header}>Youtube migration</header>
    </div>
  );
};
