import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import CaptureMood from "@/components/main/CaptureMood";
import { hasEnvVars } from "@/lib/utils";
import MoodDashboard from "@/components/main/MoodDashboard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="flex flex-col gap-2 items-start">

        {/* Mood Capture Section */}
        <section className="flex flex-col items-center gap-6 py-8">
          <div className="text-center">
            <h2 className="font-bold text-3xl mb-4">How are you feeling today?</h2>
            <p className="text-muted-foreground text-lg mb-6">
              Let AI analyze your mood from a quick photo and get personalized insights
            </p>
          </div>
          <CaptureMood />
          <Button variant="secondary">
            <Link href="/protected/dash">
              Go to Dashboard
            </Link>

          </Button>
        </section>

        {/* Mood Dashboard Section */}
        {hasEnvVars && (
          <section className="py-8">
            <div className="text-center mb-8">
              <h2 className="font-bold text-3xl mb-4">Your Mood Journey</h2>
              <p className="text-muted-foreground text-lg">
                Track your emotional well-being over time
              </p>
            </div>
            <MoodDashboard />
          </section>
        )}
      </div>

    </div>
  );
}