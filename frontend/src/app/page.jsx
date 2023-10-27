"use client";

import Balance from "@/components/Balance";
import DirectTransfer from "@/components/DirectTransfer";
import IntentTransfer from "@/components/IntentTransfer";
import UserInfo from "@/components/UserInfo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FLAG = false;

export default function Home() {
  return (
    <main>
      <div className="flex justify-center items-center h-[70vh]">
        <div className="flex flex-col gap-y-5 animate-fade animate-once animate-duration-1200 animate-delay-300 animate-ease-in-out">
          <UserInfo />

          <Balance />

          <Tabs
            defaultValue="direct"
            className="w-[400px] border-2 border-purple-100 p-4"
          >
            {FLAG && (
              <>
                <TabsList>
                  <TabsTrigger value="direct">Direct</TabsTrigger>
                  <TabsTrigger value="intent">Intent</TabsTrigger>
                </TabsList>
                <TabsContent value="intent">
                  <IntentTransfer />
                </TabsContent>
              </>
            )}

            <TabsContent value="direct">
              <DirectTransfer />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
