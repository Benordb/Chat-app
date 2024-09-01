"use client";
import { useAuth } from "@/components/utils/authProvider";

export default function Home() {
  const { user } = useAuth();
  return (
    <div className="w-screen h-screen flex gap-4">
      <div className="h-full w-16 bg-neutral-700">navbar</div>
      <div className="w-full h-full flex">
        <div className="w-80 bg-neutral-700 h-full"></div>
        <div className="w-full h-full flex flex-col justify-between">
          <div className="h-24 bg-neutral-700 w-full"></div>
          <div className="h-full  w-full overflow-hidden">Content</div>
          <div className="flex gap-2 w-full px-12 pb-6">
            <input
              type="text"
              className="h-12 w-full bg-neutral-700 rounded-full px-8"
            />
            <div className="h-12 w-12 bg-neutral-700 rounded-full">icon</div>
          </div>
        </div>
      </div>
    </div>
  );
}
