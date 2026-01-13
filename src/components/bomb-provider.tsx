import { BombContext } from "./bomb-context";

export default function BombProvider({
  children,
  startedAt,
  timerDuration,
  strikeCount,
  maxStrikes,
}: {
  children: React.ReactNode;
  startedAt?: number;
  timerDuration?: number;
  strikeCount?: number;
  maxStrikes?: number;
}) {
  return (
    <BombContext.Provider
      value={{
        startedAt,
        timerDuration,
        strikeCount,
        maxStrikes,
      }}
    >
      {children}
    </BombContext.Provider>
  );
}
