import { BombContext } from "./bomb-context";

export default function BombProvider({
  children,
  startedAt,
  timerDuration,
}: {
  children: React.ReactNode;
  startedAt?: number;
  timerDuration?: number;
}) {
  return (
    <BombContext.Provider
      value={{
        startedAt,
        timerDuration,
      }}
    >
      {children}
    </BombContext.Provider>
  );
}
