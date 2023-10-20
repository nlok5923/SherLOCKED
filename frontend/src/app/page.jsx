"use client";

import Balance from "@/components/Balance";
import DirectTransfer from "@/components/DirectTransfer";
import IntentTransfer from "@/components/IntentTransfer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <main>
      <div className="flex justify-center items-center h-[70vh]">
        <div className="flex flex-col gap-y-5 animate-fade animate-once animate-duration-1200 animate-delay-300 animate-ease-in-out">
          <Balance />

          <Tabs
            defaultValue="intent"
            className="w-[400px] border-2 border-purple-100 p-4"
          >
            <TabsList>
              <TabsTrigger value="direct">Direct</TabsTrigger>
              <TabsTrigger value="intent">Intent</TabsTrigger>
            </TabsList>
            <TabsContent value="direct">
              <DirectTransfer />
            </TabsContent>
            <TabsContent value="intent">
              <IntentTransfer />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
