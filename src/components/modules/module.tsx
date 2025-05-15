export default function Module({ children, ...props }: any) {
  return (
    <group name="module" {...props}>
      {children}
    </group>
  );
}
