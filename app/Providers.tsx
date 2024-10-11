"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { createStore, AppStore } from "@/lib/store/store";
import Navigation from "@/components/navigation";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = createStore();
  }

  return (
    <Provider store={storeRef.current}>
      <ThemeProvider attribute="class">
        <Navigation />
        {children}
      </ThemeProvider>
    </Provider>
  );
}
