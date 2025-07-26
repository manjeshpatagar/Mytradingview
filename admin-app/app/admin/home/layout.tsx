// app/admin/home/layout.tsx
import React, { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <h2>Admin Home Layout</h2>
      {children}
    </div>
  );
}
