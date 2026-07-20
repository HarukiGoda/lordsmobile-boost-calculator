// "use client";

// import { useSearchParams } from "next/navigation";
// import type { AppParams } from "@/lib/params/types";}

// export function useAppParams() {
//   const searchParams = useSearchParams();

//   // URLから値を読み取り、デフォルト値を含めて返す
//   const getParams = (): AppParams => {
//     const rawBoosts = searchParams.get("boosts") ?? "";
//     const rawPref = searchParams.get("preference"); // JSON文字列を想定

//     return {
//       boosts: rawBoosts,
//       preference: rawPref ? JSON.parse(decodeURIComponent(rawPref)) : DEFAULT_PREF,
//       wonder: { active: searchParams.get("wonder") === "true" },
//     };
//   };

//   return getParams;
// }
