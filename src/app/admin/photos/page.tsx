import AdminNav from "../../../components/AdminNav";

export default function AdminPhotosPage() {
  return (
    <main className="min-h-screen bg-[#F4E8D9] text-[#421211]">
      <AdminNav />
      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
        <h1 className="text-3xl font-black md:text-5xl">照片管理</h1>
        <p className="mt-3 text-[#7A665B]">之後這裡會接 Supabase Storage，讓你從後台上傳照片。</p>
      </section>
    </main>
  );
}
