export default function AuthorizationLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 ">
      <div className="flex items-center justify-center px-5 container mx-auto">{children}</div>
    </section>
  );
}
