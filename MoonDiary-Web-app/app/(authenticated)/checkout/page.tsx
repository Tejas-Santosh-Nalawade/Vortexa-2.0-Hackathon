"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const res = await fetch("/api/checkout", { method: "POST" });
    setLoading(false);
    if (!res.ok) return;
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };

  return (
    <div className="container mx-auto p-4 max-w-xl">
      <Card>
        <CardHeader>
          <CardTitle>Support MoonDiary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Proceed to checkout to unlock advanced AI features.</p>
          <Button onClick={handleCheckout} disabled={loading}>{loading ? "Redirecting..." : "Go to Checkout"}</Button>
        </CardContent>
      </Card>
    </div>
  );
}


